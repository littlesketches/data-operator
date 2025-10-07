<script>

    // Props
    let { model} = $props()

    //
    const {sonification} = model

    const handle = {
        closeOverlay: () => sonification.state.userMessage.overlay.isShown = false
    }

</script>

<!-- HTML COMPONENT MARKUP-->
<section>

    {#if sonification.state.userMessage.overlay.type === 'link'}
    <div class = 'message'>
        <p>This composition for has been captured as a <i>Strudel REPL</i> link that has been copied to your clipboard.</p>
        <p>You can also open this link in a new browser tab by <a href ={sonification.state.userMessage.overlay.link} target="_blank">clicking here</a>.</p>
    </div>
    {/if}
    <div class = 'close-button'onclick={handle.closeOverlay}>&times;</div>
</section>


<!-- STYLES -->
<style>
    section{
        position:       relative;
        padding:        var(--margin-x2) var(--margin-x2) var(--margin-std);
        font-size:      1.75vh;
        line-height:    1.35;
    }
    .close-button{
        position:       absolute;
        top:            0;
        right:          var(--margin-std);
        cursor:         pointer;
        font-size:      5dvh;
    }
    .close-button:hover{
        font-weight:    800;
    }
</style>

