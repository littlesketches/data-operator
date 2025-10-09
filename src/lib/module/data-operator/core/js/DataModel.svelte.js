
/**
 *  DATA MODEL BASE CLASS: 
 *  - Base class for Sonification X StrudelUtility DataModel class
 *  - Provides template for strogin input and transformed data, and extracted/manually defined schema
 *  - Extended DataModels contains specific transformation and schema to match the DataSonification class and Data Operator (Svelte) components
 */



// Private variable
let fetch           // Sveltekit fetch assigned on construction 

// => DataModel
export class DataModel{

    ////////////////
    //// FIELDS ////
    ////////////////

    state = $state()

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app, _fetch){

        /* ----- BASE CLASS STRUCTURE ---- */
        // Store svelte fetch app reference
        fetch = _fetch
        this.app = app
        this.fetch = _fetch

        // Input and transformed data
        this.input   = undefined

        // Data model, schema and output by composition "group"
        this.schema = undefined
        this.model  = undefined         // Used for storing data modelling objects (prior to scene output)
        this.scene  = undefined         // Used for creating the outputed 'data scenes' for the Data Operator

    }

    ///////////////////////////
    ////  PRIVATE METHODS  ////
    ///////////////////////////

    async #loadData(){ return null}
 
    #transformData(){ return null }

    #createDataScenes(){ return null }

    #extractSchema(){  return null}

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async init(){
        // i. Get input data 
        this.input = await this.#loadData()

        // ii. Perform data transformations/modelling
        this.model = this.#transformData()

        // iii.a. Transform data for sonification
        this.scene = this.#createDataScenes(this.input)

        // iii.b. Extract schema for UI and visuals [may be before or after transformData]
        this.schema = this.#extractSchema(this.input, this.model)

    };

};