/**
 *  STRUDEL INSTRUMENT AND PATTERN PARAMS
 *   - Strudel code parameter template (with defaults)
 *   - Contains default and structure for Sonification 'param' reactive state => derived 'code'
 */
import { randomItem, randomInteger } from "../../../core/js/utils"

export const paramInit = {
    synth: {
        lead: {
            sound:        'piano',
            filter: {
                cutoff:     `sine.range(200,2000).slow(16)`,    // Default replaced with data-driven ranges
                Q:          'sine.range(2,6).slow(2)',  
                env: {
                    A:      '0.005',     
                    D:      'perlin.range(.02,.2)',     
                    S:      'perlin.range(0,.5).slow(3)',  
                    depth:  'perlin.range(1,4).slow(2)',  
                }
            },
            ampEnv: {
                a: 0.01, d: 0.1, s: 0.8, r: 0.5
            }
        },
        ModelD: {
            mix: {  
                osc1:   1,
                osc2:   1,
                sub:    0.25,
                noise:  0.25
            },
            ampEnv: {
                a: 0.0, d: 0.1, s: 0.8, r: 0.5
            },
            filter: {
                cutoff:     440,    // Default replaced with data-driven ranges
                Q:          4,  
                env: {
                    A:      0,     
                    D:      0.1,     
                    S:      0.2,  
                    depth:  2.5,  
                }
            }
        },
        bass: {
            sound:      'piano',
            noise: {
                velocity:   '1'
            }
        }
    },
    // Group A: [melodic] 'synth'    
    A: {
        gain:           0.65,            // Group level gain 
        mute:           false,          // Mute available at group level
        octave:         5,              // Scale octave
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        pitch: {       
            pattern:            undefined,      // From via updateParameterMap
            pulse:              randomItem([5, 7, 9, 11, 13]),             // Euclidean pulse: default to all pitchs
            rotation:           randomInteger(16),               // Euclidean rotation
            legato:             true,           // Switch for euclidean pitch 
            scaleTranspose:     0,              // Transpose along the scale
            struct:             undefined,      // Pulse sequencer pattern
            structLegato:       undefined,       // Legato version of pulse sequencer pattern
            clockDivider:       2              // Clock divider
        },
        velocity: {
            pattern:            undefined
        }
    },
    // Group B: [melodic] bass 
    B: {
        gain:           0.5,           // Group level gain
        mute:           false,          // Mute available at group level
        swing: {
            index:      0,              // Min to max swing index
            level:      0               // calculated swing level
        },
        pitch: {       
            pattern:            undefined,      // From via updateParameterMap
            pulse:              randomItem([7, 9, 11, 13]),    // Euclidean pulse (default on load)
            rotation:           randomInteger(16),          // Euclidean rotation
            legato:             true,           // Switch for euclidean pitch
            transpose:          -12,            // Operates one octave lower (i.e. "bass"), combined with a more limited scale range (1 octave)
            scaleTranspose:     0,              // Transposition within scale
            struct:             undefined,      // Pulse sequencer pattern
            structLegato:       undefined,       // Legato version of pulse sequencer pattern
            clockDivider:       4               // Clock divider
        },
        noise: {
            pattern:            undefined       // Mapped to noise velocity
        }
    },
    // Group C: [pattern] percussion
    C: {
        gain:           0.25,            // Used for group level and mute
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
                    bank:           null,  // Sound bank alias 
                    length:         16,             // 
                    pulse:          16,             // Euclidean pulse
                    rotation:       0,              // Euclidean rotation
                    clockDivider:   1               // Clock divider
                },
                velocity: {     
                    pattern:    undefined,     // velocity pattern
                }
            },
            2: { // "Hats"
                gain:           0.8,            // Sets group level with group
                mute:           false,
                sound: {
                    pattern:        undefined,      // sound part pattern
                    bank:           null,  // Sound bank alias 
                    length:         16,            // 
                    pulse:          16,            // Euclidean pulse
                    rotation:       0,             // Euclidean rotation
                    clockDivider:   1               // Clock divider
                },
                velocity: {     
                    pattern:    undefined,     // Velocity pattern
                }
            },
            3: {    // Chords
                gain:           0.35,           // Sets group level with group
                mute:           false,
                octave:         3,              // Scale octave
                sound: {
                    pattern:        undefined,      // sound part pattern
                    code:           undefined,
                    length:         undefined,
                    ampEnv:         undefined,
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
            size:       0.5,       // Default global reverb: punch FX reverb is a multiple of this
        }
    },
    // Global params: tempo and FX settings
    global: {
        bpm:                70,          // tempo
        scale: {
            pitch:           undefined,             // Musical scale
            root:           'C',                    // pitch root
            octave:         3,                      // octave of lead
            type:           'lydian',       // Default/starting scale type
        },
        // Punch FX config: params could potentially exposed
        fx: {
            mute:           `.gain("0")`,           // mute (no gain) pattern
        }
    },
    // Strudel in-built visualisation
    visual:  {
        color: {
            A:              '#d40481', 
            B:              '#fff',
            C:              '#d40481',
        },
        type: {
            none:           '',
            scope:          `.scope({pos: 0.36, scale: 0.25, thickness: 7.5})`,     
            pianoroll:      `.pianoroll({playhead: 0, vertical: false, flipTime: false  })`,
            spectrum:       `.spectrum()`
        }
    }
}