/**
 *  LOAD (CLIENT OR SERVER SIDE)
 */

// Classes
import { App }                          from '$lib/_core/app/App.svelte';
import { DataSonification }             from '$src/lib/module/data-operator/model/ds-86/operator/DataSonification.svelte.js';
import { DataModel_IDMC as DataModel}   from '$lib/module/data-operator/data/idmc//DataModel.svelte.js';

// Config
import { appConfig }        from '$lib/_core/config/app-config';

// Custom Data Operator model config
import { keyguide }         from '$src/lib/module/data-operator/core/config/ui/standard/keyguide.js';
import { punchFX }          from '$src/lib/module/data-operator/core/config/ui/standard/fx-config.js';
import { scaleConfig }      from '$src/lib/module/data-operator/model/ds-86/operator/config/scale-config.js';
import { groupConfig }      from '$src/lib/module/data-operator/model/ds-86/operator/config/group-config.js';
import { groupPartPresets } from '$src/lib/module/data-operator/model/ds-86/operator/config/part-config.js';

/**
 *  CUSTOM DATA OPERATOR CONFIG & MODEL PROP 
 */

// 1. Data operator model name (matched to route)
const modelName = 'ds-86'       

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
    // i. Init/get app and reference sonification for +layout.svelte
    const app = new App(appConfig, fetch)
    let sonification

    // ii. Init models 
    if(app.module.data[modelName] === undefined && app.module['data-operator'][modelName] === undefined){
        // a. Init data model
        const model  = app.module.data[modelName] = new DataModel(app, fetch, scaleConfig)
        await model.init()  // Load data (async) => must be initialised prior to sonification init

        // b. Init data sonification model
        sonification = app.module['data-operator'][modelName] = new DataSonification(app, model, config) 
    } 

    // => Return 
    return { url, app, modelName, sonification, operatorConfig };
};