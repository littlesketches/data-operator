<!-- DISPLAY GROUP LIST WITH VOLUME INDICATOR + CHART ICON-->
<script>
    // Components
    import ChartVisLegend   from "../icon/ChartVisLegend.svelte";
    import Volume           from "../icon/Volume.svelte";

    // Props
    let { model} = $props()

    // Models
    const {dataModel, sonification, operatorConfig} = model
    // Variables 
    let currentSolo = $derived(sonification.state.snapshot.solo.current)
    const ui = operatorConfig.ui.type   
    // Handlers
    const handle = {
        click: function(ev){
            const group = this.getAttribute('data-group')
            const part = group === 'C' ? sonification.state.selection.group.C.activePart : undefined
            sonification.handle.selectGroupPart(group, part)
       }
    }

</script>


<!-- HTML COMPONENT MARKUP-->
<section>
    {#each Object.entries(sonification.schema.group) as [group, d], i}
    <div  data-group={group} class = 'group__container {group}' 
        class:active={group === sonification.state.selection.group.active}
        class:solo={group === sonification.state.snapshot.solo.current?.group }
        onpointerdown={handle.click}
        >
        <div class = 'volume__container'>
            <Volume level = {sonification.param[group].gain} 
                active = {group === sonification.state.selection.group.active}
                solo = {group === sonification.state.snapshot.solo.current?.group}
                mutegroup = {sonification.param[group].mute}
                mutepart1 = {sonification.param[group]?.part?.["1"].mute}
                mutepart2 = {sonification.param[group]?.part?.["2"].mute}
                mutepart3 = {sonification.param[group]?.part?.["3"].mute}
            />
        </div>
        {#if group === 'master'}
        <div class = 'group-label__wrapper'>
            <div class = 'group-label master'>{d.label}</div>
            <div class = 'group-label groups'>
                <span class = 'mix-group-label' class:active={'A' === sonification.state.selection.group.active || sonification.state.selection.group.active === 'master'}>A</span>
                <span class = 'mix-group-label' class:active={'B' === sonification.state.selection.group.active || sonification.state.selection.group.active === 'master'}>B</span>
                <span class = 'mix-group-label' class:active={'C' === sonification.state.selection.group.active || sonification.state.selection.group.active === 'master'}>C</span>
                {#if sonification.state.selection.group.active === 'C'}
                    :{sonification.state.selection.group.C.activePart }
                {/if}
            </div>
        </div>

        {:else}
        {#if ui == 'std'}
        <div class = 'group-icon'>
            <ChartVisLegend group={group}
                active = {group === sonification.state.selection.group.active}
                solo = {group === sonification.state.snapshot.solo.current?.group}  
            />
        </div>
        {/if}
        <div class = 'group-label group'>
            { dataModel.schema.map.series.all[sonification.state.selection.group[group][`${sonification.schema.group[group].type}Pattern`]]?.label ?? d.label}  
        </div>
        {/if}
    </div>
    {/each}
</section>


<!-- STYLES -->
<style>
    .group__container{
        display:            grid;
        grid-template-columns: auto auto 1fr;
        column-gap:         1vh;
        margin-bottom:      1vh;
        margin-right:       2vh;
        cursor:             pointer;
    }
    .group__container.master{
        grid-template-columns: auto 1fr;
    }
    .group-label{
        font-size:          1.25vh;
        position:           relative;
    }
    .group-label.group{
        opacity:            0.75;
    }
    .solo.group-label{
        color:              var(--color-highlight-alt);
    }
    .group-label__wrapper{
        display:            flex;
    }
    .group-label.master,
    .group-label.groups{
        font-size:          1.5vh;
        color:              var(--pixel-3);
    }

    /** MIX group label */
    .mix-group-label{
        margin-left:        0rem;
        color:              var(--pixel-0);
        opacity:            0.35;
    }
    .mix-group-label.active{
        color:              var(--pixel-0);
        opacity:            1;
    }

    .group-label.groups{
        margin-left:        0.5rem;
        display:            flex;
        color:              var(--pixel-0);
    }

    /** ACTIVE AND SOLO*/
    .active .group-label{
        /* font-weight:        800; */
        color:               var(--pixel-0);
        opacity:            1;
    }

    .solo .group-label{
        font-weight:        800;
        color:               var(--col-highlight-alt);
    }

    .volume__container{
        display:            flex;
        height:             1vh;
        margin-top:         0.15vh;
    }
    .master .volume__container{
        height:             1.25vh
    }
    .group-icon{
        display:            flex;
        align-items:        center;
    }
</style>