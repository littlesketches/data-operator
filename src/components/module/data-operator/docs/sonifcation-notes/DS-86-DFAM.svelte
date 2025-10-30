<script>
    // Libs and utils
	import { fade }                 from 'svelte/transition';

    // Parts
    import DataNoteDS86             from './DataNote_DS86.svelte';
    import Acknowledgements         from './Acknowledgements.svelte';
    import DataContextPlaceholder   from './DataContext_placeholder.svelte';

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

            <p>This data instrument features a main, a multi-voice synth setup whose main parameters are controlled by separate data series assigned to tracks A and B; in addition to two drum kit layers (C1 and C2) and a chord instrument (C3). The synth is a (very imperfect) version of the <a href = 'https://www.moogmusic.com/synthesizers/dfam/' target = '_blank'>Moog's DFAM hardware synth</a>.
            </p>

            <ul>
                <li>Pitch (notes) on the main synth is mapped to the user selected data series (A). By default this is assigned to <i>electricity market price</i> and produces 16 step note sequences that is set to pulse on note change (i.e. when the scale-quantized data change is large enough). 
                    <ul>
                        <li>The synth has two oscillators that play the pitches on different octaves, and with two different oscillator types. Pitch scale for both spans two octaves.</li>
                        <li>In addition to pitch, the data series(A) is used to set the low pass filter cutoff, and resonance amount. Both of these ranges are mapped to lower resolution data that change in unison with the chord part (C3), providing some visual feedback as filter changes then mirror chord changes are displayed in the <i>Data Operator</i> screen.</li>
                    </ul>
                </li>

                <li>Velocity is mapped to the second user selectable data series (B): by default this is set to the total volume of displaced people (i.e. stock). Velocity controls not only note volume, but is used in the synth to control a series of envelopes (pitch, amplitude and filter). This introduces somewhat chaotic rhythmic and timbral variations.
                </li>

                <li>The chord layer uses a progression mapped to the same data series as the lead synth. This is scaled to a basic four chord progression that follows the chosen musical scale of composition with a lower note resolution (of 4n, representing 6 hr intervals).
                </li>

                <li>Drum kit patterns (separated across C1 and C2) are selected presets (10 for each), with drum sounds sampled from the Boss DR-220 drum machine.
                    <ul>
                        <li>The volume (velocity) of hats/metal percussion on track C2 tracks the data for track B throughout the timeline for each nation, which mirrors the volume of the main synth.
                        </li>
                    </ul>
                </li>
            </ul>
        </section>

        <!-- <DataContextPlaceholder/> -->
        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
