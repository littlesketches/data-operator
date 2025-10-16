<script>

    let {isSideGuide = false} = $props() 
console.log(isSideGuide)
</script>

    <p>There are a few different ways you can use the buttons on the <i>Data Operator</i>. If you're on a mobile device, you don't get much choice, what you see on your little screen is what you get. This is the most natural way to play the <i>Data Operator</i> &mdash; by holding it a using your hands and thumbs to play it!
    </p>
    <p>If you're using a device with a keyboard attached, you can use various keys to control/mirror the buttons on the <i>Data Operator</i><label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">Although it may not seem as intuitive as a touchscreen, a mechanical does provide a very tactile response that is much more similar to MIDI keyboards and controllers.</span>. On a full sized keyboard, the <i>Data Operator</i> layout resembles the numpad section: they controls are (nearly) mapped 1 to 1: 
    </p>

    <div class = 'pad__container' class:isSideGuide>
        <div class = 'pad-aside'>
            Together with the numpad, you can try using the <span class = 'keyboard'>Shift</span> key equivalent to <span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> , and the adjacent <span class = 'keyboard'>&rarr;</span> key being <span class = 'key'>&times;</span>.
        </div>
        <div class = 'numpad pad'>
            <div class = 'pad-button'>7</div>
            <div class = 'pad-button'>8</div>
            <div class = 'pad-button'>9</div>
            <div class = 'pad-button'>-</div>

            <div class = 'pad-button'>4</div>
            <div class = 'pad-button'>5</div>
            <div class = 'pad-button'>6</div>
            <div class = 'pad-button'>+</div>

            <div class = 'pad-button'>1</div>
            <div class = 'pad-button'>2</div>
            <div class = 'pad-button'>3</div>
            <div class = 'pad-button enter numpad'>ent</div>

            <div class = 'pad-button zero numpad'>0</div>
            <div class = 'pad-button dot numpad'>.</div>
        </div>
    </div>

    <p>On any keyboard (including laptops), an alternative 'pad' of keys can be used:</p>

    <div class = 'pad__container' class:isSideGuide>
        <div class = 'pad-aside'>
            With these pad, you can try using the <span class = 'keyboard'>Return</span> keys for <span class = 'key'><span class="material-symbols-outlined">function</span></span>, either <span class = 'keyboard'>Shift</span> keys for <span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> , and the keys for <span class = 'keyboard'>,</span> and  <span class = 'key'>&sdot;</span>, respectively.
        </div>

        <div class = 'keypad pad'>
            <div class = 'pad-button'>Q</div>
            <div class = 'pad-button'>W</div>
            <div class = 'pad-button'>E</div>
            <div class = 'pad-button'>R</div>

            <div class = 'pad-button'>A</div>
            <div class = 'pad-button'>S</div>
            <div class = 'pad-button'>D</div>
            <div class = 'pad-button'>F</div>

            <div class = 'pad-button'>Z</div>
            <div class = 'pad-button'>X</div>
            <div class = 'pad-button'>C</div>

            <div class = 'pad-button zero numpad'>alt/option</div>
        </div>
    </div>

    <p>For clarity, the both<label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">It should mentioned that the standard row of keyboard number keys with - and + also work. We don't generally recommend the number row however, as they don't visually map well to the 'pad'.</span> sets of mappings are available at the same time. Its up to you to work out what works best for you! And yes, it's confusing at first, but with a bit button mashing and practice, you'll soon figure it out!
    </p>


<!-- STYLES-->
<style>
    .pad__container{
        width:                  55%;
        display:                grid;
        grid-template-columns:  1fr 1fr;
        column-gap:             5vh;
    }   

    .pad__container.isSideGuide{
        width:                  100%;
    }

    .pad-aside{
        line-height:            2;
        font-style:             italic;
    }

    .isSideGuide .pad-aside,
    .isSideGuide .pad-aside span{
        font-size:              1.25vh;
    }

    .pad{
        display:                grid;
        width:                  min-content;
        grid-template-columns:  repeat(4, 1fr);
        grid-template-rows:     repeat(4, 1fr);
        column-gap:             1vh;
        row-gap:                1vh;
    }

    .pad-button{
        width:                  2rem;
        aspect-ratio:           1 /1;
        border:                 0.5px solid #fff;
        display:                flex;
        justify-content:        center;
        align-items:            center;
    }

    .enter.numpad{
        grid-area:              3 / 4 / 6 / 5;
        aspect-ratio:           initial;
        height:                 calc(100% - 1.2vh);
    }

    .zero.numpad{
        grid-area:              4 / 1 / 5 / 3;
        width:                  100%;
        aspect-ratio:           initial;
    }

    .dot.numpad{
        grid-area:              4 / 3 / 5 / 4;
    }
</style>
