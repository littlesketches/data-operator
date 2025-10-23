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
import { timingConfig }     from '$lib/module/data-operator/core/config/global/timing-config';
import { paramInit }        from './parameter-map';


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
         @title Climate Watch Data Jam: ${this.data.getSceneLabel(this.state.selection.sceneIndex)}   
         @by Data Operator CW-193
         @details Sonification of Climate Watch data for ${this.data.getSceneLabel(this.state.selection.sceneIndex)}   
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
            n("${this.param.B.pitch.pattern}")      // Data for "${this.state.selection.group.B.pitchPattern}" scaled to pitch 
            .scale("${this.param.global.scale.root}${this.param.global.scale.octave}:${this.param.global.scale.type}")      
            .scaleTranspose(${this.param.B.pitch.scaleTranspose})
            .layer(
                x=>x.s("sawtooth").vib(4).velocity("${this.param.synth.ModelD.mix.osc1}"),
                x=>x.s("triangle").velocity("${this.param.synth.ModelD.mix.osc2}"),
                x=>x.s("triangle").add(note(-12)).velocity("${this.param.synth.ModelD.mix.sub}") ,
                x=>x.s("pink").velocity("${this.param.synth.ModelD.mix.noise}")
            )
            .transpose(${this.param.B.pitch.transpose})             // "Global" Scale transposed                   
            .adsr("${this.param.synth.ModelD.ampEnv.a}:${this.param.synth.ModelD.ampEnv.d}:${this.param.synth.ModelD.ampEnv.s}:${this.param.synth.ModelD.ampEnv.r}")    // Amp envelope (ADSR)
            ${this.state.sequencer.B.active ? `.struct("${this.param.B.pitch.legato ? this.param.B.pitch.structLegato : this.param.B.pitch.struct}")`
                : this.param.B.pitch.legato ? `.euclidLegatoRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})` : `.euclidRot(${this.param.B.pitch.pulse}, ${this.param.B.pitch.length}, ${this.param.B.pitch.rotation})`}
            .slow(${this.param.B.pitch.clockDivider})    
            .ftype("ladder")
            .lpf(${this.param.synth.ModelD.filter.cutoff})         // LPF cutoff 
            .lpq(${this.param.synth.ModelD.filter.Q})              // LPF resonance
            .lpenv(${this.param.synth.ModelD.filter.env.depth})    // filter env: modulation depth
            .lpa(${this.param.synth.ModelD.filter.env.A})          // filter env attack
            .lpd(${this.param.synth.ModelD.filter.env.D})          // filter env decay
            .lps(${this.param.synth.ModelD.filter.env.S})          // filter env sustain

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
                    ${this.param.C.part["3"].mute ? this.param.global.fx.mute : `.gain(${this.param.C.part["3"].gain * this.param.C.gain})`}  
                    .slow(${this.param.C.part["3"].sound.clockDivider})                
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
        this.schema.sceneIndex  = this.data.schema.list.countryCodes.map((d, i) => i)

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
            this.state.selection.group.A.pitchPattern = util.randomItem(this.schema.group.A.series)
            this.state.selection.group.B.pitchPattern = util.randomItem(this.schema.group.B.series)

            // i. Update euclidean array (stored for visual and updated manually in adjustEuclideanRhythm
            this.state.selection.group.A.euclideanArray = util.rotateArray(getPattern(this.param.A.pitch.pulse, this.param.A.pitch.length), this.param.A.pitch.rotation)
            this.state.selection.group.B.euclideanArray = util.rotateArray(getPattern(this.param.B.pitch.pulse, this.param.B.pitch.length), this.param.B.pitch.rotation)
            this.state.selection.group.C.part["1"].euclideanArray = util.rotateArray(getPattern(this.param.C.part["1"].sound.pulse, this.param.C.part["1"].sound.length), this.param.C.part["1"].sound.rotation)
            this.state.selection.group.C.part["2"].euclideanArray = util.rotateArray(getPattern(this.param.C.part["2"].sound.pulse, this.param.C.part["2"].sound.length), this.param.C.part["2"].sound.rotation)
        }

        /**
         *  II. Set of manual update methods to turns data selections into 'param' updates => (reactive) code   
         */ 

        // i. Selection and reference variables
        const sceneData       = this.data.scene[this.state.selection.sceneIndex],
            scaleLock       = this.state.selection.scaleLock ? 'quantized' : 'value',
            group = {
                A: {
                    pitch:    { interval: this.schema.group.A.map.pitch.interval    }, 
                    velocity: { interval: this.schema.group.A.map.velocity.interval }, 
                    lpf:      { interval: this.schema.group.A.map.lpf.interval      },
                    lpq:      { interval: this.schema.group.A.map.lpq.interval      }
                },
                B: {
                    pitch:    { interval: this.schema.group.B.map.pitch.interval    }, 
                    noise:    { interval: this.schema.group.B.map.pitch.interval    }
                },
                C:  this.schema.pattern.C    //  Percussion and chord part presets           
            }

        // ii. Add velocity to group C
        group.C["2"].velocity = { interval: this.schema.group.B.map.pitch.interval }      
        group.C["3"].interval =  this.schema.group.C.part["3"].interval  

        /// iii. Set primary (pitch) pattern series
        group.A.pitch.series = group.A.velocity.series = group.A.lpf.series = group.A.lpq.series =  this.state.selection.group.A.pitchPattern
        group.B.pitch.series = group.B.noise.series =  group.C["2"].velocity.series = group.C["3"].series = this.state.selection.group.B.pitchPattern


        /**
         *  GROUP A: Melodic "synth"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.A.pitch.array = sceneData.scaledData[group.A.pitch.interval].A.pitch[group.A.pitch.series].map(d => { return d[scaleLock]})
        this.param.A.pitch.pattern  = `${JSON.stringify(group.A.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`
 
        if(this.state.sequencer.A.onDelta){  // Create a custom onchange pulse pattern for A
            this.state.sequencer.A.active   = true 
            this.state.sequencer.A.array    = util.deltaArray( group.A.pitch.array)
            this.param.A.pitch.struct       = this.state.sequencer.A.array.map(n => n && 'x' || '-').join(' ')   
            this.param.A.pitch.structLegato = util.legatoStruct(this.state.sequencer.A.array )
        }

        // ii. Velocity: constructed from selected data => update params
        group.A.velocity.array = sceneData.scaledData[group.A.velocity.interval].A.velocity[group.A.velocity.series].map(d => { return d.value})
        this.param.A.velocity.pattern  = `${JSON.stringify(group.A.velocity.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.A.pitch.length}`

        // iii. Filter cutoff:  constructed from selected data => update params: set for change on 4n
        group.A.lpf.array = sceneData.scaledData[group.A.lpf.interval].A.lpf[group.A.lpf.series].map(d => Math.round(d.value))
        const cutoffRangeString     = `"[${util.rotateArray(group.A.lpf.array, 1).join(" ") }]", "[${group.A.lpf.array.join(" ")}]"`
        this.param.synth.TB303.filter.cutoff = `sine.range(${cutoffRangeString}).slow(4)`

        // iii. Filter resonance:  constructed from selected data => update params: set for change on 2n
        group.A.lpq.array = sceneData.scaledData[group.A.lpq.interval].A.lpq[group.A.lpq.series].map(d => d.value)
        const resonanceRangeString     = `"[${util.rotateArray(group.A.lpq.array, 1).join(" ") }]", "[${group.A.lpq.array.join(" ")}]"`
        // this.param.synth.TB303.filter.resonance = `sine.range(${resonanceRangeString}).slow(8)`


        /**
         *  GROUP B: Melodic "bass"
         */ 

        // i. Pitch: constructed from selected data => update params
        group.B.pitch.array         = sceneData.scaledData[group.B.pitch.interval].B.pitch[group.B.pitch.series].map(d => d[scaleLock])
        this.param.B.pitch.pattern  = `${JSON.stringify(group.B.pitch.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.pitch.length}`

        if(this.state.sequencer.B.onDelta){  // Create a custom onchange pulse pattern for B 
            this.state.sequencer.B.active   = true 
            this.state.sequencer.B.array    = util.deltaArray( group.B.pitch.array)
            this.param.B.pitch.struct       = this.state.sequencer.B.array.map(n => n && 'x' || '-').join(' ')   
            this.param.B.pitch.structLegato = util.legatoStruct(this.state.sequencer.B.array)
        }

        // ii. Noise part level "velocity": constructed from data 
        const noiseRange = 1 ?? sceneData.scaledData["1m"].B.noise[0][group.B.noise.series].value
        group.B.noise.array         = sceneData.scaledData[group.B.noise.interval].B.noise[group.B.noise.series].map(d => d.value * noiseRange)
        this.param.synth.ModelD.mix.noise  = `${JSON.stringify(group.B.noise.array).replaceAll(',', ' ').replaceAll('[', '<').replaceAll(']', '>')}*${this.param.B.pitch.length}`

        /**
         *  GROUP C. Pattern "percussion" parts
         */ 

        // Part 1. Beat pattern: "membrane" percussion
        // i. Update pattern params
        this.param.C.part["1"].sound.pattern = group.C["1"].sound[this.state.selection.group.C.part["1"].series].pattern.combined

        // Part 2. Hats pattern: "metal" percussion
        // i. Update pattern params
        this.param.C.part["2"].sound.pattern = group.C["2"].sound?.[this.state.selection.group.C.part["2"].series].pattern

        // Part 3. Chord progression notes and params
        const musicalScale = this.param.global.scale.type,
            scaleChords  = this.schema.musicalScale[musicalScale].chordMap,
            chordMap = {
                0: scaleChords.I,
                1: scaleChords.IV,
                2: scaleChords.V,
                3: scaleChords.VI
            }

        group.C["3"].patternArray               = sceneData.scaledData[group.C["3"].interval].C["3"].chord[group.C["3"].series].map(d => d.quantized).map( d => chordMap[d])
        this.param.C.part["3"].sound.pattern    = `"<${group.C["3"].patternArray.map(s => s.replace(/^'|'$/g, "")).join(" ")}>"`

        const c3 = group.C["3"].sound[this.state.selection.group.C.part["3"].series]
        this.param.C.part["3"].sound.length = group.C["3"].patternArray.length
        this.param.C.part["3"].sound.code   = c3.code
        this.param.C.part["3"].sound.ampEnv = c3.ampEnv
        this.param.C.part["3"].gain         = c3.gain

    };
}