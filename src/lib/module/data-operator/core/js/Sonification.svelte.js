/**
 *  SONIFICATION CLASS 
 *  - Base sonification class 
 *  - Strudel 'code' template with parameters and data sonification input strings
 */
// Libs and utils
import * as d3              from 'd3'
import { getPattern}        from 'euclidean-rhythms';
import {  
    cycleFromValue, 
    rotateArray, 
    legatoStruct }          from './utils';

// Config
import { timingConfig }     from '../config/global/timing-config'
import { musicalScales }    from '../config/global/music-scale-config';


// => Sonification class
export class Sonification{

    ////////////////
    //// FIELDS ////
    ////////////////

    userMessageTimeout = 1500
    state = $state()
    mode  = $derived({})
    // param   // Placeholder for derived parameter map 
    
    // code  = ''  // Placeholder for Strudel code derived from state and params
    
    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app, dataModel){

        /* ----- BASE CLASS STRUCTURE ---- */
        // Store module reference
        this.app    = app
        this.data   = dataModel

        // State
        this.state = {
            isMobile:           false,                  // Mobile mode flag: dynamic screen size or set by query param
            userMessage:  {
                text:           null,                   // On screen/display user action feedback message
                timeoutId:      null,                    // setTimeout ID used to cancel message after use
                overlay: {
                    isShown:        false,
                    type:           undefined,          // 'type' tepmlate for overlay message
                    link:           undefined            // generated strudel.cc link 
                }
            },
            sequencer: {    // Pulse sequencer: Group A nd B
                ui: {   // ui state for storing group/part being edited
                    isOpen:     false,          // Flag for UI
                    group:      undefined
                },
                A:  { active: false, array: [] },       // "active" flags use over euclidean rhythm
                B:  { active: false, array: [] }        // "array" is a store for support visuals
            },
            mode: {         // Active Mode 'button state': tracks the active mode (i.e. singular)
                fx:             false,
                modify:         false,
                select:         false,
                shift:          false,  
                info:           false,  
            },
            selection: {    // UI Selection
                shift:          false,                  // Tracks if shift is held
                heldModes:      new Set(),              // Stores all held modes: used to determine 'last held'
                activeMode:     undefined,              // Active 'mode' => summarise this.state.mode status
                numKeyAction:   undefined,   
                navKeyAction:   undefined,
                heldKeys:       new Set(),              // Tracks all held keyboard keys / screen buttons
                sceneIndex:      0,                        // Selector for they sceneIndex of the modelData
                scaleLock:      true,                   // Locks pitch to  scale ('quantized') or uses raw value ('microtonic')
                group: {
                    active:     'master',               // Active 'mixer' track group
                    A: {
                        pitchPattern:       undefined,      // Data series generating pitch pattern: initialised on load
                        velocityPattern:    undefined,      // Data series generating pitch pattern: initialised on load
                        chart:              'pitch',        // Default param to chart
                        sequencer:          undefined       // Pulse sequencer array 
                    },
                    B: {
                        pitchPattern:       undefined,      // Data series generating pitch pattern: initialised on load
                        velocityPattern:    undefined,      // Data series generating pitch pattern: initialised on load
                        chart:              'pitch',         // Default param to chart
                        sequencer:          undefined       // Pulse sequencer array 
                    }, 
                    C: {
                        activePart:     1,              // Active part: default to 1
                        part: {                         // Default each series to first/zero index pattern   
                            1: { series: 0,     sequencer: undefined },           
                            2: { series: 0,     sequencer: undefined },           
                            3: { series: 0,     sequencer: undefined }             
                        }                         
                    }, 
                    master: {
                        mute:   false      // Master mute
                    }
                }
            },
            snapshot: {
                solo: {
                    current:    undefined,
                    mutedPrior: []
                }
            },
            // Associated composition class
            composition:    undefined 
        }

        // Schema
        this.schema = {
            mode:           Object.keys(this.state.mode),
        }
    }

    /////////////////////////
    //// PRIVATE METHODS ////
    /////////////////////////

    async #initREPL(strudel){
        this.strudel = strudel      // Add reference to strudel instance
        await strudel.initREPL()    // Init repl
        // Add update handler to the 
        this.updateStrudel =  (autoplay = true) => strudel?.repl?.evaluate(this.code, autoplay)
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    initParam(punchFX){
        // i. Add group-level parameter mapped series lengths: called after custom groupConfig is added, but beore hte init paramMa
        if(this.param.A.pitch)      this.param.A.pitch.length       = +this.schema.group.A.pitch.interval.slice(0, -1)
        if(this.param.A.velocity)   this.param.A.velocity.length    = +this.schema.group.A.velocity.interval.slice(0, -1)
        if(this.param.B.pitch)      this.param.B.pitch.length       = +this.schema.group.B.pitch.interval.slice(0, -1)
        if(this.param.B.velocity)   this.param.B.velocity.length    = +this.schema.group.B.velocity.interval.slice(0, -1)

        // ii. Add fx toggle object to params for master and each group
        this.param.A.fx = Object.fromEntries( Object.keys(punchFX).map(key => [key, false]) )       
        this.param.B.fx = Object.fromEntries( Object.keys(punchFX).map(key => [key, false]) )       
        this.param.C.fx = Object.fromEntries( Object.keys(punchFX).map(key => [key, false]) )       
        this.param.master.fx = Object.fromEntries( Object.keys(punchFX).map(key => [key, false]) )    

        // iii. Add each fx config to param state: note that FX config is tied to the "instrument UI"
        for( const [fxName, obj] of Object.entries(punchFX)){
            if(obj.code){
                this.param.global.fx[fxName] = obj.code
            }
            if(obj.postGain){
                this.param.global.fx[`${fxName}Post`] = obj.postGain
            }
        }
    }

    addHandlers(strudel, editorUI){
        // Bind this to variable for use when methods are bound touch button-bound keys
        const sonification = this   

        // Add handle methods
        this.handle =  {
            // Update code
            updateREPL: (autoplay = true) => strudel?.repl?.evaluate(this.code, autoplay),
            update: () => {
                this.updateParameterMap()
                this.handle.updateREPL(strudel.state.transport === "playing")
            },
            exportCode: (toConsole = true, toFile = false, toLink = true, toClipboard = true) => {
                // i. Clean up code for export
                let blanksSeen = 0;
                const keepFirst = 3;    // number of blank lines to keep

                const code = this.code
                    .split("\n")
                    .filter(line => {
                        if (line.trim() === "") {
                            if (blanksSeen < keepFirst) {
                                blanksSeen++;
                                return true;  // keep this blank
                            }
                            return false;   // drop extra blanks
                        }
                        return true; // keep non-blank lines
                    })                    
                    .map((line) => line.replace(/^ {0,8}/, "")) // remove up to 8 leading spaces from each line
                    .join("\n");

                // ii. Option to export to text file: naming to be added 
                if(toFile){
                    const blob = new Blob([code], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = "code.txt";
                    a.click();
                    URL.revokeObjectURL(url);
                }
                
                // iii. Option to export to console
                if(toConsole){
                    console.log({code})
                }

                // iv. Option to export to console
                let link
                if(toLink){
                     const encoded = btoa(unescape(encodeURIComponent(code)));
                    link =  `https://strudel.cc/#${encoded}`;
                    console.log(link);
                }

                // Copy to clipboard
                if(toClipboard){
                    navigator.clipboard.writeText(link)
                    sonification.state.userMessage.overlay.link = link
                    sonification.state.userMessage.overlay.type = 'link'
                }

                // => Return strudel REPL link
                return link
            },
            // Transport
            start: async() => {
                // i. Init audio context (initial start only)
                if(!strudel.repl) await this.#initREPL(strudel)

                // ii. Evaluate strudel code => autoplay :  => need to figure out the 'live code' update
                this.handle.stop()                                          // Stop any playing pattern
                if(editorUI) strudel.param = editorUI                       // Optional: Sync strudel.param to editor UI object                       
                strudel.pattern = await strudel.repl.evaluate(this.code)    // Evaluate new strudel code and store the strudel pattern: true => autoplay

                // iii. Start timer + Update transport state           
                strudel.state.transport  = "playing"
                strudel.timer.start()                      
            },
            stop: () => {
                strudel.repl?.stop()          // Interchangeable with hush + context?
                strudel.state.transport = "stopped"
                strudel.timer.stop()
            }, 
            playPause: () => {  // Not used  as repl.pause does not pause the audiocontext
                // Toggle play/pause
                switch(strudel.state.transport ){
                    case "playing":
                        strudel.repl.pause()
                        strudel.state.transport = "paused"
                        strudel.timer.pause()
                        break
                    case "paused":
                        strudel.repl.start()
                        strudel.state.transport = "playing"
                        strudel.timer.resume()
                        break
                }
            },
            adjustBPM(bpmChange){     
                // i. Calculate newBPM (clamped to min/max)
                const minBPM = 10, maxBPM = 240
                const newBPM = Math.min(Math.max(sonification.param.global.bpm + bpmChange, minBPM), maxBPM)

                // ii. Update param
                sonification.param.global.bpm = newBPM

                // iii. Handle user message
                sonification.state.userMessage.text = `Tempo ${Math.sign(bpmChange) > 0 ? 'increased' : 'decreased'} to ${newBPM} bpm `
                sonification.handle.userMessage()
                // => Update REPL
                this.updateREPL(strudel.state.transport === "playing")
            }, 
            cycleTempoPresets(){
                // Presets
                const presets = [80, 100, 120, 140]

                // i. Get "current" closet and new bpm
                const closest = (arr, num) => arr.reduce((a, b) => Math.abs(b - num) < Math.abs(a - num) ? b : a);
                const currentClosest = closest(presets, sonification?.param.global.bpm)
                const newBPM = cycleFromValue(presets, currentClosest, 1)

                // ii. Update param
                sonification.param.global.bpm = newBPM

                // iii. Handle user message
                sonification.state.userMessage.text = `Tempo changed to ${newBPM} bpm `
                sonification.handle.userMessage()

                // => Update REPL                
                this.updateREPL(strudel.state.transport === "playing")

            },
            adjustSwing(swingChange, group, part){     
                // Swing level map
                const levelMap = {
                    0:  0,      1:  1 / 10,     2:  1 / 5,      3:  1 / 4,      4:  1 / 3,
                    5:  1 / 2,  6:  2 / 3,      7:  3 / 4,      8:  4 / 5,      9:  9 / 10
                }
                // i. Calculate newSwing level from an index
                const minIndex = 0, maxIndex = 9
                let  newIndex = sonification.param[group].swing.index + swingChange
                newIndex =  Math.min(Math.max(newIndex, minIndex), maxIndex)

                // ii. Update swing params
                sonification.param[group].swing.index = newIndex
                sonification.param[group].swing.level = levelMap[newIndex]

                // iii. Handle user message
                sonification.state.userMessage.text = `Swing set to +${d3.format(".2f")(levelMap[newIndex])}`
                sonification.handle.userMessage()

                // => Update REPL
                this.updateREPL(strudel.state.transport === "playing")
            }, 
            cycleClock(group, part, type, direction = 1){
                // i. Available divisions
                const divisionArray = [1, 2, 3 ,4, 5, 6, 7, 8]

                // ii. Update param
                if(!part){
                    sonification.param[group][type].clockDivider = cycleFromValue(divisionArray, sonification.param[group][type].clockDivider, direction)
                    sonification.state.userMessage.text = `${group} > Clock divider set to ${sonification.param[group][type].clockDivider} `
                } else {
                    sonification.param[group].part[part][type].clockDivider = cycleFromValue(divisionArray, sonification.param[group].part[part][type].clockDivider, direction)
                    sonification.state.userMessage.text = `${group}.${part} > Clock divider set to ${sonification.param[group].part[part][type].clockDivider } `
                }

                // iii. Handle user message
                sonification.handle.userMessage()

                // => Update REPL                
                this.updateREPL(strudel.state.transport === "playing")
            },
            // Data selection and update 
            selectPattern: (index, group, part) => {
                // i. Update pattern selection based on type
                const type = this.schema.group[group].type
                switch(type){
                    case 'pattern': 
                        if(!this.schema.group[group].part[part].series.includes(index)) return
                        this.state.selection.group[group].part[part].series = this.schema.group[group].part[part].series[index]
                        sonification.state.userMessage.text = `New pattern on ${group}.${part}`                 //  Create user message
                        if(this.param[group].part[part].sound.sample){ // UPdate sound params
                            const param = this.schema.pattern[group][part].sound[this.state.selection.group[group].part[part].series]
                            this.param[group].part[part].sound.sample     = param.name
                            this.param[group].part[part].sound.modifier   = param.modifier
                            this.param[group].part[part].gain   = param.gain
                            sonification.state.userMessage.text = `${group}.${part} > ${param.label }`
                        }

                        break
                    case 'pitch':
                    case 'velocity':
                    default:
                        this.state.selection.group[group][`${type}Pattern`] = this.schema.group[group][type].series[index]             
                        const label = sonification.data.schema.map?.series?.label[sonification.state.selection.group[group][`${sonification.schema.group[group].type}Pattern`]]?.label ?? param.label

                        sonification.state.userMessage.text = `${group} > ${label}` //  Create user message
                        break
                }
                // iii. Select part
                if(type === 'pattern' && part){
                    this.state.selection.group[group].activePart = part   
                }
                // iv. Handle user message
                sonification.handle.userMessage()
                // => Call update
                this.handle.update()
            },
            cyclePattern: (directionIndex, group, part) => {
                // i. Update pattern selection based on type: directionIndex doubles as direction (sign) and index if a part
                const type = this.schema.group[group].type
                const partId = Math.abs(directionIndex)

                switch(type){
                    case 'pattern': // Cycle pattern part (index), where sign indicates direction)  
                        this.state.selection.group[group].part[partId].series = cycleFromValue(this.schema.group[group].part[partId].series, this.state.selection.group[group].part[partId].series , Math.sign(directionIndex) )
                        sonification.state.userMessage.text = `${group}.${part} > Pattern change to #${this.state.selection.group[group].part[partId].series }`

                        if(this.param[group].part[partId].sound.code){ // UPdate sound params
                            const param = this.schema.pattern[group][partId].sound[this.state.selection.group[group].part[partId].series]
                            this.param[group].part[partId].sound.code     = param.code
                            this.param[group].part[partId].gain   = param.gain
                            sonification.state.userMessage.text = `${group}.${part} > ${param.label}`
                        }
                        break
                    case 'pitch':
                    case 'velocity':
                    default: // Cycle the group data
                        this.state.selection.group[group][`${type}Pattern`] = cycleFromValue(this.schema.group[group][type].series, this.state.selection.group[group][`${type}Pattern`] , directionIndex ) 
                        const label = sonification.data.schema.map?.series?.label[sonification.state.selection.group[group][`${sonification.schema.group[group].type}Pattern`]]?.label ?? param.label
                        sonification.state.userMessage.text = `${group} > ${label}`
                }
                /// ii. Handle user message
                sonification.handle.userMessage()
                // => Call update
                this.handle.update()
            },
            // Scene/scene (data) select             
            selectScene: (index) => {
                this.state.selection.sceneIndex = index
                this.handle.update()
            },
            cycleScene: (dataChange) => {
                // i. Update sceneIndex
                this.state.selection.sceneIndex =  cycleFromValue(this.schema.sceneIndex, this.state.selection.sceneIndex , dataChange)       
                /// ii. Handle user message
                sonification.state.userMessage.text = `> ${sonification.data.getSceneLabel(this.state.selection.sceneIndex)}`
                sonification.handle.userMessage()
                // => Update
                this.handle.update()
            },
            // Group selection and mixer levels
            selectGroupPart: (group, part, showMessage = true) => {
                // i. Select group and part
                const type = this.schema.group[group].type
                this.state.selection.group.active = group   

                if(part && type === 'pattern'){
                    this.state.selection.group[group].activePart = part   
                }

                /// ii. Handle user message
                if(showMessage){
                    sonification.state.userMessage.text =  group === 'master' ? `MIX selected`
                            : type === 'pitch' ? `Group ${group} selected` :  
                                ` Group ${group} - Part ${part} selected` 
                    sonification.handle.userMessage()
                }
            },
            cycleGroup: (groupChange) => {
                const groups = Object.keys(this.schema.group)
                const parts = Object.keys(this.state.selection.group.C.part)
                // Change part if in Group C
                if(this.state.selection.group.active === 'C' && groupChange > 0 && this.state.selection.group.C.activePart < 3){
                     this.state.selection.group.C.activePart++ 
                } else if (this.state.selection.group.active === 'C' && groupChange < 0 && this.state.selection.group.C.activePart > 1){
                     this.state.selection.group.C.activePart-- 
                } else { // Change group
                    this.state.selection.group.active = cycleFromValue(groups, this.state.selection.group.active , groupChange) 
                    this.state.selection.group.C.activePart = groupChange < 0 ? 3 : 1
                }                                        
            },
            // Mute/solo/gain levels
            toggleMute: ({group, part}) => {
                // i. Mute group or part
                const type = this.schema.group[group].type
                let muteState
                if(type === 'pattern'){  // a. Mute part (of group)
                    muteState = sonification.param[group].part[part].mute = !sonification.param[group].part[part].mute
                } else{                  // b. Mute group
                    muteState = sonification.param[group].mute = !sonification.param[group].mute 
                }

                // ii. Clear solo
                sonification.state.snapshot.solo.current = null

                // iii. Handle user message
                sonification.state.userMessage.text = type === 'pattern' ? `${muteState ? 'Muted' : 'Unmuted'} part ${group}-${part}` : `${muteState ? 'Muted' : 'Unmuted'} group ${group}`
                sonification.handle.userMessage()

                // => Update REPL
                sonification.handle.updateREPL(strudel.state.transport === "playing")
            },
            toggleSolo: ({group, part}) => {
                // 1. Check whether to solo or unsolo (restore)                
                const solo = !(sonification.state.snapshot.solo.current?.group === group && sonification.state.snapshot.solo.current?.part === part)

                // 2. Loop through each group
                Object.entries(sonification.schema.group).filter(d => d[0] !== 'master').forEach( ([g, d]) => {
                    // i. Check if group has parts
                    const parts = d.part ? Object.keys(d.part) : []

                    // ii. Store existing groups that are muted: only on first/non-consecutive solo
                    if(!sonification.state.snapshot.solo.current){
                        // a. Store reference to muted groups and parts
                        if(sonification.param[group]?.mute){
                            sonification.state.snapshot.solo.mutedPrior.push({ group: g })
                        }
                        parts.forEach( p => {
                            if(sonification.param[g].part[p].mute ){
                                sonification.state.snapshot.solo.mutedPrior.push({ group: g, part: p })
                            }
                        })
                    }

                    // iii. Toggle solo => TO ADD RESTORATION OF PRE SOLO STATE                   
                    sonification.param[g].mute = solo ? (g !== group) && parts.length === 0 : false                                      // Mute/unmute groups
                    parts.forEach( p =>  sonification.param[g].part[p].mute = solo ? (+p !== +part) : false )    // Mute/unmute  parts 
                })

                // 3. Store current solo
                sonification.state.snapshot.solo.current = solo ? {group, part} : null

                // 4. Handle user message
                const type = this.schema.group[group].type
                sonification.state.userMessage.text = type === 'pattern' ? `${solo ? 'Solo' : 'Unsolo'} group ${group} - part ${part}` : `${solo ? 'Solo' : 'Unsolo'} group ${group}`
                sonification.handle.userMessage()

                // => Update REPL
                sonification.handle.updateREPL(strudel.state.transport === "playing")
            },
            adjustGain(gainChange, group){
                // i. Calculate newGain clamped to min/max
                const minGain = 0, maxGain = 1
                const newGain = Math.min(Math.max(sonification.param[group].gain + gainChange, minGain), maxGain)

                // ii. Update param
                sonification.param[group].gain = newGain

                // iii. Handle user message
                sonification.state.userMessage.text = group ==='master' ? `Master volume = ${d3.format('.2f')(newGain * 10)}` : `Level for group ${group} = ${d3.format('.1f')(10*newGain)}`
                sonification.handle.userMessage()

                // => Update REPL
                this.updateREPL(strudel.state.transport === "playing")
            },
            resetGain: () => {
                // 1. Loop through each group and parts
                Object.entries(sonification.schema.group).filter(d => d[0] !== 'master').forEach( ([g, d]) => {
                    // i. Check if group has parts
                    const parts = d.part ? Object.keys(d.part) : [] 
                    // ii. Unmute all other groups
                    sonification.param[g].mute = false              
                     // iii. Unmute all other parts in group
                    parts.forEach( p =>  sonification.param[g].part[p].mute = false  )       
                })      

                // 2 .Clear solo
                sonification.state.snapshot.solo.current = null

                // 3. Handle user message
                sonification.state.userMessage.text = `Everything playing!`
                sonification.handle.userMessage()

                // => Update REPL
                sonification.handle.updateREPL(strudel.state.transport === "playing")
            },
            // Euclidean rhythm and pulse sequencer 
            adjustEuclideanRhythm(pulseChange, rotationChange, group, part){
                // 1. Check and return if on track with no euclidean rhythm on master group
                if(group === 'master') return 
                // 2. Update euclidean rhythm by group 'type' 
                const groupType = sonification.schema.group[group].type
                let patternLength, minPulse = 1, maxPulse, minRotation = 0, maxRotation
                switch(groupType){        
                    case 'pitch':
                    case 'velocity':
                        // i. Get pattern length and pulse/rotation range
                        patternLength = sonification.param[group].pitch.length
                        maxPulse      = patternLength
                        maxRotation   = patternLength - 1
                        // ii. Update pulse param
                        if(pulseChange !== 0){
                            sonification.param[group][groupType].pulse = Math.min(Math.max(sonification.param[group][groupType].pulse + pulseChange, minPulse), maxPulse)
                        }
                        // ii. Update rotation param
                        if(rotationChange !== 0){
                            sonification.param[group][groupType].rotation =  Math.min(Math.max(sonification.param[group][groupType].rotation + rotationChange, minRotation), maxRotation) 
                        }
                        // iii. Store euclidean array (for visualisation)
                        sonification.state.selection.group[group].euclideanArray = rotateArray(getPattern(sonification.param[group][groupType].pulse , patternLength ), sonification.param[group][groupType].rotation)
                        // iv. Switch off corresponding pulse sequencer: ensures euclidean rhythm is 'active'
                        sonification.state.sequencer[group].active  = false 
                        // v. Handle user message
                        sonification.state.userMessage.text = pulseChange ? `Group ${group} euclidean pulse is ${sonification.param[group][groupType].pulse}` :  `Group ${group} euclid. rotation is ${sonification.param[group][groupType].rotation}`


                        break

                    case 'pattern': // "Parts only"
                        // i. Get pattern length and pulse/rotation range
                        patternLength = sonification.param[group].part[part].sound.length
                        maxPulse      = patternLength
                        maxRotation   = patternLength - 1
                        // ii. Update pulse param
                        if(pulseChange !== 0){
                            sonification.param[group].part[part].sound.pulse = Math.min(Math.max(sonification.param[group].part[part].sound.pulse + pulseChange, minPulse), maxPulse)
                        }
                        // ii. Update rotation param
                        if(rotationChange !== 0){
                            sonification.param[group].part[part].sound.rotation =  Math.min(Math.max(sonification.param[group].part[part].sound.rotation + rotationChange, minRotation), maxRotation) 
                        }
                        // iii. Store euclidean array (for visualisation)
                        sonification.state.selection.group[group].part[part].euclideanArray = rotateArray(getPattern(sonification.param[group].part[part].sound.pulse , patternLength ), sonification.param[group].part[part].sound.rotation)
                        // iv. Switch off corresponding pulse sequencer: ensures euclidean rhythm is 'active'
                         sonification.state.sequencer[group][part].active  = false 
                        // iv. Handle user message
                        sonification.state.userMessage.text = pulseChange ? `Part ${group}.${part} euclidean pulse is ${sonification.param[group].part[part].sound.pulse}` :  `Group ${group} euclidean rotation is ${sonification.param[group].part[part].sound.rotation}`
                        break
                }
                // 3. Make euclidean rhythm 'active' by clearing the pulse sequencer
                sonification.state.sequencer[group].active = false
                sonification.state.sequencer[group].array = []
                // 4. Handle user message
                sonification.handle.userMessage()

                // => Evaluate strudel code
                this.updateREPL(strudel.state.transport === "playing")           
            }, 
            randomEuclideanRhythm(group, part, message = true, update = true, minPulse = 5, maxPulse = 15){
                // 1. Set clamping variables
                const patternLength = 16, 
                    minRotation = 0, maxRotation = 15
                const groupType = sonification.schema.group[group].type

                // 2. Generate random (clamped) pulse and rotation
                const newPulse =  Math.floor(Math.random() * (maxPulse - minPulse + 1)) + minPulse
                const newRotation =  Math.floor(Math.random() * (maxRotation - minRotation + 1)) + minRotation

                // 3. Update euclidean rhythm by group 'type' 
                switch(typeof part){  
                    case undefined:
                        // i. Update sonificaiton params for part
                        sonification.param[group].part[part].sound.pulse = newPulse
                        sonification.param[group].part[part].sound.rotation = newRotation
                        // ii. Store euclidean array (for visualisation)
                        sonification.state.selection.group[group].part[part].euclideanArray = rotateArray(getPattern(sonification.param[group].part[part].sound.pulse , patternLength ), sonification.param[group].part[part].sound.rotation)
                        // iii. Create user message
                        sonification.state.userMessage.text = `${group}.${part}> random rhythm!`
                        break
                    default:
                        // i. Update sonificaiton params for group
                        sonification.param[group][groupType].pulse = newPulse
                        sonification.param[group][groupType].rotation = newRotation
                        // iii. Store euclidean array (for visualisation)
                        sonification.state.selection.group[group].euclideanArray = rotateArray(getPattern(sonification.param[group][groupType].pulse , patternLength ), sonification.param[group][groupType].rotation)
                        // iii. Create user message
                        sonification.state.userMessage.text = `${group} > random rhythm!`
                }

                // 4. Handle user message
                if(message) sonification.handle.userMessage()

                // => Evaluate strudel code
                if(update) this.updateREPL(strudel.state.transport === "playing")       
            },
            toggleLegato(group){
                // i. Toggle euclidean legato for pitch groups
                const groupType = sonification.schema.group[group].type
                switch(groupType){        
                    case 'pitch':
                        sonification.param[group].pitch.legato = !sonification.param[group].pitch.legato
                        break
                }

                // ii. Handle user message
                sonification.state.userMessage.text = `Group ${group} legato notes ${sonification.param[group].pitch.legato ? 'on' : 'off'}`
                sonification.handle.userMessage()

                // => Evaluate strudel code
                this.updateREPL(strudel.state.transport === "playing")        
            },
            openPulseSequencer(group, type = 'pitch'){    // Potentially move to UI or have UI depend on state chang
                // i. Update state for pulse sequencer (UI)
                sonification.state.sequencer.ui.isOpen = true
                sonification.state.sequencer.ui.group = group
                sonification.state.sequencer[group].active = true 

                // ii. Init the pulse array and param (struct) with the current pulse array (if available) or the euclidean array 
                const arr = sonification.state.sequencer[group].array = sonification.state.sequencer[group].array.length === 0 ? sonification.state.selection.group[group].euclideanArray : sonification.state.sequencer[group].array
                sonification.param[group][type].struct = arr.map(n => n && 'x' || '-').join(' ')
                sonification.param[group][type].structLegato = legatoStruct(arr)

                // iii. Handle user message
                sonification.state.userMessage.text = `Opened pulse seq. ${group}`
                sonification.handle.userMessage()
            },
            closePulseSequencer(){    
                // i. Update state for pulse sequencer (UI)
                sonification.state.sequencer.ui.isOpen = false
                sonification.state.sequencer.ui.group  = undefined
            },
            updateSequencePulse(array, type ='pitch'){
                // i. Get active group and part
                const group = sonification.state.sequencer.ui.group 

                // ii. Update pulse rhythm to array
                sonification.state.sequencer[group].array = array 
                sonification.param[group][type].struct = array.map(n => n && 'x' || '-').join(' ')   
                sonification.param[group][type].structLegato = legatoStruct(array)

                // iii. Handle user message
                sonification.state.userMessage.text = `${group}> pulse seq. updated`
                sonification.handle.userMessage()

                // => Update strudel code
                this.updateREPL(strudel.state.transport === "playing")     
            },
            // Scale and transposition
            transposePattern: (degree, group) => {
                // i. Check for pitch group
                if(this.param[group]?.pitch?.scaleTranspose === undefined) return

                // ii. Update scaleTranspose
                this.param[group].pitch.scaleTranspose = degree

                // => Update REPL
                sonification.handle.updateREPL(strudel.state.transport === "playing")
            }, 
            transposePatternDegree: (direction, group) => {
                // i. Check for pitch group
                if(this.param[group]?.pitch?.scaleTranspose === undefined) return

                // ii. Update scaleTranspose
                const minDegree = 0, maxDegree = 14
                const newDegree = Math.min(Math.max(this.param[group].pitch.scaleTranspose + direction, minDegree), maxDegree)
                this.param[group].pitch.scaleTranspose = newDegree

                // iii. Handle user message
                sonification.state.userMessage.text = `Group ${group} transposed +${newDegree} deg.`
                sonification.handle.userMessage()

                // => Update REPL
                sonification.handle.updateREPL(strudel.state.transport === "playing")
            }, 
            cycleScaleRootPitch(direction){
                const rootPitches = ['C', 'D', 'E', 'F', 'G', 'A', 'B'] // Major key root notes
                // i. Update param
                sonification.param.global.scale.root = cycleFromValue(rootPitches,  sonification.param.global.scale.root, direction)                                          

                // ii. Handle user message
                sonification.state.userMessage.text = `Scale: ${sonification.param.global.scale.root}:${sonification.param.global.scale.type}`
                sonification.handle.userMessage()

                // => Update REPL
                this.updateREPL(strudel.state.transport === "playing")
            },
            cycleScaleType(direction){
                // i. Update param
                sonification.param.global.scale.type= cycleFromValue(Object.keys(musicalScales),  sonification.param.global.scale.type, direction)                                          

                // ii. Handle user message
                sonification.state.userMessage.text = `Scale: ${sonification.param.global.scale.root}:${sonification.param.global.scale.type}`
                sonification.handle.userMessage()

                // => Update REPL
                this.updateREPL(strudel.state.transport === "playing")
            },
            // Punch-in FX}
            punchInFX: function(group, name, setOn){
                // i. Return if transport is not playing, or if setOn is false and FX is already off
                if(strudel.state.transport !== 'playing' || ( setOn !== undefined && !setOn && !sonification.param[group].fx[name]) ) return

                // ii. Toggle if 'setOn' is undefined, otherwise set FX to setOn boolean
                sonification.param[group].fx[name] = setOn

                // iii. Handle user message
                const activeFX =  Object.keys(sonification.param[group].fx).filter(k => sonification.param[group].fx[k]) 
                sonification.state.userMessage.text = activeFX.length > 0 ?  group === 'master' ? `Master FX  x${activeFX.length}!!` : `Group ${group} FX x${activeFX.length}!!` : ''
                sonification.handle.userMessage()

                // => Update strudel code
                sonification.handle.updateREPL()
                console.log(`Punch-in ${name}|${group} is ${setOn}`)
            },
            // Misc
            chaos: (group) => {
                console.log("CONTROLLED CHAOS TBA")  
            }, 
            resetAll(){
                // Uunused
                console.log("RESET EVERYTHING")
            }, 
            // Guidance
            userMessage(){
                clearTimeout( sonification.state.userMessage.timeoutId )
                sonification.state.userMessage.timeoutId = setTimeout( () => sonification.state.userMessage.text = null, sonification.userMessageTimeout)
            },
            closeDisplayOverlay(){
                sonification.state.userMessage.overlay.isShown = false
            }
        }
    };

    // Placeholder methods: defined in extended DataSonification classes
    addCustomHandlers(){} 
    updateParameterMap(){} 
}