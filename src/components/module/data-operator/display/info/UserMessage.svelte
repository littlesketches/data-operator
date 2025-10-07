<!-- ON SCREEN USER MESSAGE COMPONENT -->
<script>
    // Props
    let { model} = $props()

    // Models
    const {sonification} = model
</script>


<!-- COMPONENT MARKUP-->
<div class = "user-message"  class:mobile={sonification.state.isMobile}>
    {#if sonification.state.userMessage.text}
    {sonification.state.userMessage.text}
    {:else}
    <span>{sonification.state.selection.activeMode}</span> {sonification.state.selection.activeMode ? '> hold + (option)' : ''}
    {/if}
</div>

<!-- STYLES -->
<style>
    .user-message{
        font-size:              1.5vh;
        font-weight:            800;
    }
    .user-message span{
        text-transform:         uppercase;
    }

    .mobile.user-message{
        font-size:              1.25vh;
    }
</style>