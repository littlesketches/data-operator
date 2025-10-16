<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p>You can solo tracks<label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote">As a reminder, the tracks are generically labelled Group A, B and C1-3; but are usually given alias like "lead", "bass", "beats", "percussion" and "chords", respectively</span> in the <i>Data Operator</i> which can be useful for focusing on one sound.  The solo state for a track will be highlighted in the display, and tht track will automatically be SELECTED. In addition, the <span class = 'key'>.</span>  + <span class = 'key'>0</span> can be used to unsolo all tracks.</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button'>7</div>
        <div class = 'pad-button inactive'>8</div>
        <div class = 'pad-button inactive'>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button'>4</div>
        <div class = 'pad-button inactive'>5</div>
        <div class = 'pad-button inactive'>6</div>
        <div class = 'pad-button inactive'>+</div>

        <div class = 'pad-button'>1</div>
        <div class = 'pad-button'>2</div>
        <div class = 'pad-button'>3</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button inactive'>&times;</div>
        <div class = 'pad-button'>0</div>
        <div class = 'pad-button inactive'>.</div>
        <div class = 'pad-button'><span class="material-symbols-outlined">shift_lock</span></div>
    </div>

    <div class = 'pad-aside'>
        <div class = 'aside-left'><p>&larr; Use these keys for choose tracks to mute/unmuted</p></div>
        <div class = 'aside-right'>
            <p>Hold down <span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> and tap on a numpad key to select the corresponding track to solo / unsolo.</p>
            <p>&rarr; </p>
        </div>
    </div>

    <div class = 'numpad pad'>
        <div class = 'pad-button'>A</div>
        <div class = 'pad-button inactive'>8</div>
        <div class = 'pad-button inactive'>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button'>B</div>
        <div class = 'pad-button inactive'>5</div>
        <div class = 'pad-button inactive'>6</div>
        <div class = 'pad-button inactive'>+</div>

        <div class = 'pad-button'>C1</div>
        <div class = 'pad-button'>C2</div>
        <div class = 'pad-button'>C3</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button inactive'>&times;</div>
        <div class = 'pad-button small-text'>Unsolo all</div>
        <div class = 'pad-button inactive'>.</div>
        <div class = 'pad-button active'><span class="material-symbols-outlined">shift_lock</span></div>
    </div>
</div>



<!-- STYLES-->
<style>
    .pad__container{
        max-width:          55%;
        display:            grid;
        grid-template-columns: 1fr 1fr 1fr;
        column-gap:         2vh;
    }

    .pad-aside p{
        line-height:        1.5;
        font-style:         italic;
        font-size:          smaller;
        margin-block-start: 0;
        margin-block-end:   0;
    }

    .aside-right{
        text-align:         end;
        margin-top:         1rem;
    }

    .pad{
        display:            grid;
        width:              min-content;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        column-gap:         1vh;
        row-gap:            1vh;
        text-align:         center;
    }

    .pad-button{
        width:              2rem;
        aspect-ratio:       1 / 1;
        border:             0.5px solid #c3c3c3;
        display:            flex;
        justify-content:    center;
        align-items:        center;
    }
    .pad-button.small-text{
        font-size:          1vh;
    }
    .active{
        background:         var(--col-highlight);
        color:           #000;
    }

    .inactive{
        opacity:            0.25;
    }
</style>
