<!-- DATA VIS FOR MELODIC PATTERNS -->
<script>
    // Libs and utils
    import * as d3          from 'd3'
    import {getPattern}     from 'euclidean-rhythms';

    // Props
    let { model, group, chartType, paramName = 'pitch'} = $props()

    // Models
    const { dataModel, sonification, strudel} = model

    // Variables
    let svg

    const isMobile = sonification.state.isMobile
    const scaleType = paramName === 'pitch' ? 'quantized' : 'value'

    let sequencerOn     = $derived(sonification.state.sequencer.ui.isOpen),
        sequencerGroup  = $derived(sonification.state.sequencer.ui.group)

    /**
     *  CHART CONFIG
     */

    // i. Dims by type
    const dimsByType = {
        full:       {width: 1920, height: 1200 * (isMobile ? 0.75 : 1), symbolSize: 2000 }, 
        half:       {width: 1920, height: 500,  symbolSize: 1250 }, 
        quarter:    {width: 1920, height: 300,  symbolSize: 1250 }
    }

    // ii. Init config obj
    const config = {
        steps:      16,         // fixed
        dims: {
            canvas: {
                width:      dimsByType[chartType].width,
                height:     dimsByType[chartType].height,
                margin: {
                    top: 30, bottom: 30, right: 30,  left: 30
                }
            }
        }
    }

    // iii. Add chart dims   
    config.dims.chart = { 
        height:     config.dims.canvas.height - config.dims.canvas.margin.top - config.dims.canvas.margin.bottom,
        width:      config.dims.canvas.width - config.dims.canvas.margin.left - config.dims.canvas.margin.right        
    }

    // iv. Symbols by group
    config.symbol = {
        A: d3.symbol(d3.symbolCircle).size(dimsByType[chartType].symbolSize),
        B: d3.symbol(d3.symbolSquare).size(dimsByType[chartType].symbolSize)        
    }

    /**
     *  CHART DATA
     */

    // i. Selections and params
    const dataInterval = sonification.schema.group[group][paramName].interval,
        type          = sonification.schema.group[group].type

    let sceneIndex      = $derived(sonification.state.selection.sceneIndex),
        data            = $derived(dataModel.scene[sceneIndex]),        // Modelled data for selected day
        series          = $derived(sonification.state.selection.group[group][`${paramName}Pattern`]),
        length          = $derived(sonification.param[group][paramName].length),
        clockDivider    = $derived(sonification.param[group][paramName].clockDivider ?? 1),
        pulseArray      = $derived(sonification.state.sequencer[group].active ? sonification.state.sequencer[group].array : sonification.state.selection.group[group].euclideanArray  ),
        seriesScaleY    = $derived(data?.scale[dataInterval][group][paramName][series]),      
        scaleArrayY     = $derived(Array.from({ length: seriesScaleY?.range()[1] - seriesScaleY?.range()[0] + 1 }, (d, i) => seriesScaleY?.range()[0] + i)),
        seriesData      = $derived({
                            quantized:  data?.scaledData[dataInterval][group][paramName][series].map(d => d.quantized),
                            value:      data?.scaledData[dataInterval][group][paramName][series].map(d => d.value)
                        })

    // ii. Add chart scale        
    let scale       = $derived.by(() => {
        return {
            x:   d3.scaleLinear().domain([0, seriesData.quantized.length - 1])
                    .range([0, config.dims.chart.width]),
            y:   d3.scaleLinear().domain(seriesScaleY.range())
                    .range([config.dims.chart.height, 0])
        }
    })

</script>


<!-- HTML COMPONENT MARKUP-->
<svg bind:this={svg} viewBox = "0 0 {config.dims.canvas.width} {config.dims.canvas.height}" 
    class:seq={sequencerOn && sequencerGroup === group}>

    <g id = "chart" transform="translate({config.dims.canvas.margin.left}, {config.dims.canvas.margin.top})"
        class:solo={sonification.state.snapshot.solo.current?.group === group}
        class:mute={sonification.param[group].mute} >

        <g class = 'grid__container'>
            {#each scaleArrayY as scaleDegree}
            {#each seriesData[scaleType] as d, i}   
            {#if chartType === 'quarter' ? scale.y.domain()[1] > 5 ? scaleDegree % 2 === 0 : true : true}
            <g class = 'grid-marker__wrapper' transform = "translate({scale.x(i)} , {scale.y(scaleDegree)})">
                <path class = 'grid-marker' d = {config.symbol[group]()}/>
            </g> 
            {/if}
            {/each}
            {/each}
        </g>
        
        <g class = 'marker__container'>
            {#each seriesData[scaleType] as d, i}     
            {@const cycleIndex = strudel.state.time.cycle - 1}
            {@const divAdd = cycleIndex % clockDivider * config.steps}
            {#if pulseArray}                
            <g class = 'marker__wrapper' transform = "translate({scale.x(i)} , {scale.y(d)})">
                <path class = 'marker' 
                    class:active={(strudel.state.time.step + divAdd ) === (( i * config.steps / length) * clockDivider) && strudel.state.transport === 'playing'} 
                    class:pulse={pulseArray[i] }
                    d = {config.symbol[group]()}
                />
            </g>
            {/if}
            {/each}
        </g>
    </g> 
</svg>


<!--STYLES-->
<style>
    svg{
        width:          100%;
        overflow:       visible;
    }
    .grid-marker{
        fill:           var(--pixel-0);
        opacity:        0.5;
        scale:          0.2;
    }
    .marker__wrapper{
        transition: all 500ms;
    }
    .marker{
        fill:           none;
        stroke:         var(--pixel-0);
        stroke-width:   5px;
        transition:     all 100ms;
        opacity:        0.5;
    }

    .marker.pulse{
        fill:           var(--pixel-0);
    }
    .marker.pulse.active{
        scale:          2;
        opacity:        1;
    }

    .seq .marker{
        stroke:         var(--col-highlight);
    }
    .seq  .marker.pulse{
        fill:          var(--col-highlight);
    }

    /** MUTES AND SOLO*/
    .mute .marker,
    .mute .marker.pulse{
        opacity:        0.2;
    }
    .solo .marker{
        stroke:         var(--col-highlight-alt);
        opacity:        0.9;
    }
    .solo .marker.pulse{
        fill:          var(--col-highlight-alt);
    }
</style>