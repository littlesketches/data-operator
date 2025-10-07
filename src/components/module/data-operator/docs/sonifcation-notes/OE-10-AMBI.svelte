<script>
    // Libs and utils
	import { fade } from 'svelte/transition';
    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>Data Operator </h1>
        <p class = 'subtitle'>Data sonification summary</p>

        <section>
            <p>This is a (slightly technical) set of [draft] notes documenting key points of data sonification process. They are provided for 'completeness' and to provide curious users with some context for the data and instruments they are playing with in this particular <i>Data Operator</i> model and version.</p>
        </section>

        <section>
            <h3>OE-10: Data from Open Electricity</h3>
            <p>Data is source in this sonification comes from  <a href='https://openelectricity.org.au/' target="_blank">Open Electricity</a> and contains daily data about the Australian National Energy Market (NEM). Time interval data for over 10 data series are extracted, including volumes by electricity generation source and market price. Aggregation types (fossil fuel vs renewable energy) and various proportions (i.e. ratios) are also calculated. Data is reported in near 'real time', and is separated into 24 hour blocks to produce data for a 'scene'. For this sonification, the highest time-highest resolution used in the sonifications is 16 divisions (equivalent to 1.5 hour blocks).
            </p>
        </section>

        <section>
            <h3>AMBI: Instrumentation &times; parameter mapping</h3>
            <p>The OE-10 AMBI uses a multi-voice synth setup whose voices are controlled across track A and B; in addition to two drum kit layers (C1 and C2) and a chord instrument (C3). The synth is a (very imperfect) version of the <a href = 'https://www.moogmusic.com/synthesizers/dfam/' target = '_blank'>Moog DFAM </a>.</p>
            <ul>
                <!-- <li>Pitch (notes) on the synth is mapped to user selectable data series (Group A), to, producing 16 step note sequences (over one bar). The synth has two oscillators that play the pitches on different octaves.
                <li>The "velocity" parameter on the synth is mapped to teh second user selectable data series (Group B). Velocity controls not only note volume, but is used in the synth to control a series of envelopes (pitch, amplitude and filter). This introduces rhythmic and timbral variations.</li>
                <li>The synth also has a noise component whose volume is affected by the velcoity series data.</li>
                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition, ans is played over four bars. The sound source for chords are sampled from various instruments that can be cycled though/selected by the player.</li>
                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity)</li> -->
            </ul>
        </section>


        <section>
            <h3>Data context and story</h3>
            <p>Coming soon...maybe. For more detailed and deliberate/directed works, the mapping and instrumentation choices may be closely matched in theme, to the source data. In these early experiments however, there is more emphasis on exploring the sound and interface design potential of the <i>Data Operator</i> platform. The forthcoming addition/use of the <i>Composition</i> component is expected to be a more suitable tool for 'data storytelling' with the <i>Data Operator</i>. 
            </p>
        </section>

        <section>
            <h3>Acknowledgements</h3>
            <p>Please refer to the documentation for details of technologies used and licenses. Very quickly though, this is project is open source. It uses open source data, open source technologies, and open sourced samples.</p>
        </section>
    </div>
</article>


<!-- STYLES-->
<style>

</style>