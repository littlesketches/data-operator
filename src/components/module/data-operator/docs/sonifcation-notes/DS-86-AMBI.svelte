<script>
    // Libs and utils
	import { fade }                 from 'svelte/transition';

    // Parts
    import DataNoteDS86             from './DataNote_DS86.svelte';
    import Acknowledgements         from './Acknowledgements.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class = 'sonification-note' class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <section class = 'subtitle-block'>
            <div>データオペレーター</div>
            <div>Data Operator</div>
        </section>
        <h1 class = 'header'>// Sonification notes</h1>

        <DataNoteDS86/>

        <section>
            <h2>// Instrument parameter mapping</h2>

            <p>The DS-86:AMBI features the conventional set of <i>Data Operator</i> tracks, with a lead synth (on track A), bass synth (B), two drum kit layers (C1 and C2) and a chord instrument (C3).</p>

            <ul>
                <li> Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences (over one bar). All data mapped to pitch is has been quantized to scale degrees (0 to 10 for lead and 0 to 5 for bass), before being (dynamically) mapped to the user editable musical scales.</li>

                <li>By default (i.e. on load), the pulse sequencers for both Lead and Bass are set to only include pulses when there is a change in note. This corresponds to a change in the data that is 'significant' enough to cause a change in pitch (i.e. once quantized to scale). This pulse model is maintained when the user selects new data (series or scenes) but is overridden when the Euclidean Rhythm or Pulse Sequencers are activated, for each track. </li>

                <li>The lead synth also uses data (from the selected data series) to set ranges for the synths modulated low pass filter cutoff frequency and resonance: both of which introduce timbral changes that are set to shift over a longer time division (four bars). The 'price' data series is mapped to note volume (velocity) to introduce a subtle variation in dynamics. Note:</li>

                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition, ans is played over four bars. The sound source for chords are sampled from various instruments that can be cycled though/selected by the player.</li>

                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity). Drum kits are sampled (Roland TR-909).</li>
            </ul>
        </section>

        <!-- <DataContextPlaceholder/> -->
        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
