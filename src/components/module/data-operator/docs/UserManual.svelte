<!-- USER MANUAL -->
<script>
     // Libs and utils
	import { fade, slide } from 'svelte/transition';

    // Components
    import ButtonControls from './ButtonControls.svelte';

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
        <p>Welcome to the user manual for the <i>Data Operator</i>. This document explains what a <i>Data Operator</i>is, what it does; and how to use one<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">For the most part, the main text covers the standard <i>Data Operator</i> features and controls. Any model or edition-specific features and differences es will be mentioned in side notes (like this one!)</span>.</p>

        <p>If you've after a brief introduction, we recommend taking a look at the <a href = './quick-start'>quick start guide!</a>. And of course, we always recommend that you simply mess around with a Data Operator and see what happens. It can be quite complicated, but the instrument will react and provide feedback to your actions, so a great way to learn is to simply play with it!</p>

        <p><i>Please note: the following documentation is a working draft. It has been written for the "DO: SERIES ZERO" collection of Data operators (aka the 'development' batch)</i></p>

        </section>

        <hr>
        <section>
            <h2>I. Data > data sonification</h2>

            <p>We'll start with (a bit of) an aside to explain what the Data Operator is doing to turn data into music. You don't <i>need</i> to know this to play a Data Operator, so you can skip ahead if you're interested in what all the buttons do.</p>

            <p>In each Data Operator, <i>data</i> will always be the building blocks for the music you hear. <i>Parameters</i> in the underlying data are mapped<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">This a common data sonification approach known as...<i>parameter mapping</i>.</span> to <i>parameters</i> that control a set of <i>virtual musical instruments</i> that are built using an <i>audio engine</i> that is already in your web browser<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">Under the hood, this is the  native <a href = 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API' target = "_blank">Web Audio API</a>. The brilliant <a href = 'https://codeberg.org/uzu/strudel/src/branch/main/packages/web' target = "blank">@strudel/web package</a> is used as the key JavaScript library to bot utilise the Web Audio API, and to map modelled data to transport, synthesizer and sampler parameters.</span>. This is what produces (musical) sound that represents data.</p> 

            <p>Every <i>Data Operator</i> naturally requires raw <strong>input data</strong><label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">For this series of Data Operators, input data is sourced from data providers who publish (open source) data as either static files, or through data APIs. Information about each data source is documented separately alongside each <i>Data Operator</i> model.</span>, and a custom <strong>data model</strong> that turns raw data into useful (musically) useful data shapes and parameters<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">This includes: 1) data wrangling to select, aggregate and manipulate the <i>data series</i> and <i>scenes</i> (explained below) that are available in the user interface; and 2) a layer of data transforms to shape data series into useful musical intervals (e.g. 16, 8, 4 steps), and the (statistcal) scaling of data to formats that can be applied in musical scales (e.g. to scale degrees).</span> that are used to control parameters for sound and visualisations. The <strong>sonification</strong> &mdash; which is specific to Data Operator model/version &mdash; then maps that  modelled data to parameters for a set of <strong>virtual instruments</strong> that are also specific to Date Operator model/version. 
            </p>    

            <p>In summary:</p>
            <ul style="list-style:none; list-style-type: square; ">
                <li class = 'arrow-marker'>Input data </li>
                <li class = 'arrow-marker'>Data model</li>
                <li class = 'arrow-marker'>Sonification (model)</li>
                <li class = 'arrow-marker'>Parameter control virtual instruments<label for="sn-006" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-006" class="margin-toggle"/><span class="sidenote">For brevity, the <i>design</i> of a the set of virtual instruments is not detailed. However each <i>Data Operator</i> can contain multiple instruments, all of which will have multiple parameters for that could be mapped to data. FOr tonal instruments, the most common parameter to map is note pitch and length, but there many parameters available to control dynamics (i.e. volume) and timbre.</span></li> 
            </ul>

            <p>If you're interested in learning more about sonification the context of the <i>Data Operator</i> project, feel free to read through <a href ='/docs/sonification'>Sonification notes</a>.</p>

        </section>

        <hr>
        <section>
            <h2>II. From data sonification to data instrument</h2>
            <p><i>Data Operator's</i> are designed as <strong>instruments</strong> that invite users to become active players. This requires the design of a suitable visual and control interface, that is consistent across all (screen-based) devices that that the <i>Data Operator</i> supports.
            </p>
            <p>This core design principle extends the traditionally passive sonification experience (i.e. to simply, listen); and steps into the interface design challenges that come with electronic music instruments. Moreover, in the <i>instrument</i> realm, there is a need to balance sound design options with approachability. 
            </p>
            <p>The <i>Data Operator</i> interface leans heavily towards being a relatively simple <i>instrument</i>, whose features that is limited by not on only data sonification roots, but by 'universal' device controls of a 4x4 grid of buttons<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">In other words, the smallest supported device is a mobile phone screen, which can only comfortably support a 4x4 control grid with a small display.</span> .
            </p>
        </section>


        <section>
            <h3>a. The visual interface</h3>
            <p>When you open the <i>Data Operator</i> you are greeted with a "1980s pocket calculator" inspired interface that contains three main sections:</p>
            <ol>
                <li>The <strong>top panel</strong>: is mainly aesthetic, expect on mobile devices where the multi-purpose button (see below) will appear .</li>
              <li>The <strong>display</strong>: is where you'll see information about your selections You'll see the selected 'track' their volume level (top left), current tempo (top right); label for selected data <i>scene</i> (bottom right); and short text feedback/confirmation of the most recent action taken (top of screen). Central to the display are audio-synced visuals and charts.</li>
                <li>The <strong>pad buttons</strong>: primarily consist of a 4 x 4 grid labeled in a calculator or numpad-style. On larger screens, a multi-purpose button appears on the top left of the pad: it will show <span class = 'key'><span class = "material-symbols-outlined">play_arrow</span></span> on startup, <span class = 'key'><span class = "material-symbols-outlined">stop</span></span> when the <i>Data Operator</i> is playing, or <span class = 'key'><span class = "material-symbols-outlined">eject</span></span> if a <i>pulse sequencer</i> (see below) is open. 
                </li>
            </ol>
        </section>

        <section>
            <h3>b. Device controls</h3>
            <p>There are a few different ways you can use the buttons on the <i>Data Operator</i>. If you're on a mobile device, you don't get much choice, what you see on your little screen is what you get. If however, you're on a device with a keyboard attached, you'll be able to use various keys to control/mirror the buttons on the <i>Data Operator</i>. You'll notice that on a full sized keyboard, the <i>Data Operator</i> layout resembles the numpad section: they controls are basically mapped 1:1, with the <span class = 'keyboard'>Shift</span> key equivalent to <span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> , and the adjacent <span class = 'keyboard'>&rarr;</span> key being <span class = 'key'>&times;</span>.
            </p>
            <p>On any keyboard (including laptops), both the row of number and -/+ keys and pad formed around keys <span class = 'keyboard'>q</span> to  <span class = 'keyboard'>r</span>, <span class = 'keyboard'>a</span> to <span class = 'keyboard'>f</span>, and <span class = 'keyboard'>z</span> to <span class = 'keyboard'>c</span> + <span class = 'keyboard'>alt/option</span> can be used in place of the number pad.</p>

            <p>For the mode buttons (that we're just about to get to) the <span class = 'keyboard'>Return</span> key is always <span class = 'key'><span class="material-symbols-outlined">function</span></span>, while <span class = 'keyboard'>.</span>  is <span class = 'key'>&sdot;</span>  and <span class = 'keyboard'>,</span>  is <span class = 'key'>&times;</span>. It's confusing at first, but with a bit button mashing and practice, you'll soon figure it out!
            </p>>
        </section>


        <hr>
        <section>
            <h2>III. Data Operator controls</h2>
            <p>We can now finally talk about how to use the interface and controls to play the <i>Data Operator</i>!</p>
        </section>

        <section>
            <h2>// One touch actions: the shortcut state</h2>
            <p>On startup, the Data Operator isn't <i>in</i> a specific <strong>mode</strong> (we'll explain next) and it will  have the 'MIX' track selected (which we'll also soon explain soon). For lack of a better term, we'll call this the <strong>shortcut MIX state</strong> where no <i>mode buttons</i> are being held.
            </p>
            <p>In the <strong>shortcut MIX state</strong> the number keys are configured as shortcuts to useful/common actions<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">If you're using a keyboard, press and hold "K" to view labels describing actions for each pad button.</span>:
            </p>
            <ul>
                <li>Use <span class = 'key'>&plus;</span> and <span class = 'key'>&minus;</span>  to adjust the volume to your taste: notice that on the top left of the display, the "MIX" track is highlighted (selected). The volume you're controlling here is for that MIX track<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">The mix track is also called the 'master', so this is the master volume. Once you learn to select individual track (groups), you can use these controls to adjust their levels to your taste, similar to how an audio mixer works.</span>.</li>

                <li>Most number keys, <span class = 'key'>1</span> to <span class = 'key'>5</span> and <span class = 'key'>7</span> / <span class = 'key'>8</span>, will cycle (back and forward) through a series of data options and sound patterns on different tracks<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">The more correct name for tracks are <i>groups</i> and <i>parts</i> (of a group). There are three groups (labelled A, B and C) and only group C has three  parts. The general roles for each are explained in more detail in the <a href ='/docs/user-manual' target = '_blank'>user manual</a>. For now though, you can think of them as 5 audio tracks that contain different sounds that a mixed together to form the 'master' track.</span>.</li>

                <li>Key <span class = 'key'>6</span> changes up the tempo by cycling through a set of presets<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">Tempo can be fine tuned in the <i>MODIFY</i> mode.</span></li>

                <li>Key <span class = 'key'>9</span> randomises the rhythms which steps are played n the data melodies. </li>

                <li>Key <span class = 'key'>0</span> will select the "MIX" track (which is a bit redundant because that's the selected track!):
                </li>

            </ul>

            <p>The <strong>Shortcut state</strong> is a fun, immediate place to start to explore some of the key features of the Data Operator. Of course, to gain finer control over these features and and unlock more ways to control the Data Operator, we'll 
            </p>

            <h3>>> Track selection changes the shortcuts</h3>
            <p>Before we move on, we need to mention that shortcuts will change if a non-MIX track has been selected (see <i>SELECT</i> below). Fortunately, the options are the same for each track:</p>
            <ul>
                <li>The <span class = 'key'>&plus;</span> and <span class = 'key'>&minus;</span> will now adjust the volume of the selected track.
                </li>
                <li>The number keys <span class = 'key'>1</span> to <span class = 'key'>9</span>  will select from one of nine preset mapped data series or patterns.
                </li>
                <li>Key <span class = 'key'>0</span> will select the "MIX" track: think of it like a 'home key' for selecting the "MIX" track (i.e. the track selected in the default/on-load state).
                </li>
            </ul>
        </section>

        <section>
            <h2>// The performance modes</h2>
            <p>There are four performance <strong>modes</strong> available in the <i>Data Operator</i> that provide access to some interesting data exploration and musicality tools. These tools are how you can learn <i>play the Data Operator</i>. The mode buttons are distinguished by an inner circle around their label and wrap around bottom and lower right of the number pad, The modes are:
            </p>

            <ul>
                <li><span class = 'key'>&times;</span> is the [Select] mode: this lets you select the tracks and configure the musical scale (which applies to all pitched tracks, to keep things in harmony).</li>
                <li><span class = 'key'>&sdot;</span> is the [Modify] mode: this lets you mute tracks and provides access to control 'rhythms', either via track sequencers or euclidean rhythm controls </li>
                <li><span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> is the [Shift] mode: this lets you solo tracks and lets you transpose the melodic tracks (usually A and B)</li>
                <li><span class = 'key'><span class="material-symbols-outlined">function</span></span> is the [FX] mode: this lets you "punch-in" different audio effects, to the selected track.</li>
            </ul>
            <h3>>> How to access mode actions </h3>
            <p>To put the <i>Data Operator</i> into a mode, you simply hold down the mode button. Each available action button will shows a label that tells you what action that button performs, in that mode. To perform that action, you can just tap on that button (with the mode button held). Once you release the mode button, you'll immediately return to the prior 'shortcut' mode.</p>
            <p>From a user interaction perspective, the key takeaway is that you'll hold one (mode) button and press another (action) button to perform an action. In other words, you'll need at least two fingers/thumbs to properly play the <i>Data Operator</i>.</p>

        </section>

        <section>
            <h2>2. Select mode</h2>
            <p>In select mode, all actions remain the same for every selected track. In other words, it doesn't matter what track selection you're in, you'll get these actions.</p>
            <h3>a. Selecting tracks</h3>
            <p></p>

            <h3>b. Selecting a musical scale</h3>
            <p></p>

            <h3>c. Selecting a 'data scene'</h3>
            <p><i>Scenes</i> can be thought of as all the materials and pieces that make up musical composition. You might be tempted to think of it as a 'song', but its more like all the parts that make up a song. In a data sonification terms, a scene is is a 'slice' of data used in the sonification. 'Data' scenes can be broken up in different ways, depending on the Data Operator model: if you have time series data, you might have scenes as a complete day (i.e. dates). In any case, you can change the 'scene' on-the-fly. This is also a great way to compare variations in scenes of data (e.g. across dates).
            </p>
        </section>

        <section>
            <h2>2. Modify mode</h2>
            <p>In modify mode, the mute and tempo actions are available for every selected track. The options for editing the "pulse" rhythms however, will differ depending on which track is selected.</p>
            <h3>a. Muting tracks</h3>
            <p></p>

            <h3>b. Adjusting tempo</h3>
            <p></p>

            <h3>c. Pulse sequencers (available from mix track)</h3>
            <p></p>


            <h3>d.  Legato notes (for tracks A and B)</h3>
            <p></p>

            <h3>e.  Euclidean Rhythms (for selected track)</h3>
            <p></p>

            <h3>f.  Clock divider (for selected tracks)</h3>
            <p></p>

        </section>


        <section>
            <h2>3. Shift mode</h2>
            <p>In shift mode, the most actions remain the same for every selected track. The exceptions are in the <span class = 'key'>&minus;</span> and <span class = 'key'>&plus;</span> keys, which cover legato and swing, depending on what track is selected.
            </p>

            <h3>a. Soloing tracks</h3>
            <p></p>

            <h3>b. Exporting</h3>
            <p></p>

            <h3>b. Toggling legato notes (available from mix track)</h3>
            <p></p>

            <h3>c. Adjusting swing (for selected group/track)</h3>
            <p></p>
        </section>


        <section>
            <h2>4. FX mode</h2>
            <p></p>
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

    li.arrow-marker::marker{
        content:     "→   "
    }
    li{
        margin-bottom: 1rem;
    }
</style>