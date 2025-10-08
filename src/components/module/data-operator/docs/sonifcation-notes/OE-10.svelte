<script>
    // Libs and utils
	import { fade }         from 'svelte/transition';
    // Parts
    import Intro            from './Intro.svelte';
    import DataNoteOE10     from './DataNote_OE10.svelte';
    import Acknowledgements from './Acknowledgements.svelte';
    import DataContextPlaceholder from './DataContext_placeholder.svelte';
    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>Data Operator </h1>
        <p class = 'subtitle'>Data sonification summary</p>

        <Intro/>
        <DataNoteOE10/>

        <section>
            <h2>Instrumentation &times; parameter mapping</h2>
            <p>The OE-10 features the conventional set of Data Operator track layers, with a lead synth (on track A), bass synth (B), two drum kit layers (C1 and C2) and a chord instrument (C3).</p>
            <ul>
                <li> Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences (over one bar). All data mapped to pitch is has been quantized to scale degrees (0 to 10 for lead and 0 to 5 for bass), before being (dynamically) mapped to the user editable musical scales.</li>
                <li>The lead synth also uses data (from the selected data series) to set ranges for the synths modulated low pass filter cutoff frequency and resonance: both of which introduce timbral changes that are set to shift over a longer time division (four bars). The 'price' data series is mapped to note volume (velocity) to introduce a subtle variation in dynamics.</li>
                <li>The bass synth uses the 'fossil-fuel' proportion data series to modulate the amount/volume of a noise source that blended into the bass synth's voice.</li>
                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition, ans is played over four bars. The sound source for chords are sampled from various instruments that can be cycled though/selected by the player.</li>
                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity). Drum kits are sampled (Roland TR-909).</li>
            </ul>
        </section>


        <section>
            <h2>Data context and story</h2>
            <p>Coming soon...maybe. For more detailed and deliberate/directed works, the mapping and instrumentation choices may be closely matched in theme, to the source data. In these early experiments however, there is more emphasis on exploring the sound and interface design potential of the <i>Data Operator</i> platform. The forthcoming addition/use of the <i>Composition</i> component is expected to be a more suitable tool for 'data storytelling' with the <i>Data Operator</i>. 
            </p>
        </section>

        <DataContextPlaceholder/>
        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
<style>
</style>