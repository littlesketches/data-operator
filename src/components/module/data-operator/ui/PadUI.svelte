<!-- DATA OPERATOR DISPLAY -->
<script>
    // Components
    import SequencerPad from "./SequencerPad.svelte";
    import CalculatorPad from "./CalculatorPad.svelte";

    // Props
    let { model } = $props()

    // Models
    const {sonification, dataModel, strudel, operatorConfig} = model

    // Reactive derived variables
    let heldKeys  = $derived(sonification.state.selection.heldKeys)


    /**
     *  SCREEN BUTTON HANDLERS
     */

    const handle = {
        // "Click" buttons
        click: function(ev){
            switch(this.id){
                case 'playStop':
                    strudel.state.audioWorkletInit = true       // Flag that play/strudel has been correctly started from user button interaction

                    if(sonification.state.sequencer.ui.isOpen){
                        sonification.handle.closePulseSequencer(); break
                    }

                    switch(strudel.state.transport){
                        case "stopped":
                            sonification.handle.start();  break
                        case "playing":
                            sonification.handle.stop();   break
                    }   
                    break
                case 'open-sequencer':
                    const group = this.getAttribute('data-group')
                    sonification.handle.openPulseSequencer(group)
                    break
                case 'close-sequencer':
                    sonification.handle.closePulseSequencer()
                    break
            }
        }
    }

</script>

<!-- HTML COMPONENT MARKUP -->
<section class = 'interface__container' class:mobile={sonification.state.isMobile}>
    <div class = 'pad__wrapper'>
        <!-- NON-MOBILE "SIDE COLUMN"-->
        <div class = 'side-button__wrapper'> </div>
        <div id = "playStop" class = 'button side row-1 col-1' 
            class:active = {heldKeys.has(' ')} 
            style  = 'grid-column: 1; grid-row: 1; display: {sonification.state.isMobile ? 'none' : 'init'}'
            onpointerdown="{handle.click}" >
            <div class = 'button__wrapper'>
                <div class = 'button-label'>
                    <span class="material-symbols-outlined">
                    {#if sonification.state.sequencer.ui.isOpen}
                    eject
                    {:else}
                    {#if strudel.state.transport === "playing"}stop {:else}play_arrow{/if}
                    {/if}
                    </span>
                </div>
            </div>
        </div>

        <!-- CALCULATOR BUTTONS -->
        {#if !sonification.state.sequencer.ui.isOpen}
        <CalculatorPad {model} />
        <!-- <div id = "open-sequencer" data-group = 'A'   class = 'sequencer-toggle button side' 
            style  = 'grid-column: 1; grid-row: 2; display: {sonification.state.isMobile ? 'none' : 'init'}'
            onpointerdown="{handle.click}" >
            <div class = 'button__wrapper'>
                <div class = 'button-label'>SEQ. A</div>
            </div>
        </div>
        <div id = "open-sequencer" data-group = 'B'   class = 'sequencer-toggle  button side' 
            style  = 'grid-column: 1; grid-row: 3; display: {sonification.state.isMobile ? 'none' : 'init'}'
            onpointerdown="{handle.click}" >
            <div class = 'button__wrapper'>
                <div class = 'button-label'>SEQ. B</div>
            </div>
        </div> -->

        {:else}
        <!-- STEP SEQUENCER -->
        <SequencerPad {model} />
        {/if}
    </div>
</section>


<!-- STYLES-->
<style>
    /** BUTTON LAYOUT */
    section.interface__container{
        padding:                calc(var(--margin-std) * 1) calc(var(--margin-std) * 2) calc(var(--margin-std) * 2)  calc(var(--margin-std) * 2) ;
        display:                flex;
        font-weight:            400;
        user-select:            none;
        -webkit-user-select:    none;     
    }
    section.interface__container.mobile{
        padding:                calc(var(--margin-std) * 1) calc(var(--margin-std) * 3) calc(var(--margin-std) * 2)  calc(var(--margin-std) * 3) ;
    }

    /* 4 x 4 "Calculator pad */
    .pad__wrapper{
        display:                grid;
        grid-template-columns:  repeat(1, minmax(0, 1fr)) 1vh repeat(4, minmax(0, 1fr));
        column-gap:             2vh;
        row-gap:                2vh;
        width:                  100%;
    }
    .mobile .pad__wrapper{
        grid-template-columns:   repeat(4, minmax(0, 1fr));
    }

    /** WIDESCREEN X-TRA BUTTONS*/
    .side-button__wrapper{
        grid-area:              1 / 1 / 5 / 2;
        border-radius:          1vh;
    }

    .button.side{
        width:                  100%;
        height:                 100%;
        justify-self:           center;
        align-self:             center;

    }

    .mobile .side.button,
    .mobile .side-button__wrapper{
        display:                none;
    }

    .button.side .button__wrapper{
        background:             var(--col-highlight);
        color:                  var(--col-light);
    }

    /** BUTTON STYLING*/
    .button{
        cursor:                 pointer;     
        user-select:            none;
        -webkit-user-select:    none;     
        z-index:                1;
        aspect-ratio:           1/1;        /* Square button containers */
    }

    .button__wrapper{
        display:            grid;
        justify-content:    center;
        align-items:        center;
        height:             100%;
        transition:         all 0.2s;
        border-radius:      50%;
        box-sizing:         border-box; /* include border in dimensions */
        background:         linear-gradient(145deg, #e8e8e8, var(--color-grad-0));
        box-shadow:          2.5px  2.5px 5px #8e8d8d,
                            -2.5px -2.5px 5px #fff;
    }
    .button:active .button__wrapper,
    .button.active .button__wrapper{ 
        box-shadow:          1vh  1vh 1vh var(--pixel-0),
                            -1vh  1vh 1vh var(--pixel-0),
                            -1vh -1vh 1vh var(--pixel-0),      
                             1vh -1vh 1vh var(--pixel-0);      
    }

    /* LABELS AND ICONS */
    .button-label{
        grid-area:              1/ 1 / 2 / 2;
        font-size:              2.5vh;
        font-family:            "Orbit", sans-serif;
        z-index:                1;
        display:                flex;
        justify-content:        center;
        align-items:            center;
        width:                  100%;
        transition:             all 200ms;
        opacity:                1;
        line-height:            1;

    }

    #playStop .button-label span{ 
        font-size:              4vh;
        color:                  var(--col-light);  
    }

    /*** SEQUENCER BUTTONS */
    .sequencer-toggle.button  .button__wrapper{
        background:         var(--col-body);
    }
    .sequencer-toggle .button-label{
        font-size:      1.25vh;
        color:          var(--col-grad-3);
        text-align:     center;
    }

</style>