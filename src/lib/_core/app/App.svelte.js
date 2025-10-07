/**   
 *   -----------------
 *   RHIZOME APP CLASS
 *   -----------------
 *   - Refer to app.md for detailed documentation
 *   - Designed to be instantiated on load (i.e. in +page.js or layout.js); and to serve as a 'framework' to connect 'data' models (as 'module apps'), see App.md):
 *   - The instantiated App instance is made available to components via the "getApp.js" function
 *   - Note: the sub-applications are referred to as 'module apps' (i.e. "lib/module/xxx", "components/module/xxx" etc.).
 */

export class App{

    ////////////////
    //// FIELDS ////
    ////////////////

    state = $state()

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(appConfig, fetch){ // accepts a config file (see also, appConfig.js)  and SvelteKit version of fetch (for compatibility and use in async fetch calls)   

        /* ----- SINGLETON PATTERN ---- */
        if (this.constructor.singleton) {

            return this.constructor.singleton   
        }
        this.constructor.singleton = this;      // Singleton reference

        /* ----- INIT CORE PROPS ----- */
        // I. Store app config prop
        this.config = appConfig

        // II. Data inputs
        this.data = {
            global: {},
            module: {}
        }

        // III. Global App State (app and module level)
        this.state = {
            global: {
                device: {
                    screen: {}
                }, 
                urlParams: undefined
            },      
            module: {}
        }

        /* ----- INIT MODULE AND INIT PROPS ----- */
        // IV. Module apps
        this.module = {
}

        // Utilities
        this.utils = {
            fetch,           // Store SvelteKit version of fetch  
        }
    }
}