/**
 *  Config and loader for local CSV data files (manually downloaded from ClimateWatch to the 'static/data/module/climate-watch' folder)
 */


// Libs and utils
import { csvParse } from "d3"

// Config for static files
export const rootPath = `/data/climate-watch`

export const staticDataStructure = {    
    'adaptation': {
        'CW_adaptation': {
           type:       'csv',
            country: {
                key:    'country',
                type:   'ISO3'
            }
        }
    },
    'historical-emissions': {
        'CW_HistoricalEmissions_ClimateWatch': { 
            type:       'csv',
            country: {
                key:    'Country',
                type:   'ISO3'
            }
        },
        'CW_HistoricalEmissions_PRIMAP': { 
            type:       'csv',
            country: {
                key:    'country',
                type:   'ISO3'
            }
        }
    },
    'ndc-content': {
        'CW_NDC_data_highlevel': {
            type: 'csv',
            country: {
                key:    'ISO',
                type:   'ISO3'
            }
        }
    },
    'pledge': {
        'CW_pledges_data': { 
            type: 'csv',
            country: {
                key:    'ISO',
                type:   'ISO3'
            }
        },
    },
    'socio-economics': {
        'CW_gdp': { 
            type: 'csv',
            country: {
                key:    'Country Code',
                type:   'ISO3'
            }
        },
        'CW_population': { 
            type: 'csv',
            country: {
                key:    'Country Code',
                type:   'ISO3'
            }
        }
    }
}

// Enumerated File type loaders load
export const loader = {
    csv:    async function loadCSV(fetch, url){

        const res = await fetch(url);
        const data = await res.text()

        // => Return parsed CSV data as an array
        return  csvParse(data)
    }
}

