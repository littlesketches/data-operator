<!-- DATA OPERATOR "MODEL" HOMEPAGE CW-193-->
<script>
    import OperatorDataDisclaimer   from "$src/components/module/data-operator/docs/OperatorDataDisclaimer.svelte";
</script>

<section class = 'do-model-page__container'>
    <div class = 'do-model-page__wrapper'>
        <div class = 'do-model-page__title-block'>
            <div class ='do-header__container' >
                <div class = 'button'><a href = '/'>&larr;</a></div>
                <h1 class = 'do-header'>データオペレーター</h1>
            </div>
            <h1 class = 'model-header'>DS-86</h1>
        </div>

        <div class = 'do-model-page__content'>
            <p><strong>Data Operator DS-86</strong> is a collection of data sonification <i>instruments</i> that explores data on internally displaced people that have been collated and published by the <a href = 'https://www.internal-displacement.org/' target = "_blank">Internal Displacement Monitoring Center (IDMC)</a>. There are <strong>three editions</strong> of the DS-86 available in the collection, each with a different sonification and instrumentation flavour. In contrast to most data sonifications, every DS-87 is designed to be <i>played with</i> in a musical way.</p>
        </div>

        <ul class = 'do_model-page__menu'>
            <a href = "/model/ds-86/operator">
                <li class = 'operator'>
                    <div class = 'wrapper'>
                        <div>
                            <h2>DS-86</h2>
                            <h3 class = 'menu-title'>+ Operator</h3> 
                        </div>
                        <div class = 'arrow'>
                            &rarr;
                        </div>
                    </div>
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
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/model-home.css'>
</svelte:head>