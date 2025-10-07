<!-- ABOUT SILENT SHOUT-->
<script>
    import { slide } from "svelte/transition";

</script>


<!-- HTML MARKUP-->
<article>
    <div class = 'content-wrapper'>

        <h1>Data Operator</h1>
        <p class = 'subtitle'>User Manual </p>

        <section>
        <p>Welcome to the manual for the Data Operator. This document goes through all the functionality for a <i>standard</i> Data Operator interface, as well as any additional interface features that are added or changed for special edition models: for clarity and consistency, these are presented as side notes.</p>

        <p>If you're just getting started, we recommend taking a look at the <a href = './quick-start'>quick start guide!</a></p>

        <p><i>The following documentation is a work in progress/outline of topics...</i></p>

        </section>

        <section>
            <h2>1. The data sonification</h2>

            <p>Start with (a bit of) an aside to explain what the Data Operator is doing to turn data into music. The data becomes the building blocks for the musical composition. Data is mapped to parameters of the <i>virtual instruments</i> that are built in-browser, inside an <i>audio engine</i>. This is what produces (musical) sound.</p> 

            <p>Every Data Operator has both raw input data, and a custom <i>data model</i> that prepares the data for mapping. The data model wrangles the raw data into usable intervals (e.g. for 16 steps) and series (e.g. it may perform aggregation, calculate ratios and proportions etc.); and creates 'scales' by performing basic statistical analysis (i.e. deriving extents and ranges). These are the data materials and tools for the sonification and visualisations. As a user, you don't need to know how this is done, but it is helpful to know that the data needs to be prepared in a model, to be useful.</p>

            <p>Every <i>sonification</i> &mdash; which is specific to Date Operator model/version &mdash; takes the data model output and maps that data to parameters for a set of <i>virtual instruments</i> that are also specific to Date Operator model/version. So there are two 'custom' parts here:
            </p>

            <ol>
                <li> the design/choice of instruments and</li>
                <li>the choice of what sounds parameters to map data to: which almost always includes the pitch/notes of what the instruments play.</li>
            </ol>

            <p>Of course, aside from pitch, there are lots of other parameters that data can be mapped to. Some are obvious to the ear,  like 'velocity' (which translates volume) or panning (positioning of an instrument in the stereo field), and others can be more subtle and/or result in changes in timbre, like the positioning of a filter cutoff frequency. Much like data visualisation, some 'channels' are more noticeable and intuitive than others. As an analogue, you could think of visual position and size, to be akin to say, the pitch and volume of sound. Colours might be instruments etc. The point though, is not to replicate visual channels, or to get too dogmatic about choosing parameters. In the sonification space, there are more options for parameter mapping, and most of them are subtle. And so beyond the 'primary' channels of pitch, velocity (dynamics) and instrumentation, the Data Operators tend to use data to create movement (modulation) and interest in the sound.
            </p>

            <p>Its also important to point out that the Data Operators have synced animated data visuals/charts the are matched to these primary channels. This 'double-encoding' is very much deliberate.
            </p>

        </section>

        <section>
            <h2>2. The interface</h2>
            <p>There are three main sections to the Data Operator interface</p>
            <ol>
                <li>The top panel: this is primarily aesthetic, expect on mobile devices where the play/stop button will appear here.</li>
                <li>The display: this is where you'll see information about your selections (i.e. the selected 'track', volume and tempo levels, and data 'scene') and feedback of any actions; as well as audio-synced visuals and charts.</li>
                <li>The buttons: this is a </li>
            </ol>
        </section>

        <section>
            <h2>3. Device controls</h2>
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
            <h2>4. Shortcut state: the default actions</h2>
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
            <h2>5. The modes</h2>
            <p>Introduction to the modes: expanded from quick start guide</p>
        </section>

        <section>
            <h2>6. Select mode</h2>
            <p>In select mode, all actions remain the same for every selected track. In other words, it doesn't matter what track selection you're in, you'll get these actions.</p>
            <h3>a. Selecting tracks</h3>
            <p></p>

            <h3>b. Selecting a musical scale</h3>
            <p></p>

            <h3>c. Selecting a 'data scene'</h3>
            <p></p>
        </section>

        <section>
            <h2>5. Modify mode</h2>
            <p>In modify mode, the mute and tempo actions are available for every selected track. The options for editing the "pulse" rhythms however, will differ depending on which track is selected.</p>
            <h3>a. Muting tracks</h3>
            <p></p>

            <h3>b. Adjusting tempo</h3>
            <p></p>

            <h3>c. Pulse sequencers (available from mix track)</h3>
            <p></p>

            <h3>d.  Euclidean Rhythms (for selected track)</h3>
            <p></p>
        </section>


        <section>
            <h2>6. Shift mode</h2>
            <p>In shift mode, the most actions remain the same for every selected track. The exceptions are in the <span class = 'key'>&minus;</span> and <span class = 'key'>&plus;</span> keys, which cover legato and swing, depending on what track is selected.
            </p>

            <h3>a. Soloing tracks</h3>
            <p></p>

            <h3>b. Toggling legato notes (available from mix track)</h3>
            <p></p>

            <h3>c. Adjusting swing (for selected group/track)</h3>
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