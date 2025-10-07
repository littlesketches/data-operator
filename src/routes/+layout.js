/**
 *  LOAD (CLIENT OR SERVER SIDE)
 */

// Classes
import { App }              from '$lib/_core/app/App.svelte';

// Config
import { appConfig }        from '$lib/_core/config/app-config';


// Load data
export async function load({ fetch }) {
    // Init app to store all data operators and data models
    const app = new App(appConfig, fetch)

    // Setup module objects for all "dataModels" and data operator models/editions
    app.module.data = {}
    app.module['data-operator'] = {}
    
    // => Return 
    return { app  };
};