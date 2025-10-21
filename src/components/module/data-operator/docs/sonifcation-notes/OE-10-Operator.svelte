<script>
    // Libs and utils
	import { fade }                 from 'svelte/transition';
 
    // Parts
    import Intro                    from './Intro.svelte';
    import DataNoteOE10             from './DataNote_OE10.svelte';
    import Acknowledgements         from './Acknowledgements.svelte';

    // Props
    let {model, isSideGuide = false} = $props()

    // Model 
    const {sonification} = model

console.log(sonification)


    let link = $derived( async() => await sonification?.handle.exportCode())


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
            <p>The OE-10 uses a conventional set of Data Operator track layers, with a lead synth (A), bass synth (B), two drum kit layers (C1 and C2) and a chord instrument (C3).</p>
            <ul>
                <li>Pitch (notes) on lead and bass synths are mapped to user selectable data series, to produce 16 step note sequences (over one bar). All data mapped to pitch is has been quantized to scale degrees (0 to 10 for lead and 0 to 5 for bass), that are subsequently mapped to the user selectable musical scales.</li>
                <li>The lead synth also uses the selected data series to:
                    <ul>
                        <li>affect note volume (velocity) to introduce subtle variations in dynamics.</li>
                        <li>set ranges to modulate low pass filter cutoff frequency and resonance, both on slower clock divisions. These mappings introduce subtle timbral changes that shift over a longer time division.</li>
                    </ul>  
                </li>
                <li>The bass synth uses the selected data series to modulate the amount/volume of a noise source that blended into the bass synth's voice.</li>

                <li>The chord layer uses a progression mapped to the same data series as the lead synth. It is scaled to a basic four chord progression (I, IV, V and VII) that follows the chosen musical scale of composition, ans is played over four bars. The sound source for chords are sampled from various instruments that can be cycled though/selected by the player.</li>

                <li>Drum kit patterns (separated across C1 and C2) are selected presets (10 for each), with drum sounds sampled from the Roland TR-909 drum machine.
                    <ul>
                        <li>The volume (velocity) of hats/metal percussion on track C2 is mapped to the data series selection for the bass synth.</li>
                    </ul>
                </li>
            </ul>
        </section>

        <Acknowledgements/>
    </div>
</article>


<!-- STYLES-->
<style>
</style>