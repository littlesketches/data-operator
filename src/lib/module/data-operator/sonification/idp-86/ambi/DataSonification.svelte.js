/**
 *  OE-10 DATA SONIFICATION CLASS 
 *  - Custom data load/parse and transformation: model, schema and output for strudel
 *  - Strudel 'code' template with parameters and data sonification input strings
 */
// Libs and utils
import * as d3              from 'd3'
import { getPattern}        from 'euclidean-rhythms';
import { util }             from '$lib/module/data-operator/core/js/utils';

// Classes
import { Sonification }     from '$lib/module/data-operator/core/js/Sonification.svelte';

// Config
import { timingConfig }     from '$lib/module/data-operator/core/config/global/timing-config';
import { musicalScale }     from '$lib/module/data-operator/core/config/global/music-scale-config';
import { paramInit }        from './parameter-map';

// Private variables
let group
// const base = `${window?.location.origin}/sounds/`

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
         @title IDMC Data Jam: ${this.data.getProjectLabel(this.state.selection.projectIndex)} 
         @by Data Operator IDP-86:AMBI
         @details Sonification of Internal Displacement Monitoring Centre (IDMC) data ${d3.min(this.data.schema.list.availableYears)}-${d3.max(this.data.schema.list.availableYears)}
         @url https://data-operator.littlesketch.es
         @license CC BY-NC-SA
         */
        
        setcpm(${this.param.global.bpm / timingConfig.beats.perBar})

        stack(
            // Group A. Lead 
            n("${this.param.A.pitch.pattern}")      // Data for "${this.state.selection.group.A.pitchPattern}" scaled to pitch 
                .scale("${this.param.global.scale.root}${this.param.global.scale.octave}:${this.param.global.scale.type}")            
                .scaleTranspose(${this.param.A.pitch.scaleTranspose})
                ${this.state.sequencer.A.active ? `.struct("${this.param.A.pitch.legato ?  this.param.A.pitch.structLegato !== "" ?this.param.A.pitch.structLegato :  this.param.A.pitch.struct  : this.param.A.pitch.struct}")` 
                    : this.param.A.pitch.legato ? `.euclidLegatoRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})` : `.euclidRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})`  }                             
                .layer(
                    x => x.s("supersaw"),
                    x => x.s("supersaw").add(0.1),
                    x => x.s("pulse").add(note(-12))
                )
                .adsr("${this.param.synth.bass.ampEnv.A}:${this.param.synth.lead.ampEnv.D}:${this.param.synth.lead.ampEnv.S}:${this.param.synth.lead.ampEnv.R}")    
                .lpf(${this.param.synth.lead.filter.cutoff}) 
                .lpq(${this.param.synth.lead.filter.Q})           
                .lpenv(${this.param.synth.lead.filter.env.depth})   
                .lpa(${this.param.synth.lead.filter.env.A}).lpd(${this.param.synth.lead.filter.env.D}).lps(${this.param.synth.lead.filter.env.S}).lpr(${this.param.synth.lead.filter.env.R})         
                .phaser(0.25)
                .pan(sine.slow(2))
                .distort(1.2)
                .slow(${this.param.A.pitch.clockDivider})            
                .velocity("${this.param.A.velocity.pattern}")
                .swingBy(${this.param.A.swing.level}, 8)
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
            // Group B. "Bass" 
            n("${this.param.B.pitch.pattern}")      // Data for "${this.state.selection.group.B.pitchPattern}" scaled to pitch 
                .scale("${this.param.global.scale.root}${this.param.global.scale.octave}:${this.param.global.scale.type}")      
                .scaleTranspose(${this.param.B.pitch.scaleTranspose})
                .layer(
                    x => x.s("pulse").pw(0.2).vib(4).velocity("${this.param.synth.bass.mix.osc1}"),
                    x => x.s("pulse").pw(0.35).velocity("${this.param.synth.bass.mix.osc2}"),
                    x => x.s("square").add(note(-12)).velocity("${this.param.synth.bass.mix.sub}"),
                    x => x.s("white").velocity("${this.param.synth.bass.mix.noise}")
                )
                .transpose(${this.param.B.pitch.transpose})       
                .adsr("${this.param.synth.bass.ampEnv.A}:${this.param.synth.bass.ampEnv.D}:${this.param.synth.bass.ampEnv.S}:${this.param.synth.bass.ampEnv.R}")    // Amp envelope (ADSR)
                ${this.state.sequencer.B.active ? `.struct("${this.param.B.pitch.legato ? this.param.B.pitch.structLegato !== "" ?this.param.B.pitch.structLegato :  this.param.B.pitch.struct : this.param.B.pitch.struct}")`
                        : this.param.B.pitch.legato ? `.euclidLegatoRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})` : `.euclidRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})`}
                .slow(${this.param.B.pitch.clockDivider})    
                .ftype("${this.param.synth.bass.filter.type}")
                .lpf(${this.param.synth.bass.filter.cutoff}) 
                .lpq(${this.param.synth.bass.filter.Q})           
                .lpenv(${this.param.synth.bass.filter.env.depth})   
                .lpa(${this.param.synth.bass.filter.env.A}).lpd(${this.param.synth.bass.filter.env.D}).lps(${this.param.synth.bass.filter.env.S}).lpr(${this.param.synth.bass.filter.env.R})         
                .swingBy(${this.param.B.swing.level}, 8)
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
                s("${this.param.C.part["1"].sound.pattern}")
                    ${this.param.C.part["1"].sound.bank  ? `.bank("${this.param.C.part["1"].sound.bank}")` : ""}  // Beat
                    ${this.param.C.part["1"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["1"].gain * this.param.C.gain})`}  
                ,  // Part 2: Metal and misc percussion sounds
                s("${this.param.C.part["2"].sound.pattern}")
                    ${this.param.C.part["2"].sound.bank  ? `.bank("${this.param.C.part["2"].sound.bank}")` : ""}  // Hats
                    .velocity("${this.param.C.part["2"].velocity.pattern }")    // Velocity mapped to scaled date for "${this.state.selection.group.B.pitchPattern}" at "${this.schema.group.B.map.pitch.interval}" intervals
                    ${this.param.C.part["2"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["2"].gain * this.param.C.gain})`}                     
                , // Part 3: Harmony: synth
                stack( // a. Oscillator
                    n(${ this.param.C.part["3"].sound.pattern })
                        .scale("${this.param.global.scale.root}${this.param.C.part["3"].octave}:${this.param.global.scale.type}")     
                        ${this.param.C.part["3"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["3"].gain * this.param.C.gain})`}  
                        ${this.param.C.part["3"].sound.code}
                )
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
        this.schema.projectIndex  = this.data.schema.list.countryCodes.map((d, i) => i)

        // Add state
        this.state.selection.projectIndex     = util.randomItem(this.schema.projectIndex)       // Randomise scene
        this.state.selection.group.global.scale.notes = musicalScale[this.param.global.scale.type].notes
        this.state.sequencer.A.onDelta      = true  // i. Apply the onDelta pulse for A and B as the default


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

        // a. On init setup
        if(init){
            // i. Set default pattern selections
            this.state.selection.group.A.pitchPattern    = 'annualTotal' 
            this.state.selection.group.B.pitchPattern   = 'stockTotal'
            // ii. Init group object
            group = this.mapHelper.initGroupConfig()
            // iii. Set pulses
            this.param.B.pitch.pulse = util.randomItem([12, 13, 14])
            // iv. Set euclidean array references (stored for visual and updated manually in adjustEuclideanRhythm
            this.mapHelper.setEuclideanArray()
        }

        // b. Selection and reference variables
        const { projectData, pitchScale, scaleLock } = this.mapHelper.getDataVariables()
        

        /**
         *  II. UPDATE + CUSTOM DATA SERIES MAPPING  
         */ 
        this.mapHelper.updateGroupPitch(group)
        group.C["3"].chord.series = group.A.pitch.series 
        group.C["2"].velocity.series =  group.B.pitch.series


        /**
         *  GROUP A: Melodic "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = projectData.scaledData[group.A.pitch.interval].A[pitchScale][group.A.pitch.series].map(d => d[scaleLock])
        this.mapHelper.setPitchSequence(group, 'A')

        // ii. Velocity: constructed from selected data => update params
        group.A.velocity.array = projectData.scaledData[group.A.velocity.interval].A.velocity[group.A.velocity.series].map(d => d.value )
        this.param.A.velocity.pattern = `${JSON.stringify(group.A.velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.velocity.length}`


        /**
         *  GROUP B: Melodic "bass"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.B.pitch.array         = projectData.scaledData[group.B.pitch.interval].B[pitchScale][group.B.pitch.series].map(d => d[scaleLock])
        this.mapHelper.setPitchSequence(group, 'B')


        /**
         *  GROUP C. Pattern "percussion" parts
         */ 

        // Part 1. Beat pattern: "membrane" percussion
        // i. Update pattern params
        this.param.C.part["1"].sound.pattern = group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.combined

        // Part 2. Hats pattern: "metal" percussion
        // i. Update pattern params
        this.param.C.part["2"].sound.pattern = group.C["2"].sound[this.state.selection.group.C.part["2"].series].pattern

        // ii. Velocity 
        group.C["2"].velocity.array             = projectData.scaledData[group.C["2"].velocity.interval].C["2"].velocity[group.C["2"].velocity.series].map(d => d.value)
        this.param.C.part["2"].velocity.pattern = `${JSON.stringify(group.C["2"].velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.C.part["2"].velocity.length}`

        // Part 3. Chord/harmony progression 
        this.mapHelper.setChordSequence(projectData, group, 'C', 3)
    };
}