/**
 *  DATA MODEL CLASS EXTENDED FOR IDMC GLOBAL INTERNAL DISPLACEMENT DATASET
 *  - Custom data load/parse and transformation: model, schema
 *  - Uses global timing config
 *  - Data-specific proper and aggregation map
 *  - Accepts scaleConfig to prepare DataModel instances for use with different 'edition'/'instrument' configurations
 */

// Libs and utils
import * as d3              from 'd3'
import { weightedBins }     from '../../core/js/utils'

// Classes 
import { DataModel }        from '$lib/module/data-operator/core/js/DataModel.svelte'

// Config
import { idmcTableUrls }    from './config/data-urls'
import { iso3map }          from '../_shared-config/iso3-codes'
import { timingConfig }     from '$lib/module/data-operator/core/config/global/timing-config'

// Private variable
let scaleConfig


// => DataModel
export class DataModel_IDMC extends DataModel{

    ////////////////
    //// FIELDS ////
    ////////////////

    state      = $state()

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app, _fetch, _scaleConfig){

        super(app, _fetch)
        
        scaleConfig = _scaleConfig  // Assign custom scale config to private variable for use in data modelling
    }

    ///////////////////////////
    ////  PRIVATE METHODS  ////
    ///////////////////////////

    async #loadData(){
        // i. Load and parse CSV data 

        const inputData = {}

        // Object.entries(idmcTableUrls).forEach( async([tableName, url]) => {
        for(const [tableName, url] of Object.entries(idmcTableUrls)){
            const res = await this.fetch(url);

            if (!res.ok) throw new Error('Failed to fetch');
            let responseData = await res.text();

            inputData[tableName]  = d3.tsvParse(responseData)

            // ii. Cast number and date types
            inputData[tableName].forEach( row => {
                Object.entries(row).forEach(([key, value]) => {
                    if(!isNaN(+value)) row[key] = +value        // Parse numbers
                    if(key.slice(0,4).toLowerCase() === 'date') row.date =  d3.timeParse("%Y-%m-%d")(value)        // Parse date to day and time
                })
            })

        }

        // => Return input data
        return inputData

    }
  
    #extractSchema(inputData){
        // i. Init schema obj
        const schema = {
            list: {
                countryCodes:   [...new Set(inputData.idp_volumes.map(d => d.ISO3))].sort(),     // Scene index
                availableYears: [...new Set(inputData.disaster_events.map(d => d.Year).concat(inputData.idp_volumes.map(d => d.Year)))].sort(),
            }, 
            map: {
                countryMeta:    iso3map,    
                series: {
                    label: {
                        annualConflict:     { label: "Conflict p.a."},
                        annualDisaster:     { label: "Disaster p.a."},
                        annualTotal:        { label: "Total p.a."},
                        stockConflict:      { label: "Conflict IDPs"},
                        stockDisaster:      { label: "Disaster IDPs"},
                        stockTotal:         { label: "Total displaced "},
                        disasterCount:      { label: "No. disasters"}, 
                    }
                }    
            }
        }

        // ii. Add country index
        schema.list.countryIndex = schema.list.countryCodes.map((d, i) => i)

        // => Return schema
        return schema
    }

    #transformData(inputData){
        // 1. Group input data into countries 
        const modelData = this.schema.list.countryCodes.map(ISO3 => { 
            const name = this.schema.map.countryMeta[ISO3]?.name, 
                eventData = d3.group(inputData.disaster_events, d => d.ISO3).get(ISO3),
                volumeData  = inputData.idp_volumes.filter(d => d.ISO3 === ISO3)

            const data = volumeData ? volumeData.map( d => {
                // i. Get year and disaster events
                const year = d.Year,
                    evData = eventData?.filter(d => d.Year === year)

                // ii. Get and shape disaster event data
                const disasterEvents = evData?.map(d=> {
                    return {
                        date:   d.date,
                        volume:  d['Disaster Internal Displacements (Raw)'],
                        hazard: {
                            type:       d['Hazard Type'],
                            subType:    d['Hazard Sub Type']
                        }
                    }
                })

                // iii. => Return object with all data
                return {
                    year:   d.Year,
                    stock: {
                        conflict:   d['Conflict Stock Displacement'] ?? 0,
                        disaster:   d['Disaster Stock Displacement (Raw)'] ?? 0
                    },
                    annual: {
                        conflict:   d['Conflict Internal Displacements (Raw)'] ?? 0,
                        disaster:   d['Disaster Stock Displacement (Raw)'] ?? 0
                    },
                    disasterEvents
                }
            }) : []

            //=> Return 
            return { ISO3, name, data }
        })

        // => Return data 
        return modelData
    }

    #createDataScenes(modelData){
        console.log({modelData, scaleConfig, timingConfig, schema: this.schema})
        // i. Init sceneData array
        const sceneData = []

        // ii. Variables for timing and series
        const dataPointsPerMeasure = this.schema.list.availableYears.length
        const timingInterval = {    // Interval mapped to bins
            '1m': 1,    '2n': 2,    '4n': 4,   '8n': 8,     '16n': 16,     
        }

        // 2. Transform data into scenes
        const model = modelData.map( d => {
            const ISO3 = d.ISO3
            // i. Init model props
            const intervalData = {},
                scale = {},
                scaledData = {}     

            // ii. Get Reference IDP data: seriesData for all available years
            const disasterEvents = this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.disasterEvents),
                disasterCount = disasterEvents.map(d => d ? d.length: 0)

            const seriesData = {
                annualConflict:     this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.annual.conflict || 0),
                annualDisaster:     this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.annual.disaster || 0),
                annualTotal:        this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.annual.conflict + d.data.filter(e => e.year === year)[0]?.annual.disaster || 0),
                stockConflict:      this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.stock.conflict || 0),
                stockDisaster:      this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.stock.disaster || 0),
                stockTotal:         this.schema.list.availableYears.map(year => d.data.filter(e => e.year === year)[0]?.stock.conflict + d.data.filter(e => e.year === year)[0]?.stock.disaster || 0),
                disasterEvents,      
                disasterCount
            }

            // iii. Transform data into timing intervals
            Object.entries(timingInterval).forEach( ([interval, bins]) => {

                // i. Interval data (weighted bins)
                intervalData[interval] = {}
                Object.entries(seriesData).forEach( ([seriesName, array]) => {
                    intervalData[interval][seriesName] = weightedBins(array, bins)    
                })

                // ii. Create data scales and scaled data
                scale[interval] = {}    
                scaledData[interval] = {}

                for( let [group, obj] of Object.entries(scaleConfig)){

                    scale[interval][group] = {}
                    scaledData[interval][group] = {}

                    switch(group){
                        case "A": case "B": 
                            const groupScale = scaleConfig[group]

                            for(let [paramName, scaleParam] of Object.entries(obj)){
                                scale[interval][group][paramName] = {}
                                scaledData[interval][group][paramName] = {}

                                // I. Create scales 
                                for (let [seriesName, d] of Object.entries(seriesData)) {
                                    // a. Add scale for key
                                    const dataScale = scale[interval][group][paramName][seriesName] =  d3.scaleLinear()
                                                                                .domain(d3.extent(intervalData[interval][seriesName]))
                                                                                .range([groupScale[paramName].min, groupScale[paramName].max])
                                    // b. Add scaled data
                                    scaledData[interval][group][paramName][seriesName] = intervalData[interval][seriesName].map( d => {
                                        return {
                                            value:          dataScale(d),
                                            quantized:      Math.round(dataScale(d))
                                        }
                                    })
                                }
                            }
                            break

                        case "C":
                            for (let [part, d] of Object.entries(obj)){

                                scale[interval][group][part] = {}
                                scaledData[interval][group][part] = {}

                                const partScale = scaleConfig[group][part]
                                
                                for(let [paramName, scaleParam] of Object.entries(d)){
                                    scale[interval][group][part][paramName] = {}
                                    scaledData[interval][group][part][paramName] = {}

                                    // I. Create scales 
                                    for (let [seriesName, d] of Object.entries(seriesData)) {
                                        // a. Add scale for key
                                        const dataScale = scale[interval][group][part][paramName][seriesName] =  d3.scaleLinear()
                                                                                            .domain(d3.extent(intervalData[interval][seriesName]))
                                                                                            .range([partScale[paramName].min, partScale[paramName].max])
                                    
                                        // b. Add scaled data
                                        scaledData[interval][group][part][paramName][seriesName] = intervalData[interval][seriesName].map( d => {
                                            return {
                                                value:          dataScale(d),
                                                quantized:      Math.round(dataScale(d))
                                            }
                                        })
                                    }
                                }
                            }
                            break
                    }
                }

            })


            // => Return model object 
            return  {
                meta:        this.schema.map.countryMeta[ISO3],
                intervalData,
                scale,
                scaledData,
            }

        })


        // => Return model object
        return model

    }


    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async init(){
        // i. Get input data 
        this.input = await this.#loadData()

        // ii. Extract schema for UI and visuals
        this.schema = this.#extractSchema(this.input)

        // iii. Transform data for sonification
        this.model = this.#transformData(this.input)

        // ii. Transform data for sonification
        this.scene = this.#createDataScenes(this.model)
    };

    getSceneLabel(sceneIndex){
        // Get country name as label
        const countryCode =  this.schema.list.countryCodes[sceneIndex],
            countryName = this.schema.map.countryMeta[countryCode]?.name
        // => Return 
        return countryName
    }
};