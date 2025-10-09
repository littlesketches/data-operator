/**
 *  GROUP CONFIG
 *   - Fixed settings and options for 'schema.group'
 */

import { groupPartPresets } from "./part-config"

const seriesA =  [  
    'renewable',        'solar',        'wind',     
    'ratio-renewable',  'ratio-solar',  'ratio-wind',
    'hydro',            'total',        'price-per-MWh',                
]

const seriesB = [  
    'fossil',       'coal',         'gas', 
    'ratio-fossil', 'ratio-coal',   'ratio-gas', 
    'coal-brown',   'total',        'price-per-MWh'
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
            interval:   '16n',          // This may be the default for all, i.e. 16 step sequencer
            series:     seriesA
        }, 
        velocity: {
            interval:   '16n',          // This may be the default for all, i.e. 16 step sequencer
        }
    },
    B: {
        name:       'bass',   
        label:      'Bass',  
        type:       'pitch',
        pitch: {
            interval:   '16n',  
            series:     seriesB
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