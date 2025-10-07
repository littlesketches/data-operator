<!-- DATE DISPLAY AND SELECTION-->
<script>
    // Libs and utils
    import * as d3         from 'd3'

    // Props
    let { model} = $props()

    // Models
    const {dataModel, sonification} = model

    // Reactive variable references
    let sceneIndex = $derived(sonification.state.selection.sceneIndex)
    let data     = $derived(dataModel.model[sceneIndex])        // Modelled data for selected day

    // Handler
    const handle = {
        click: () => {
            sonification.handle.cycleData(sonification.state.selection.shift ? 1 : -1)
        }
    }

</script>


<!-- HTML COMPONENT MARKUP -->
<div class = 'screen-date' onclick="{handle.click}">{d3.timeFormat("%d-%m-%y")(data.day)}</div> 


<!-- STYLES -->
<style>
    div{
        color:      var(--pixel-0);
        cursor:     pointer;
    }
</style>