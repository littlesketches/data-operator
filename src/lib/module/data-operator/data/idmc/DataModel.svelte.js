
/**
 *  DATA MODEL CLASS EXTENDED FOR OPEN ELECTRICITY DATA
 *  - Custom data load/parse and transformation: model, schema
 *  - Uses global timing config
 *  - Data-specific proper and aggregation map
 *  - Accepts scaleConfig to prepare DataModel instances for use with different 'edition'/'instrument' configurations
 */

// Libs and utils
import * as d3              from 'd3'
// Classes 
import { DataModel }        from '$lib/module/data-operator/core/js/DataModel.svelte'
// Config
import { timingConfig }     from '$lib/module/data-operator/core/config/global/timing-config'
import { dataPropMap, 
    dataAggregationMap }    from './config/data-maps'

// Private variable
let scaleConfig

// => DataModel
export class DataModel_OE extends DataModel{

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
        const res = await this.fetch(this.app.config.data['open-electricity'].url);

        if (!res.ok) throw new Error('Failed to fetch');
        let responseData = await res.text();
        const inputData  = d3.csvParse(responseData)

        // ii. Cast number and date types
        inputData.forEach( row => {
            Object.entries(row).forEach(([key, value]) => {
                if(!isNaN(+value)) row[key] = +value        // Parse numbers
                if(key === 'date') row.date =  d3.timeParse("%d/%m/%Y %H:%M")(value)        // Parse date to day and time
            })
        })

