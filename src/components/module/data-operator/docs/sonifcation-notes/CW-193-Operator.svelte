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

            <p>This data instrument uses a the conventional set of <i>Data Operator</i> tracks, with a lead synth (on track A), bass synth (B), two drum kit layers (C1 and C2) and a chord instrument (C3).</p>

            <ul>
                <li> The tempo of each project is initially mapped to each nation's 'climate vulnerability score', with those at most vulnerable having a more urgent tempo.
                </li>

                <li>Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences.  All data assigned to pitch is has been quantized to scale degrees (covering two octaves for lead and one octave for bass), that are subsequently mapped to the user selectable musical scales. Users can select data series for lead and bass, however by default:
                    <ul>
                        <li>Greenhouse gas (GHG) emitted into the atmosphere on a per capita basis is assigned to the lead synth</li>
                        <li>GHG drawn down from the atmosphere on a per capita basis is assigned to the bass synth</li>
                        <li>The pulse sequences for both lead and bass are randomised from within selected euclidean pulse ranges.</li>
                    </ul>
                </li>

                <li>The lead synth uses data (from it's selected data series) to set ranges for the synths modulated low pass filter cutoff frequency and resonance: both of which introduce timbral changes that are set to shift over a longer time division (four bars). For timbral variation, the lead synths filter envelope settings (for decay, sustain and depth) are allowed to drift within prescribed ranges. The lead synth then uses the selected data series to:
                    <ul>
                        <li>affect note volume (velocity) to introduce subtle variations in dynamics.</li>
                        <li>set ranges to modulate low pass filter cutoff frequency and resonance, both on slower clock divisions. These mappings introduce subtle timbral changes that shift over a longer time division.</li>
                    </ul>  
                </li>

                <li>The chord layer uses a progression mapped to the same data series as the lead synth. This is scaled to a basic four chord progression that follows the chosen musical scale of composition with a lower note resolution (of 4n, representing 6 hr intervals). The progression is set to play over 8 bars (by applying a clock division of 2).</li>

                <li>Drum kit patterns (separated across C1 and C2) are selected presets (10 for each), with drum sounds sampled from the LinnDrum drum machine.
                    <ul>
                        <li>The volume (velocity) of hats/metal percussion on track C2 tracks the data for the amount of fossil fuel generated electricity throughout each day. </li>
                    </ul>
                </li>
            </ul>
        </section>

        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
