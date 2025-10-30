<!-- ABOUT SILENT SHOUT-->
<script>
    // Libs and utils
	import { fade } from 'svelte/transition';
    // Props
    let {isSideGuide = false} = $props()
</script>


<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper'>

        <section class = 'subtitle-block'>
            <div>データオペレーター</div>
            <div>Data Operator</div>
        </section>
        <h1 class = 'header'>// Sonification notes</h1>

        <section>
            <p>This page is used to document some notes, lessons and ramblings about the data sonification approaches taken in "Series 1" of the Data Operator project. Rather than documenting the 'final' outcome of the work, they are written down '(somewhat)  progress and 
            </p>
        </section>

        <section>
            <h3>Limitations and challenges</h3>
            <ul>
                <li>Sound design expertise and a beginner/'learn as you go' approach to working wth Strudel are/were a challenged to realising 
                </li>
                <li>Data sourced were deliberately 'static' in natured and fairly limited in their sophistication. Although they wre chosen for their familiarity (from teh authors prior work), they were/are not treated with any 'depth' of analysis or transformation. This is mainly due to other development priorities and limits some parameter mapping and sound design potential
                </li>
                <li>The user interface - partcualry the chose button control layout and limited 'screen' - does limit what sound parameter controls can be made accessible to users.</li>
            </ul>
        </section>

        <section>
            <h3>Things that worked</h3>
            <ul>
                <li>Form a technical perspective, the use of Strudel worked exceptionally well for parameter mapping and sound design/exploration. In particular, the (developed) workflow of being able to export the sonification strudel code directly to the Strudel REPL, is very useful for testing and tweaking.
                </li>
                <li>Pitched sequences mapped to data series.
                    <ul>
                        <li> Monophonic 'interlocking' sequences for bass and melody work well together (or solo). Frequency range (with timbral differences) is 'enough'  however differences in pulse rhythm are helpful, partly for aesthetic interest.</li>
                        <li>Mapping data series to velocity (for loudness) is useful but needs to be subtle and in a limited range (i.e. more to humanize the notes).
                        </li>
                        <li>Harmony (i.e. chords/pads/drones) works well if played at a slower rate (clock divider)
                        </li>

                        <li>Supporting voices wth noise sources had mixed results. The 'idea'of blending in noise with (data mapped) dynamics works a bit 'better in theory' than in practice, as noise can lead to muddiness if sequences with regular pulses.
                        </li>
                    </ul>
                </li>

            </ul>

            <p>Of course, aside from pitch, there are lots of other parameters that data can be mapped to. Some are obvious to the ear, like 'velocity' (which translates volume) or panning (positioning of an instrument in the stereo field), and others can be more subtle and/or result in changes in timbre, like the positioning of a filter cutoff frequency. Much like data visualisation, some 'channels' are more noticeable and intuitive than others. As an analogue, you could think of visual position and size, to be akin to say, the pitch and volume of sound. Colours might be instruments etc. The point though, is not to replicate visual channels, or to get too dogmatic about choosing parameters. In the sonification space, there are more options for parameter mapping, and most of them are subtle. And so beyond the 'primary' channels of pitch, velocity (dynamics) and instrumentation, the Data Operators tend to use data to create movement (modulation) and interest in the sound.
            </p>

            <p>Its also important to point out that the Data Operators have synced animated data visuals/charts the are matched to these primary channels. This 'double-encoding' is very much deliberate.
            </p>

        </section>

    </div>
</article>


<!-- STYLES-->
<style>
    .subtitle-block{
        font-size:          x-small;
        display:            flex;
        text-transform:     uppercase;
        margin-top:         3.5rem;
        padding:            0.5rem;
    }
    .subtitle-block div{
        padding-right:      0.5rem;
    }

    h1{
        margin-block-start: 0;
    }
</style>