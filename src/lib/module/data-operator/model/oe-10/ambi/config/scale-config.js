/**
 *  CONFIG FOR DATA SCALING AND MUSICAL SCALES: OE-10
 *  - Define scale params for mapped strudel code params 
 *  - Each defined param automatically creates a scale and scaled data option for every data series via the DataModel (i.e. makes all series available for use in sonification)
 *  - For (minor gain in) efficiency, only specify scales/scaled data that is used in the interface.
 */

export const scaleConfig = {
    A: {
        pitch: { 
            min: 0,     max: 5       // scale degree 2 octave range (inclusive)
        },
        velocity: { 
            min: 0.5,   max: 1        // Note velocity
        },
        lpf: {  
            min: 400,   max: 1400     // Cutoff frequency's modulating sine wave range of the LPF
        },
        lpq: {  
            min: 2,     max: 10       // LPFs resonance range for a  modulating sine wave 
        }
    },
    B: {
        pitch: { 
            min: 0,     max:  10       // scale degree: 1 octave pentatonic
        },
        noise: { 
            min: 0.1,   max:  1       // Mapped to noise component of the bass sytnh
        }
    },
    C: {
        1: {
            velocity: {
                min: 0.85,      max: 1
            }
        }, 
        2: {
            velocity: {
                min: 0.85,      max: 1 
            }
        }, 
        3: {
            chord: {
                min: 0,         max: 3     // Mapped to four chords in a progression (note: quantized to floor)
            }
        }
    }
}