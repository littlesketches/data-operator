/**
 *  CW-193 DATA SONIFICATION CLASS 
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
import { timingConfig, 
    clockDividerMap }       from '$lib/module/data-operator/core/config/global/timing-config';
import { musicalScale }     from '$lib/module/data-operator/core/config/global/music-scale-config';
import { paramInit }        from './parameter-map';

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
         @title Climate Watch Data Jam: ${this.data.getProjectLabel(this.state.selection.projectIndex)}   
         @by Data Operator CW-193
         @details Sonification of Climate Watch data for ${this.data.getProjectLabel(this.state.selection.projectIndex)}   
         @url https://data-operator.littlesketch.es
         @license CC BY-NC-SA
         */
               
        setcpm(${this.param.global.bpm / timingConfig.beats.perBar})

        stack(
            // Group A. "Lead" synth
            n("${this.param.A.pitch.pattern}")      // Data for "${this.state.selection.group.A.pitchPattern}" scaled to pitch 
                .scale("${this.param.global.scale.root}${this.param.A.octave}:${this.param.global.scale.type}")            
                .scaleTranspose(${this.param.A.pitch.scaleTranspose})
                ${this.state.sequencer.A.active ? `.struct("${this.param.A.pitch.legato ?  this.param.A.pitch.structLegato !== "" ?this.param.A.pitch.structLegato :  this.param.A.pitch.struct  : this.param.A.pitch.struct}")` 
                    : this.param.A.pitch.legato ? `.euclidLegatoRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})` : `.euclidRot(${this.param.A.pitch.pulse}, ${this.param.A.pitch.length}, ${this.param.A.pitch.rotation})`  }             
                .slow(${this.param.A.pitch.clockDivider})                
                .s("${this.param.synth.lead.oscType}")               // Sound source
                .velocity("${this.param.A.velocity.pattern}")
                .adsr("${this.param.synth.lead.ampEnv.A}:${this.param.synth.lead.ampEnv.D}:${this.param.synth.lead.ampEnv.S}:${this.param.synth.lead.ampEnv.R}")                         
                .ftype("${this.param.synth.lead.filter.type}")                                        
                .lpf(${this.param.synth.lead.filter.cutoff})         // LPF cutoff modulated with sine wave with range is mapped to scaled "${this.state.selection.group.A.pitchPattern}" data at "${this.schema.group.A.map.lpf.interval}" intervals
                .lpq(${this.param.synth.lead.filter.Q})              // LPF resonance modulated sine wave with range is mapped to scaled "${this.state.selection.group.A.pitchPattern}" data at "${this.schema.group.A.map.lpq.interval}" intervals
                .lpenv(${this.param.synth.lead.filter.env.depth})    
                .lpa(${this.param.synth.lead.filter.env.A})          
                .lpd(${this.param.synth.lead.filter.env.D})          
                .lps(${this.param.synth.lead.filter.env.S})          
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
            // Group B. "Bass" synth 
            n("${this.param.B.pitch.pattern}")      // Data for "${this.state.selection.group.B.pitchPattern}" scaled to pitch 
            .scale("${this.param.global.scale.root}${this.param.global.scale.octave}:${this.param.global.scale.type}")      
            .scaleTranspose(${this.param.B.pitch.scaleTranspose})
            .layer(
                x=>x.s("sawtooth").vib(4).velocity("${this.param.synth.bass.mix.osc1}"),
                x=>x.s("triangle").velocity("${this.param.synth.bass.mix.osc2}"),
                x=>x.s("sawtooth").add(note(-12)).velocity("${this.param.synth.bass.mix.sub}") ,
                x=>x.s("pink").velocity("${this.param.synth.bass.mix.noise}")
            )
            .transpose(${this.param.B.pitch.transpose})             
            .adsr("${this.param.synth.bass.ampEnv.A}:${this.param.synth.bass.ampEnv.D}:${this.param.synth.bass.ampEnv.S}:${this.param.synth.bass.ampEnv.R}")    
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
                s("${this.param.C.part["1"].sound.pattern}").bank("${this.param.C.part["1"].sound.bank}")  // Beat
                    .slow(${this.param.C.part["1"].sound.clockDivider})                
                    ${this.param.C.part["1"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["1"].gain * this.param.C.gain})`}  
                ,  // Part 2: Metal and misc percussion sounds
                s("${this.param.C.part["2"].sound.pattern}").bank("${this.param.C.part["2"].sound.bank}")   // Hats
                    .velocity("${this.param.C.part["2"].velocity.pattern }")    // Velocity mapped to scaled date for "${this.state.selection.group.B.pitchPattern}" at "${this.schema.group.B.map.pitch.interval}" intervals
                    .slow(${this.param.C.part["2"].sound.clockDivider})    
                    ${this.param.C.part["2"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["2"].gain * this.param.C.gain})`}                     
                , // Part 3: Harmony: sampled chord
                n(${ this.param.C.part["3"].sound.pattern })    // Data for "${this.state.selection.group.A.pitchPattern}" scaled to chord progression at "${this.schema.group.A.map.lpf.interval}" intervals
                    .scale("${this.param.global.scale.root}${this.param.C.part["3"].octave}:${this.param.global.scale.type}")     
                    ${this.param.C.part["3"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["3"].gain * this.param.C.gain})`}  
                    .slow(${this.param.C.part["3"].sound.clockDivider})                
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
        this.state.selection.projectIndex = util.randomItem(this.schema.projectIndex)                           // Randomise project
        this.state.selection.group.global.scale.notes = musicalScale[this.param.global.scale.type].notes
        this.state.selection.group.global.bpm.dataLinked = true                                                               // Apply bpm-data series link

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
            this.state.selection.group.A.pitchPattern = 'sourceGhg_perCapita'
            this.state.selection.group.B.pitchPattern = 'sinkGhg_perCapita'
            // ii. Init group object
            group = this.mapHelper.initGroupConfig()
            // iii. Randomise euclidean pulse
            this.param.A.pitch.pulse = util.randomItem([11, 13, 15])
            this.param.B.pitch.pulse = util.randomItem([5, 7, 9])
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
        group.C["2"].velocity.series = group.B.pitch.series

        // Set BPM 
        const countryCode = this.data.schema.list.countryCodes[this.state.selection.projectIndex]             
        if(this.state.selection.group.global.bpm.dataLinked){
            const bpmSeries =  this.state.selection.group.global.bpm.series = 'vulnerabilityScore'
            this.param.global.bpm = Math.round(projectData.scaledData.global.bpm[bpmSeries])
        }

        /**
         *  GROUP A: Melodic "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = projectData.scaledData[group.A.pitch.interval].A[pitchScale][group.A.pitch.series].map(d => d.quantized)
        this.mapHelper.setPitchSequence(group, 'A')

        // ii. Velocity: constructed from selected data => update params
        group.A.velocity.array = projectData.scaledData[group.A.velocity.interval].A.velocity[group.A.velocity.series].map(d => { return d.value})
        this.param.A.velocity.pattern  = `${JSON.stringify(group.A.velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        // iii. Filter cutoff:  constructed from selected data => update params: set for change on 4n
        group.A.lpf.array = projectData.scaledData[group.A.lpf.interval].A.lpf[group.A.lpf.series].map(d => Math.round(d.value))
        const cutoffRangeString     = `"[${util.rotateArray(group.A.lpf.array, 1).join(" ") }]", "[${group.A.lpf.array.join(" ")}]"`
        this.param.synth.lead.filter.cutoff = `sine.range(${cutoffRangeString}).slow(${clockDividerMap[group.A.lpf.interval]})`

        // iii. Filter resonance:  constructed from selected data => update params: set for change on 2n
        group.A.lpq.array = projectData.scaledData[group.A.lpq.interval].A.lpq[group.A.lpq.series].map(d => d.value)
        const resonanceRangeString  = `"[${util.rotateArray(group.A.lpq.array, 1).join(" ") }]", "[${group.A.lpq.array.join(" ")}]"`
        this.param.synth.lead.filter.resonance = `sine.range(${resonanceRangeString}).slow(${clockDividerMap[group.A.lpq.interval]})`


        /**
         *  GROUP B: Melodic "bass"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.B.pitch.array         = projectData.scaledData[group.B.pitch.interval].B[pitchScale][group.B.pitch.series].map(d => d[scaleLock])
        this.mapHelper.setPitchSequence(group, 'B')

        // ii. Noise part level "velocity": constructed from data 
        group.B.noise.array = projectData.scaledData[group.B.noise.interval].B.noise[group.B.noise.series].map(d => d.value )
        this.param.synth.bass.mix.noise = `${JSON.stringify(group.B.noise.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.pitch.length}`


        /**
         *  GROUP C. Pattern "percussion" parts
         */ 

        // Part 1. Beat pattern: "membrane" percussion
        // i. Update pattern params
        this.param.C.part["1"].sound.pattern = group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.combined

        // Part 2. Hats pattern: "metal" percussion
        // i. Update pattern params
        this.param.C.part["2"].sound.pattern = group.C["2"].sound?.[this.state.selection.group.C.part["2"].series].pattern

        // ii. Velocity 
        group.C["2"].velocity.array             = projectData.scaledData[group.C["2"].velocity.interval].C["2"].velocity[group.C["2"].velocity.series].map(d => d.value)
        this.param.C.part["2"].velocity.pattern = `${JSON.stringify(group.C["2"].velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.C.part["2"].velocity.length}`


        // Part 3. Chord progression notes and params
        this.mapHelper.setChordSequence(projectData, group, 'C', 3)
    };
}