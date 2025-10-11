<!-- DATA OPERATOR "MODEL" HOMEPAGE CW-193-->
<script>
    import OperatorDataDisclaimer from "$src/components/module/data-operator/docs/OperatorDataDisclaimer.svelte";
</script>

<section class = 'do-model-page__container'>
    <div class = 'do-model-page__wrapper'>
        <div class = 'do-model-page__title-block'>
            <div class ='do-header__container' >
                <div class = 'button'><a href = '/'>&larr;</a></div>
                <h1 class = 'do-header'>データオペレーター</h1>
            </div>
            <h1 class = 'model-header'>OE-10</h1>
        </div>

        <div class = 'do-model-page__content'>
            <p><strong>Data Operator OE-10</strong> is a collection of data sonification <i>instruments</i> that explore electricity data from Australia's National Energy Market (NEM), published by <a href = 'https://openelectricity.org.au/' target = "_blank">Open Electricity</a>. There are <strong>three editions</strong> of the OE-10 available in the collection, each with a different sonification and instrumentation flavour. In contrast to most data sonifications, every OE-10 is designed to be <i>played with</i> in a musical way.</p>
        </div>

        <ul class = 'do_model-page__menu'>
            <a href = "/model/oe-10/operator">
                <li class = 'operator'>
                    <h3 class = 'menu-title'>Operator</h3> 
                </li>
            </a>
            <a href = "/model/oe-10/dfam">
                <li class ='dfam'>
                    <h3 class = 'menu-title'>Data From Another Mother</h3> 
                </li>
            </a> 
            <a href = "/model/oe-10/ambi">
                <li class = 'ambi'>
                    <h3 class = 'menu-title'>Ambient</h3> 
                </li>
            </a>
        </ul>

        <div class = 'do-model-page__content'>
            <h2>Data bits</h2>
            <p><strong><a href = 'https://openelectricity.org.au/' target = "_blank">Open Electricity</a></strong> is an wonderful resource and <i>platform for tracking Australia's electricity transition</i>. The OE-10 uses data published via the <a href = 'https://explore.openelectricity.org.au/energy/nem/' target = "_blank"> NEM tracker</a> and focuses on a curated set of ten data series that track generation sources and electricity market price. Open Electricity do very important work that provides insights into a very serious, complex issue. Please visit their <a href = 'https://openelectricity.org.au/' target = "_blank">website</a> to find out more.</p>

             <OperatorDataDisclaimer/>
            <p class = 'note'>Data for this project was extracted in Sep-Oct, 2025: a connection to their open API is planned</p>
        </div>
    </div>

</section>

<!--STYLE-->
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/model-home.css'>
</svelte:head>
