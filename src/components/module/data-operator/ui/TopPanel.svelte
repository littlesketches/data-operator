<!-- TOP PANEL SECTION FOR DATA OPERATOR-->
<script>
    // Props
    let { model} = $props()

    // Models
    const {sonification, strudel, operatorConfig} = model

    function playStop(ev){
        
        strudel.state.audioWorkletInit = true       // Flag that play/strudel has been correctly started from user button interaction

        if(sonification.state.sequencer.ui.isOpen){
            sonification.handle.closePulseSequencer();
        } else {

            switch(strudel.state.transport){
                case "stopped":
                    sonification.handle.start();  break
                case "playing":
                    sonification.handle.stop();   break
            }   

        }

    }

</script>

<!-- HTML COMPONENT MARKUP-->
<section id = 'top-panel' class:mobile={sonification.state.isMobile}>
    <div class = 'button__container'>
        {#if sonification.state.isMobile }
        <div class = 'button__label' onclick={playStop}>
            <span class="material-symbols-outlined">
            {#if sonification.state.sequencer.ui.isOpen}
            eject
            {:else}
            {#if strudel.state.transport === "playing"}stop {:else}play_arrow{/if}
            {/if}
            </span>
        </div>
        {/if}
    </div>
    <div class = 'title__container'>
        <div class = 'title__wrapper'>
            <h1 class = 'title'>{operatorConfig.modelName}</h1>
            <h2 class = 'subtitle'>データオペレーター</h2>
        </div>
    </div>
</section>


<!-- STYLE-->
<style>
    section{
        flex:                   1;
        display:                grid;
        grid-template-columns:  auto 1fr;
        font-family:            "Orbit", sans-serif;
    }

    .title__container{
        margin:                 0 var(--margin-x2) ;
        display:                flex;
        justify-content:        end;
        align-items:            end;
        height:                 100%;
        color:                  var(--col-grey-4);
    }

    h1.title{
        display:                flex;
        justify-content:        end;
        margin-block-start:     0;
        margin-block-end:       0;
        font-size:              5vh;
        text-transform:         uppercase;
    }

    h2.subtitle{
        color:                  var(--col-highlight);
        margin-block-start:     0;
        font-size:              2vh;
        font-weight:            300;
        text-align:             end;
        margin-bottom:          1.25vh;
    }

    .button__container{
        aspect-ratio:           1 / 1;
        display:                flex;
        align-items:            end;
        justify-content:        center;
        padding:                calc(var(--margin-std) * 1);

    }   

    .button__label span{
        font-size:              8.5vh;
        line-height:            1;
        border:                 solid 1px rgba(255, 255, 255, 0.5);
        border-radius:          1vh;
        margin-left:            var(--margin-x2);
        color:                  var(--col-grad-3);

    }

    .mobile .button__container{
        aspect-ratio: initial;

    }
    .mobile h1.title{
        font-size:              5vh;
    }

    .mobile h2.subtitle{
        font-size:              1.75vh;
    }
</style>
