<script>
    // Components
    import OneManBand from "./data-animation/OneManBand.svelte";

    // Props
    let {model} = $props()

    // Model
    const {operatorConfig} = model

    // Variable
    const animationGroup = operatorConfig.ui.animation.group

</script>


<!-- COMPONENTS -->
{#if animationGroup === 'band'}
<OneManBand {model}/>
{/if}