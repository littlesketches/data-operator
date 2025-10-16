<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p><strong>Available when any Group/part track is selected</strong></p>
<p>You can change the speed at which a pattern on a track is played by using the clock divider feature. <label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote">Currently only a divider, which slows the speed of a pattern down, is available. A multiplier may be added in the future, however it should be noted that the global tempo (with track-level clock dividers) may be able to achieve the desired result</span>. This is a useful feature for changing the playback timing of certain tracks, to achieve more spatially balanced compositions<label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">For example, chords are usually set to play at a slower clock, with more aggregated data intervals, to produce musical sounding chord progressions.</span>.
</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button inactive'>7</div>
        <div class = 'pad-button inactive'>8</div>
        <div class = 'pad-button inactive'>9</div>
        <div class = 'pad-button '>-</div>

        <div class = 'pad-button inactive'>4</div>
        <div class = 'pad-button inactive'>5</div>
        <div class = 'pad-button inactive'>6</div>
        <div class = 'pad-button '>+</div>

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
            <p>&larr; Hold down the modify key <span class = 'key'><span class="material-symbols-outlined">shift_lock</span></span> and use  <span class = 'key'>-</span> / <span class = 'key'>+</span> to adjust the clock division amount.
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
