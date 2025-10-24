/**
 *  STRUDEL INSTRUMENT AND PATTERN PARAMS
 *   - Strudel code parameter template (with defaults)
 *   - Contains default and structure for Sonification 'param' reactive state => derived 'code'
 */

import { strudelVisOptions, strudelVisPalette }         from "../../_shared/strudel-vis-config"

export const paramInit = {
    synth: {
        lead: {
            oscType:        'sawtooth',
            filter: {
                type:       '24db',
                cutoff:     `sine.range(200,2000).slow(16)`,    // Placeholder updated with data-driven ranges
                Q:          'sine.range(2,6).slow(2)',          // Placeholder updated with data-driven ranges
                env: {
                    A:      '0.005',     
                    D:      'perlin.range(.02,.2)',     
                    S:      'perlin.range(0,.5).slow(3)',  
                    depth:  'perlin.range(1,4).slow(2)',  
                }
            },
            ampEnv: {
                A: 0.01, D: 0.1, S: 0.8, R: 0.5
            }
        },
        bass: {
            mix: {     
                osc1:   1,
                osc2:   0.7,
                sub:    0.65,
                noise:  0.25
            },
            ampEnv: {
                A: 0.0, D: 0.1, S: 0.8, R: 0.1
            },
            filter: {
                type:       'ladder',
                cutoff:     440,        
                Q:          4,  
                env: {
                    A: 0, D: 0.1, S: 0, R: 0.5,
                    depth:  3,  
                }
            }
        }
    },
    // Group A: [melodic] 'synth'    
    A: {
        gain:           0.5,            // Group level gain 
        mute:           false,          // Mute available at group level
        octave:         3,              // Scale octave
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        pitch: {       
            pattern:            undefined,      // From via updateParameterMap
            pulse:              16,             // Euclidean pulse: default to all pulses
            rotation:           0,              // Euclidean rotation fixed until offset/sync with visual can be resolved
            legato:             true,           // Switch for euclidean pitch 
            scaleTranspose:     0,              // Transpose along the scale
            struct:             undefined,      // Pulse sequencer pattern
            structLegato:       undefined,      // Legato version of pulse sequencer pattern
            clockDivider:       1               // Clock divider
        },
        velocity: {
            pattern:            undefined
        }
    },
    // Group B: [melodic] bass synth
    B: {
        gain:           0.85,           // Group level gain
        mute:           false,          // Mute available at group level
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        pitch: {       
            pattern:            undefined,      // From via updateParameterMap
            pulse:              undefined,      // Euclidean pulse (default on load)
            rotation:           0,              // Euclidean rotation fixed until offset/sync with visual can be resolved
            legato:             false,          // Switch for euclidean pitch
            transpose:          -12,            // Operates one octave lower (i.e. "bass"), combined with a more limited scale range (1 octave)
            scaleTranspose:     0,              // Transposition within scale
            struct:             undefined,      // Pulse sequencer pattern
            structLegato:       undefined,      // Legato version of pulse sequencer pattern
            clockDivider:       1               // Clock divider

        },
        noise: {
            pattern:            undefined       // Mapped to noise velocity
        }
    },
    // Group C: [pattern] percussion
    C: {
        gain:           0.6,            // Used for group level and mute
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        part: {     
            1: {  // "Beat":  
                gain:           0.8,            // Sets group level with group
                mute:           false,
                sound: {
                    pattern:        undefined,      // sound part pattern
                    bank:           'RolandTR909',  // Sound bank alias 
                    clockDivider:   1               // Clock divider
                },
                velocity: {     
                    pattern:        undefined,     // velocity pattern
                }
            },
            2: {  // "Hats"
                gain:           0.25,            // Sets group level with group
                mute:           false,
                sound: {
                    pattern:        undefined,      // sound part pattern
                    bank:           'RolandTR909',  // Sound bank alias 
                    clockDivider:   1               // Clock divider
                },
                velocity: {     
                    pattern:        undefined,      // Velocity pattern
                }
            },
            3: {  // Chords
                gain:           0.5,               // Sets group level with group
                mute:           false,
                octave:         3,                  // Scale octave
                sound: {
                    pattern:        undefined,      // sound part pattern
                    code:           undefined,
                    ampEnv:         undefined,
                    gain:           1,
                    clockDivider:   2                 // Clock divider
                },
                velocity: {     
                    pattern:        undefined,     // Velocity pattern
                }
            }
        }
    },
    // Master mix out group
    master: {
        gain:           0.8,          // Master volume
        mute:           false,
        reverb: {
            size:       0.5,       // Default global reverb: punch FX reverb is a multiple of this
        }
    },
    // Global params: tempo and FX settings
    global: {
        bpm:                89,          // tempo
        scale: {
            pitch:           undefined,             // Musical scale
            root:           'C',                    // pitch root
            octave:         3,                      // octave of lead
            type:           'major:pentatonic',     // Default/starting scale type
        },
        // Punch FX config: params could potentially exposed
        fx: {
            mute:           `.gain("0")`,           // mute (no gain) pattern
        }
    },
    // Strudel in-built visualisation
    visual:  {
        color:      strudelVisPalette.operator,
        type:       strudelVisOptions
    }
}