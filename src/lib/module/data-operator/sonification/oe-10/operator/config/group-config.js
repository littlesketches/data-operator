/**
 *  GROUP CONFIG
 *   - Fixed settings and options for 'schema.group'
 */

import { groupPartPresets } from "./part-config"

const series  =  [  
    'renewable',    'fossil',   'total', 
    'solar',        'wind',     'hydro', 
    'coal',         'gas',      'price-per-MWh'
]

export const groupConfig = {
    master: { 
        name:       'master',  
        label:      'MIX',
    },
    A: { 
        name:       'synth',  
        label:      'Lead', 
        type:       'pitch',        // Primary mapping
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
        type:       'pitch',        // Primary mapping
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
                series:    Object.keys(groupPartPresets["1"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '16n' },
                }
            },
            2: {
                series:    Object.keys(groupPartPresets["2"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '16n' },
                    velocity:   { interval:  '16n' }
                }
            },
            3: {
                series:    Object.keys(groupPartPresets["3"].sound).map(d => +d),
                map: {
                    sound:      { interval:  '4n' }
                }
            }
        }
    }
}