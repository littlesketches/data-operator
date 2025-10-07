/**
 *  LOAD (CLIENT OR SERVER SIDE)
 */

// Classes
import { App }              from '$lib/_core/app/App.svelte';
import { DataModel_OE }     from '$lib/module/data-operator/data/open-electricity/DataModel.svelte.js';
import { DataSonification } from '$lib/module/data-operator/model/oe-10/DataSonification.svelte.js';

// Config
import { appConfig }        from '$lib/_core/config/app-config';
import { scaleConfig }      from '$lib/module/data-operator/model/oe-10/config/scale-config.js';

// Custom Data Operator model config
import { keyguide }         from '$lib/module/data-operator/core/config/ui/instant-fun/keyguide.js';
import { punchFX }          from '$lib/module/data-operator/core/config/ui/instant-fun/fx-config.js';
import { groupConfig }      from '$lib/module/data-operator/model/oe-10/config/group-config.js';
import { groupPartPresets } from '$lib/module/data-operator/model/oe-10/config/part-config.js';

/**
 *  CUSTOM DATA OPERATOR CONFIG & MODEL PROP 
 */

// 1. Data operator model name (matched to route)
const modelName = 'oe-10'       

// 2. Operator config object 
const operatorConfig = {
    modelName,
    theme:          'ko-ii',        // Specify theme
    ui: {
        type:       'std',      // Specify UI
        keyguide,
        punchFX
    }
}

// 3. Model specific config object
const config = {
    group:      groupConfig,            // Group configuration: choices of preset data series choices
    fx:         punchFX,                // Model-specific Punch FX 
    preset: {
        C:      groupPartPresets        // Group C preset part 1&2 patterns
    }   
}


// => Load function
export async function load({ fetch, url }) {
    // i. Init/get app 
    const app = new App(appConfig, fetch)

    // ii. Init models 
    if(app.module.data[modelName] === undefined && app.module['data-operator'][modelName] === undefined){
        // a. Init data model
        const model  = app.module.data[modelName] = new DataModel_OE(app, fetch, scaleConfig)
        await model.init()  // Load data (async) => must be initialised prior to sonification init

        // b. Init data sonification model
        const sonification = app.module['data-operator'][modelName] = new DataSonification(app, model, config) 
    } 

    // iii. Reference sonification for +layout.svelte
    const sonification =  app.module['data-operator'][modelName] 

    // => Return 
    return { url, app, modelName, sonification, operatorConfig };
};