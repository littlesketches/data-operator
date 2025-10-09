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
        pitch: {
            interval:       '16n',          // This may be the default for all, i.e. 16 step sequencer
            series
        }, 
        velocity: {
            interval:       '16n',          // This may be the default for all, i.e. 16 step sequencer
        }
    },
    B: {
        name:       'bass',   
        label:      'Bass',  
        type:       'pitch',
        pitch: {
            interval:       '16n',  
            series: [...series].reverse()
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