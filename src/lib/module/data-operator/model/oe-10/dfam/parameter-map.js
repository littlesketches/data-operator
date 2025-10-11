/**
 *  STRUDEL INSTRUMENT AND PATTERN PARAMS
 *   - Strudel code parameter template (with defaults)
 *   - Contains default and structure for Sonification 'param' reactive state => derived 'code'
 */
import { randomItem, randomInteger } from "../../../core/js/utils"

export const paramInit = {
    synth: {
        DFAM: {
            duck:           false,
            orbit:          2,          // 1 = no d=ucking; 2 = duckOrbit
            // VCO / PITCH ENVELOPE
            vcoAttack:      0,          // Does not seem to work
            vcoMax:         12,         // [VCO Decay] Pitch env "range" (in semitones) shared between VCO1+2 
            vcoDecay:       3,          // Base decay level shared between VCO1+2 and multiplied with vco1EG and vco2EG to apply pitch env.
            /*OSC1*/  
            vco1pitched:    true,
            vco1wave:       "square",   // [VCO 1 Wave] Waveshape switch: "square' or "triangle"
            vco1EG:         "<0 0.15 0.3 0.5>",        // [VCO 1 EG] 0 to 1: controls amount of pitch envelope decay x vcoDecay  x velocity (negative to invert the envelope)
            /*OSC2*/  
            vco2pitched:    true,
            vco2wave:       "triangle", // [VCO 2 Wave] Waveshape switch: "square' or "triangle"
            vco2EG:         0.75,       // [VCO 2 EG] 0 to 1: controls amount of pitch envelope decay x vcoDecay velocity (negative to invert the envelope)
            FM1_2Amt:       50,         // 0 to 50,
            /*NOISE*/ 
            noiseType:     "white",      // Noise source type switch: "white", "pink", "brown"
            noiseLvl:       0.5,       // [Noise Level] 0 to 1: gain multiplier to control Noise source volume
            /*FILTER*/
            vcfCutoff:      "<200 400 600 800>",    // [Cutoff]  filter cutoff frequency: can be sequenced
            vcfResonance:   "<6 22 14 20>",           // [Resonance] Filter resonance level: can be sequenced
            vcfEnv:         4,          // Sets the max modulation depth (semitone?) the filter envelope
            vcfDecay:       5,          // Sets max decay length: applied with vcfEG and velocity
            vcfEG:          0.75,        // [VCF EG AMOUNT] 0 to 1: controls amount of filter envelope decay x velocity  (negative to invert the envelope?)
            /*ENV*/   
            vcaAttack:      0,          // Default to zero
            vcaDecay:       5,          // Sets max decay length: applied with vcfEG and velocity
            vcaEG:          "<0.05 0.1 0.25 0.5>*4",   // [VCA Decay] 0 to 1, VCA env. x (velocity on each step) =< can sequence
            vcaSustain:     0,          // Set to zero fo AD envelope
            vcaRelease:     0,          // Set to zero fo AD envelope
        }
    },
    // Group A: [melodic] 'synth'    
    A: {
        gain:           0.65,           // Group level gain 
        mute:           false,          // Mute available at group level
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        pitch: {       
            pattern:            undefined,      // Init default: updated by user selection (state) via updateParameterMap
            pulse:              randomItem([11, 13, 15]),    // Euclidean pulse (default on load)
            rotation:           randomInteger(16),          // Euclidean rotation
            legato:             true,           // Switch for euclidean pitch 
            transpose:          24,             // OSC 2 transpose
            scaleTranspose:     0,               // Transpose along the scale
            struct:             undefined,      // Pulse sequencer pattern
            structLegato:       undefined,       // Legato version of pulse sequencer pattern
            clockDivider:       1               // Clock divider
        },
    },
    // Group B: [melodic] bass (and/or chord/drone) 
    B: {
        gain:           0.7,            // Group level gain
        mute:           false,          // Mute available at group level
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        velocity: {       
            pattern:            undefined,      // Init default: updated by user selection (state) via updateParameterMap
        }
    },
    // Group C: [pattern] percussion
    C: {
        gain:           0.5,            // Used for channel mixing
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        part: {     
            1: {  // "Beat":  mostly set for selected series in updateParameterMap
                gain:               1,
                mute:               false,
                sound: {
                    pattern:        {},      // sound part pattern
                    bank:           'RolandTR909',  // Sound bank alias 
                    length:         16,             // 
                    pulse:          16,             // Euclidean pulse
                    rotation:       0,              // Euclidean rotation
                    clockDivider:   1               // Clock divider
                },
                velocity: {     
                    pattern:        undefined,      // velocity pattern
                    length:         16,             // Euclidean pulse
                    pulse:          16,             // Euclidean pulse
                    rotation:       0,              // Euclidean rotation
                }
            },
            2: { // "Hats"
                gain:               1,
                mute:               false,
                sound: {
                    pattern:        undefined,      // sound part pattern
                    bank:           'RolandTR909',  // Sound bank alias 
                    length:         16,             // 
                    pulse:          16,             // Euclidean pulse
                    rotation:       0,              // Euclidean rotation
                    clockDivider:   1               // Clock divider

                },
                velocity: {     
                    pattern:        undefined,      // velocity pattern
                    pulse:          16,             // Euclidean pulse
                    rotation:       0,              // Euclidean rotation
                }
            },
            3: {    // Chords
                gain:               0.5,            // Sets group level with group
                mute:               false,
                octave:             3,              // Scale octave
                sound: {
                    pattern:        undefined,      // sound part pattern
                    code:           undefined,
                    length:         undefined,
                    clockDivider:   1               // Clock divider
                }
            }
        }
    },
    // Master mix out group
    master: {
        gain:           0.8,          // Master volume
        mute:           false,
        reverb: {
            size:       0.55,       // Default global reverb: punch FX reverb is a multiple of this
        }
    },
    // Global params: tempo and FX settings
    global: {
        bpm:                120,          // tempo
        step:               0,
        scale: {
            pitch:           undefined,             // Musical scale
            root:           'C',                    // pitch root
            octave:         2,                      // octave 
            type:           'minor:pentatonic',     //
        },
        // Punch FX config: params could potentially exposed
        fx: {
            mute:           `.gain("0")`,           // mute (no gain) pattern
        }
    },
    // Strudel in-built visualisation
    visual:  {
        color: {
            A:              '#fff',    
            B:              '#fff',
            C:              '#66cc00',
        },
        type: {
            none:           '',
            scope:          `.scope({pos: 0.36, scale: 0.25, thickness: 7.5})`,     
            pianoroll:      `.pianoroll({playhead: 0, vertical: false, flipTime: false  })`,
            spectrum:       `.spectrum()`
        }
    }
}