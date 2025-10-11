
/**
 *  DATA MODEL CLASS EXTENDED FOR CLIMATE WATCH DATA
 *  - Custom data load/parse and transformation: model, schema
 *  - Uses global timing config
 *  - Data-specific proper and aggregation map
 *  - Accepts scaleConfig to prepare DataModel instances for use with different 'edition'/'instrument' configurations
 */

// Libs and utils
import * as d3                  from 'd3'
import { weightedBins }         from '../../core/js/utils'

// Classes 
import { DataModel }            from '$lib/module/data-operator/core/js/DataModel.svelte'

// Config
import { timingConfig }         from '$lib/module/data-operator/core/config/global/timing-config'
import { rootPath, 
    staticDataStructure, 
    loader }                    from "./config/static-data"
import { iso3map }              from '../_shared-config/iso3-codes'
import { adaptationDataMeta }   from "./config/data-meta-info"

// Private variable
let scaleConfig


// => DataModel
export class DataModel_CW extends DataModel{

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

    async #loadData() {
        // i. Init data object
        const inputData = {}

        // ii. Load and prase data all staticData sources
        for(const [folderName, fileObj] of Object.entries(staticDataStructure)){
        
            inputData[folderName] = {}
        
            for(const [fileName, fileMeta] of Object.entries(fileObj)){
                // a. Load data from local files
                const url = `${rootPath}/${folderName}/${fileName}.${fileMeta.type}`,
                    data =  await loader[fileMeta.type](this.fetch, url)

                // b. Parse text to numbers and trim text
                for(const dataObj of Object.values(data)){
                    for(let [key, value] of Object.entries(dataObj)){

                        if(!isNaN(value) && value!== null ) {
                        dataObj[key] = +value
                        } else {
                            dataObj[key] = value.trim()
                        }
                    }
                }

                // c. Add data and meta 
                inputData[folderName][fileName] = {
                    data,
                    meta: fileMeta
                }
            }
        }

