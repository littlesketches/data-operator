<!-- DATA OPERATOR +PAGE.SVELTE-->
<script>
    // Components
    import DataOperator         from "$components/module/data-operator/DataOperator.svelte";
    import KeyboardUI           from "$components/module/data-operator/ui/KeyboardUI.svelte";

    // Classes
    import { StrudelUtility }   from '$lib/module/data-operator/core/js/StrudelUtility.svelte';
    import { Composition }      from '$lib/module/data-operator/core/js/Composition.svelte';

    // Props
    let {data} = $props()


    /**
     *  I. GET APP AND SONIFICATION INSTANCES (+layout.js) + INIT STRUDEL MODULE (client-side only)
     */

    const app           = data.app,
        operatorConfig  = data.operatorConfig, 
        sonification    = app.module['data-operator'][operatorConfig.modelName],
        dataModel       = app.module.data[operatorConfig.modelName],
        strudel         = app.module.strudel = new StrudelUtility(app)

    // Add handle methods to sonification
    sonification.addHandlers(strudel)           // Base class handlers
    sonification.addCustomHandlers()            // "Edition-specfic" handlers


    /**
     *  II. SONIFICATION COMPOSITION composition associated with sonification
     */

    const composition  = new Composition(app, sonification, strudel)

    // => Run composition on $effect
    $effect( () => {
        composition.schedule()
    })

    /**
     *  III. MODEL PROP 
     */

    // Create "model"  object for passing to components
    const model = {app, dataModel, sonification, strudel, composition, operatorConfig}

</script>



<!-- HTML COMPONENT MARKUP-->
<div class = 'wrapper'>
    <DataOperator {model}/>
</div>


<!-- STYLES-->
<style>
    .wrapper{
        width:              100vw;
        height:             100dvh;
        display:            flex;
        justify-content:    center;
        background-color:  #171616;
    }
</style>



