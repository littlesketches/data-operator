<!-- SCENE LABKEL DISPLAY AND SELECTION-->
<script>
    // Props
    let { model} = $props()

    // Models
    const {dataModel, sonification} = model

    // Reactive variable references
    let projectIndex = $derived(sonification.state.selection.projectIndex)
    let label = $derived(dataModel?.getProjectLabel(projectIndex))


    // Handler
    const handle = {
        click: () => {
            sonification.handle.cycleProject(sonification.state.selection.shift ? 1 : -1)
        }
    }

</script>


<!-- HTML COMPONENT MARKUP -->
<div class = 'project-label' onclick="{handle.click}">{label}</div> 


<!-- STYLES -->
<style>
    div{
        color:      var(--pixel-0);
        cursor:     pointer;
    }
</style>