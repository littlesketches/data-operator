<script>
    // Libs and utils
	import { fade }             from 'svelte/transition';

    // Components
    import DataNoteOE10         from './DataNote_OE10.svelte';
    import Acknowledgements     from './Acknowledgements.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class = 'sonification-note' class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>Sonification</h1>

        <DataNoteOE10/>

        <section>
            <h2>// Instrument parameter mapping</h2>

            <p>This data instrument adopts a conventional set of <i>Data Operator</i> track layers, with: a lead instrument (A), a bass synth (B), a two-layer drum kit (C1 and C2) and a chord instrument (C3).
            </p>

            <ul>
                <li>Pitch (notes) on lead and bass synths are mapped to user selectable data series, that are randomised by default to produce two interlocking melodies. Each note sequence represents a 24 hours of data (i.e. each scene is a 'day'). All data mapped to pitch is has been quantized to scale degrees, that are subsequently mapped to the user selectable musical scales.
                </li>

                <li>The lead instrument is a sampled piano that selects notes to play from a 16 step sequence (track A), using a Euclidean rhythm with a randomised number of pulses (that can be user adjusted). 
                    <ul>
                        <li>Note volume (velocity) is mapped inversely to pitch to add dynamic variation </li>
                    </ul>
                </li>

                <li>The bass instrument is a multi-voice synthesiser that selects notes to play from a 16 step sequence (track B), using another Euclidean rhythm with a randomised number of pulses (that can be user adjusted). 
                    <ul>
                        <li>By default, the bass is set to play of a half speed clock to produce a drone-like rumble.</li>
                        <li>The track B data series is used to modulate the level od the bass synths sub oscillator and noise layer</li>
                    </ul>
                </li>

                <li>The chord synth layer uses a progression mapped to the same data series as the lead synth. This is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition with a lower note resolution (of 4n, representing 6 hr intervals). By default, this is set to play over 8 bars (by applying a clock division of 2).</li>

                <li>Drum kit patterns (separated across C1 and C2) are selected presets (10 for each), with drum sounds sampled from the Visco Space Drum machine.
                    <ul>
                        <li>The volume (velocity) of hats/metal percussion on track C2 tracks the data for the amount of fossil fuel generated electricity throughout each day.</li>
                    </ul>
                </li>

            </ul>
        </section>

        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
