<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p><strong>Available when the MIX track is selected</strong></p>
<p>You can change the duration that notes are held for for melodic tracks <label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote">Melodic tracks are Group A, and in most cases Group B depending on the instrument configuration. For editions like the DFAM <span class = 'key'>6</span> may have no function or may be used for an alternate feature.</span>. With legato notes on, notes are held until the next note in the sequence is played (i.e. has a 'pulse'). With legato notes off, each note is played for one step (i.e. a 16n).
</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button inactive'>7</div>
        <div class = 'pad-button inactive'>8</div>
        <div class = 'pad-button '>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button inactive'>4</div>
        <div class = 'pad-button inactive'>5</div>
        <div class = 'pad-button '>6</div>
        <div class = 'pad-button inactive'>+</div>

        <div class = 'pad-button inactive'>1</div>
        <div class = 'pad-button inactive'>2</div>
        <div class = 'pad-button inactive'>3</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button inactive'>&times;</div>
        <div class = 'pad-button inactive'>0</div>
        <div class = 'pad-button active'>.</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">shift_lock</span></div>
    </div>

    <div class = 'pad-aside'>
        <div class = 'aside-left'>
            <p>&larr; Hold down the modify key <span class = 'key'>.</span> and use  <span class = 'key'>6</span> / <span class = 'key'>9</span> to toggle legato notes on/off, for the track shown (on the button label).
            </p>
        </div>
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
    }

    .pad-button{
        width:              2rem;
        aspect-ratio:       1 / 1;
        border:             0.5px solid #c3c3c3;
        display:            flex;
        justify-content:    center;
        align-items:        center;
    }

    .active{
        background:         var(--col-highlight);
        color:           #000;
    }

    .inactive{
        opacity:            0.25;
    }
</style>
