<!-- COMPONENT TO DISPLAY STRUDEL CODE-->
<script>
    // Props
    let {model} = $props()

    // Models
    const {sonification} = model

</script>

<!-- HTML COMPONENT MARKUP-->
<section class = 'code__container' class:active={sonification.state.mode.info}>
    <div class = 'code__wrapper'>
        <div class = 'code'>
        {sonification.code}
        </div>    
    </div>
</section>


<!-- STYLES -->
<style>
    section{
        position:       fixed;
        top:            0;
        left:           0;
        width:          100%;
        background:   rgba(0, 0, 0, 0.9);
        color:          #fff;
        opacity:        0;
        /* z-index: 10; */
    }

    section.active{
        opacity:        1;
    }

    .code{
        font-family:    "Courier New", monospace;
        white-space:    pre;
        font-size:      10px;
        max-width:      100%;
        max-height:     100vh;
        overflow:       scroll;
    }
</style>