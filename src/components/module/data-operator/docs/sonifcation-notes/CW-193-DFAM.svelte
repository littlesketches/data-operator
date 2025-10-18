<script>
    // Libs and utils
	import { fade }             from 'svelte/transition';
    // Components
    import Intro                from './Intro.svelte';
    import DataNoteCW193        from './DataNote_CW193.svelte';
    import Acknowledgements         from './Acknowledgements.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>// Sonification notes</h1>

        <Intro/>
        <DataNoteCW193/>

        <section>
            <h2>Instrumentation &times; parameter mapping</h2>
            <p>The CW-193:DFAM uses a multi-voice synth setup whose voices are controlled across track A and B; in addition to two drum kit layers (C1 and C2) and a chord instrument (C3). The synth is a (very imperfect) version of the <a href = 'https://www.moogmusic.com/synthesizers/dfam/' target = '_blank'>Moog DFAM </a>.</p>
            <ul>
                <li>Pitch (notes) on the synth is mapped to user selectable data series (Group A), to, producing 16 step note sequences (over one bar). The synth has two oscillators that play the pitches on different octaves.</li>
                <li>The "velocity" parameter on the synth is mapped to teh second user selectable data series (Group B). Velocity controls not only note volume, but is used in the synth to control a series of envelopes (pitch, amplitude and filter). This introduces rhythmic and timbral variations.</li>
                <li>The synth also has a noise component whose volume is affected by the velcoity series data.</li>
                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition, ans is played over four bars. The sound source for chords are sampled from various instruments that can be cycled though/selected by the player.</li>
                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity)</li>
            </ul>
        </section>

        <!-- <DataContextPlaceholder/> -->
        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
<style>
    h1{
        text-transform:     uppercase;
    }
</style>