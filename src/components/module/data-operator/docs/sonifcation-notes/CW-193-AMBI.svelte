<script>
    // Libs and utils
	import { fade }             from 'svelte/transition';

    // Components
    import DataNoteCW193        from './DataNote_CW193.svelte';
    import Acknowledgements     from './Acknowledgements.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>


<!-- HTML MARKUP-->
<article class = 'sonification-note' class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>// Sonification notes</h1>

        <DataNoteCW193/>

        <section>
            <h2>// Instrument parameter mapping</h2>

            <p>This data instrument adopts a conventional set of <i>Data Operator</i> track layers, with: a lead instrument of a sampled ocarina (A), a bass synth (B), a two-layer drum kit (C1 and C2) and a chord instrument (C3).        
            </p>

            <ul>
                <li> The tempo of each project is initially mapped to each nation's 'climate vulnerability score', with those at most vulnerable having a more urgent tempo.
                </li>

                <li>Pitch (notes) on lead and bass instruments are mapped to user selectable data series, to produce 16 step note sequences.  All data assigned to pitch is has been quantized to scale degrees (covering two octaves for lead and one octave for bass), that are subsequently mapped to the user selectable musical scales. Users can select data series for lead and bass, however by default:
                    <ul>
                        <li>Net greenhouse gas (GHG) emissions for a nation on a per capita basis is assigned to the lead ocarina</li>
                        <li>Net GHG for a nation on per year is assigned to the bass synth</li>
                        <li>The pulse sequences for the lead and bass are set to play and sustain notes when there is a change in the data that is 'significant' enough to cause a change in pitch (i.e. once quantized to scale)</li>
                    </ul>
                </li>

                <li>Velocity (volume) on both the ocarina and bass synth use their assigned data to affect note volume (velocity) to introduce subtle variations in dynamics. For the bass synth, this level of of noise mixed into the sound also tracks the assigned data series.
                </li>


                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression that follows the chosen musical scale of composition, ans is played over four bars. The progression is set to play over 8 bars (by applying a clock division of 2).
                </li>

                <li>Drum kit patterns (separated across C1 and C2) are presets: further work may be done to introduce data mapping to some of these (e.g. velocity). Drum kits use the default Strudel acoustic drum samples.
                </li>
            </ul>
        </section>

        <Acknowledgements/>
    </div>
</article>
