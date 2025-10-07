/**
 *  Wrapper to initialise and then (subsequently) return the App class singleton
 *   - 'config' is appConfig and/or modified by url params
 *   - Svelte version of fetch is passed in for use with locally hosted data/config. 
 */

// Classes
import { App }  from "./App.svelte";

export function getApp(config, fetch, extConfigData){
    const app = new App(config, fetch)  
    return app
}


