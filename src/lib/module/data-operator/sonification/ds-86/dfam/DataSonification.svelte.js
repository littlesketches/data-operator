/**
 *  SONIFICATION CLASS 
 *  - Custom data load/parse and transformation: model, schema and output for strudel
 *  - Strudel 'code' template with parameters and data sonification input strings
 */

// Libs and utils
import * as d3              from 'd3'
import { getPattern }       from 'euclidean-rhythms';
import { util  }            from '$lib/module/data-operator/core/js/utils';
// Classes
import { Sonification }     from '$lib/module/data-operator/core/js/Sonification.svelte';

// Config
import { paramInit }        from './parameter-map';
import { musicalScale }     from '$lib/module/data-operator/core/config/global/music-scale-config';
import { timingConfig }     from '$lib/module/data-operator/core/config/global/timing-config';

// Private variables
let group


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
         @title IDMC Data Jam: ${this.data.getSceneLabel(this.state.selection.sceneIndex)} 
         @by Data Operator DS-86:DFAM
         @details Sonification of Internal Displacement Monitoring Centre (IDMC) data ${d3.min(this.data.schema.list.availableYears)}-${d3.max(this.data.schema.list.availableYears)}
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
                ${this.state.sequencer.A.active ? `.struct("${this.param.A.pitch.legato ?  this.param.A.pitch.structLegato !== "" ?this.param.A.pitch.structLegato :  this.param.A.pitch.struct  : this.param.A.pitch.struct}")` 
                    : this.param.A.pitch.legato ? `.euclidLegato(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length})` : `.euclid(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}`}  
                .attack("${this.param.synth.DFAM.vcaAttack}")
                .decay("${this.param.synth.DFAM.vcaDecay}".mul("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcaEG}")))
                .sustain("${this.param.synth.DFAM.vcaSustain}")
                .release("${this.param.synth.DFAM.vcaRelease}")     
                .lpf(${this.param.synth.DFAM.vcfCutoff}).ftype("ladder")
                .lpq(${this.param.synth.DFAM.vcfResonance})
                .lpe("${this.param.synth.DFAM.vcfEnv}").lps("0")
                .lpd("${this.param.B.velocity.pattern}".mul("${this.param.synth.DFAM.vcfDecay}").mul("${this.param.synth.DFAM.vcfEG}"))
                .swingBy(${this.param.A.swing.level}, 8) 
                .delay(0.25).delayfb(0.5)
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
                    .velocity("${this.param.C.part["2"].velocity.pattern }")    // Velocity mapped to scaled date for "${this.state.selection.group.A.pitchPattern}" at "${this.schema.group.A.map.pitch.interval}" intervals
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

        // Add schema
        this.schema.group       = config.group,
        this.schema.pattern     = { C: config.preset.C }
        this.schema.sceneIndex  = this.data.schema.list.countryCodes.map((d, i) => i)

        // Add state
        this.state.selection.sceneIndex     = util.randomItem(this.schema.sceneIndex)       // Randomise scene
        this.state.selection.group.B.chart  = 'velocity'
        this.state.selection.group.global.scale.notes = musicalScale[this.param.global.scale.type].notes
        this.state.sequencer.A.onDelta      = true  // i. Apply the onDelta pulse for A and B as the default



        // Update to match data selection
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

        // a. On init setup
        if(init){
            // i. Set default pattern selections
            this.state.selection.group.A.pitchPattern    = util.randomItem(this.schema.group.A.series)
            this.state.selection.group.B.velocityPattern = util.randomItem(this.schema.group.B.series)
            // ii. Init group object
            group = this.mapHelper.initGroupConfig()

            // iv. Set euclidean array (stored for visual and updated manually in adjustEuclideanRhythm
            this.mapHelper.setEuclideanArray()
        }

        // b. Selection and reference variables
        const { sceneData, pitchScale, scaleLock } = this.mapHelper.getDataVariables()
        
        /**
         *  II. UPDATE + CUSTOM DATA SERIES MAPPING  
         */ 

        // i. Selection and reference variables
        this.mapHelper.updateGroupPitch(group)
        group.C["3"].chord.series = group.A.pitch.series 
        group.C["2"].velocity.series =  group.B.velocity.series = this.state.selection.group.B.velocityPattern

        /**
         *  GROUP A: Lead resonant FM linked "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = sceneData.scaledData[group.A.pitch.interval].A[pitchScale][group.A.pitch.series].map(d => d.quantized)

        this.param.A.pitch.pattern  = `${JSON.stringify(group.A.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        if(this.state.sequencer.A.onDelta){  // Create a custom onchange pulse pattern for A
            this.state.sequencer.A.active   = true 
            this.state.sequencer.A.array    = util.deltaArray( group.A.pitch.array)
            this.param.A.pitch.struct       = this.state.sequencer.A.array.map(n => n && 'x' || '-').join(' ')   
            this.param.A.pitch.structLegato = util.legatoStruct(this.state.sequencer.A.array )
        }

        // ii. LPF cutoff: 
        group.A.lpf.array  = sceneData.scaledData[group.A.lpf.interval].A.lpf[group.A.pitch.series].map(d => d.value)
        this.param.A.lpf.pattern  = `${JSON.stringify(group.A.lpf.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.lpf.length}`

        const cutoffRangeString     = `"[${util.rotateArray(group.A.lpf.array, 1).join(" ") }]", "[${group.A.lpf.array.join(" ")}]"`
        this.param.synth.DFAM.vcfCutoff = `sine.range(${cutoffRangeString}).slow(4)`

        // iii. LPF resonance
        group.A.lpq.array  = sceneData.scaledData[group.A.lpq.interval].A.lpq[group.A.lpq.series].map(d => d.value)
        const resonanceRangeString  = `"[${util.rotateArray(group.A.lpq.array, 1).join(" ") }]", "[${group.A.lpq.array.join(" ")}]"`
        this.param.synth.DFAM.vcfResonance = `sine.range(${resonanceRangeString}).slow(${this.param.A.lpq.length})`


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

        // ii. Velocity 
        group.C["2"].velocity.array             = sceneData.scaledData[group.C["2"].velocity.interval].C["2"].velocity[group.C["2"].velocity.series].map(d => d.value)
        this.param.C.part["2"].velocity.pattern = `${JSON.stringify(group.C["2"].velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.C.part["2"].velocity.length}`

        // Part 3. Chord progression notes and params
        this.mapHelper.setChordSequence(sceneData, group, 'C', 3)
    };
}