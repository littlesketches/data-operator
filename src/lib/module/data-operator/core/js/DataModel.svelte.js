
/**
 *  DATA MODEL BASE CLASS: 
 *  - Base class for Sonification X StrudelUtility Class
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
        this.model  = undefined        
    }

    ///////////////////////////
    ////  PRIVATE METHODS  ////
    ///////////////////////////

    async #loadData(){ return null}
 
    #transformData(inputData){ return null }

    #extractSchema(inputData, modelData){  return null}

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async init(){
        // i. Get input data 
        this.input = await this.#loadData()

        // ii. Transform data for sonification
        this.model = this.#transformData(this.input)

        // iii. Extract schema for UI and visuals
        this.schema = this.#extractSchema(this.input, this.model)

    };
};