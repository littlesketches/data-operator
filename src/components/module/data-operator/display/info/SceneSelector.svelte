<!-- SCENE LABKEL DISPLAY AND SELECTION-->
<script>
    // Props
    let { model} = $props()

    // Models
    const {dataModel, sonification} = model

    // Reactive variable references
    let sceneIndex = $derived(sonification.state.selection.sceneIndex)
    let label = $derived(dataModel?.getSceneLabel(sceneIndex))


    // Handler
    const handle = {
        click: () => {
            sonification.handle.cycleScene(sonification.state.selection.shift ? 1 : -1)
        }
    }

</script>


<!-- HTML COMPONENT MARKUP -->
<div class = 'scene-label' onclick="{handle.click}">{label}</div> 


<!-- STYLES -->
<style>
    div{
        color:      var(--pixel-0);
        cursor:     pointer;
    }
</style>