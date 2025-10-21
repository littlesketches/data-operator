/**
 *  GROUP CONFIG
 *   - Fixed settings and options for 'schema.group'
 */

import { groupPartPresets } from "./part-config"
const series = [  
    'netGhg_perCapita', 'sourceGhg_perCapita',  'sinkGhg_perCapita', 
    'netGhg',           'sourceGhg',            'sinkGhg', 
]

export const groupConfig = {
    master: { 
        name:       'master',  
        label:      'MIX',
    },
    A: { 
        name:       'synth',  
        label:      'Lead', 
        type:       'pitch',
        series,
        map: {
            pitch:    { interval: '16n' }, 
            velocity: { interval: '16n' },
            lpf:      { interval: '4n'  },
            lpq:      { interval: '2n'  }
        }
    },
    B: {
        name:       'bass',   
        label:      'Bass',  
        type:       'pitch',
        series,
        map: {
            pitch:    { interval: '16n' },
            noise:    { interval: '16n' }
        }
    },
    C: {
        name:       'percussion',  
        label:      'RYTMX',  
        type:       'pattern',
        part: {         
            1: {
                series:    Object.keys(groupPartPresets["1"].sound).map(d => +d)
            },
            2: {
                series:    Object.keys(groupPartPresets["2"].sound).map(d => +d)
            },
            3: {
                series:    Object.keys(groupPartPresets["3"].sound).map(d => +d)
            }
        }
    }
}