<!-- USER MANUAL -->
<script>
     // Libs and utils
	import { fade, slide } from 'svelte/transition';

    // Props
    let {isSideGuide = false} = $props()

</script>


<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper'>

        <h1>Data Operator</h1>
        <p class = 'subtitle'>User Manual </p>

        <section>
        <p>Welcome to the user manual for the Data Operator. This document explains what Data Operator is,  and what it does; and then goes through all of the standard functionality for a Data Operator interface, as well as any additional interface features that are added or adapted to different models and editions<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">For clarity and consistency, we'll mention model/edition-specific stuff in side notes (like this one!)</span>.</p>

        <p>If you're just getting started, we recommend taking a look at the <a href = './quick-start'>quick start guide!</a>. And of course, we always recommend that you muck around with each Data Operator: it can be quite complicated, but the instrument will only react and provide feedback to your actions, so a great way to learn is to simply play with it!</p>

        <p><i>The following documentation is a work in progress/outline of topics...</i></p>

        </section>

        <section>
            <h2>Data and data sonification</h2>

            <p>We'll start with (a bit of) an aside to explain what the Data Operator is doing to turn data into music. You don't <i>need</i> to play the Data Operator, so you can skip ahead if you're interested in what all the buttons do.</p>

            <p>In each Data Operator, <i>data</i> always forms the building blocks for the musical composition. <i>Parameters</i> in the underlying data are mapped to <i>parameters</i> that control a set of <i>virtual musical instruments</i> that are built using an <i>audio engine</i> that is already in your web browser<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">Under the hood, this is the webAudio API. The brilliant Strudel web/JavaScript library is used as the key intermediary technology to map data to sound parameters.</span>. This is what produces (musical) sound.</p> 

            <p>Every Data Operator has raw input data<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">Input data is sourced from (open source) data providers who publisher data as either static files, or through data APIs. Information about each data source is documented separately, alongside each Data Operator model.</span>, and a custom <i>data model</i> that turns raw data into useful (musically) useful data shapes and parameters<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">usable intervals (e.g. for 16 steps) and series (e.g. it may perform aggregation, calculate ratios and proportions etc.); and creates 'scales' by performing basic statistical analysis (i.e. deriving extents and ranges).</span> that are used to control parameters for sound and visualisations. Every <i>sonification</i> &mdash; which is specific to Data Operator model/version &mdash; maps that useful modelled data to parameters for a set of <i>virtual instruments</i> that are also specific to Date Operator model/version. So there are three areas of  choice and customisation here:
            </p>

            <ol>
                <li>the choice of data and design of the data model</li>
                <li>the choice and design of virtual music instruments</li>
                <li>the choice of which sounds parameters maps to which data parameters<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">As a more concrete example, the most obvious and commonly mapped sound parameter is frequency (pitch), which might be mapped to a data time series to produces a melody. </li>
            </ol>

            <p>Of course, aside from pitch, there are lots of other parameters that data can be mapped to. Some are obvious to the ear,  like 'velocity' (which translates volume) or panning (positioning of an instrument in the stereo field), and others can be more subtle and/or result in changes in timbre, like the positioning of a filter cutoff frequency. Much like data visualisation, some 'channels' are more noticeable and intuitive than others. As an analogue, you could think of visual position and size, to be akin to say, the pitch and volume of sound. Colours might be instruments etc. The point though, is not to replicate visual channels, or to get too dogmatic about choosing parameters. In the sonification space, there are more options for parameter mapping, and most of them are subtle. And so beyond the 'primary' channels of pitch, velocity (dynamics) and instrumentation, the Data Operators tend to use data to create movement (modulation) and interest in the sound.
            </p>

            <p>Its also important to point out that the Data Operators have synced animated data visuals/charts the are matched to these primary channels. This 'double-encoding' is very much deliberate.
            </p>

        </section>

        <section>
        <h2>From data sonification to data instrument</h2>
        </section>


        <section>
            <h2>I. The interface</h2>
            <p>There are three main sections to the Data Operator interface</p>
            <ol>
                <li>The top panel: this is primarily aesthetic, expect on mobile devices where the play/stop button will appear here.</li>
                <li>The display: this is where you'll see information about your selections (i.e. the selected 'track', volume and tempo levels, and data 'scene') and feedback of any actions; as well as audio-synced visuals and charts.</li>
                <li>The buttons: this is a </li>
            </ol>
        </section>

        <section>
            <h2>II. Device controls</h2>
            <p>There are a few different ways </p>
            <ol style='list-style-type: lower-roman; '>
                <li>
                    <h3>Touchscreen:</h3>
                    <p></p>
                </li>
                <li>
                    <h3>Full size keyboard: the numpad</h3>
                    <p></p>
                </li>
                <li>
                    <h3>Laptop keyboard: alternate numpad</h3>
                    <p></p>
                </li>
            </ol>
        </section>

        <section>
            <h2>III. Instrument controls</h2>

        </section>

        <section>
            <h2>One touch actions: the shortcut state</h2>
            <p>On startup and by default, the Data Operator isn't 'in' a specific mode (we'll explain next) and it will also have the 'MIX' track selected (which we'll also soon explain soon). For lack of a better term, we'l call this 'shortcut state'.
            </p>
            <p>In this 'state', the number keys are are configured as shortcuts to useful/common actions [LIST similar to quick start]. 
            </p>
            <p>It is a fun place to start to explore some of the key features of the Data Operator. Of course, to gain finer control over these features and and unlock more ways to control the Data Operator, we'll 
            </p>

            <h3>a. Track selection and shortcuts</h3>
            <p>Special note on track selection as this is what changes the shortcut buttons to being specific selectors (for the selected track)</p>
            <p>Special note on adjusting gain levels wiht the +/- for each selected track</p>
        </section>

        <section>
            <h2>The instrument modes</h2>
            <p>Introduction to the modes: expanded from quick start guide</p>
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

            <h3>d.  Euclidean Rhythms (for selected track)</h3>
            <p></p>


            <h3>f.  Clock divider (for selected tracks</h3>
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

    /* Keyboard key style */
    span.key{
        display:            inline-block;
        border-top:         solid 2px;
        border-left:        solid 2px;
        border-right:       solid 0.25px;
        border-bottom:      solid 0.25px;
        border-radius:      1rem;
        padding:            0rem 0.5rem;
        margin:             0rem 0;
        min-width:          1rem;
        text-align:         center;  
        font-size:          1rem;
    }
    span.key span{
        font-size:          1rem;
        margin-top:         0.5rem;
        margin-bottom:      -0.5rem;
    }

    /* Slide container */
    .slide-button{
        text-decoration:    underline dotted;
        cursor:             pointer;
    }
    .slide-button:hover{
        width: 100%;
    }


    /* Overrides */
    li{
        margin-bottom: 1rem;
    } 
</style>