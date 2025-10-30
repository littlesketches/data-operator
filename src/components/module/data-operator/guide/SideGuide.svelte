<!-- SIDE-BY-SIDE GUIE-->
<script>
    // Components
    import QuickStart       from "../docs/QuickStart.svelte";
    import OE10Operator     from "../docs/sonifcation-notes/OE-10-Operator.svelte";
    import OE10DFAM         from "../docs/sonifcation-notes/OE-10-DFAM.svelte";
    import OE10AMBI         from "../docs/sonifcation-notes/OE-10-AMBI.svelte";
    import IDP86Operator    from "../docs/sonifcation-notes/IDP-86-Operator.svelte";
    import IDP86DFAM        from "../docs/sonifcation-notes/IDP-86-DFAM.svelte";
    import IDP86AMBI        from "../docs/sonifcation-notes/IDP-86-AMBI.svelte";
    import CW193Operator    from "../docs/sonifcation-notes/CW-193-Operator.svelte";
    import CW193DFAM        from "../docs/sonifcation-notes/CW-193-DFAM.svelte";
    import CW193AMBI        from "../docs/sonifcation-notes/CW-193-AMBI.svelte";

    // Props
    let { viewGuide, guideType, model} = $props() 

    // Models
    const {operatorConfig} = model
    const doModel = operatorConfig.model

</script>


<!-- SVELTE SPECIAL ELEMENTS-->
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/sidenote.css'>
</svelte:head>

<!-- HTML COMPONENT MARKUP-->
<section class:active={viewGuide}>
    {#if guideType === 'quickStart'}
    <QuickStart isSideGuide = {true}/>
    {:else if  guideType === 'sonification'}
        {#if operatorConfig.model.name === 'oe-10'}
            {#if operatorConfig.model.edition === 'operator'}
            <OE10Operator isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'dfam'}
            <OE10DFAM isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'ambi'}
            <OE10AMBI isSideGuide = {true}/>
            {/if}
        {:else if operatorConfig.model.name === 'cw-193'}
            {#if operatorConfig.model.edition === 'operator'}
            <CW193Operator isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'dfam'}
            <CW193DFAM isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'ambi'}
            <CW193AMBI isSideGuide = {true}/>
            {/if}
        {:else if operatorConfig.model.name === 'idp-86'}
            {#if operatorConfig.model.edition === 'operator'}
            <IDP86Operator isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'dfam'}
            <IDP86DFAM isSideGuide = {true}/>
            {:else if  operatorConfig.model.edition === 'ambi'}
            <IDP86AMBI isSideGuide = {true}/>
            {/if}
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