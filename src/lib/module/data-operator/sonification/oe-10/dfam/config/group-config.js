/**
 *  GROUP CONFIG
 *   - Fixed settings and options for 'schema.group'
 */

import { groupPartPresets } from "./part-config";

const series = [  
    'renewable',    'solar',    'wind',     
    'hydro',        'fossil',   'coal',     
    'coal-brown',  'total',    'price-per-MWh',                
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
        pitch: {
            interval:   '16n',          // This may be the default for all, i.e. 16 step sequencer
            division:       1,
            series:     series
        }
    },
    B: {
        name:       'DFAM',   
        label:      'Velocity',  
        type:       'velocity',
        velocity: {
            interval:   '16n',  
            division:       1,
            series:    [...series].reverse()
        }
    },
    C: {
        name:       'percussion',  
        label:      'rhytx',  
        type:       'pattern',
        part: {         
            1: {
                series:     Object.keys(groupPartPresets["1"].sound).map(d => +d)
            },
            2: {
                series:      Object.keys(groupPartPresets["2"].sound).map(d => +d)
            },
            3: {
                series:    Object.keys(groupPartPresets["3"].sound).map(d => +d)
            }
        }
    }
}