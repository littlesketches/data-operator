/**
 *  CONFIG FOR DATA SCALING AND MUSICAL SCALES: OE-DFAM
 *  - Define scale params for mapped strudel code params 
 *  - Each defined param automatically creates a scale and scaled data option for every data series via the DataModel (i.e. makes all series available for use in sonification)
 *  - For (minor gain in) efficiency, only specify scales/scaled data that is used in the interface.
 */


export const scaleConfig = {
    A: {
        pitch: { 
            min: 0,     max:  10     // scale degree 2 octave range (pentatonic)
        },
        velocity: { 
            min: 0.5,   max: 1        // 
        },
        lpf: {  
            min: 300,   max: 600     // Cutoff frequency range
        },
        lpq: {  
            min: 16,     max: 24       // LPFs resonance range 
        }
    },
    B: {
        velocity: { 
            min: 0,     max:  1     //
        }
    },
    C: {
        2: {
            velocity: {
                min: 0.25,      max: 0.5
            }
        }, 
        3: {
            chord: {
                min: 0,         max: 3     // Mapped to four chords in a progression (note: quantized to floor)
            }
        }
    }
}


