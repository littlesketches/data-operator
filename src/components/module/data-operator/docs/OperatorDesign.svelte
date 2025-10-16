<!-- DATA OPERATOR DOCS: OPERATOR DESIGN -->
<script>
    // Libs and utils
	import { fade } from 'svelte/transition';
    import SonificationCanvasDO1 from './SonificationCanvasDO1.svelte';
    import Intro from './sonifcation-notes/Intro.svelte';
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
        <h1 class = 'header'>// Operator design</h1>

        <section>
            <h2>Towards a Data instrument</h2>
            <blockquote>
                <p>The <i>Data Operator</i> is a sonification tool that <strong>makes data fun to play with</strong>. It  features a quirky interface &mdash; filled with large buttons and a small but action-packed screen &mdash; that invites users to learn how it operates, and how to turn data into patterns and musical compositions. The <i>Data Operator</i> is a noise making device with audio and visual feedback; designed in the spirit of an electronic musical instrument.</p>
            </blockquote>
<!-- 
            <p>At a deeper level, the <i>Data Operator</i> is a tool that encourages users:</p>
            <ul>
                <li>to play with and learn how complicated (data/modelled) systems behave;</li>
                <li>to think creatively about how they want a system to behave; </li>
                <li>to express and share their ideas .</li>
            </ul>  -->

        </section>

        <hr>
        <section>
            <h2>About these design notes</h2>
            <p>These ramblings document the design and technical implementation of the Data Operator. They have been broken into six concepts and areas that may seem loosely connected, but were found to places limitations on one another: Ultimately, these compromises shaped the design of the Data Operator. 
            </p>

            <ol>
                <li>Instant fun</li>
                <li>Play anywhere</li>
                <li>Learn like an instrument</li>
                <li>Strudel sounds + sharing</li>
                <li>Data & data sonification</li>
            </ol>

        </section>

        <hr>
        <section>
            <h2>1. Instant fun</h2>
            <p>The principle design goal for the <i>Data Operator</i> is that it must be fun to use. That doesn't mean the data that underpins each <i>Data Operator</i> needs to be 'fun'. And it certainly doesn't mean that the <i>Data Operator</i> makes fun of the data. It simply means that the device needs to be fun and engaging for the user, to invite and encourage play. 
            </p>
            <p>A number of design directions and decisions are made to support the UX principle of 'instant fun'<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">The concept of 'instant fun' is borrowed from the design mantra mentioned by Teenage Engineering's Jesper Kouthoofd when interviewed for the book <a href = "https://bjooks.com/products/push-turn-move-the-book">Push Turn Move</a></span>: a 'friendly' interface, a colorful yet minimalist design, the consistent presence of large, toy-like buttons, playful animations and (generally) 'energetic' sounds etc. This interface <i>tone</i> naturally limits the level of detail that might be available to support more sophisticated data and musical features.
            </p>
            <ul>
                <li>Animated visuals of data/pattern are always displayed to provide users with a consistent interface.<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">Menus, explanatory and 'story telling' narratives were considered for the display but were ultimately too distracting and confusing for a 'fun' experience.</span>.
                </li>
                <li>Similarly, the level of detail about the data &mdash;including labelling and explanations &mdash; is reduced and simplfied (on the <i>Data Operator</i>  screen)<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">Simplifiction to the point of abstraction is preferred over lengthy detail that would need to be scrolled through</span>. 
                </li>
                <li> From an electronic musical instrument perspective, this means limiting the depth and sophistication of sound design possibilities<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">A 'menu diving' interface was considered but found to be inconsistent the 'instant fun' mantra.</span>
                </li>
                <li>Shortcuts actions to key <i>Data Operator</i>features (e.g. changing patterns) are provided on teh initial/default state of for the button controls. Consistent placement of 'mode actions' are also preferred to avoid confusion</li>
            </ul>
        </section>

        <hr>
        <section>
            <h2>2. Play anywhere</h2>
            <p>The <i>Data Operator</i> is designed to be playable on all (major browser-based) devices: mobile, table, and laptop/desktop computers. The ability to play with a <i>Data Operator</i> comfortably 'on-the-go' (i.e. on a mobile phone), is a primary goal and closely linked to #1 (fun!). The maximum number of buttons that can be supported by mobile touchscreen devices is a 4x4 grid.
            </p>
            <ul>
                <li>The 16 button limit is the major constraint placed on the control scheme. The main 4x4 grid is adopted as this mirrors the  4x4 pad layout of minimal MIDI controller pads: this affords some common musical use cases, e.g. the 16 step pulse sequencer.
                </li>
                <li>A separate 17th multi-button, primarily used for play/stop control, is also required and needs to be accessible at all times.
                </li>
                <li>The touch interface introduces limitations (that can be worked around?) in how many buttons can be simultaneously activated (unlike physical buttons). This has consequences for how 'multiple button combos' are used. Moreover, it was decided to limit button combo's to two buttons only, except in the case of punch in FX.
                </li> 
            </ul>
        </section>

        <hr>
        <section>
            <h2>3. Learn an instrument</h2>
            <p>In the spirit of musical instruments design, the <i>Data Operator</i> is meant to be played with an <i>learned</i>. To naturally build on the  'instant fun' mantra, a 'moderate but shallow' learning curve is designed for<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">The <i>Data Operator</i>  takes design inspiration from the lovable Teenage Engineering <a href = 'https://teenage.engineering/products/po' target = '_blank'>Pocket Operator</a> and <a href ="https://teenage.engineering/products/ep-133">EP</a> series of instruments.</span>. This is an important UX concept as it allows for interface depth and a raft of musical features that are critical to design of the <i>Data Operator</i> as an 'active' instrument, capable of more than just playback..
            </p>
            <ul>
                <li><strong>Mode actions</strong> make up all the data selection and musical selection/performance actions: they need to be learned by users who want to deliberately control the <i>Data Operator</i>. Apart from group/part selection, the mode actions should alter the sound being played/heard</li>
                <li>Mode actions always required two buttons to be pressed: a mode button is held and another button is pressed to select an action to take. Action labels are always displayed when a mode button is held, to assist in learning.</li>
                <li>Performance-orientated features (e.g. solo,mute, transpose) are laid out in as accessible and consistent way as possible.</li>
                <li>It is anticipated that 'skilled player' (much a like a musical instrument), would rely on muscle memory and visual/audio feeback to play the <i>Data Operator</i></li>
            </ul>
        </section>

        <hr>
        <section>
            <h2>4. Strudel sounds & sharing </h2>
            <p>The <i>Data Operator</i> platform has been developed around the brilliant <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> live coding audio engine. This provides convenient access to powerful audio synthesis and sample playback tools, audio processing effects, and musical tools that are well suited parameter mapping (modelled) data to audio instrument parameters. Strudel naturally supports 'stacking' sound patterns to produce 'full' multi-track compositions.
            </p>
            <p>The notable limitation of using Strudel in the <i>Data Operator</i>is that is built around a cycle/loop of music. This means: </p>
            <ul>
                <li>Functionality needs to be developed on top of Strudel to enable animation synchronisation (i.e. an event callback)<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">These features are included in a core Class within the <i>Data Operator</i> source code, but are expected to be made more robust and sophisticated in the future.</span>.</li>
                <li>Functionality needs to be developed on top of Strudel to support (time-dependent) layering and/or automation of track parameters<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">This is the <strong>Composition</strong> feature of the <i>Data Operator</i> which is present but under/not utilised in the initial <i>Data Operator</i> series</span>.</li>
                <li>It is not feasible to add a 'playable' instrument in Strudel (e.g. controlled via a MIDI keyboard).<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">Technically this is probably possible, but it is not a documented feature at the time of development.</span></li>
            </ul>
            <p>The core UI of <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> is the <a href = 'https://strudel.cc/' target = '_blank'>REPL-based interface</a>. This is not used in the <i>Data Operator</i> interface, however REPL allows for code to be extracted from the <i>Data Operator</i> that can be played in the public REPL, which:</p>
            <ul>
                <li>Allows users save the data sonificaton they are currently playing (i.e. including their selections and musical tweaks) </li>
                <li>Allows users to generate a REPL-link that contains their current sonification, which can be shared with others<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">This feature provides a viable pathway fo social and even collaborative features to be added the the <i>Data Operator</i> </span>. </li>
            </ul>

        </section>

        <hr>
        <section>
            <h2>5. Data & data sonification</h2>

            <p>Although the <i>Data Operator</i> is built around the concept of a data sonification and the core building block that is the data that represents, the <i>Data Operator</i> as a 'platform' is designed to be agnostic to the data and data sonification approach. Or perhaps more accurately:</p>

            <ul>
                <li>Data is expected to be shaped (via Data Models) into forms and formats that make it easy to map data parameters to (the most common and useful) sound parameters<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">This initial <i>Data Operator</i> models use time series data which is a natural fit for playing sound across time (i.e. time is scaled to musical time).</span>.
                </li>
                <li>The sonification choice of <strong>parameter mapping</strong> is fixed.</li>
            </ul>

            <p>To complete the <i>Data Operator</i> design documentation, the <a href = 'https://sonification.design/about.html' target ="_blank">Data Sonification Canvas</a> developed by Sara Lenzi and Paolo Ciuccarelli, has been used below as a tool for reflection and prompting future ideas:</p>

            <!-- <p>Each <i>Data Operator</i> starts with data. This data can be static, or a stream, or be part of a model or simulation that that the <i>Data Operator</i> can be hooked into (i.e. as a data model controller). The primary role of the Data Operator, is to then map incoming data, to parameters of its internal instruments and sound patterns, to produce music. The interface of the <i>Data Operator</i> then allows users to use a set of music-related tools to explore and <i>play with</i> the source data: controlling and manipulating the data sonification on-the-fly, in real-time. </p>

            <p>With <i>Data Operator</i> basically get one looping  bar of music (a 'cycle' with 16-step) to sequence and jam with, using (up to) 5 tracks for instruments and sounds. It doesn't sound like much, but you can make a hell of racket with this little setup. The input data will generally be chosen and modelled with multiple data series can be swapped in and out of the <i>Data Operator</i>. The standard approach is to have 10 data series or sound patterns and available per track, which is 100,000 combinations per for every 'slice' of data, known as a 'scene'. And most data sets chosen have dozens or hundreds (or more) scenes available!
            </p>
            <p>Each <i>Data Operator</i> comes with a a bunch of useful musical tools to help you spice up your sonification. 
            </p>
            <ul>
                <li>Firstly, there are scales. When data is mapped to pitch (frequency), these data scales are quantized to musical scale degrees. This is an aesthetic (musical) decision to make it easier to hear and harmonize the changes in data. You can choose from dozens of musical scales, and adjust their root notes.</li>
                <li>You can also transpose any melodic tracks along their scales.</li>
                <li>Every track has a Euclidean rhythm applied to it. This is brilliant piece of math that chooses which notes in a 16 step sequence are played, by adjusting how many pulses (steps) you want to hear, and whether (and by how much) you'd like that pulse pattern rotated/offset. It's a quick way to cycle through and test out 172 different rhythms, for every* track. Of course, if you want to manually choose the pulses...
                </li>
                <li>Four tracks have their own pulse sequencer (coming soon). Why not all 5? Well actually, we found that the interface doesn't quite have enough buttons to make it...so that's a UI limitation. That said, the last track (C3) is designed to be used for multi-cycle chord progressions, drones and textures, so it </li>
            </ul>
            
            <p>Of course, the goals and design of the <i>Data Operator</i> differ significantly from the <a href = 'https://strudel.cc/' target = '_blank'>REPL-based Strudel interface</a>
            </p>           -->
        </section>

        <SonificationCanvasDO1/>

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