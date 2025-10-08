<!-- DATA VIS FOR RHYTHM-CHORD PATTERNS -->
<script>
    // Libs and utils
    import * as d3              from 'd3'
    import {getPattern}         from 'euclidean-rhythms';

    // Props
    let { model, group, chartType } = $props()

    // Models
    const {app, dataModel, sonification, strudel} = model

    // Variables
    let svg

    const groupPartPresets = sonification.schema.pattern.C
    const isMobile = sonification.state.isMobile

    /**
     *  CHART CONFIG
     */

    // i. Dims by type
    const dimsByType = {
        full:       {width: 1920, height: 1200 * (isMobile ? 0.75 : 1), symbolSize: 2000}, 
        half:       {width: 1920, height: 600,  symbolSize: 1500 }, 
        quarter:    {width: 1920, height: 400,  symbolSize: 1000 }, 
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

    // iv. Drum kit config
    const symbolSize = dimsByType[chartType].symbolSize
    const yGrid = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2]

    config.drumkit= {
        bd:  { type: 'membrane', symbol: d3.symbol(d3.symbolCircle).size(symbolSize),         pos: 0 },      // kick       
        lt:  { type: 'membrane', symbol: d3.symbol(d3.symbolWye).size(symbolSize),            pos: 0.25 },   // low tom 
        mt:  { type: 'membrane', symbol: d3.symbol(d3.symbolWye).size(symbolSize * 0.75),     pos: 0.5 },    // mid tom 
        ht:  { type: 'membrane', symbol: d3.symbol(d3.symbolWye).size(symbolSize * 0.5),      pos: 0.75 },   // high tom
        sd:  { type: 'membrane', symbol: d3.symbol(d3.symbolSquare).size(symbolSize),         pos: 1 },      // snare  
        cp:  { type: 'membrane', symbol: d3.symbol(d3.symbolCross).size(symbolSize),          pos: 1.25 },   // clap
        rim: { type: 'membrane', symbol: d3.symbol(d3.symbolCross).size(symbolSize),          pos: 1.25 },   // rimshot
        cb:  { type: 'metal',    symbol: d3.symbol(d3.symbolStar).size(symbolSize),           pos: 1.5},     // cowbell 
        hh:  { type: 'metal',    symbol: d3.symbol(d3.symbolTriangle).size(symbolSize * 0.5), pos: 2 },   // Hihat  
        oh:  { type: 'metal',    symbol: d3.symbol(d3.symbolTriangle).size(symbolSize),       pos: 2. },   // Open hat 
        cr:  { type: 'metal',    symbol: d3.symbol(d3.symbolStar).size(symbolSize),           pos: 2 },      // Crash  
        rd:  { type: 'metal',    symbol: d3.symbol(d3.symbolDiamond).size(symbolSize),        pos: 2 },      // Ride          
    }

    const drumKitPos = [...new Set(Object.values(config.drumkit).map(d=> d.pos))]

    /**
     *  CHART DATA
     */

    // i. Selections and params
    const dataInterval = sonification.schema.group[group].interval

    let clockDivider = $derived({
        1: sonification.param[group].part["1"].sound.clockDivider ?? 1,
        2: sonification.param[group].part["2"].sound.clockDivider ?? 1,
        3: sonification.param[group].part["3"].sound.clockDivider ?? 1
    })

    let sceneIndex  = $derived(sonification.state.selection.sceneIndex),
        data        = $derived(dataModel.model[sceneIndex])        // Modelled data for selected day

    let part1_array = $derived(groupPartPresets["1"].sound[sonification.state.selection.group[group].part["1"].series]?.vis),
        part2_array = $derived(groupPartPresets["2"].sound[sonification.state.selection.group[group].part["2"].series]?.vis),
        part3_array = $derived(groupPartPresets["3"].sound[sonification.state.selection.group[group].part["3"].series]?.vis)

    let length = $derived({
        part1: sonification.param[group].part["1"].sound.length,
        part2: sonification.param[group].part["2"].sound.length, 
        part3: sonification.param[group].part["3"].sound.length
    })

    // ii. Construct drumkit array from part1 and 2
    let drumkitData = $derived.by( () => {
        return part1_array.map( (part1, i) => {
            const part2 = part2_array[i]
            return { part1, part2 }
        })
    })
    
    // iii. Construct harmony array
    let chordSeries = $derived(sonification.state.selection.group.A.pitchPattern)
    let chordData = $derived(data.scaledData[groupPartPresets["3"].interval]?.C["3"].chord.map(d => d[chordSeries].quantized)  ) 

    // iii. Add chart scale        
    let scale = $derived.by(() => {
        return {
            drumkit: {
                x:   d3.scaleLinear().domain([0, length.part1 - 1])
                        .range([0, config.dims.chart.width]),
                y:   d3.scaleLinear().domain(d3.extent(yGrid))
                        .range([config.dims.chart.height * 1, config.dims.chart.height * 0.6])
            }, 
            chord: {
                x:   d3.scaleLinear().domain([0, length.part3])
                        .range([0, config.dims.chart.width]),
                y:   d3.scaleLinear().domain(d3.extent(yGrid))
                        .range([config.dims.chart.height * 0.25, config.dims.chart.height * 0.05])
            }
        }
    })

