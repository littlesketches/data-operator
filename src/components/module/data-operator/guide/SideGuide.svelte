<!-- SIDE-BY-SIDE GUIE-->
<script>
    // Components
    import QuickStart   from "../docs/QuickStart.svelte";
    import OE10         from "../docs/sonifcation-notes/OE-10.svelte";
    import OE10DFAM     from "../docs/sonifcation-notes/OE-10-DFAM.svelte";
    import OE10AMBI     from "../docs/sonifcation-notes/OE-10-AMBI.svelte";
    // Props
    let { viewGuide, guideType, model} = $props() 

    // Models
    const {operatorConfig} = model
    const doModel = operatorConfig.modelName


</script>


<!-- HTML COMPONENT MARKUP-->
<section class:active={viewGuide}>
    {#if guideType === 'quickStart'}
    <QuickStart isSideGuide = {true}/>
    {:else if  guideType === 'sonification'}
        {#if doModel === 'oe-10'}
        <OE10  isSideGuide = {true}/>
        {:else if  doModel === 'oe-10-dfam'}
        <OE10DFAM  isSideGuide = {true}/>
        {:else if  doModel === 'oe-10-ambi'}
        <OE10AMBI  isSideGuide = {true}/>
        {/if}
    {/if}
</section>


<!-- STYLES -->
<style>
    section{
        width:          calc(100% - 2 *  var(--margin-x2));
        padding:        var(--margin-x2);
        display:        none;
        opacity:        0;
        transition:     all 1500ms;
        height:         100dvh;
        overflow:       scroll;
    }
    section.active{
        opacity:        1;
        display:        initial;
    }

</style>