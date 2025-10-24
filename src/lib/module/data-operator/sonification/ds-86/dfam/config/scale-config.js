/**
 *  CONFIG FOR DATA SCALING AND MUSICAL SCALES: DS-86-DFAM
 *  - Define scale params for mapped strudel code params 
 *  - Each defined param automatically creates a scale and scaled data option for every data series via the DataModel (i.e. makes all series available for use in sonification)
 *  - For (minor gain in) efficiency, only specify scales/scaled data that is used in the interface.
 */


export const scaleConfig = {
    A: {
        pitch5:     { min: 0,       max: 10     },
        pitch6:     { min: 0,       max: 12     },
        pitch7:     { min: 0,       max: 14     },
        velocity:   { min: 0.5,     max: 1      },
        lpf:        { min: 300,     max: 800    },
        lpq:        { min: 12,      max: 24     }
    },
    B: {
        velocity:   { min: 0.5,     max:  1     }
    },
    C: {
        2: {
            velocity: { min: 0.25,  max: 0.5    }
        }, 
        3: {
            chord:    { min: 0,     max: 3    }
        }
    }
}


