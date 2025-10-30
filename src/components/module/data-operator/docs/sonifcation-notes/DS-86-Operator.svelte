<script>
    // Libs and utils
	import { fade }             from 'svelte/transition';

    // Parts
    import DataNoteDS86         from './DataNote_DS86.svelte';
    import Acknowledgements         from './Acknowledgements.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class = 'sonification-note' class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <h1 class = 'header'>// Sonification notes</h1>

        <DataNoteDS86/>

        <section>
            <h2>// Instrument parameter mapping</h2>
            <p>This data instrument uses a conventional set of <i>Data Operator</i> track layers, with: a lead synth (A), a bass synth (B), a two-layer drum kit (C1 and C2) and a chord instrument (C3).
            </p>

            <ul>
                <li> Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences (over one bar).  All data mapped to pitch is has been quantized to scale degrees (covering two octaves for lead and one octave for bass), that are subsequently mapped to the user selectable musical scales. Users can select data series for lead and bass, however by default:
                    <ul>
                        <li>The estimate of the number of people displaced over time is assigned to the lead melody, with the number of people displaced in a given year is assigned to the bassline.</li>
                    </ul>
                </li>

                <li>For timbral variation, the lead synths filter envelope settings (for decay, sustain and depth) are allowed to drift within prescribed ranges. The lead synth then uses the selected data series to:
                    <ul>
                        <li>affect note volume (velocity) to introduce subtle variations in dynamics.</li>
                        <li>set ranges to modulate low pass filter cutoff frequency and resonance, both on slower clock divisions. These mappings introduce subtle timbral changes that shift over a longer time division.</li>
                    </ul>  
                </li>

                <li>The bass synth has mostly 'fixed' instrument parameters, but uses the data series tracking the amount of natural disaster events each year to modulate note velocity (to add an accent in years where disasters occur) and the level of the noise source that is blended into the bass synth's voice.
                </li>

                <li>The chord layer uses a progression that follows the data series selected for the lead synth. This is scaled to a basic four chord progression that follows the chosen musical scale of composition with a lower note resolution (of 4n). By default, this is set to play over 8 bars (by applying a clock division of 2).
                </li>


                <li>Drum kit patterns (separated across C1 and C2) are selected presets (10 for each), with drum sounds sampled from the Roland TR-909 drum machine.
                    <ul>
                        <li>The volume (velocity) of hats/metal percussion on track C2 tracks the data for the amount of fossil fuel generated electricity throughout each day. </li>
                    </ul>
                </li>
            </ul>
        </section>

        <!-- <DataContextPlaceholder/> -->
        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