        // => Return input data
        return inputData
    }
  
    #createDataScenes(inputData){

        /**
         *  CUSTOM DATA TRANSFORMATION AND SHAPING
         *  - For https://openelectricity.org.au/ 30min interval grouper data
         */

        // 1. Group input data into days ('composition' blocks)
        const daysMap = d3.group(inputData, d => d3.timeDay.floor(d.date));

        // 2. Transform data for each full day "model"
        const model = Array.from(daysMap, ([day, values]) => {
            // a. Ensure data is for a full day
            if (values.length !== 48) return null;      

            // b. Init model props
            const intervalData = {},
                scale = {},
                scaledData = {}          

            // c .Interval types and config: custom defined for dataModel & input data schema
            const timePerMeasure = 24 * 60  // Minutes in the day

            const timingInterval = {
                '1m':  timePerMeasure,                                     // "1m": Bar period   (whole day)
                '2n':  timePerMeasure / timingConfig.beats.perBar * 2,     // "2n"  2 x Beat period to give 4 beats per bar
                '4n':  timePerMeasure / timingConfig.beats.perBar,         // "4n" Beat period to give 4 beats per bar "4n"
                '8n':  timePerMeasure / timingConfig.beats.perBar / 2,     // "8n" 2 x Bar period 
                '16n': timePerMeasure / timingConfig.steps.perBar,         // "16n" Step period to give 16 steps "16n"
            }

            // d. Create interval data and derived scales/scaled data
            Object.entries(timingInterval).forEach( ([interval, mins]) => {
                // i. Roll up daily data to the interval
                const rollupData = d3.rollup(
                    values, // (1). Data
                    v => {  // (2). Aggregation method
                        const result = {};
                        for (const [origKey, d] of Object.entries(dataPropMap)) {
                            const newKey = d.alias, isMW = origKey.slice(-2) === "MW"
                            // i. For energy volume (MW) => convert to MWh
                            if(isMW) {
                                const sumMW = v.reduce((acc, d) => acc + d[origKey], 0);    // Sum MW per 1/2 hr
                                result[newKey] = sumMW / (timingInterval[interval] / 60);   // convert MW → MWh in 90min
                            // ii. Otherwise average
                            } else {
                                result[newKey] = d3.mean(v.map( d => d[origKey]))
                            }
                        }   
                        // => Return rollup result
                        return result;
                    },
                    d => {  // (3). Specify to roll up to 90mins: find which 'step index' each datums data belongs to
                        const mins = d.date.getHours() * 60 + d.date.getMinutes();
                        return Math.floor(mins / timingInterval[interval]); 
                    }
                );

                // ii. Add ratios and aggregation prop groups
                rollupData.forEach(d => {
                    // Add aggregation 
                    for(let [newKey, obj] of Object.entries(dataAggregationMap)){
                        d[newKey] = d3.sum(obj.series.map(e => d[e]))                  
                    }
                    // Add aggregation ratios
                    d['ratio-renewable'] = d.renewable / d.totalExBattery
                    d['ratio-fossil']    = d.fossil / d.totalExBattery
                    d['ratio-solar']     = d.solar / d.totalExBattery
                    d['ratio-coal']      = d.coal / d.totalExBattery
                    d['ratio-gas']       = d.gas / d.totalExBattery

                    // Add ratios for all energy series
                    for(let [origKey, obj] of Object.entries(dataPropMap)){
                        const newKey = obj.alias, isMW = origKey.slice(-2) === "MW"
                        if(isMW) {
                            d[`ratio-${newKey}`] = d[newKey] / d.totalExBattery
                        } 
                    }
                })

                // iii. Convert rollupData to array of intervalData
                intervalData[interval] = Array.from(rollupData, ([step, props]) => ({ step, ...props }))
// console.log(rollupData, intervalData)
                // iv. Create scale for each property from their extent
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

                                // I. Create scales and scaled data
                                for (let [key, d] of Object.entries({...dataPropMap, ...dataAggregationMap})) {
                                    key = d.alias ?? key
                                    // a. Add scale for key
                                    scale[interval][group][paramName][key] =  d3.scaleLinear()
                                                                                .domain(d3.extent(intervalData[interval], d => d[key]))
                                                                                .range([groupScale[paramName].min, groupScale[paramName].max])
                                    // b. Add scale for ratio version 
                                    if(intervalData[interval][0][`ratio-${key}`]){
                                        scale[interval][group][paramName][`ratio-${key}`] =  d3.scaleLinear()
                                                                .domain(d3.extent(intervalData[interval], d => d[`ratio-${key}`]))
                                                                .range([groupScale[paramName].min, groupScale[paramName].max])
                                    
                                    }

                                    // c. Create scaledData: for each data prop
                                    scaledData[interval][group][paramName][key] = intervalData[interval].map( arr => arr[key])
                                        .map(d => {
                                           return {
                                                value:          scale[interval][group][paramName][key](d),
                                                quantized:      Math.round(scale[interval][group][paramName][key](d))
                                            }
                                        })
                                    // d. Create scaledData: for ratio data prop
                                    if(intervalData[interval][0][`ratio-${key}`]){
                                        scaledData[interval][group][paramName][`ratio-${key}`] = intervalData[interval].map( arr => arr[`ratio-${key}`])
                                            .map(d => {
                                                return {
                                                    value:          scale[interval][group][paramName][`ratio-${key}`](d),
                                                    quantized:      Math.round(scale[interval][group][paramName][`ratio-${key}`](d))
                                                }
                                            })   
                                    }
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

  
                                    // I. Create scales and scaled data
                                    for (let [key, d] of Object.entries({...dataPropMap, ...dataAggregationMap})) {
                                        key = d.alias ?? key
                                        // a. Add scale for key
                                        scale[interval][group][part][paramName][key] =  d3.scaleLinear()
                                                                                            .domain(d3.extent(intervalData[interval], d => d[key]))
                                                                                            .range([partScale[paramName].min, partScale[paramName].max])
                                        
                                        // b. Add scale for ratio version 
                                        if(intervalData[interval][0][`ratio-${key}`]){
                                            scale[interval][group][part][paramName][`ratio-${key}`] = d3.scaleLinear()
                                                                                                        .domain(d3.extent(intervalData[interval], d => d[`ratio-${key}`]))
                                                                                                        .range([partScale[paramName].min, partScale[paramName].max])
                                        }


                                        // c. Create scaledData: for each data prop
                                        scaledData[interval][group][part][paramName][key] = intervalData[interval].map( arr => arr[key])
                                            .map(d => {
                                            return {
                                                    value:          scale[interval][group][part][paramName][key](d),
                                                    quantized:      Math.round(scale[interval][group][part][paramName][key](d))
                                                }
                                            })
                                        // d. Create scaledData: for ratio data prop
                                        if(intervalData[interval][0][`ratio-${key}`]){
                                            scaledData[interval][group][part][paramName][`ratio-${key}`] = intervalData[interval].map( arr => arr[`ratio-${key}`])
                                                .map(d => {
                                                    return {
                                                        value:          scale[interval][group][part][paramName][`ratio-${key}`](d),
                                                        quantized:      Math.round(scale[interval][group][part][paramName][`ratio-${key}`](d))
                                                    }
                                                })   
                                        }

                                    }




                                    // // II. Create scaledData 
                                    // scaledData[interval][group][part][paramName] = intervalData[interval].map(d => {
                                    //     const obj = {}
                                    //     // a. Add scaled data for each data prop
                                    //     for (let [key, e] of Object.entries({...dataPropMap, ...dataAggregationMap})) {
                                    //         key = e.alias ?? key
                                    //         obj[key] = {
                                    //             value:          scale[interval][group][part][paramName][key](d[key]),
                                    //             quantized:      Math.round(scale[interval][group][part][paramName][key](d[key]))
                                    //         }

                                    //         // b. Add scaled data for ratio version 
                                    //         if(intervalData[interval][0][`ratio-${key}`]){
                                    //             obj[`ratio-${key}`] = {
                                    //                 value:          scale[interval][group][part][paramName][`ratio-${key}`](d[`ratio-${key}`]),
                                    //                 quantized:      Math.round(scale[interval][group][part][paramName][`ratio-${key}`](d[`ratio-${key}`]))
                                    //             }
                                    //         }
                                    //     }

                                    //     // => Return obj
                                    //     return obj;
                                    // })
                                }
                            }
                            break
                    }
                }     
            })

            // => Return
            return { day, intervalData, scale, scaledData}
        }).filter(d => d !== null);

        // => Return model object
        return model.reverse()
    }

    #extractSchema(inputData, modelData){
        // Init schema obj
        const schema = {
            list: {
                dayIndex:   [...modelData.keys()],  
                series:     {}
            }, 
            map: {
                dayIndex:       Object.fromEntries(modelData.map((obj, i) => [i, obj.day])),
                series:     {
                    electricity:    Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => d[0] !== 'price-per-MWh' )),
                    renewable:      Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => dataAggregationMap.renewable.series.includes(d[0]) )),
                    solar:          Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => dataAggregationMap.solar.series.includes(d[0]) )),
                    fossil:         Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => dataAggregationMap.fossil.series.includes(d[0]) )),
                    coal:           Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => dataAggregationMap.coal.series.includes(d[0]) )),
                    other:          {
                        ...Object.fromEntries(Object.entries(dataPropMap).map( ([origName, d]) => [d.alias, {label: d.label, origName }]).filter( d => d[0] === 'price-per-MWh' )),
                        'ratio-renewable':  {label: 'renew. %'},
                        'ratio-fossil':     {label: 'fossil %' },
                        'ratio-solar':      {label: 'solar %'},
                        'ratio-coal':       {label: 'coal %'},
                        'ratio-gas':        {label: 'gas %'},
                    }  // Price and ratio
                }
            }
        }

        // i. Add series lists        
        Object.entries(schema.map.series).forEach( ([group, map]) => {         
            // Add lists
            schema.list.series[group] = Object.keys(map)
            // Add electricity ratios
            if(group === 'electricity'){
                Object.entries(map).forEach(([key, d]) =>  schema.map.series.other[`ratio-${key}`] = {label: `${d.label} %`})
            }
        })

        // ii Add series map 'all
        schema.map.series.all = {
            ...schema.map.series.electricity,
            ...schema.map.series.other,
            ...dataAggregationMap
        }

        // => Return schema
        return schema
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async init(){
        // i. Get input data 
        this.input = await this.#loadData()

        // ii. Transform data for sonification
        this.scene = this.#createDataScenes(this.input)

        // iii. Extract schema for UI and visuals
        this.schema = this.#extractSchema(this.input, this.scene)
    };

    getSceneLabel(sceneIndex){
        return d3.timeFormat("%d-%m-%y")(this.scene[sceneIndex].day)
    }
};