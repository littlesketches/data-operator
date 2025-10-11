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

            <h1 class = 'model-header'>CW-193</h1>
        </div>

        <div class = 'do-model-page__content'>
            <p><strong>Data Operator CW-193</strong> is a collection of data sonification <i>instruments</i> that explore national-level climate datasets that have been collated and published by <a href = 'https://www.climatewatchdata.org/' target = "_blank">Climate Watch</a>. There are <strong>three editions</strong> of the CW-193 available in the collection, each with a different sonification and instrumentation flavour. In contrast to most data sonifications, every CW-193 is designed to be <i>played with</i> in a musical way.</p>
        </div>

        <ul class = 'do_model-page__menu'>
            <a href = "/model/cw-193/operator">
                <li class = 'operator'>
                    <h3 class = 'menu-title'>Operator</h3> 
                </li>
            </a>
            <a href = "/model/cw-193/dfam">
                <li class ='dfam'>
                    <h3 class = 'menu-title'>Data From Another Mother</h3> 
                </li>
            </a> 
            <a href = "/model/cw-193/ambi">
                <li class = 'ambi'>
                    <h3 class = 'menu-title'>Ambient</h3> 
                </li>
            </a>
        </ul>

        <div class = 'do-model-page__content'>
            <h2>Data bits</h2>
            <p><strong><a href = 'https://www.climatewatchdata.org/' target = "_blank">Climate Watch</a></strong> is an incredible resource for climate data and analysis. They  publish data on (historical) greenhouse gas emissions, climate action, and assessments of climate risk and vulnerability, for 193 nations. They do very important work that provides insights into a very serious, complex issue. Please visit their <a href = 'https://www.climatewatchdata.org/' target = "_blank">website</a> to find out more.</p>

            <OperatorDataDisclaimer/>

            <p class = 'note'>Data for this project was extracted in September, 2025.</p>
        </div>
    </div>

</section>


<!--STYLE-->
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/model-home.css'>
</svelte:head>
