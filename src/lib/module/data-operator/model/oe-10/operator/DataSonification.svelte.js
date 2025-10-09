/**
 *  OE-10 DATA SONIFICATION CLASS 
 *  - Custom data load/parse and transformation: model, schema and output for strudel
 *  - Strudel 'code' template with parameters and data sonification input strings
 */
// Libs and utils
import * as d3                      from 'd3'
import { getPattern}                from 'euclidean-rhythms';
import { cycleFromValue, 
    rotateArray }                   from '$lib/module/data-operator/core/js/utils';

// Classes
import { Sonification }             from '$lib/module/data-operator/core/js/Sonification.svelte';

// Config
import { timingConfig }             from '$lib/module/data-operator/core/config/global/timing-config';
import { musicalScales }            from '$lib/module/data-operator/core/config/global/music-scale-config';
import { paramInit }                from './parameter-map';


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
         @by Data Operator OE-10
         @details Sonification of Open Electricity (NEM) data 
         @url https://data-operator.littlesketch.es
         @license CC BY-NC-SA
         */
               
        setcpm(${this.param.global.bpm / timingConfig.beats.perBar})

        stack(
            // Group A. "303-esque synth"
            n("${this.param.A.pitch.pattern}")      // Data for "${this.state.selection.group.A.pitchPattern}" scaled to pitch 
                .scale("${this.param.global.scale.root}${this.param.A.octave}:${this.param.global.scale.type}")            
                .scaleTranspose(${this.param.A.pitch.scaleTranspose})
                ${this.state.sequencer.A.active ? `.struct("${this.param.A.pitch.legato ? this.param.A.pitch.structLegato : this.param.A.pitch.struct}")` 
                    : this.param.A.pitch.legato ? `.euclidLegatoRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})` : `.euclidRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})`  }             
                .slow(${this.param.A.pitch.clockDivider})                
                .s("${this.param.synth.TB303.oscType}")               // Sound source
                .velocity("${this.param.A.velocity.pattern}")
                .adsr("0.01:0.1:0.8:0.5")                             // Amp envelope (ADSR)
                .lpf(${this.param.synth.TB303.filter.cutoff})         // LPF cutoff follows sine wave whose range is determined by "${this.state.selection.group.A.pitchPattern}" data at "4n" intervals
                .lpq(${this.param.synth.TB303.filter.Q})              // LPF resonance
                .ftype("24db")                                        // LPF type
                .lpenv(${this.param.synth.TB303.filter.env.depth})    // filter env: modulation depth
                .lpa(${this.param.synth.TB303.filter.env.A})          // filter env attack
                .lpd(${this.param.synth.TB303.filter.env.D})          // filter env decay
                .lps(${this.param.synth.TB303.filter.env.S})          // filter env sustain
                .swingBy(${this.param.A.swing.level}, 8)              // - swing applied on 1/8 notes
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
                ${this.param.A.fx.reverb       ? `.room(${this.param.master.reverb.size * 3})` : ''}  
                ${this.param.A.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
                ${this.param.A.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}    
                ${this.param.A.mute            ? this.param.global.fx.mute : `.gain(${this.param.A.gain})`}  
                .color("${this.param.visual.color.A}")
            ,
            // Group B. "Moog-ish bass" 
            stack(  
                n("${this.param.B.pitch.pattern}")      // Data for "${this.state.selection.group.B.pitchPattern}" scaled to pitch 
                    .layer(
                        x=>x.s("sawtooth").vib(4),
                        x=>x.s("square").add(note(-12))
                    )
                    .scale("${this.param.global.scale.root}${this.param.global.scale.octave}:${this.param.global.scale.type}")      
                    .transpose(${this.param.B.pitch.transpose})             // "Global" Scale transposed                   
                    .scaleTranspose(${this.param.B.pitch.scaleTranspose})
                    .adsr("0.0:0.1:0.8:0.5")         
                ,
                n("${this.param.B.pitch.pattern}")      
                    .velocity("${this.param.synth.ModelD.noise.velocity}")
                    .s("white") 
                    .adsr("0.01:1:0:0")   
            )
            ${this.state.sequencer.B.active ? `.struct("${this.param.B.pitch.legato ? this.param.B.pitch.structLegato : this.param.B.pitch.struct}")`
                : this.param.B.pitch.legato ? `.euclidLegatoRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})` : `.euclidRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})`}
            .slow(${this.param.B.pitch.clockDivider})    
            .ftype("ladder")
            .lpf(440)
            .lpenv(3)
            .swingBy(${this.param.B.swing.level}, 8)          // - swing applied on 1/8 notes
            ${this.param.B.fx.juxRev       ?`${this.param.global.fx.juxRev}.gain(${this.param.B.gain * 0.75})` : ''}
            ${this.param.B.fx.crusher      ? this.param.global.fx.crusher : ''}
            ${this.param.B.fx.distortion   ? this.param.global.fx.distortion  : ''}
            ${this.param.B.fx.vibrato      ? this.param.global.fx.vibrato  : ''}
            ${this.param.B.fx.phaser       ? this.param.global.fx.phaser  : ''}
            ${this.param.B.fx.delay        ? this.param.global.fx.delay  : ''}
            ${this.param.B.fx.filterLP     ? this.param.global.fx.filterLP  : ''}
            ${this.param.B.fx.filterHP     ? this.param.global.fx.filterHP  : ''}
            ${this.param.B.fx.reverb       ? `.room(${this.param.master.reverb.size * 3})` : ''}  
            ${this.param.B.mute            ? this.param.global.fx.mute : `.gain(${this.param.B.gain})`}  
            ${this.param.B.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
            ${this.param.B.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}    
            .color("${this.param.visual.color.B}")
            ,
            // Group C.
            stack( // Part 1: Membrane percussion sounds
                s("${this.param.C.part["1"].sound.pattern}").bank("${this.param.C.part["1"].sound.bank}")  // Beat
                    .slow(${this.param.C.part["1"].sound.clockDivider})                
                    ${this.param.C.part["1"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["1"].gain * this.param.C.gain})`}  
                ,  // Part 2: Metal and misc percussion sounds
                s("${this.param.C.part["2"].sound.pattern}").bank("${this.param.C.part["2"].sound.bank}")   // Hats
                    .velocity(perlin.range(.5, 0.75))
                    .euclidRot(${this.param.C.part["2"].sound.pulse}, ${this.param.C.part["2"].sound.length}, ${this.param.C.part["2"].sound.rotation})   // Euclidean pulse
                    .slow(${this.param.C.part["2"].sound.clockDivider})    
                    ${this.param.C.part["2"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["2"].gain * this.param.C.gain})`}                     
                , // Part 3: Harmony: sampled chord
                n(${ this.param.C.part["3"].sound.pattern }) // I IV V VI
                    .scale("${this.param.global.scale.root}${this.param.C.part["3"].octave}:${this.param.global.scale.type}")     
                    .slow(${this.param.C.part["3"].sound.clockDivider})       
                    ${this.param.C.part["3"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["3"].gain * this.param.C.gain})`}  
                    ${this.param.C.part["3"].sound.code}
            )
            .color("${this.param.visual.color.C}")
            .swingBy(${this.param.C.swing.level}, 8)          // - swing applied on 1/8 pitchs
            ${this.param.C.fx.juxRev       ?`${this.param.global.fx.juxRev}.gain(${this.param.C.gain * 0.75})` : ''}
            ${this.param.C.fx.crusher      ? this.param.global.fx.crusher : ''}
            ${this.param.C.fx.distortion   ? this.param.global.fx.distortion  : ''}
            ${this.param.C.fx.vibrato      ? this.param.global.fx.vibrato  : ''}
            ${this.param.C.fx.phaser       ? this.param.global.fx.phaser  : ''}
            ${this.param.C.fx.delay        ? this.param.global.fx.delay  : ''}
            ${this.param.C.fx.filterLP     ? this.param.global.fx.filterLP  : ''}
            ${this.param.C.fx.filterHP     ? this.param.global.fx.filterHP  : ''}
            ${this.param.C.fx.reverb       ? `.room(${this.param.master.reverb.size * 3})` : ''}  
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
        ${this.param.master.fx.reverb       ? `.room(${this.param.master.reverb.size * 3})` : (!this.param.A.fx.reverb && !this.param.C.fx.reverb) ? `.room(${this.param.master.reverb.size})` : ''}  
        ${this.param.master.fx.halfTime     ? this.param.global.fx.halfTime  : ''}
        ${this.param.master.fx.doubleTime   ? this.param.global.fx.doubleTime  : ''}     
        ${!this.state.isMobile              ? this.param.visual.type.scope : ''}                                       // Strudel visualisation
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

        // Add model-specific config to schema
        this.schema.group       = config.group,
        this.schema.pattern     = { C: config.preset.C }
        this.schema.sceneIndex  = this.data.schema.list.dayIndex

        // Update params with model group and FX config to match data selection
        this.initParam(config.fx)
        this.updateParameterMap(true)
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////


    updateParameterMap(init = false){
        /**
         *  I. ON INIT ACTIONS
         */
        if(init){
            // i. Set default pattern selections
            this.state.selection.group.A.pitchPattern = this.schema.group.A.pitch.series[0]
            this.state.selection.group.B.pitchPattern = this.schema.group.B.pitch.series[0]

            // i. Update euclidean array (stored for visual and updated manually in adjustEuclideanRhythm
            this.state.selection.group.A.euclideanArray = rotateArray(getPattern(this.param.A.pitch.pulse, this.param.A.pitch.length), this.param.A.pitch.rotation)
            this.state.selection.group.B.euclideanArray = rotateArray(getPattern(this.param.B.pitch.pulse, this.param.B.pitch.length), this.param.B.pitch.rotation)
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
                        interval:   this.schema.group.A.pitch.interval,          
                        series:     this.state.selection.group.A.pitchPattern,
                    }, 
                    velocity: {
                        interval:   this.schema.group.A.velocity.interval,         
                        series:     this.state.selection.group.A.pitchPattern,
                    }, 
                    lpf: {
                        interval:   '4n',               // Fix
                        series:     this.state.selection.group.A.pitchPattern,    // Tied to pitch pattern 
                    },
                    lpq: {
                        interval:   '4n',               // Static/config interval
                        series:     this.state.selection.group.A.pitchPattern,     // Tied to pitch pattern 
                    }
                },
                B: {
                    pitch: {
                        interval:   this.schema.group.B.pitch.interval,          // Static/config interval
                        series:     this.state.selection.group.B.pitchPattern,
                    }, 
                    noise: {
                        interval:   this.schema.group.B.pitch.interval,          // Follows pitch
                        series:     this.state.selection.group.B.pitchPattern,          // Static/config interval

                    }
                },
                C:  this.schema.pattern.C    //  Percussion and chord part presets           
            }

        /**
         *  GROUP A: Melodic "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = sceneData.scaledData[group.A.pitch.interval].A.pitch[group.A.pitch.series].map(d => { return d[scaleLock]})
        this.param.A.pitch.pattern  = `${JSON.stringify(group.A.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        // ii. Velocity: constructed from selected data => update params
        group.A.velocity.array = sceneData.scaledData[group.A.velocity.interval].A.velocity[group.A.velocity.series].map(d => { return d.value})
        this.param.A.velocity.pattern  = `${JSON.stringify(group.A.velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        // iii. Filter cutoff:  constructed from selected data => update params: set for change on 4n
        group.A.lpf.array = sceneData.scaledData[group.A.lpf.interval].A.lpf[group.A.lpf.series].map(d => Math.round(d.value))
        const cutoffRangeString     = `"[${rotateArray(group.A.lpf.array, 1).join(" ") }]", "[${group.A.lpf.array.join(" ")}]"`
        this.param.synth.TB303.filter.cutoff = `sine.range(${cutoffRangeString}).slow(4)`

        // iii. Filter resonance:  constructed from selected data => update params: set for change on 2n
        group.A.lpq.array = sceneData.scaledData[group.A.lpq.interval].A.lpq[group.A.lpq.series].map(d => d.value)
        const resonanceRangeString     = `"[${rotateArray(group.A.lpq.array, 1).join(" ") }]", "[${group.A.lpq.array.join(" ")}]"`
        this.param.synth.TB303.filter.resonance = `sine.range(${resonanceRangeString}).slow(8)`


        /**
         *  GROUP B: Melodic "bass"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.B.pitch.array         = sceneData.scaledData[group.B.pitch.interval].B.pitch[group.B.pitch.series].map(d => d[scaleLock])
        this.param.B.pitch.pattern  = `${JSON.stringify(group.B.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.pitch.length}`

        // ii. Noise part level "velocity": constructed from data 
        const noiseRange = 1 ?? sceneData.scaledData["1m"].B.noise[0][group.B.noise.series].value
        group.B.noise.array         = sceneData.scaledData[group.B.noise.interval].B.noise[group.B.noise.series].map(d => d.value * noiseRange)
        this.param.synth.ModelD.noise.velocity  = `${JSON.stringify(group.B.noise.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.pitch.length}`

        /**
         *  GROUP C. Pattern "percussion" parts
         */ 

        // Part 1. Beat pattern: "membrane" percussion
        // i. Update pattern params
        this.param.C.part["1"].sound.pattern = group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern

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
        this.param.C.part["3"].sound.code = c3.code
        this.param.C.part["3"].gain = c3.gain


        console.log('--UPDATE PARAM MAP', {sceneData},)
    };
}