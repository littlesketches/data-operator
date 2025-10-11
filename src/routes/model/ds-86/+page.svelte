<!-- DATA OPERATOR "MODEL" HOMEPAGE CW-193-->
<script>
    import OperatorDataDisclaimer   from "$src/components/module/data-operator/docs/OperatorDataDisclaimer.svelte";
</script>

<section class = 'do-model-page__container'>
    <div class = 'do-model-page__wrapper'>
        <div class = 'do-model-page__title-block'>
            <h1 class = 'do-header'>データオペレーター</h1>
            <h1 class = 'model-header'>DS-86</h1>
        </div>

        <div class = 'do-model-page__content'>
            <p><strong>Data Operator DS-86</strong> is a collection of data sonification <i>instruments</i> that explores data on internally displaced people that have been collated and published by the <a href = 'https://www.internal-displacement.org/' target = "_blank">Internal Displacement Monitoring Center (IDMC)</a>. There are <strong>three editions</strong> of the DS-86 available in the collection, each with a different sonification and instrumentation flavour. In contrast to most data sonifications, every DS-87 is designed to be <i>played with</i> in a musical way.</p>
        </div>

        <ul class = 'do_model-page__menu'>
            <a href = "/model/ds-86/operator">
                <li class = 'operator'>
                    <h3 class = 'menu-title'>Operator</h3> 
                </li>
            </a>
            <!-- <a href = "/model/cw-193/dfam">
                <li class ='dfam'>
                    <h3 class = 'menu-title'>Data From Another Mother</h3> 
                </li>
            </a> 
            <a href = "/model/cw-193/ambi">
                <li class = 'ambi'>
                    <h3 class = 'menu-title'>Ambient</h3> 
                </li>
            </a> -->
        </ul>

        <div class = 'do-model-page__content'>
            <h2>Data bits</h2>
            <p><strong>The <a href = 'https://www.internal-displacement.org/' target = "_blank">IDMC</a></strong> is a fantastic organisation that is <i>the world's leading source of data and analysis on internal displacement</i> . Their Global Internal Displacement Database (GIDD) openly publishes data on internallly displaced people around hte world, dating back to 2008. ent climate action, and assessments of climate risk and vulnerability, for 193 nations. They do very important work that provides insights into a very serious, complex issue. Please visit their <a href = 'https://www.internal-displacement.org/database/displacement-data/' target = "_blank">website</a> to find out more.</p>

            <OperatorDataDisclaimer/>

            <p class = 'note'>Data for this project was extracted in September, 2025.</p>
        </div>
    </div>

</section>

<!--STYLE-->
<style>
    strong{
        font-weight: 600;
    }
    
    /* DATA OPERATOR: MODEL HOMEPAGE */
    section.do-model-page__container{
        /* z-index:                1000; */
        display:                flex;
        width:                  100%;
        justify-content:        center;
        line-height:            1.5;
        height:                 10dvh;
    }

    .do-model-page__wrapper{
        width:                  100%;
        max-width:              720px;
        margin:                 10vh 5vh 2.5vh;
    }

    /** Title block*/    
    .do-model-page__title-block{
        /* display:                flex; */
        justify-content:        space-between;
        align-items:            center;
    }

    .do-model-page__container h1{
        margin-block-start:     0;
        margin-block-end:       0;
        line-height:            1;
    }
    .do-model-page__container .model-header{
        font-size:              8vh;
    }
    .do-model-page__container .do-header{
        font-size:              2.5vh;
    }
    
    /** Intro block /*/
    .do-model-page__content{
        margin:                 5vh 0;
    }
    .do-model-page__content .note{
        font-size:              small;
        font-style:             italic;
        text-align:             end;
    }
    /* Edition/version menu */
    ul.do_model-page__menu {
        display:                grid;
        grid-template-columns:  1fr 1fr 1fr;
        grid-auto-flow:         column;     
        grid-auto-columns:      1fr; 
        gap:                    2vh;                  
        list-style:             none;
        margin:                 0;
        padding:                0;
        width:                  100%;
    }
    .do_model-page__menu a{
        text-decoration:        none;
    }
    .do_model-page__menu li{
        aspect-ratio:           1 / 1;
        background:             #000;
        color:                  #fff;
        display:                flex;
        padding:                1.5vh;
        font-weight:            700;
        font-size:              1.5vh;
        text-transform:         lowercase;
        transition:             all 500ms;
    }
    .do_model-page__menu li h3{
        margin-block-start:     0;
        margin-block-end:     0;
    }

    .do_model-page__menu li:hover.operator{
        background:            var(--col-operator-highlight);
    }
    .do_model-page__menu li:hover.dfam{
        background:            var(--col-dfam-highlight);
    }
    .do_model-page__menu li:hover.ambi{
        background:
            linear-gradient(rgb(168, 53, 188), transparent),
            linear-gradient(to top left, rgb(209, 207, 45), transparent),
            linear-gradient(to top right, rgb(10, 178, 184), transparent);
        background-blend-mode: screen;
    }

</style>