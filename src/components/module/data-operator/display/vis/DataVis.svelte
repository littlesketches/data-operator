<script>
    // Components
    import ChartPitch           from './data-vis/ChartPitch.svelte';
    import ChartPitchVelocity   from './data-vis/ChartPitchVelocity.svelte';
    import ChartPattern         from './data-vis/ChartPattern.svelte';

    // Props
    let { model} = $props()

    // Models
    const { sonification, operatorConfig} = model
    const ui = operatorConfig.ui.type   

    // Reactive variables
    let group =  $derived(sonification.state.selection.group.active)
</script>


<!-- HTML COMPONENT MARKUP -->
{#if sonification.state.selection.group.active === 'master'}
<div class = 'mix-vis__container'>
    {#if ui == 'dfam'}
    <ChartPitchVelocity  {model} paramNameA={sonification.state.selection.group.A.chart} paramNameB = {sonification.state.selection.group.B.chart} chartType={'threeQ'} /> 
    {:else}
    <ChartPitch {model} group={'A'}  paramName = {sonification.state.selection.group.A.chart} chartType ={'quarter'} />
    <ChartPitch {model} group={'B'}  paramName = {sonification.state.selection.group.B.chart} chartType ={'quarter'} />
    {/if}
    <ChartPattern {model} group={'C'}  chartType = {'quarter'} />            
</div>
{:else}
    {@const type = sonification.schema.group[sonification.state.selection.group.active].type }
    {#if ui === 'dfam'}
        {#if type === 'pattern'}     
        <ChartPattern {model} {group}  chartType={'full'} />
        {:else}
        <ChartPitchVelocity  {model} paramNameA={sonification.state.selection.group.A.chart} paramNameB = {sonification.state.selection.group.B.chart} chartType={'full'} /> 
        {/if}
        {:else}
        {#if type === 'pitch'}          
        <ChartPitch {model} {group} paramName={sonification.state.selection.group[group].chart} chartType={'full'} />
        {:else}
        <ChartPattern {model} {group}  chartType={'full'} />
        {/if}   
    {/if}
{/if}


<!-- STYLES-->
<style>
    .mix-vis__container{
        display:            flex;
        flex-direction:     column;
        height:             100%;
        justify-content:    space-between;
    }
</style>