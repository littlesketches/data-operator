<!-- DATA OPERATOR DOCS: OPERATOR DESIGN -->
<script>
    // Libs and utils
	import { fade } from 'svelte/transition';
    import SonificationCanvasDO1 from './sonifcation-notes/SonificationCanvasDO1.svelte';
    
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

            <p>The <i>Data Operator</i> is a sonification tool that <strong>makes data fun to play with</strong>. It features looping layers an intriguing interface &mdash; filled with large buttons and a small but action-packed screen &mdash; that invites users to learn how it operates, and how to turn data into patterns and musical compositions. The <i>Data Operator</i> is a noise making device with audio and visual feedback; designed in the spirit of an electronic musical instrument.</p>

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
            <p>These notes document five principles and technical areas that ultimately shaped the design of the <i>Data Operator</i>.
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
            <p>The principle design goal for the <i>Data Operator</i> is that it must be fun to use. That doesn't mean the data that underpins each <i>Data Operator</i> needs to be 'fun'. And it certainly doesn't mean that the <i>Data Operator</i> makes fun of the data. It simply means that the device is designed to engage a user and  encourage <i>play</i>. 
            </p>
            <p>A number of interface design decisions are made to support this user experience (UX) principle of 'instant fun'<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">The concept of 'instant fun' is borrowed from the design mantra mentioned by Teenage Engineering's Jesper Kouthoofd when interviewed for the book <a href = "https://bjooks.com/products/push-turn-move-the-book">Push Turn Move</a></span>: a 'friendly' interface, a colorful yet minimalist design, the dominant and inviting presence of large, toy-like buttons, playful animations and (generally) 'energetic' sounds etc. 
            </p>
            <p>This interface <i>tone</i> naturally limits the level of detail that might be available to support more sophisticated data and musical features. This has key design implications:</p>

            <ul>
                <li>Animated visuals of data/pattern are always displayed to provide users with a consistent interface.<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">Menus, explanatory and 'story telling' narratives were considered for the display but were ultimately too distracting and confusing for a 'fun' experience.</span>.
                </li>
                <li>The level of detail about the data &mdash;including labelling and explanations &mdash; is reduced and simplified (on the <i>Data Operator</i>  screen)<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">Simplification to the point of abstraction is preferred over lengthy detail that would need to be scrolled through</span>. 
                </li>
                <li> From an electronic musical instrument perspective, this means limiting the depth and sophistication of sound design possibilities<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">A 'menu diving' interface was considered but found to be inconsistent the 'instant fun' mantra.</span>.
                </li>
                <li>Shortcuts actions to key <i>Data Operator</i> features (e.g. changing patterns) are available as the default (i.e. on 'start'). Consistent placement of 'mode actions' are also prioritised to avoid confusion.</li>
            </ul>
        </section>

        <hr>
        <section>
            <h2>2. Play anywhere</h2>
            <p>The <i>Data Operator</i> must be playable on all (major browser-based) devices: mobile phones, table, and laptop/desktop computers. The ability to play a <i>Data Operator</i> 'on-the-go' (i.e. on a mobile phone), is a key technical goal<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">The performance of the webAudio API is of course, limited by device CPU and how the audio engine is designed to manage processes  (e.g. with the AudioWorklet API). These considerations are handled by, and therefore limited by <a href = 'https://strudel.cc/workshop/getting-started/' target = '_blank'>Strudel</a>. The upshot is that compositions and instrument design must be constrained to and tested on lower powered devices.</span> of the project and closely linked to #1 (fun!). 
            </p>
            <p>The maximum number of buttons that can be supported by mobile touchscreen devices is a 4x4 grid. This has key design implications: 
            </p>
            <ul>
                <li>The 16 button limit is a 'hard' constraint placed on the control scheme. The main 4x4 grid is favoured as it mirrors the 4x4 pad layout of minimal MIDI controller pad, which affords some common musical use cases, e.g. the 16 step pulse sequencer.
                </li>
                <li>A separate 17th multi-button, primarily used for play/stop control, is also required and must be consistently positioned and accessible at all times.
                </li>
                <li>The touch interface on mobile devices introduce limitations in how many buttons can be (comfortably)  activated at the same time, unlike physical keyboard buttons. This has consequences for how 'multiple button combos' are used and implies a natural limit of using two buttons at once (i.e. two thumbs on a mobile device)<label for="sn-006" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-006" class="margin-toggle"/><span class="sidenote">The exception is for punch-in FX where it is possible to use multiple FX  buttons simultaneously. This is not ergonomic on a mobile device (especially where two thumbs are used) and serves as a natural deterrent for using multiple FX at once. Interestingly, there is positive flow-on effect here where CPU-intensive multi-FX are less likley to be used on mobile devices.</span>. 
                </li> 
            </ul>
        </section>

        <hr>
        <section>
            <h2>3. Learn an instrument</h2>
            <p>In the spirit of a musical instrument, the <i>Data Operator</i> is designed to be played and <i>learned</i>. This means that 'instant fun' mantra must be organically extended with a (moderate) learning curve<label for="sn-007" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-007" class="margin-toggle"/><span class="sidenote">The <i>Data Operator</i> takes design inspiration from the lovable Teenage Engineering <a href = 'https://teenage.engineering/products/po' target = '_blank'>Pocket Operator</a> and <a href ="https://teenage.engineering/products/ep-133">EP</a> series of instruments.</span> tha embraces a design approach that rewards users for learning new (fun) features and a capabilities. This is an important UX concept as it affords interface depth and a raft of musical features that make  <i>Data Operator</i> an 'active' instrument, capable of more than just 'playback'. This has  key design implications:
            </p>
            <ul>
                <li><strong>Mode actions</strong><label for="sn-008" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-008" class="margin-toggle"/><span class="sidenote">This refers to the more non-shortcut actions/features of the <i>Data Operator</i> that are accessed with the four mode buttons.</span> make up all the data selection and musical selection/performance actions: they need to be learned by users who want to deliberately control the <i>Data Operator</i>. Apart from group/part selection, the mode actions should alter the sound being played/heard</li>
                <li>Mode actions always require two buttons to be pressed: a mode button is held and another button is pressed to select an action to take. Action labels are always displayed when a mode button is held, to assist in learning.
                </li>
                <li>Performance-orientated features (e.g. solo, mute) are laid out in a consistent way where: group/part selections are always assigned to the same action (numpad) key; and features (e.g. transpose) are (where possible) not affected by the group/part 'selection'.
                </li>
                <li>It is hoped that 'skilled operator' (much a like a musical instrument), would rely on muscle memory and visual/audio feedback to play the <i>Data Operator</i></li>
            </ul>
        </section>

        <hr>
        <section>
            <h2>4. Strudel sounds & sharing </h2>
            <p>The <i>Data Operator</i> platform has been developed around the brilliant <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> live coding audio engine. This provides convenient access to powerful audio synthesis and sample playback tools, audio processing effects, and musical tools that are well suited parameter mapping (modelled) data to audio instrument parameters. Strudel naturally supports 'stacking' sound patterns to produce 'full' multi-track compositions<label for="sn-009" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-009" class="margin-toggle"/><span class="sidenote">There are no obvious technical limits on the complexity of 'instruments' in Strudel, or their number (i.e. no. of tracks). And although there will be performance limitations that come from a devices processing power (and the WebAudio API), the primary design constraint on instrument/track complexity is the 4x4 button interface of the <i>Data Operator</i>. Moreover, in design testing, it was not practical to include and access more tracks while maintaining an intuitive (fun) interface.</span>.
            </p>
            <p>The notable limitation of using <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> in the <i>Data Operator</i> is that is built around a cycle/loop of music. A welcome benefit here is that the <i>Data Operator</i> plays endlessly: the user <i>plays</i> by manipulating the loop on-the-fly, rather than having to activate every sound (i.e. like traditional acoustic musical instruments). The on-the-fly manipulation of data and sounds is arguably the key characteristic of the <i>Data Operator</i> instrument.
            </p>
            <p>From a technical perspective, key design implications of adapting <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> for use in the <i>Data Operator</i> include: </p>
            <ul>
                <li>Functionality needs to be developed on top of Strudel to enable animation synchronisation (i.e. an event callback)<label for="sn-010" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-010" class="margin-toggle"/><span class="sidenote">These features are included in a core Class within the <i>Data Operator</i> source code, but are expected to be made more robust and sophisticated in the future.</span>.</li>
                <li>Functionality needs to be developed on top of Strudel to support (time-dependent) layering and/or automation of track parameters<label for="sn-011" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-011" class="margin-toggle"/><span class="sidenote">This is the <strong>Composition</strong> feature of the <i>Data Operator</i> which is present but under/not utilised in the initial <i>Data Operator</i> series</span>.</li>
                <li>It is not feasible to add a 'playable' instrument in Strudel (e.g. controlled via a MIDI keyboard).<label for="sn-012" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-012" class="margin-toggle"/><span class="sidenote">Technically this is probably possible, but it is not a documented feature at the time of development.</span></li>
            </ul>
            <p>The core UI of <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> is the <a href = 'https://strudel.cc/' target = '_blank'>REPL-based interface</a>. This is not used in the <i>Data Operator</i> interface, however REPL allows for code to be extracted from the <i>Data Operator</i> that can be played in the public REPL, which:</p>
            <ul>
                <li>Allows users save the data sonificaton they are currently playing (i.e. including their selections and musical tweaks) </li>
                <li>Allows users to generate a REPL-link that contains their current sonification, which can be shared with others<label for="sn-013" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-013" class="margin-toggle"/><span class="sidenote">This feature provides a viable pathway fo social and even collaborative features to be added the the <i>Data Operator</i> </span>. </li>
            </ul>

        </section>

        <hr>
        <section>
            <h2>5. Data & data sonification</h2>

            <p>While the <i>Data Operator</i> produces a data sonification and is naturally driven by the underlying data, the <i>Data Operator</i> platform is designed to be agnostic to both the data and data sonification approach and configuration. Moreover:</p>

            <ul>
                <li>Data is expected to be shaped (via a <i>Data Model</i> class) into forms and formats that make it easy to map data parameters to the most common and useful sound parameters<label for="sn-014" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-014" class="margin-toggle"/><span class="sidenote">This initial <i>Data Operator</i> models use time series data which is a natural fit for playing sound (i.e. data scaled to musical time).</span>.
                </li>
                <li>The sonification approach of <strong>parameter mapping</strong> is fixed, with customisation both possible and encouraged for each distinct <i>Data Operator</i> model and version<label for="sn-015" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-015" class="margin-toggle"/><span class="sidenote">Parameter mapping customisation extends to instrument design (in Strudel) and UI styling (in 'themes' and key controls). The upshot is the that the look, feel and sound of each <i>Data Operator</i> model/version can be unique, while maintaining standard instrument controls.</span>. Specific details about each sonification are provided as documentation alongside each <i>Data Operator</i>.

                </li>
            </ul>

            <p>To complete the <i>Data Operator</i> design documentation, the <a href = 'https://sonification.design/about.html' target ="_blank">Data Sonification Canvas</a> developed by Sara Lenzi and Paolo Ciuccarelli, has been used (below) on the initial series of <i>Data Operator</i> models (see next) as a tool for reflection and prompting future ideas:</p>
        </section>

        <section style = "padding-right: 5vh;">
            <SonificationCanvasDO1/>
        </section>

        <section>
            <h3>Design endnote: Series Zero</h3>
            <p>The <i>Data Operator</i> project was conceived and prototyped in Sept-Oct 2025, with the intent of exploring how a 'data instrument' <i>might</i> work. The primary focus of this work was to evaluate the technical merit and potential of adapting <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> for use in both: a data sonification context; and in a custom web application that might support the <i>Data Operator</i> 'instrument' user interface. The immediate move to scaffold out a 'platform' to support multiple <i>Data Operator</i> 'models and editions', was made to support and test multiple data sources, instrument and sound design potential (in Strudel), and user interface possibilities (to support actions/features, as well as styling/themes).
            </p>
            <p><strong>Series Zero</strong> of <i>Data Operator</i> models and editions are the output of this technological proof of concept. The application of the <i>Data Sonification Canvas</i> highlights how the <i>Data Operator</i> would benefit from more focused and specialised features that put more emphasis on designing for data insights and stories. However to maintain the core design principles and focus of the <i>Data Operator</i> project (above), these features are expected to be designed as expansion add-ons or 'plug-ins'.  
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