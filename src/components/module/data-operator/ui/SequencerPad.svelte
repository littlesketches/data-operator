<script>
    import * as d3 from 'd3'
    // Props
    let { model } = $props()

    // Models
    const {sonification, strudel} = model

    /**
     *  PULSE SEQUENCER
     */

    // Pulse sequencer elements
    const seqEl = [...new Array(16)]

    const handle = {
        toggleStep: function(ev){
            // i. Toggle the tapped step (class)
            this.classList.toggle('active-step')
            // ii. Update the array 
            const array = seqEl.map(el => el.classList.contains('active-step') ? 1 : 0 )
            // iii. Update pulse sequence
            const type = sonification.state.selection.group[sonification.state.sequencer.ui.group].chart
            sonification.handle.updateSequencePulse(array, type)
        }
    }
</script>


<!-- HTML COMPONENT MARKUP-->
{#each seqEl as d, i }
<div id = 'step_{i}' bind:this={seqEl[i]} data-step = {i}  class = 'button group_{sonification.state.sequencer.ui.group}'
    class:active-step = {sonification.state.sequencer[sonification.state.sequencer.ui.group].array[i]}  
    class:step = {strudel.state.transport === 'playing' && strudel.state.time.step === i}
    style  = 'grid-column: {i%4 + (sonification.state.isMobile ? 1 : 3)}; grid-row: {Math.floor(i/4) + 1}'
    onpointerdown="{handle.toggleStep}">
    <div class = 'button__wrapper'>
        <div class = 'seq-label'>
            {d3.format("02")(i+1)}
        </div>
    </div>
</div>
{/each}


<!-- STYLES-->
<style>
    /** BUTTON STYLING*/
    .button{
        cursor:                 pointer;     
        user-select:            none;
        -webkit-user-select:    none;     
        z-index:                1;
        aspect-ratio:           1/1;        /* Square button containers */
    }

    .button__wrapper{
        display:                grid;
        justify-content:        center;
        align-items:            center;
        height:                 100%;
        transition:             all 0.2s;
        border-radius:          50%;
        box-sizing:             border-box; /* include border in dimensions */
        background:             linear-gradient(145deg, #e8e8e8, var(--color-grad-0));
        box-shadow:              2.5px  2.5px 5px #8e8d8d,
                                -2.5px -2.5px 5px #fff;
    }

    @media (hover: hover) and (pointer: fine) {
        .button:hover  .button__wrapper{
            filter:             brightness(1.15); 
        }
    }

    .button:active .button__wrapper{ 
        box-shadow:          1vh  1vh 1vh var(--pixel-0),
                            -1vh  1vh 1vh var(--pixel-0),
                            -1vh -1vh 1vh var(--pixel-0),      
                             1vh -1vh 1vh var(--pixel-0);      
    }

    /*** LABEL STYLING  */
    .seq-label{
        display:            flex;
        color:              var(--col-light);
        font-size:          1.25vh;
        font-family:        'Orbit';
        background:         var(--col-grad-1);
        padding:            0.75vh;
        transition:         all 200ms;
        transform-origin:   50% 50%;
    }
    .group_A .seq-label{
        border-radius:      50%;
    }
    .group_B .seq-label{
        border-radius:      0.5vh;
    }
   
    .active-step .seq-label{
        background:         var(--col-grad-3);
    }

    .step.active-step .seq-label{
        transform:          scale(1.5);
        background-color:   var(--col-highlight);
    }   
    /** ACTIVE STEP **/
    .step.button .button__wrapper{ 
        box-shadow:          1vh  1vh 1vh var(--col-light),
                            -1vh  1vh 1vh var(--col-light),
                            -1vh -1vh 1vh var(--col-light),      
                             1vh -1vh 1vh var(--col-light);      
    }
   
</style>