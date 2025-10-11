<!-- DATA OPERATOR HOMEPAGE -->
<script>
    // Libs and utils
	import { fade } from 'svelte/transition';

    /**
     *   DATA OPERATOR MENU ITEMS
     */
    // Config
    const items = [
        { 
            id: 1,      title: "About",    
            href:       "./docs/",
            description: `Everything written about the  Data Operator project`
        },
        { 
            id: 2,      title: "OE-10",   
            href:       "./model/oe-10/", 
            description: `Instruments to explore open electricity data.`
        },
        { 
            id: 3,      title: "CW-193",   
            href:       "./model/cw-193/", 
            description: `Instruments to explore climate data.`
        },
        { 
            id: 4,      title: "DS-86",   
            href:       "./model/ds-86/", 
            description: `Instruments to explore data on people displaced by conflict and disaster.`
        },
    ];


    /**
     *   SPEECH ON LOAD
     */

    function sayJapanese(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "ja-JP";

        // Get available voices
        const voices = speechSynthesis.getVoices();

        // Find a Japanese female-sounding voice
        // (voice names vary by OS/browser, so you may need to log them out)
        const jpFemale = voices.find(v =>
            v.lang === "ja-JP" &&
            /female|woman|girl|女/i.test(v.name)
        );

        if (jpFemale) {
            utterance.voice = jpFemale;
        }

        speechSynthesis.speak(utterance);
    }

    const sayDataOperator = () => { return ;sayJapanese("データオペレーター") }

</script>


<!-- HTML COMPONENTS-->
<section class = 'content__container' in:fade>
    <div class = 'title__container' >
        <h1>
            <span class="blink">
                <span class="word word-a">HELLO</span>
                <span class="word word-b">HELLO DATA</span>
            </span>
        </h1>
        <h1>OPERATOR</h1>
        <h2 class = 'subtitle' onmouseover={sayDataOperator}>データオペレーター</h2>
    </div>

    <div class = 'menu__container'>
        <ul class = 'track'>
            {#each items as item}
            <li class="menu-item">
                <div>
                    <h3 class = 'item-title'>{item.title}</h3> 
                    {#if item.subtitle}<h4 class = 'item-subtitle'>{item.subtitle}</h4>{/if}
                </div>
                

                <div>
                    {#if item.description}<div class = 'item-description'>{item.description}</div>{/if}
                    <a href={item.href}>
                        <div class = 'item-link'>&rarr;</div>
                    </a>
                </div>

            </li>
            {/each}
        </ul>
    </div>

    <div class = 'tagline__container'> 
        <div class = 'tagline'>Super fun data instruments</div>
    </div>
</section>


<!-- STYLES -->
<style>
    .content__container{
        display:                flex;
        flex-direction:         column;
        justify-content:        end;
        align-items:            center;
        height:                 100dvh;
        --left-padding:         2vh;
        background:             #000;
    }

    /** TITLE & TAGLINE BLOCKS */
    .title__container,
    .tagline__container{
        width:                  100%;
        max-width:              800px;
        color:                  #fff;
        padding-left:           var(--left-padding);
    }

    h1{ 
        font-family:            "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; 
        font-size:              9dvh;
        font-weight:            700;
        margin-block-start:     0;
        margin-block-end:       0;
        line-height:            1;
    }

    h2.subtitle{
        font-size:              5dvh;
        margin-block-start:     0;
        display:                flex;
        width:                  fit-content;
    }

    .tagline__container{
        display:                flex;
        align-items:            center;
        height:                 10dvh;
        padding-left:           var(--left-padding);
        text-transform:         lowercase;
        font-weight:            200;
        font-size:              1.5dvh;
        letter-spacing:         0.0625dvh;
    }

    /** BLINK/TRANSITION  HELLO <> DATA*/
    .blink {
        position:               relative;
        display:                inline-block;
        min-width:              10ch; /* reserve width so text doesn’t jump */
    }

    .word {
        position:               absolute;
        left:                   0;
        top:                    -8.5dvh;
        opacity:                0;
        white-space:            nowrap;
    }

    .word-a, 
    .word-b {
        animation:              fade 4s infinite;
    }

    .word-b {
        animation-delay:        2s;
    }

    @keyframes fade {
        0%, 49.9% { opacity: 1; }
        50%, 100% { opacity: 0; }
    }

    /** CAROUSEL MENU  **/
    .menu__container{
        width:                  100%;
        overflow-x:             auto;
        overflow-y:             hidden;
        scrollbar-width:        none; /* Firefox */
        -webkit-overflow-scrolling: touch;        

        /* Left fade (0→400px), right fade from center → right edge */
        -webkit-mask-image: linear-gradient(
            to right,
            rgba(0,0,0,0) 0px,           /* fully transparent at start */
            rgba(0,0,0,1) 200px,         /* fade to full opacity faster on left */
            rgba(0,0,0,1) 50%,           /* fully visible until center */
            rgba(0,0,0,0) 100%           /* fade to transparent on right */
        );
        -webkit-mask-repeat:    no-repeat;
        -webkit-mask-size:      100% 100%;

        mask-image: linear-gradient(
            to right,
            rgba(0,0,0,0) 0px,
            rgba(0,0,0,1) 200px,
            rgba(0,0,0,1) 50%,
            rgba(0,0,0,0) 100%
        );
        mask-repeat:        no-repeat;
        mask-size:          100% 100%;
    }

    .menu__container::-webkit-scrollbar {
        display:            none; /* Chrome/Safari */
    }

    ul.track{
        list-style:         none; 
        display:            flex;
        gap:                1rem;   
        padding-left:       calc((100% - 800px) / 2 + var(--left-padding)* 0.5 );    /* Align the first card to the title-block’s left edge */
        overflow:           visible;
    }

    li.menu-item{
        margin:             0;
        padding:            2vh;    
        list-style:         none;
        flex:               0 0 20dvh;   /* fixed width */
        height:             30dvh;
        background:         #ddd;
        display:            flex;
        transition:         all 500ms;
        transform-origin:   50% 50%;
        display:            flex;
        flex-direction:     column;
        justify-content:    space-between;
        /* height:             100%; */
    }
    li.menu-item a{

    }
    li.menu-item:hover{
        filter:             brightness(1.4);
        z-index:            10;
        transform:          scale(1.1)
    }
    h3.item-title{
        font-size:          3dvh;
        margin-block-start: 0;
        margin-block-end:       0;
    }   
    h4.item-subtitle{
        margin-block-start:     0.5vh;
        margin-block-end:       0;
        font-size:              2dvh;
        padding:            0.5vh 1vh;
        background:         #000;
        color:              #ddd;
        width:              min-content;
        letter-spacing:     0.1rem;
        text-transform: lowercase;

    }

    .item-link{
        font-size:          5dvh;
        font-weight:        800;
        text-align:         end;
        transition:         all 200ms;
        transform-origin:   100% 50%;
    }
    .item-link:hover{
        transform:          scaleX(1.25);
    }

    a{
        all:                unset;      
        text-decoration:    none;
        color:              inherit; 
        font:               inherit; 
        cursor:             pointer; 
    }

    .item-description{
        font-size:          1.5vh;
        opacity:            0;
        transition:         all 500ms;
        font-weight:        600;
        width:              70%;
    }
    li:hover .item-description{
        opacity:            0.75;

    }
    /* Remove mask on screens narrower than 800px */
    @media (max-width: 800px) {
        .menu__container {
            -webkit-mask-image: none;
            mask-image: none;
        }
    }

</style>