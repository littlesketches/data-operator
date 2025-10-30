<!-- USER MANUAL -->
<script>
     // Libs and utils
	import { fade, slide } from 'svelte/transition';

    // Components
    import ButtonControls       from './ButtonControls.svelte';
    import SelectTracks         from './mode-keys/SelectTracks.svelte';
    import SelectScale          from './mode-keys/SelectScale.svelte';
    import SelectProject          from './mode-keys/SelectProject.svelte';
    import ModifyMute           from './mode-keys/ModifyMute.svelte';
    import ShiftSolo            from './mode-keys/ShiftSolo.svelte';
    import ModifyTempo          from './mode-keys/ModifyTempo.svelte';
    import ModifyPulseSequencer from './mode-keys/ModifyPulseSequencer.svelte';
    import ModifyLegato         from './mode-keys/ModifyLegato.svelte';
    import ModifyEuclideanRhythm from './mode-keys/ModifyEuclideanRhythm.svelte';
    import ModifyClock          from './mode-keys/ModifyClock.svelte';
    import ShiftTranspose       from './mode-keys/ShiftTranspose.svelte';
    import ShiftExportShare     from './mode-keys/ShiftExportShare.svelte';
    import ShiftSwing           from './mode-keys/ShiftSwing.svelte';
    import FxPunchIn            from './mode-keys/FxPunchIn.svelte';
    import TrackShortcuts       from './mode-keys/TrackShortcuts.svelte';
    import ModifyPulseDelta from './mode-keys/ModifyPulseDelta.svelte';

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
        <h1 class = 'header'>// User manual</h1>

        <section>
        <p>Welcome to the user manual for the <i>Data Operator</i>. This will explain what the <i>Data Operator</i> is, what it does; and how to use one<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">The main body of text covers the standard <i>Data Operator</i> features and controls. Any model or edition-specific features and differences will be mentioned in side notes (like this one!)</span>.</p>

        <p>If you're looking for a brief introduction, we recommend taking a look at the <a href = '/docs/quick-start'>Quick Start guide!</a><label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">If you're using the <i>Data Operator</i> on a computer, you can also open the <a href = '/docs/quick-start'>Quick Start guide</a> alongside the <i>Data Operator</i> interface by clicking on the 'top side' button that appears next to the faceplate </span>. And of course, we always recommend that you simply mess around with a Data Operator and see what happens. It can be quite complicated, but the instrument will react and provide feedback to your actions, so a great way to learn is to simply play with it!</p>
        </section>

        <hr>

        <section>
            <h2>I. Data &rarr; data sonification</h2>

            <p>We'll start with (a bit of) an aside to explain what the Data Operator is doing to turn data into music. You don't <i>need</i> to know this to play a Data Operator, so feel free to skip ahead if you're here to learn what all the buttons do.</p>

            <p>In each Data Operator, <strong>data</strong> will always be the foundation for the patterns of music that you hear. <i>Parameters</i> in the underlying data are mapped<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">This a common data sonification approach known as...<i>parameter mapping</i>.</span> to <i>parameters</i> that control a set of <i>virtual musical instruments</i> that are built using an <i>audio engine</i> in your web browser<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">Under the hood, this is the native <a href = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API' target = "_blank">Web Audio API</a>. The brilliant <a href = 'https://codeberg.org/uzu/strudel/src/branch/main/packages/web' target = "blank">@strudel/web package</a> is used as the key JavaScript library to both utilise the Web Audio API, and to map modelled data to parameters that control the audio transport, synthesizers and sampler parameters.</span>. This is what produces (musical) sound that represents data.</p> 

            <p>Every <i>Data Operator</i> requires raw <strong>input data</strong><label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">For the initial series of Data Operators, input data is sourced from data providers who publish (open source) data as either static files, or through data APIs. Information about each data source is documented separately on the homepage for each <i>Data Operator</i> model.</span> and a custom <strong>data model</strong> that transforms the raw data into (musically) useful shapes, scales and parameters<label for="sn-006" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-006" class="margin-toggle"/><span class="sidenote">This includes: 1) data wrangling to extract, aggregate and manipulate the <i>data series</i> and <i>projects</i> (explained further below) that are available for selection in the user interface; and 2) a layer of data transforms to shape data series into useful musical intervals (e.g. 16, 8, 4 steps), and parameter ranges and scales (including musical note scales).</span> that are used to control parameters for sound and visualisations. The <strong>sonification</strong> &mdash; which is specific to <i>Data Operator</i> model/version &mdash; then maps that modelled data to parameters for a set of <strong>virtual instruments</strong> that are also specificaly desgined to <i>Data Operator</i> model/version. 
            </p>    

            <p>The summary of key components in the data sonification workflow is:</p>

            <ul style="list-style:none; list-style-type: square; ">
                <li class = 'arrow-marker'><strong>Input data</strong>: raw 'as published' data.</li>
                <li class = 'arrow-marker'><strong>Data model</strong>: custom model that transforms input data into usable forms.</li>
                <li class = 'arrow-marker'><strong>Sonification</strong>: another custom model that maps <i>Data model</i> output to parameters that control virtual instruments<label for="sn-007" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-007" class="margin-toggle"/><span class="sidenote">For brevity, the <i>design</i> of a the set of virtual instruments is not detailed. However each <i>Data Operator</i> can contain multiple instruments, all of which will have multiple parameters for that could be mapped to data. FOr tonal instruments, the most common parameter to map is note pitch and length, but there many parameters available to control dynamics (i.e. volume) and timbre.</span></li> 
            </ul>

            <!-- <p>If you're interested in learning more about sonification the context of the <i>Data Operator</i> project, feel free to read through <a href ='/docs/operator-design'>Sonification notes</a>.</p> -->

        </section>

        <hr>

        <section>
            <h2>II. Data sonification &rarr; data instrument</h2>

            <p><i>Data Operator's</i> are designed as <strong>instruments</strong> that invite users to become active players. This requires the design of a suitable user interface, that is consistent across all (screen-based) devices that that the <i>Data Operator</i> supports. This approach moves beyond the traditionally passive sonification experience (i.e. listening); and means that the <i>Data Operator</i> is designed in the spirit of an electronic music instruments. 
            </p>

            <p>The <i>Data Operator</i> is designed<label for="sn-008" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-008" class="margin-toggle"/><span class="sidenote">Design documentation outlining the choices and limitation of the <i>Data Operator</i> can be found in the <a href = '/docs/operator-design'>Operator Design</a> section.</span> as a relatively simple <i>instrument</i> whose feature set is developed around it's data sonification roots; a visual interface that can be used across multiple devices. It is this combination of <strong>visual interface</strong> and <strong>device controls</strong> that enable real-time, interactive control over the data sonification, and turn the <i>Data Operator</i> into a <strong>data instrument</strong>. 
            </p>
        </section>


        <section>
            <h3>a. The visual interface</h3>

            <p>When you open the <i>Data Operator</i> you are greeted with a "1980s pocket calculator" inspired interface that contains three main sections:</p>

            <ol>
                <li>The <strong>top panel</strong>: this is mainly aesthetic, except on mobile devices where the multi-purpose button (see below) will appear.
                </li>

                <li>The <strong>display</strong>: this is where you'll see information about your selections. You'll see the selected 'track' their volume level (top left), current tempo (top right); label for selected data <i>project</i> (bottom right); and short text feedback/confirmation of the most recent action taken (top of screen). Central to the display are audio-synced visuals and charts.
                </li>

                <li>The <strong>pad buttons</strong>: this consists of a 4 x 4 grid, labeled in a calculator numpad-style". On larger screens, a multi-purpose button appears on the top left of the pad: it will show:

                    <ul style = 'list-style:none; padding-inline-start: 1rem; margin-top: 1rem'>
                        <li>
                            <span class = 'key'><span class = "material-symbols-outlined">play_arrow</span></span> on startup or when the <i>Data Operator</i> has been stopped.
                        </li>
                        <li>
                            <span class = 'key'><span class = "material-symbols-outlined">stop</span></span> when the <i>Data Operator</i> is playing.
                        </li>
                        <li>
                            <span class = 'key'><span class = "material-symbols-outlined">eject</span></span> if a <i>pulse sequencer</i><label for="sn-009" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-009" class="margin-toggle"/><span class="sidenote">The pulse sequencer  (described below) is the only feature in the <i>Data Operator</i> that requires a different set uses for the 4x4 grid, which is reflected in a change of styling an labelling. Most notably, styling is removed from the mode buttons to make it clear that the button interface has switched to a "16-step sequencer" view. </span> is open. 
                        </li>
                    </ul>

                </li>
            </ol>
        </section>

        <section>
            <h3>b. Device controls</h3>
            <ButtonControls/>

            <p>And finally, there's one additional set of shortcut 'pads' that work with the 4x4 grid used in the pulse sequencer (explained below)</p>

        </section>


        <hr>
        <section>
            <h2>III. Data Operator controls</h2>
            <p>We can now finally talk about how to use the interface and controls to play the <i>Data Operator</i>!</p>
        </section>

        <section>
            <h2>// One touch actions: the shortcut state</h2>

            <p>On startup, the <i>Data Operator</i> isn't <i>in</i> a specific <strong>mode</strong> (we'll explain what modes are next); and it will have the 'MIX' track selected (which we'll also explain soon!). For lack of a better term, we'll call this the <strong>shortcut MIX state</strong><label for="sn-010" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-010" class="margin-toggle"/><span class="sidenote">We realise this is quite awkward and semantic, but it should help later to distinguish what buttons do when the <i>Data Operator</i> is in different modes. In other words, when no <i>mode buttons</i> are being held, the <i>Data Operator</i>, rather than saying 'no mode', it can be thought of as being in a <i>shortcut</i> action state.</span>.
            </p>

            <p>In the <strong>shortcut MIX state</strong> the number keys are configured as shortcuts to useful/common actions<label for="sn-011" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-011" class="margin-toggle"/><span class="sidenote">If you're using a keyboard, press and hold "K" to view labels describing actions for each pad button.</span>:
            </p>

            <ul>
                <li>Use <span class = 'key'>&plus;</span> and <span class = 'key'>&minus;</span>  to adjust the volume to your taste: notice that on the top left of the display, the "MIX" track is highlighted (selected). The volume you're controlling here is for that MIX track<label for="sn-012" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-012" class="margin-toggle"/><span class="sidenote">The mix track is also called the 'master', so this is the master volume. Once you learn to select individual track (groups), you can use these controls to adjust their levels to your taste, similar to how an audio mixer works.</span>.</li>

                <li>Most number keys, <span class = 'key'>1</span> to <span class = 'key'>5</span> and <span class = 'key'>7</span> / <span class = 'key'>8</span>, will cycle (back and forward) through a series of data options and sound patterns on different tracks<label for="sn-013" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-013" class="margin-toggle"/><span class="sidenote">The more correct name for tracks are <i>groups</i> and <i>parts</i> (of a group). There are three groups (labelled A, B and C) and only group C has three  parts. The general roles for each are explained in more detail in the <a href ='/docs/user-manual' target = '_blank'>user manual</a>. For now though, you can think of them as 5 audio tracks that contain different sounds that a mixed together to form the 'master' track.</span>.</li>

                <li>Key <span class = 'key'>6</span> changes up the tempo by cycling through a set of presets<label for="sn-014" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-014" class="margin-toggle"/><span class="sidenote">Tempo can be fine tuned in the <i>MODIFY</i> mode.</span>.</li>

                <li>Key <span class = 'key'>9</span> randomises the rhythms which steps are played n the data melodies.</li>

                <li>Key <span class = 'key'>0</span> will select the "MIX" track (which is a bit redundant because that's the selected track!)</li>
            </ul>

            <p>The <strong>shortcut MIX state</strong> is a fun, immediate place to start to explore some of the key features of the Data Operator. Of course, to gain finer control over these features and and unlock more ways to control the Data Operator, we'll 
            </p>

            <hr>
            <h3>>> Track selection changes the shortcuts</h3>

            <p>Before we move on, we need to mention that shortcuts will change if a non-MIX track has been selected (see <span class = 'mode-label'>select</span> below). Fortunately, the options are the same for each track:</p>
            <TrackShortcuts/>
            <hr>

        </section>

        <section>
            <h2>// The performance modes</h2>
            <p>There are four performance <strong>modes</strong> (that we'll simply call 'modes') available in the <i>Data Operator</i>: these provide access to some interesting data exploration and musical tools. These tools are how you can learn <i>play the Data Operator</i>. The mode buttons are distinguished by an inner circle around their label and are positioned around bottom and lower right of the number pad, The modes are:
            </p>

            <ul style="list-style: none; padding-inline-start: 1rem">
                <li><span class = 'key'>&times;</span> is the <span class = 'mode-label'>select</span> mode: this lets you select the tracks and configure the musical scale (which applies to all pitched tracks, to keep things in harmony).
                </li>
                <li><span class = 'key'>&sdot;</span> is the <span class = 'mode-label'>modify</span> mode: this lets you mute tracks and provides access to control 'rhythms', either via track sequencers or euclidean rhythm controls.
                </li>
                <li><span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> is the <span class = 'mode-label'>shift</span> mode: this lets you solo tracks and lets you transpose the melodic tracks (usually A and B).
                </li>
                <li><span class = 'key'><span class="material-symbols-outlined">function</span></span> is the <span class = 'mode-label'>FX</span> mode: this lets you "punch-in" different audio effects, to the selected track.
                </li>
            </ul>
            
            <h3>>> How to access modes and their actions</h3>
            
            <p>To put the <i>Data Operator</i> into a mode, you simply hold down the mode button. Each available action button will then show a label that tells you what action that button performs, for that mode. To perform that action, you can just tap on that button while continuing to hold the mode button. Once you release the mode button, you'll immediately return to 'shortcut' mode.</p>
            
            <p>From a user interaction perspective, the <strong>key takeaway is that you'll hold one (mode) button and press another (action) button to perform a mode action</strong>. So you'll need at least two fingers/thumbs to properly play the <i>Data Operator</i>!
            </p>

        </section>

        <hr>
        <section>
            <h2 class = 'mode'>1. Select mode</h2>

            <p>In <span class = 'mode-label'>select</span> mode, all actions remain the same for every selected track. So it doesn't matter what track selection you're in, you'll get these actions.</p>

            <h3>a. Selecting tracks</h3>
            <SelectTracks/>

            <h3>b. Selecting a musical scale</h3>
            <SelectScale/>

            <h3>c. Selecting a 'data project'</h3>
            <SelectProject/>
        </section>

        <hr>
        <section>
            <h2 class = 'mode'>2. Modify mode</h2>
            <p>In modify mode, the mute and tempo actions are available for every selected track. The options for editing the "pulse" rhythms however, will differ depending on which track is selected.</p>

            <h3>a. Muting tracks</h3>
            <ModifyMute/>

            <h3>b. Adjusting tempo</h3>
            <ModifyTempo/>

            <h3>c. Pulse sequencers</h3>
            <ModifyPulseSequencer/>

            <h3>d. Legato notes (for tracks A and B)</h3>
            <ModifyLegato/>

            <h3>e. Euclidean Rhythm (for selected track)</h3>
            <ModifyEuclideanRhythm/>

            <h3>f. Pulse on delta  (for selected track)</h3>
            <ModifyPulseDelta/>

            <h3>g. Clock divider (for selected tracks)</h3>
            <ModifyClock/>
        </section>

        <hr>
        <section>
            <h2 class = 'mode'>3. Shift mode</h2>
            <p>In shift mode, the most actions remain the same for every selected track. The exceptions are in the <span class = 'key'>&minus;</span> and <span class = 'key'>&plus;</span> keys, which cover legato and swing, depending on what track is selected.
            </p>

            <h3>a. Soloing tracks</h3>
            <ShiftSolo/>

            <h3>b. Transposing patterns</h3>
            <ShiftTranspose/>

            <h3>c. Exporting and sharing</h3>
            <ShiftExportShare/>

            <h3>d. Adjusting swing</h3>
            <ShiftSwing/>
        </section>

        <hr>
        <section>
            <h2 class = 'mode'>4. FX mode</h2>
            <p>The final mode is the "punch-in" FX mode. These are effects<label for="sn-015" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-015" class="margin-toggle"/><span class="sidenote">The types of effects available may vary between <i>Data Operator</i> versions, to suit the instrument design and composition style. Slow down and speed up effects are however, expected to be a consistently present and tied to the <span class = 'key'>&minus;</span> and <span class = 'key'>&plus;</span>.</span> that are applied only for the duration that each FX button is held down (alongside the FX mode button). FX are applied to the selected track (A to C) or to the entire MIX (if that is selected). They are a really fun and interactive way to flavour the data sonification to your liking! And as a bonus, multiple punch-in FX can be applied at the same time for even crazier results!!
            </p>

            <FxPunchIn/>
        </section>
        <hr>

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
    h2.mode{
        /* color:              var(--col-highlight); */
    }
    h3{
        margin-top:         10vh;
    }
    li.arrow-marker::marker{
        content:     "→   "
    }
    li{
        margin-bottom: 1rem;
    }
    .mode-label{
        text-transform:     uppercase;
        font-style:         italic;
    }
</style>