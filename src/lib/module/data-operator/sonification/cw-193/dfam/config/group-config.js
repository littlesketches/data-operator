/**
 *  GROUP CONFIG
 *   - Fixed settings and options for 'schema.group'
 */

import { groupPartPresets } from "./part-config"
const series = [  
    'netGhg_perCapita',     'sourceGhg_perCapita',  'sinkGhg_perCapita', 
    'netGhg',               'sourceGhg',            'sinkGhg', 
    'netGhg_cumulative',    'netGhg_cumulativePerCapita'
]

export const groupConfig = {
    master: { 
        name:       'master',  
        label:      'MIX',
    },
    A: { 
        name:       'DFAM',  
        label:      'Pitch', 
        type:       'pitch',
        series,
        map: {
            pitch:      { interval: '16n' },
            velocity:   { interval: '16n' },
            lpf:        { interval: '4n' },
            lpq:        { interval: '4n' },
        }
    },
    B: {
        name:       'DFAM',   
        label:      'Velocity',  
        type:       'velocity',
        series,
        map: {
            velocity:   { interval: '16n' }
        }
    },
    C: {
        name:       'percussion',  
        label:      'rhytx',  
        type:       'pattern',
        part: {         
            1: {
                series:     Object.keys(groupPartPresets["1"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '16n' },
                }
            },
            2: {
                series:     Object.keys(groupPartPresets["2"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '16n' },
                    velocity:   { interval:  '16n' }
                }
           },
            3: {
                series:     Object.keys(groupPartPresets["3"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '4n' },
                    chord:      { interval:  '4n' }
                }
            }
        }
    }
}