<script>

    // Props
    let { model} = $props()

    // Models
    const {app, dataModel, sonification, strudel, composition} = model

    // Reactive variable references
    let dayIndex      = $derived(sonification.state.selection.dayIndex)
    let data          = $derived(dataModel.model[dayIndex])        // Modelled data for selected day
    let heldKeys      = $derived([...sonification.state.selection.heldKeys])

</script>

<!-- HTML COMPONENT MARKUP-->
<section class = 'debug__container'>
    <div class = 'mode__container'>
        <div>
            <div>SHIFT:</div> 
            <div>[shift]</div> 
            <div>{sonification.state.selection.shift}</div>        
        </div>
        <div>
            <div>Info</div> 
            <div>[/] or [i]:</div> 
            <div>{sonification.state.mode.info}</div>
        </div>
        <div>
            <div>Tempo</div>
            <div>[\] or [t]:</div>
            <div>{sonification.state.mode.tempo}</div> 
        </div>
        <div>
            <div>Group</div>
            <div>[.] or [g]:</div> 
            <div>{sonification.state.mode.group}</div> 
        </div>
        <div>
            <div>FX</div>
            <div>[Enter]:</div>
            <div>{sonification.state.mode.fx}</div>
        </div>
        <div>
            <div>Data</div>
            <div>[d]:</div> 
            <div>{sonification.state.mode.data}</div>
        </div>
    <div>Keys: {heldKeys}</div>
    </div>

</section>

<!-- STYLES -->
<style>
    .debug__container{
        width:          20vw;
        position: absolute;
        top:  0;
        right:  0;
        color:  #fff;
    }

    .mode__container{
        font-size:          1.25vh;
        font-weight: 700;
    }    
    .mode__container > div{
        display:            grid;
        grid-template-columns: 1fr 1fr 0.5fr;
    }

</style>