        // => Return data object
        return inputData
    }

    #extractSchema(inputData){
        // i. Init schema obj
        const schema = {
            list: {
                countryCodes: [...new Set(this.input['historical-emissions']['CW_HistoricalEmissions_ClimateWatch'].data
                                .map(d => d.Country))]
                                .filter(d => d !== 'EUU' && d !== 'WORLD'),     // Scene index
                series:     {},
                availableYears: Object.keys(this.input['historical-emissions']['CW_HistoricalEmissions_ClimateWatch'].data[0])
                                .filter( d => !isNaN(d)).map(d => +d),
                metricType:    [
                    'annual', 
                    'annualPerCapita', 
                    // 'annualPerGDP', 
                    'cumulative', 
                    'cumulativePerCapita', 
                    // 'cumulativePerGDP'
                ],
                ghgType:    ['net', 'source', 'sink', 'gross']

            }, 
            map: {
                countryMeta:    iso3map        
            }
        }

        // ii. Add country in dex
        schema.list.countryIndex = schema.list.countryCodes.map((d, i) => i)

        // => Return schema
        return schema
    }

    #transformData(inputData){

        // i. Init data structure for model (shaped for visualisation/representation)
        const modelData =  {
            adaptation: {
                raw:    inputData['adaptation']['CW_adaptation'].data,
                byCountry: {}
            },
            ghg: {
                raw:   inputData['historical-emissions']['CW_HistoricalEmissions_ClimateWatch'].data
                        .filter(d => d.Gas === 'All GHG' &&  (d.Sector === 'Total excluding LUCF' || d.Sector === 'Land-Use Change and Forestry'))      
                        .filter(d => d.Country !== 'EUU' && d.Country !== 'WORLD'),
                byCountry:  {},
                extent:     {}   // Extent across all countries, all metrics
            },  
            gdp:  {
                raw:        inputData['socio-economics']['CW_gdp'].data,
                byCountry:  {}
            },
            ndc: {
                raw:        inputData['ndc-content']['CW_NDC_data_highlevel'].data,
                byCountry:  {}
            },
            population: {
                raw:        inputData['socio-economics']['CW_population'].data,
                byCountry:  {}
            },
        }

        // ii. Calculate country annual gross, net, sink and source: on total and per capita
        this.schema.list.countryCodes.forEach( countryCode => {

            // a. Init props with obj for each country
            modelData.population.byCountry[countryCode] = {}
            modelData.ghg.byCountry[countryCode] =  (() => {
                //  Init ghg object for all metrics and ghg measure types
                const obj = {}
                this.schema.list.metricType.forEach( metric => {
                    obj[metric] = {}
                    this.schema.list.ghgType.forEach(type => {
                        obj[metric][type] = {}
                    })
                })
                // => Return complete structured obj 
                return obj
            })()

            // b. Get country GHG data
            const totalExLand   = modelData.ghg.raw.filter( d => d.Country === countryCode && d.Sector === "Total excluding LUCF")[0],
                landSector      = modelData.ghg.raw.filter( d => d.Country === countryCode && d.Sector === "Land-Use Change and Forestry")[0]

            // c. Store population
            modelData.population.byCountry[countryCode] = modelData.population.raw.filter( d => d['Country Code'] === countryCode)[0]
            modelData.gdp.byCountry[countryCode] = modelData.gdp.raw.filter( d => d['Country Code'] === countryCode)[0]   

            // d. Add 'gross' emissions and 'sinks'
            const countryDataYears = Object.keys(totalExLand).filter(d => !isNaN(d)).map(d => +d)   // Available years for the country to ensure there is data

            countryDataYears.forEach((year, i) => {
                // a. References (for calc clarity)
                const population        = modelData.population.byCountry[countryCode][year],
                    netAnnual           = modelData.ghg.byCountry[countryCode].annual.net,
                    sourceAnnual        = modelData.ghg.byCountry[countryCode].annual.source,         
                    sinkAnnual          = modelData.ghg.byCountry[countryCode].annual.sink,
                    grossAnnual         = modelData.ghg.byCountry[countryCode].annual.gross,
                    netPerCapita        = modelData.ghg.byCountry[countryCode].annualPerCapita.net,
                    sourcePerCapita     = modelData.ghg.byCountry[countryCode].annualPerCapita.source,
                    sinkPerCapita       = modelData.ghg.byCountry[countryCode].annualPerCapita.sink,
                    grossPerCapita      = modelData.ghg.byCountry[countryCode].annualPerCapita.gross,
                    netCumulative       = modelData.ghg.byCountry[countryCode].cumulative.net,
                    sourceCumulative    = modelData.ghg.byCountry[countryCode].cumulative.source,
                    sinkCumulative      = modelData.ghg.byCountry[countryCode].cumulative.sink,
                    grossCumulative     = modelData.ghg.byCountry[countryCode].cumulative.gross,
                    netCumulativePC     = modelData.ghg.byCountry[countryCode].cumulativePerCapita.net,
                    sourceCumulativePC  = modelData.ghg.byCountry[countryCode].cumulativePerCapita.source,
                    sinkCumulativePC    = modelData.ghg.byCountry[countryCode].cumulativePerCapita.sink,
                    grossCumulativePC   = modelData.ghg.byCountry[countryCode].cumulativePerCapita.gross

                // b. Total calcs with/without landSector available years
                netAnnual[year]         = totalExLand[year] + landSector[year] 
                sourceAnnual[year]      = totalExLand[year] + (landSector[year] > 0 ? landSector[year] : 0)  // Add positive land sector contribution
                sinkAnnual[year]        = landSector[year] <= 0 ? -landSector[year] : 0     
                grossAnnual[year]       = sourceAnnual[year] + sinkAnnual[year]          

                // c. Per capita calcs (all years) in tonnes per person.year
                netPerCapita[year]      = netAnnual[year]    / (isNaN(population)? 1 : population)  * 1000000
                sourcePerCapita[year]   = sourceAnnual[year] / (isNaN(population)? 1 : population)  * 1000000
                sinkPerCapita[year]     = sinkAnnual[year]   / (isNaN(population)? 1 : population)  * 1000000
                grossPerCapita[year]    = grossAnnual[year]  / (isNaN(population)? 1 : population)  * 1000000

                // Init cumulative for "year zero at zero"
                if(i === 0){
                    netCumulative[year]     = sourceCumulative[year]   = sinkCumulative[year]   = grossCumulative[year]   = 0
                    netCumulativePC[year]   = sourceCumulativePC[year] = sinkCumulativePC[year] = grossCumulativePC[year] = 0
                } 
                // d. Cumulative annual: at end of year
                netCumulative[year+1]       = netCumulative[year] + netAnnual[year]
                sourceCumulative[year+1]    = sourceCumulative[year] + sourceAnnual[year]
                sinkCumulative[year+1]      = sinkCumulative[year] + sinkAnnual[year]
                grossCumulative[year+1]     = grossCumulative[year] + grossAnnual[year]

                // e. Cumulative per capita:  at end of year
                netCumulativePC[year+1]     = netCumulativePC[year] + netPerCapita[year]
                sourceCumulativePC[year+1]  = sourceCumulativePC[year] + sourcePerCapita[year]
                sinkCumulativePC[year+1]    = sinkCumulativePC[year] + sinkPerCapita[year]
                grossCumulativePC[year+1]   = grossCumulativePC[year] + grossPerCapita[year]
            })

            // e. Store climate risk scores
            const adaptationData = modelData.adaptation.raw.filter( d => d['country'] === countryCode)[0] 
            modelData.adaptation.byCountry[countryCode] = {
                vulnerabilityScore:     adaptationData.vulnerability,
                vulnerabilityRank:      adaptationData.vulnerability_rank,
                readinessScore:         adaptationData.readiness,
                readinessRank:          adaptationData.readiness_rank,
                climateRiskIndex:       adaptationData.climate_risks,
                climateRiskRank:        adaptationData.climate_risks_rank,
                povertyPopPercent:      adaptationData.poverty_14,
            }

            // f. Store national determined contributions (NDC) data
            modelData.ndc.byCountry[countryCode] = {
                dates:  modelData.ndc.raw
                        .filter( d => d['ISO'] === countryCode)
                        .map(d =>  {
                            return {
                                ndc_date:       d3.timeParse("%m/%d/%Y")(d.ndc_date),
                                mitigation:     d.mitigation_contribution_type,
                                adaptation:     d.adaptation_label,
                                conditionality: d.conditionality_label,
                                document:       d.document,
                                indc_summary:   d.indc_summary,
                                target:         d.target
                            }
                        })
    
            }
        })

        // iii. Add extent data for scales (across all years)
        const allCountryGHG = Object.values(modelData.ghg.byCountry)

        this.schema.list.metricType.forEach( metric => {
            modelData.ghg.extent[metric] = {}
            this.schema.list.ghgType.forEach(type => {
                const ghgData =  allCountryGHG.map(d => Object.values(d[metric][type])).flat()
                modelData.ghg.extent[metric][type] = d3.extent(ghgData)
            })
        })

        // => Return 
        return modelData
    }

    #createDataScenes(modelData){
        console.log({modelData, scaleConfig, timingConfig})

        // i. Init sceneData array
        const sceneData = []

        // ii. Variables for timing and series
        const dataPointsPerMeasure = this.schema.list.availableYears.length
        const timingInterval = {    // Interval mapped to bins
            '1m': 1,    '2n': 2,    '4n': 4,   '8n': 8,     '16n': 16,     
        }

        // iii. Build model of each country as "scene"
        const model = this.schema.list.countryCodes.map( (countryCode, countryIndex) => {

            // i. Init model props
            const intervalData = {},
                scale = {},
                scaledData = {}     

            // ii. Reference country GHG and adaption data
            const ghg       = modelData.ghg.byCountry[countryCode],
                adaptation  = modelData.adaptation.byCountry[countryCode]

            const seriesData = {
                netGhg:               Object.values(ghg.annual.net),
                sourceGhg:            Object.values(ghg.annual.source),
                sinkGhg:              Object.values(ghg.annual.sink),
                netGhg_perCapita:     Object.values(ghg.annualPerCapita.net),
                sourceGhg_perCapita:  Object.values(ghg.annualPerCapita.source),
                sinkGhg_perCapita:    Object.values(ghg.annualPerCapita.sink),
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
                meta:        this.schema.map.countryMeta[countryCode],
                intervalData,
                scale,
                scaledData,
            }
        })

        // => Return 
        return model
    }


    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async init(){
        // i. Get input data 
        this.input =  await this.#loadData()
        
        // ii. Extract schema for UI and visuals
        this.schema = this.#extractSchema(this.input)

        // iii. Transform data for sonification
        this.model = this.#transformData(this.input)

        // iii. Transform data for sonification
        this.scene = this.#createDataScenes(this.model)

        console.log(this)
    };

    getSceneLabel(sceneIndex){

        // Get country name as label
        const countryCode =  this.schema.list.countryCodes[sceneIndex],
            countryName = this.schema.map.countryMeta[countryCode]?.name

        // => Return 
        return countryName
    }
};