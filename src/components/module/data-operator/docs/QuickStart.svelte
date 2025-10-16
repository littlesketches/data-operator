<!-- QUICK START GUIDE -->
<script>
    // Libs and utils
	import { fade } from 'svelte/transition';
    import ButtonControls from './ButtonControls.svelte';

    // Props
    let {isSideGuide = false} = $props()
</script>

<!-- HTML MARKUP-->
<article class:isSideGuide={isSideGuide} in:fade>
    <div class = 'content-wrapper' >
        <section class = 'subtitle-block'>
            <div>データオペレーター</div>
            <div>Data Operator</div>
        </section>
        <h1 class = 'header'>// Quick start guide</h1>

        <section>
            <p>Let's get started with the <i>Data Operator</i>: <span class = 'sideguide-hide'>the data instrument that invites you to play with data in ways you never even thought you needed (...but in a good way!). It doesn't matter which model of <i>Data Operator</i> you are using, they all start with play!</span>
            </p>

            <ol>
                <li>
                    <p><strong>Hit <span class = 'key'>&#9658;</span> and you should hear some data-driven beats!</strong> These beats are synced to some quirky, data-driven visuals. Notice that the Data Operator plays just one bar (or 'cycle') of music, on a loop. The timbre of the music might wander around a bit, creating some variation and movement, but what you're hearing is the <i>sonification</i> of data<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">You can find out about how the sonification and parameter mapping works in the longer Data Operator manual and individual model documentation.</span>.</p>    
                </li>

                <li>
                    <p><strong>Use <span class = 'key'>&plus;</span> and <span class = 'key'>&minus;</span>  to adjust the volume to your taste</strong>: notice that on the top left of the display, the "MIX" track is highlighted &mdash; this means it is selected. The volume you're controlling here is for that MIX track<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">The mix track is also called the 'master', so this is the master volume. Once you learn to select individual track (groups), you can use these controls to adjust their levels to your taste, similar to how an audio mixer works.</span>.
                    </p>
                </li>

                <li>
                    <p><strong>Tap a few number keys and listen to what changes</strong>. Notice that different things are happening here!  Number keys <span class = 'key'>1</span> to <span class = 'key'>5</span> and <span class = 'key'>7</span> / <span class = 'key'>8</span>, will cycle through your data series options and sound patterns on different tracks<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">The more correct name for tracks are <i>groups</i> and <i>parts</i> (of a group). There are three groups labelled as A, B and C; and only group C has three parts. You can think of them as 5 audio tracks that contain different sounds that are mixed together to form the 'master' track.</span>. Key <span class = 'key'>6</span> changes up the tempo, and key <span class = 'key'>9</span> how the data melodies sound, by applying a rhythm over which notes are played. These buttons are shortcuts to instant fun!
                    </p>
                </li>

                <li>
                    <p><strong>Tap on <span class = 'key'>0</span></strong>. The sound won't change but you'll see a message saying "MIX selected". We'll explain how to select different tracks to control them in finer detail in the <a href ='/docs/user-manual' target = '_blank'>manual</a>. But what you'll want to know now, is that <span class = 'key'>0</span> is the shortcut key to go back to the initial <i>default state</i>, with the 'MIX' selected. Think of this like a home key<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">In other modes where you can mute and solo tracks, the <span class = 'key'>0</span> also acts as as a "reset" so that you can hear all the tracks again.</span>: it's not fun on its own, but if you get lost it can help you avoid frustration...which is a path back to fun.
                    </p>
                </li>
            </ol>
        </section>

        <section class = 'aside'>
            <hr>
            <h3>An brief aside: finding controls</h3>
            <ButtonControls {isSideGuide}/>
        </section>
    <hr>
        <section>
            <p>Back to the guide...</p>
            <ol start="4">
                <li>
                    <p><strong>Hold down each of the four (performance) "mode" buttons, one at a time, and see what happens</strong>: these mode buttons are distinguished by an inner circle around their label and wrap around bottom and lower right of the number pad. Notice that when you hold them down, labels telling you what the other buttons do will appear. This is how we get deeper into the features and controls in the Data Operator. The details can be found in the <a href ='/docs/user-manual' target = '_blank'>user manual</a> but very quickly:</p>
                    <ul style="list-style:none">
                        <li><span class = 'key'>&times;</span> is the <span class = 'mode-label'>Select</span> mode: this lets you select the tracks and configure the musical scale to applies to all tonal tracks (to keep things in harmony).</li>
                        <li><span class = 'key'>&sdot;</span> is the <span class = 'mode-label'>Modify</span> mode: this lets you mute tracks and provides access to control 'rhythms', either via track sequencers or euclidean rhythm controls </li>
                        <li><span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> is the <span class = 'mode-label'>Shift</span> mode: this lets you solo tracks and lets you transpose the melodic tracks (usually A and B)</li>
                        <li><span class = 'key'><span class="material-symbols-outlined">function</span></span> is the <span class = 'mode-label'>FX</span> mode: this lets you "punch-in" different audio effects, to the selected track.</li>
                    </ul>
                    <p>The key takeaway for using modes is that you're only in a mode when that mode button is being held down. Let's practice...</p>
                </li>

                <li>
                    <p><strong>Hold <span class = 'key'><span class="material-symbols-outlined">function</span></span> and then any of the number keys</strong>. Notice how the sound is affected?! Try some other keys. And then try holding down more than one number key at a time. Maybe try <span class = 'key'>&plus;</span> or <span class = 'key'>&minus;</span><label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">These have tempo-related punch-in FX tied to them, so you'll only want to use one at a time.</span>. Having fun yet? Try to to time your punch-in FX to make the beat drop. Go wild.
                    </p>

                    <p>The <span class = 'key'><span class="material-symbols-outlined">function</span></span> mode is arguably the most 'performance' orientated mode, but all other modes work very similarly. The main difference is that you'll just need to tap the number key to make a change, rather than holding onto an FX for as long as you like.
                    </p>
                </li>
            </ol>
        </section>

        <section>
            <p>That's all you need to gets started!<label for="sn-006" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-006" class="margin-toggle"/><span class="sidenote">Obviously there's more to explore inside each mode. All is revealed in the <a href ='/docs/user-manual' target = '_blank'>user manual</a>.</span> But just to end this quick start guide: what might have noticed is that is the you'll need two fingers to access a the mode &mdash; one to hold the mode button, and another to active an 'action' &mdash; to really get the most out of the Data Operator. <strong>The Data Operator wants to you to play with it. And it wants to reward you for learning <i>how</i> to play it.</strong>
            </p>
        </section>

        <section>
            <h2>// Epilogue: Be an explorer</h2>
            <p>Here's a few fun things you'll find the <i>Data Operator</i> can do that we'll leave it to you to figure out how:
            </p>
            <ul>
                <li>Change up the <i>scene</i>! Great for varying the melody and comparing data trends.</li>
                <li>Find your groove by controlling tempo and swing.</li>
                <li>Scale it your way: set the vibe by choosing a musical scale to match the data context.</li>
                <li>Solo data to bring it to put the spotlight on it.</li>
                <li>Change up the beats to transform the flavour of your data jam.</li>
                <li>Use the euclidean rhythm tools or the pulse sequencer to create unique melodies.</li>
                <li>Share you sonification with anyone by generating a link.</li>
                <li>And don't forget to add spice with <span class = 'key'><span class="material-symbols-outlined">function</span></span>!!</li>
            </ul>
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
    .mode-label{
        text-transform:     uppercase;
        font-style:         italic;
    }
</style>