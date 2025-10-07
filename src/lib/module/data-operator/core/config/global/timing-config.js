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

// Interval types and config: custom defined for dataModel & input data schema
const timePerMeasure = 24 * 60  // Minutes in the day

export const timingInterval = {
    '1m':  timePerMeasure,                                     // "1m": Bar period   (whole day)
    '2n':  timePerMeasure / timingConfig.beats.perBar * 2,     // "2n"  2 x Beat period to give 4 beats per bar
    '4n':  timePerMeasure / timingConfig.beats.perBar,         // "4n" Beat period to give 4 beats per bar "4n"
    '8n':  timePerMeasure / timingConfig.beats.perBar / 2,     // "8n" 2 x Bar period 
    '16n': timePerMeasure / timingConfig.steps.perBar,         // "16n" Step period to give 16 steps "16n"
}