</script>


<!-- HTML COMPONENT MARKUP-->
<svg bind:this={svg} viewBox = "0 0 {config.dims.canvas.width} {config.dims.canvas.height}">
    <g id = "chart" transform="translate({config.dims.canvas.margin.left}, {config.dims.canvas.margin.top})">
        <g class = 'grid__container'>
        {#each yGrid as yPos}
            {#each drumkitData as d, i}   
                {#if yPos === Math.floor(yPos) || chartType === 'full' }
                <g class = 'grid-marker__wrapper' transform = "translate({scale.drumkit.x(i)} , {scale.drumkit.y(yPos)})">
                    <path class = 'grid-marker' d = {d3.symbol(d3.symbolCircle).size(symbolSize)()}/>
                </g> 
                {/if}
            {/each}
        {/each}
        </g>
        
        <g class = 'drumkit-group'>
        {#each drumkitData as {part1, part2}, i}              
            {@const cycleIndex = strudel.state.time.cycle - 1}
            {#each part1 as drum}
                {@const divAdd = cycleIndex % clockDivider["1"] * config.steps}
                {#if Object.keys(config.drumkit).includes(drum)}
                {@const d = config.drumkit[drum]}
                <g class = 'marker__wrapper {d.type}'
                    class:solo={sonification.state.snapshot.solo.current?.part === 1 }
                    class:mute={sonification.param[group].part["1"].mute}
                    transform = "translate({scale.drumkit.x(i)} , {scale.drumkit.y(d.pos)})">
                    <path class = 'marker' 
                        class:active={(strudel.state.time.step + divAdd ) === (( i * config.steps / length.part1) * clockDivider["1"]) && strudel.state.transport === 'playing'} 
                        class:pulse={sonification.state.selection.group.C.part["1"].euclideanArray[i]}
                        d = {config.drumkit[drum].symbol()}
                    />
                </g>
                {/if}
            {/each}

            {#each part2 as drum}
            {@const divAdd = cycleIndex % clockDivider["2"] * config.steps}
            {#if Object.keys(config.drumkit).includes(drum)}
            {@const d = config.drumkit[drum]}
            <g class = 'marker-wrapper {d.type}'
                class:solo={sonification.state.snapshot.solo.current?.part === 2 }
                class:mute={sonification.param[group].part["2"].mute}
                transform = "translate({scale.drumkit.x(i)} , {scale.drumkit.y(d.pos)})" >
                <path class = 'marker' 
                    class:active={(strudel.state.time.step + divAdd ) === (( i * config.steps / length.part2) * clockDivider["2"]) && strudel.state.transport === 'playing'} 
                    class:pulse={sonification.state.selection.group.C.part["2"].euclideanArray[i]}
                    d = {config.drumkit[drum].symbol()}
                />
            </g>
            {/if}
            {/each}
        {/each}
        </g>

        <g class = 'chord-group'>
        {#each chordData as d, i}
            {@const height = (scale.chord.y(0) - scale.chord.y(1)) * 0.5}
            {@const width = scale.chord.x(1) - scale.chord.x(0)}
            {@const cycleIndex = strudel.state.time.cycle - 1}
            {@const divAdd = cycleIndex % clockDivider["3"] * config.steps}
            <rect class = 'chord-marker' 
                class:active={( Math.floor(cycleIndex /clockDivider["3"])%  length.part3 ) === i  && strudel.state.transport === 'playing'} 
                x = {scale.chord.x(i)} y = {scale.chord.y(d) + height}  
                width = {width} height = {height} rx = {height * 0.5}
            />
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
        transition:     all 500ms;
    }

    .marker{
        fill:           none;
        stroke:        var(--pixel-0);
        stroke-width:   5px;
        opacity:        0.5;
        transition:     all 100ms;
    }

    .marker.pulse{
        fill:           var(--pixel-0);
    }

    .marker.pulse.active{
        scale:          2;
        opacity:        1;
    }

    .chord-marker{
        fill:           var(--pixel-0);
        opacity:        0.5;
        transition:     all 500ms
    }
    .chord-marker.active{
        opacity:        1;
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
        fill:           var(--col-highlight-alt);
    }
</style> 