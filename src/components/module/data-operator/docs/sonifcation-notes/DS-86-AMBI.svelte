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

            <p>This data instrument uses a the conventional set of <i>Data Operator</i> tracks, with a lead synth (on track A), bass synth (B), two drum kit layers (C1 and C2) and a chord instrument (C3).</p>

            <ul>
                <li> Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences.  All data mapped to pitch is has been quantized to scale degrees (covering two octaves for lead and one octave for bass), that are subsequently mapped to the user selectable musical scales. Users can select data series for lead and bass, however by default:
                    <ul>
                        <li>The estimate of the number of people displaced over time is assigned to the bass melody, with the number of people displaced in a given year is assigned to the lead synth.
                        </li>
                        <li>Both the lead and bass synth play over a slow clock division of 4 and 2 respectively, with notes sustained.
                        </li>
                    </ul>
                </li>

                <li>For dynamic variation, the lead synths uses the assigned data series to affect note volume (velocity).
                </li>

                <li>By default (i.e. on load), the pulse sequencers for both Lead and Bass are set to only include pulses when there is a change in note. This corresponds to a change in the data that is 'significant' enough to cause a change in pitch (i.e. once quantized to scale). This pulse model is maintained when the user selects new data (series or scenes) but is overridden when the Euclidean Rhythm or Pulse Sequencers are activated, for each track. </li>

                <li>The chord layer uses a progression that follows the data series selected for the lead synth. This is scaled to a basic four chord progression that follows the chosen musical scale of composition with a lower note resolution (of 4n). By default, this is set to play over 8 bars (by applying a clock division of 2).
                </li>

                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity). Drum kits use the default Strudel acoustic drum samples.
                </li>
            </ul>
        </section>

        <Acknowledgements/>
    </div>
</article>
