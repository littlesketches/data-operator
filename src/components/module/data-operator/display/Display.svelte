<!-- DATA OPERATOR DISPLAY -->
<script>
    // Components 
    import Metronome        from './icon/Metronome.svelte';
    import GroupList        from './info/GroupList.svelte';
    import ChartPitch       from './vis/ChartPitch.svelte';
    import ChartPitchVelocity from './vis/ChartPitchVelocity.svelte';
    import ChartPattern     from './vis/ChartPattern.svelte';
    import SceneSelector     from './info/SceneSelector.svelte';
    import UserMessage      from './info/UserMessage.svelte';
    import RobotAnimation   from './vis/RobotAnimation.svelte';
    import Overlay          from './info/Overlay.svelte';
    // Libs and utils
    import * as d3          from 'd3'

    // Props
    let { model} = $props()

    // Models
    const {dataModel, sonification, strudel, operatorConfig} = model
    const ui = operatorConfig.ui.type   

    // Reactive variables
    let group =  $derived(sonification.state.selection.group.active)

</script>


<!-- HTML COMPONENT MARKUP -->
<section class = 'display__container' class:mobile={sonification.state.isMobile}>
    <div class = 'screen__container'>
        <div class = 'clock__container'> 
            <Metronome {strudel}/>
            <div class = 'bpm-label'>{sonification.param.global.bpm} bpm</div>
        </div>

        <div class = 'data-label__container'> 
            <SceneSelector {model}/>
        </div>

        <div class = 'group__container'>
            <GroupList {model}/>
        </div>

        <div class = 'guide__container'>
            <UserMessage {model}/>
        </div>

        <div class = 'animation-vis__container'>
            <RobotAnimation {model} />
        </div>

        <div class = 'data-vis__container'>
            {#if sonification.state.selection.group.active === 'master'}
            <div class = 'mix-vis__container'>
                {#if ui == 'custom-dfam'}
                <ChartPitchVelocity  {model} paramNameA={sonification.state.selection.group.A.chart} paramNameB = {sonification.state.selection.group.B.chart} chartType={'threeQ'} /> 
                {:else}
                <ChartPitch {model} group={'A'}  paramName = {sonification.state.selection.group.A.chart} chartType ={'quarter'} />
                <ChartPitch {model} group={'B'}  paramName = {sonification.state.selection.group.B.chart} chartType ={'quarter'} />
                {/if}
                <ChartPattern {model} group={'C'}  chartType ={'quarter'} />            
            </div>
            {:else}
                {@const type = sonification.schema.group[sonification.state.selection.group.active].type }
                {#if ui === 'custom-dfam'}
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
        </div>

        <div class = 'overlay__container' class:active={sonification.state.userMessage.overlay.isShown}>
            <Overlay  {model} />
        </div>

    </div>
</section>


<!-- STYLES-->
<style>
    section{
        font-family:            "Doto", sans-serif;
        margin-bottom:          var(--margin-std);
    }

    .screen__container{
        background:             var(--screen-bg);
        color:                  var(--pixel-0);
        aspect-ratio:           16 / 9;
        aspect-ratio:           2 / 1;
        padding:                var(--margin-std);
        display:                grid;
        grid-template-columns:  33.3% auto 20%;
        grid-template-rows:     1vh auto 1fr 1vh;
    }

    .mobile .screen__container{
        aspect-ratio:           2.33 / 1;
    }

    .clock__container{
        height:                 1.5vh;
        font-size:              1.5vh;
        display:                flex;
        justify-content:        end;
        grid-area:              1 / 3 / 2 / 4;
    }

    .bpm-label{
        padding-left:           0.5rem
    }

    .data-label__container{
        display:                flex;
        justify-content:        end;
        font-size:              1.5vh;
        grid-area:              4 / 2 / 5 / 4;
    }

    .group__container{
        grid-area:              1/ 1 / 3 / 2;
        font-size:              1.5vh;
        margin-bottom:          1.5vh;
    }

    .data-vis__container{
        grid-area:              2/ 2 / 4 / 4;
        margin:                 var(--margin-std) 0 var(--margin-half) 0;   
    }
        .mix-vis__container{
            display:            flex;
            flex-direction:     column;
            height:             100%;
            justify-content:    space-between;
        }

    .animation-vis__container{
        grid-area:              3/ 1 / 5 / 2;
        display:                flex;
        align-items: end;
            
    }

    .overlay__container{
        grid-area:              1/ 1 / 5 / 4;
        background:             rgba(0, 0, 0, 0.8);
        z-index:                10;
        margin:                 calc(-1 * var(--margin-std));
        pointer-events:        none;
        transition:             all 500ms;
        opacity:                0;
    }
    .overlay__container.active{
        pointer-events:        all;
        opacity: 1
    }

    /** MODE INFORMATION */
    .guide__container{
        grid-area:              1 / 2 / 2 / 3;        
        color:                  var(--pixel-0);
        display:                flex;
    }

    .active-mode{
        font-size:              1.5vh;
    }
    .active-mode span{
        text-transform:         uppercase;
    }

    .numkey-action,
    .numkey-action span,
    .navkey-action,
    .navkey-action span{
        font-size:          1.25vh;
    }
</style>