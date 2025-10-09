/**
 *  SONIFICATION CLASS 
 *  - Custom data load/parse and transformation: model, schema and output for strudel
 *  - Strudel 'code' template with parameters and data sonification input strings
 */

// Libs and utils
import * as d3                  from 'd3'
import { getPattern }           from 'euclidean-rhythms';
import { cycleFromValue, 
    rotateArray }               from '$lib/module/data-operator/core/js/utils';
// Classes
import { Sonification }         from '$lib/module/data-operator/core/js/Sonification.svelte';

// Config
import { paramInit }            from './parameter-map';
import { timingConfig }         from '$lib/module/data-operator/core/config/global/timing-config';


// => DataSonification class
export class DataSonification extends Sonification{

    ////////////////
    //// FIELDS ////
    ////////////////

    userMessageTimeout = 1500

    // state = $state()
    // mode  = $derived({})
    param = $state(paramInit)       // Loads the default template  

    // Custom song code: always derived from 'state' (Ui) and 'params' 
    // Strudel code derived from state and params
    code = $derived(`
        /* 
         @title Open Electricity Data Jam: ${d3.timeFormat("%d-%m-%y")(this.data.scene[this.state.selection.sceneIndex].day)}   
         @by Data Operator OE-10:DFAM
         @details Sonification of Open Electricity (NEM) data 
         @url https://data-operator.littlesketch.es
         @license CC BY-NC-SA
         */

        setcps(${this.param.global.bpm} / 60 / ${timingConfig.beats.perBar})

        stack(
            // GROUP A + B: DFAM-esque dual oscillator + noise 
            stack( 
                // Oscillator 1": pitch (optional)
                note("${this.param.A.pitch.pattern}"${this.param.synth.DFAM.vco1pitched ? `.scale("${this.param.global.scale.root}0:${this.param.global.scale.type}")` : ""})                   
                    .s("${this.param.synth.DFAM.vco1wave}")
                    .gain("${this.param.B.velocity.pattern}".mul("0.5").add("0.5").mul("${this.param.A.mute ? 0: this.param.A.gain }"))
                    .penv("${this.param.synth.DFAM.vcoMax}").pcurve("1")  
                    .pdecay("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcoDecay}").mul("${this.param.synth.DFAM.vco1EG}"))
                , 
                // Oscillator 2" pitch+transposed (optional)
                note("${this.param.A.pitch.pattern}"${this.param.synth.DFAM.vco2pitched ? `.scale("${this.param.global.scale.root}0:${this.param.global.scale.type}")` : ""}.add(${this.param.A.pitch.transpose}))                   
                    .s("${this.param.synth.DFAM.vco2wave}")
                    .gain("${this.param.B.velocity.pattern}".mul("0.5").add("2").mul("${this.param.B.mute ? 0: this.param.B.gain }"))
                    .penv("${this.param.synth.DFAM.vcoMax}").pcurve("1")  
                    .pdecay("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcoDecay}").mul("${this.param.synth.DFAM.vco2EG}"))
                    .vib("${this.param.A.pitch.pattern}".scale("${this.param.global.scale.root}0:${this.param.global.scale.type}")${(this.param.synth.DFAM.vco1pitched && this.param.synth.DFAM.vco2pitched) ? `.mul("${this.param.synth.DFAM.FM1_2Amt}")` : ""})
                ,
                // Noise
                s("${this.param.synth.DFAM.noiseType}")
                    .gain("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.noiseLvl}").mul(${this.param.A.mute ? 0: this.param.A.gain }))
                )
                .slow(${this.param.A.pitch.clockDivider})                
                ${ this.param.synth.DFAM.duck ? `.orbit("${this.param.synth.DFAM.orbit}")` : ''}
                ${this.state.sequencer.A.active ? `.struct("${this.param.A.pitch.legato ? this.param.A.pitch.structLegato : this.param.A.pitch.struct}")` 
                    : this.param.A.pitch.legato ? `.euclidLegatoRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})` : `.euclidRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})`}  
                .attack("${this.param.synth.DFAM.vcaAttack}")
                .decay("${this.param.synth.DFAM.vcaDecay}".mul("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcaEG}")))
                .sustain("${this.param.synth.DFAM.vcaSustain}")
                .release("${this.param.synth.DFAM.vcaRelease}")     
                .lpf("${this.param.synth.DFAM.vcfCutoff}").ftype("ladder")
                .lpq("${this.param.synth.DFAM.vcfResonance}")
                .lpe("${this.param.synth.DFAM.vcfEnv}").lps("0")
                .lpd("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcfDecay}").mul("${this.param.synth.DFAM.vcfEG}"))
                .swingBy(${this.param.A.swing.level}, 8) 
                .delay(0.5).delayfb(0.5)
                ${this.param.A.fx.juxRev       ? `${this.param.global.fx.juxRev}.gain(${this.param.A.gain * 0.75})` : ''}
                ${this.param.A.fx.juxPress     ? `${this.param.global.fx.juxPress}.gain(${this.param.A.gain * 0.75})` : ''}
                ${this.param.A.fx.crusher      ? this.param.global.fx.crusher : ''}
                ${this.param.A.fx.distortion   ? this.param.global.fx.distortion  : ''}
                ${this.param.A.fx.vibrato      ? this.param.global.fx.vibrato  : ''}
                ${this.param.A.fx.phaser       ? this.param.global.fx.phaser  : ''}
                ${this.param.A.fx.panner       ? this.param.global.fx.panner  : ''}
                ${this.param.A.fx.delay        ? this.param.global.fx.delay  : ''}
                ${this.param.A.fx.filterLP     ? this.param.global.fx.filterLP  : ''}
                ${this.param.A.fx.filterHP     ? this.param.global.fx.filterHP  : ''}
                ${this.param.A.fx.reverb       ? `.room(1).rsize("${this.param.master.reverb.size * 3}".mul(4)).rfade("${this.param.master.reverb.size}".div(10)).roomdim("${this.param.master.reverb.size}".mul(2))` : ''}  
                ${this.param.A.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
                ${this.param.A.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}    
                .color("${this.param.visual.color.A}")
            ,         

            // Group C. "percussion" sounds
            stack( // Beat: "ducked" part
                s("${this.param.C.part["1"].sound.pattern.ducked}").bank("${this.param.C.part["1"].sound.bank}")
                    ${this.param.synth.DFAM.duck  ? `.duckorbit(2).duckattack(0.1).duckdepth(1)` : ''}
                    .slow(${this.param.C.part["1"].sound.clockDivider})                
                    ${this.param.C.part["1"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["1"].gain * this.param.C.gain})`}
                    .delay(0.25).delayfb(0.5) 
                // Beat: "nomrmal" part
                ${this.param.C.part["1"].sound.pattern.normal ? `,
                    s("${this.param.C.part["1"].sound.pattern.normal}").bank("${this.param.C.part["1"].sound.bank}")
                    ${this.param.C.part["1"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["1"].gain * this.param.C.gain})`}
                `: ''}
                , // Hats
                s("${this.param.C.part["2"].sound.pattern}").bank("${this.param.C.part["2"].sound.bank}")  
                    .velocity(perlin.range(.5, 0.75))
                    .euclidRot(${this.param.C.part["2"].sound.pulse}, ${this.param.C.part["2"].sound.length}, ${this.param.C.part["2"].sound.rotation})  
                    .slow(${this.param.C.part["2"].sound.clockDivider})                
                    ${this.param.C.part["2"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["2"].gain * this.param.C.gain})`} 
                , // Part 3: Harmony: sampled chord
                n(${ this.param.C.part["3"].sound.pattern }) 
                    .scale("${this.param.global.scale.root}${this.param.C.part["3"].octave}:${this.param.global.scale.type}")     
                    .slow(${this.param.C.part["3"].sound.clockDivider})                
                    ${this.param.C.part["3"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["3"].gain * this.param.C.gain})`}  
                    ${this.param.C.part["3"].sound.code}
            )
            .color("${this.param.visual.color.C}")
            .swingBy(${this.param.C.swing.level}, 8)  
            ${this.param.C.fx.juxRev       ?`${this.param.global.fx.juxRev}.gain(${this.param.C.gain * 0.75})` : ''}
            ${this.param.C.fx.crusher      ? this.param.global.fx.crusher : ''}
            ${this.param.C.fx.distortion   ? this.param.global.fx.distortion  : ''}
            ${this.param.C.fx.vibrato      ? this.param.global.fx.vibrato  : ''}
            ${this.param.C.fx.phaser       ? this.param.global.fx.phaser  : ''}
            ${this.param.C.fx.delay        ? this.param.global.fx.delay  : ''}
            ${this.param.C.fx.filterLP     ? this.param.global.fx.filterLP  : ''}
            ${this.param.C.fx.filterHP     ? this.param.global.fx.filterHP  : ''}
            ${this.param.C.fx.reverb       ? `.room(1).rsize("${this.param.master.reverb.size * 3}".mul(4)).rfade("${this.param.master.reverb.size}".div(10)).roomdim("${this.param.master.reverb.size}".mul(2))` : ''}  
            ${this.param.C.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
            ${this.param.C.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}                
        )
        // Master output
        .postgain(${(!this.param.A.fx.distortion && !this.param.C.fx.distortion && !this.param.master.fx.distortion) ? this.param.master.gain : this.param.global.fx.distortionPost })
        ${this.param.master.fx.juxRev       ? this.param.global.fx.juxRev : ''}
        ${this.param.master.fx.juxPress     ? this.param.global.fx.juxPress : ''}
        ${this.param.master.fx.crusher      ? this.param.global.fx.crusher : ''}
        ${this.param.master.fx.distortion   ? this.param.global.fx.distortion  : ''}
        ${this.param.master.fx.vibrato      ? this.param.global.fx.vibrato  : ''}
        ${this.param.master.fx.panner       ? this.param.global.fx.panner  : ''}
        ${this.param.master.fx.phaser       ? this.param.global.fx.phaser  : ''}
        ${this.param.master.fx.delay        ? this.param.global.fx.delay  : ''}
        ${this.param.master.fx.filterLP     ? this.param.global.fx.filterLP  : ''}
        ${this.param.master.fx.filterHP     ? this.param.global.fx.filterHP  : ''}
        ${this.param.master.fx.reverb       ? `.room(1).rsize("${this.param.master.reverb.size * 3}".mul(4)).rfade("${this.param.master.reverb.size}".div(10)).roomdim("${this.param.master.reverb.size}".mul(2))`
            : (!this.param.A.fx.reverb && !this.param.B.fx.reverb &&!this.param.C.fx.reverb) ? `.room(1).rsize("${this.param.master.reverb.size}".mul(4)).rfade("${this.param.master.reverb.size}".div(10)).roomdim("${this.param.master.reverb.size}".mul(2))` : ''}  
        ${this.param.master.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
        ${this.param.master.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}                                                     
        ${!this.state.isMobile              ? this.param.visual.type.scope : ''}   
    `
    )

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app, dataModel, config){
        super()

        // Store module reference
        this.app    = app
        this.data   = dataModel

        // Add state
        this.state.selection.group.B.chart = 'velocity'

        // Add schema
        this.schema.group       = config.group,
        this.schema.pattern     = { C: config.preset.C }
        this.schema.sceneIndex  = this.data.schema.list.dayIndex

        // Update to match data selection
        this.initParam(config.fx)
        this.updateParameterMap(true)
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    addCustomHandlers(){
        const sonification = this

        // DFAM
        this.handle.toggleOscPitch = (oscNo) => {
            // 1. Toggle pitch sync
            this.param.synth.DFAM[`osc${oscNo}pitched`] = !this.param.synth.DFAM[`osc${oscNo}pitched`]
            // 2. Handle user message
            this.state.userMessage.text = `Oscillator #${oscNo} pitch sync ${this.param.synth.DFAM[`osc${oscNo}pitched`]? 'on' : 'off'}`
            this.handle.userMessage()
            console.log(oscNo, this.param.synth.DFAM[`osc${oscNo}pitched`] )
            // => Call update
            this.handle.update()
        }

        this.handle.cycleOscType = (oscNo) => {
            // 1. Cycle oscillator type
            const types = ['square', 'triangle']
            this.param.synth.DFAM[`vco${oscNo}wave`] = cycleFromValue(types, this.param.synth.DFAM[`vco${oscNo}wave`], 1)
            // 2. Handle user message
            this.state.userMessage.text = `Osc. #${oscNo} changed to ${this.param.synth.DFAM[`vco${oscNo}wave`]}`
            this.handle.userMessage()
            // => Call update
            this.handle.update()
        }

        this.handle.cycleNoiseType = () => {
            // 1. Cycle oscillator type
            const types = ['white', 'pink', 'brown']
            this.param.synth.DFAM.noiseType = cycleFromValue(types, this.param.synth.DFAM.noiseType, 1)
            // 2. Handle user message
            this.state.userMessage.text = `Noise type changed to ${this.param.synth.DFAM.noiseType}`
            this.handle.userMessage()
            // => Call update
            this.handle.update()
        }

        this.handle.adjustNoiseLevel = (gainChange) => {
            // 1. Calculate newGain clamped to min/max
            const minGain = 0, maxGain = 1
            const newGain = Math.min(Math.max( this.param.synth.DFAM.noiseLvl + gainChange, minGain), maxGain)
            // 2. Update param
            this.param.synth.DFAM.noiseLvl = newGain
            // 3. Handle user message
            this.state.userMessage.text = `Noise level changed to ${d3.format('.2f')(this.param.synth.DFAM.noiseLvl)}`
            this.handle.userMessage()
            // => Call update
            this.handle.update()
        }

        this.handle.toggleSidechain = () => {
            // 1. Update orbt (toggle between 1 and 2)
            this.param.synth.DFAM.duck = !this.param.synth.DFAM.duck

            // 2. Handle user message
            this.state.userMessage.text = `Ducking is ${this.param.synth.DFAM.orbit === 1 ? 'off' : 'on' }`
            this.handle.userMessage()
            // => Call update
            this.handle.update()
        }
    }

    updateParameterMap(init = false){
        /**
         *  I. ON INIT ACTIONS
         */
        if(init){
            // i. Set default pattern selections
            this.state.selection.group.A.pitchPattern    = this.schema.group.A.pitch.series[0]
            this.state.selection.group.B.velocityPattern = this.schema.group.B.velocity.series[0]

            // ii. Set euclidean array (stored for visual and updated manually in adjustEuclideanRhythm
            this.state.selection.group.A.euclideanArray = rotateArray(getPattern(this.param.A.pitch.pulse, this.param.A.pitch.length), this.param.A.pitch.rotation)
            this.state.selection.group.C.part["1"].euclideanArray = rotateArray(getPattern(this.param.C.part["1"].sound.pulse, this.param.C.part["1"].sound.length), this.param.C.part["1"].sound.rotation)
            this.state.selection.group.C.part["2"].euclideanArray = rotateArray(getPattern(this.param.C.part["2"].sound.pulse, this.param.C.part["2"].sound.length), this.param.C.part["2"].sound.rotation)
        }


        /**
         *  II. Set of manual update methods to turns data selections into 'param' updates => (reactive) code   
         */ 

        // Data selected and reference variables
        const sceneData       = this.data.scene[this.state.selection.sceneIndex],
            scaleLock       = this.state.selection.scaleLock ? 'quantized' : 'value',
            group = {
                A: {
                    pitch: {
                        interval:   this.schema.group.A.pitch.interval,          // Static/config interval
                        series:     this.state.selection.group.A.pitchPattern,
                    }
                },
                B: {
                    velocity: {
                        interval:   this.schema.group.B.velocity.interval,          // Static/config interval
                        series:     this.state.selection.group.B.velocityPattern,
                    }
                },
                C:  this.schema.pattern.C    //  Percussion part presets           
            }

        /**
         *  GROUP A: Lead resonant FM linked "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = sceneData.scaledData[group.A.pitch.interval].A.pitch[group.A.pitch.series].map(d => d.quantized)
        this.param.A.pitch.pattern  = `${JSON.stringify(group.A.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        /**
         *  GROUP B: Percussive "bass + noise" synth
         */ 

        // i. Pitch: constructed from selected data => update params
        group.B.velocity.array = sceneData.scaledData[group.B.velocity.interval].B.velocity[group.B.velocity.series].map(d => d.value )
        this.param.B.velocity.pattern  = `${JSON.stringify(group.B.velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.velocity.length}`


        /**
         *  GROUP C. Pattern "percussion" parts
         */ 

        // Part 1. Beat pattern: "membrane" percussion
        // i. Update pattern params for 'ducked' and normal components
        if(group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.ducked){
            this.param.C.part["1"].sound.pattern.ducked =  group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.ducked
        }
        if(group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.normal){
            this.param.C.part["1"].sound.pattern.normal =  group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern?.normal
        }

        // Part 2. Hats pattern: "metal" percussion
        // i. Update pattern params
        this.param.C.part["2"].sound.pattern = group.C["2"].sound?.[this.state.selection.group.C.part["2"].series].pattern

        // Part 3. Chord progression notes and params
        group.C["3"].interval = "4n"
        group.C["3"].series   = this.state.selection.group.A.pitchPattern
        group.C["3"].array    = sceneData.scaledData[group.C["3"].interval].C["3"].chord[group.C["3"].series]
                                    .map(d => d.quantized)
                                    .map( d => group.C["3"].chord[d])

        this.param.C.part["3"].sound.pattern = `"<${group.C["3"].array.map(s => s.replace(/^'|'$/g, "")).join(" ")}>"`

        const c3 = group.C["3"].sound[this.state.selection.group.C.part["3"].series]
        this.param.C.part["3"].sound.length = group.C["3"].array.length
        this.param.C.part["3"].sound.sample = c3.name
        this.param.C.part["3"].sound.modifier = c3.modifier
        this.param.C.part["3"].gain = c3.gain
        console.log('--UPDATE PARAM MAP')
    };

}