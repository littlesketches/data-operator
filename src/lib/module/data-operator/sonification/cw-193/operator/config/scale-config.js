/**
 *  CONFIG FOR DATA SCALING AND MUSICAL SCALES: OE-10
 *  - Define scale params for mapped strudel code params 
 *  - Each defined param automatically creates a scale and scaled data option for every data series via the DataModel (i.e. makes all series available for use in sonification)
 *  - For (minor gain in) efficiency, only specify scales/scaled data that is used in the interface.
 */

export const scaleConfig = {
    A: {
        pitch5:     { min: 0,       max: 10    },
        pitch6:     { min: 0,       max: 12    },
        pitch7:     { min: 0,       max: 14    },
        velocity:   { min: 0.5,     max: 1    },
        lpf:        { min: 400,     max: 1200 },
        lpq:        { min: 44,      max: 12   }
    },
    B: {
        pitch5:     { min: 0,       max: 5    },
        pitch6:     { min: 0,       max: 6    },
        pitch7:     { min: 0,       max: 7    },
        noise:      { min: 0.35,    max: 1  }, 
        sub:        { min: 0.25,    max: 0.75 },
    },
    C: {
        2: {
            velocity: { min: 0.85,  max: 1   }
        }, 
        3: {
            chord:    { min: 0,    max: 3   }
        }
    },
    global: {
        bpm:         { min: 70,      max: 100   }
    }

}