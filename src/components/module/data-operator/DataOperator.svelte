<!-- DATA OPERATOR  -->
<script>
    // Libs and utils
	import { fade }         from 'svelte/transition';
    import { onMount }      from 'svelte';

    // Components
    import TopPanel         from "./ui/TopPanel.svelte";
    import Display          from "./display/Display.svelte";
    import PadUI            from "./ui/PadUI.svelte";
    import KeyboardUI       from "./ui/KeyboardUI.svelte";
    import SideGuide        from "./guide/SideGuide.svelte";

    // Props
    let { model } = $props()

    // Models
    const { sonification, operatorConfig } = model

    // Update <html> attribute when theme changes
    $effect(() => {
        document.documentElement.setAttribute("data-theme", operatorConfig.theme);
    });

    // Variables
    let viewGuide = $derived(false)
    let guideType = $derived(undefined)

    // Handlers
    const handle = {
        toggleGuide: function(){
            const type =  this.getAttribute('data-type')

            if(!viewGuide){
                viewGuide = !viewGuide
                guideType = viewGuide ? type : null

            } else {
                if(type !== guideType){
                    guideType = type
                } else {
                    viewGuide = !viewGuide
                }
            }
        },
        lastTouchEnd: 0,
        disableDoubleTapZoom: function(e){
            const now = Date.now();
            if (now - handle.lastTouchEnd <= 300) {
                e.preventDefault(); 
            }
            handle.lastTouchEnd = now;
        }
    }

    // Show guidance labels => fade out
    onMount( () => {
        setTimeout(() => {
            const buttons = document.querySelectorAll('.info-button');
            buttons.forEach(button =>  button.classList.add('fade') );
        }, 5000);
    })
</script>


<!-- HTML COMPONENT MARKUP -->
<KeyboardUI {model}/>

<div class = 'data-operator__container theme={operatorConfig.theme}'
    class:mobile={sonification.state.isMobile} 
    ontouchend={handle.disableDoubleTapZoom} in:fade>
    <div class = 'interface__wrapper'>
        <TopPanel {model}/>
        <Display {model}/>
        <PadUI {model}/>
    </div>
    <div class="guide-button info-button"         data-type ='quickStart'   onclick={handle.toggleGuide} tabindex=-1></div>
    <div class="sonification-button info-button"  data-type ='sonification' onclick={handle.toggleGuide} tabindex=-1></div>
</div>

<div class = 'guidance__container' class:closed={!viewGuide}>
    {#if viewGuide}
    <div class = 'guidance__wrapper' in:fade={{delay: 500}} out:fade={{duration: 50}}>    
        <SideGuide {model} {viewGuide} {guideType}/>
    </div>
    {/if}
</div>


<!-- STYLES-->
<style>
    .data-operator__container, 
    .guidance__container{
        --margin-std:           2vh;
        --margin-half:          calc(var(--margin-std) * 0.5);
        --margin-x2:            calc(var(--margin-std) * 2);
        font-family:            "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 

        font-weight:            400;
        font-style:             normal;
        max-width:              100%;
        max-height:             100dvh;
        aspect-ratio:           12 / 19.5;
        position:               relative;
        touch-action:           none;
        user-select: none;
        -webkit-user-select: none;
        -webkit-touch-callout: none;
    }

    .guidance__container{
        transition:             all 500ms;
        background:             rgba(232, 232, 232, 0.9);
        box-shadow:             inset 5vh -2vh 10vh 0px #898989;
        z-index:                1;  
        width:                  calc(100dvh *  12 / 19.5);

    }

    .guidance__container.closed{
        width:                  0;
    }

    .interface__wrapper,
    .guidance__wrapper{
        height:                 100%;
        z-index:                3;
        display:                flex;
        flex-direction:         column;
        justify-content:        end;
        position:               relative;
    }

    .interface__wrapper.hide{
        z-index:                -1;
    }
    .guidance__wrapper{
        justify-content:        start;
    }

    /* Info buttons */
    .info-button__wrapper{
        position:           relative;
    }
    .info-button{
        position:           absolute;
        display:            flex;
        align-items:        center;
        justify-content:    center;
        cursor:             pointer;
        top:                3.5vh;     /* distance from the top */
        right:              -1.5vh;  
        width:              1.5vh;
        aspect-ratio:       1 / 2.5;
        background:         var(--col-highlight);
        color:            #fff;
        border-radius:      0 0.5vh 0.5vh 0;
        z-index:            11;        
    }
    .fade.info-button::after{
        opacity:            0
    }
    .mobile  .info-button{
        display:            none;
    }
    .info-button::after{
        font-family:        'Orbit';
        position:           absolute;
        top:                50%;
        left:               0%;         /* position to the right */
        transform: translateY(-50%);
        margin-left:        1vh;
        opacity:            1;
        color:               #fff;
        padding:             0.3em 0.6em;
        font-size:          1.25vh;
        white-space:        nowrap;
        animation:          showThenFade 2s ease-in-out forwards;
        transition:         all 500ms;
    }


    .info-button:hover::after {
        opacity:            1;
        animation:          none;
    }

    .guide-button{
        top:                3.5vh;     /* distance from the top */
    }
    .guide-button::after{
        content:            "← Quick start guide";
    }



    .sonification-button{
        top:                12vh;     /* distance from the top */
    }
    .sonification-button::after{
        content:            "← Sonification notes";
    }
    /**
     *   THEMES
     */
    .interface__wrapper{
        background:             var(--col-body);
    }




</style>