/**
 *  TIMING CONFIGURATION 
 *  - "timingConfig":       defines musical timing (expected to be 4/4 = 16 step, matched to interface and visuals)
 *  - "timingInterval":     used in conjunction with source data to map data musical time
 */ 

// Musical timing config
export const timingConfig = {
    meter: {
        notesPerBar:    4,
        noteValue:      4,
    },
    bars: { 
        perCycle:       1      // 1 cycle = 1 beat
    },
    beats: { //  1:0:0 or 0:4:0
        perCycle:       4,      // alias for bar
        perBar:         4,
    },
    steps: {
        perCycle:       16,    // alias for bar
        perBar:         16,   
        perBeat:        4      
    }
}
