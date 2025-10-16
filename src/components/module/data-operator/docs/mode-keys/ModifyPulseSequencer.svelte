<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p><strong>Available when the MIX track is selected</strong></p>
<p>You can access a <i>pulse sequencer</i> for melodic tracks <label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote">Melodic tracks are Group A, and in most cases Group B (depending on the instrument configuration)</span>. Pulse sequencers allow you to choose with steps (in a 16-step sequencer) are played/heard. This allows you to shape melodies to your liking, and is an alternative to using the <i>Data Operator's</i> Euclidean rhythm features (see below)<label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">Opening and editing a pulse sequencer will override the current Euclidean rhythm applied to a track. Similarly, editing the Euclidean rhythm settings for a track (see below) will override the pulse sequencer.</span>.
</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button inactive'>7</div>
        <div class = 'pad-button '>8</div>
        <div class = 'pad-button inactive'>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button inactive'>4</div>
        <div class = 'pad-button '>5</div>
        <div class = 'pad-button inactive'>6</div>
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
        <div class = 'aside-left'><p>&larr; Hold down the modify key <span class = 'key'>.</span> Use these keys for open a pulse sequencer</p></div>
        <div class = 'aside-right'>
            <p>The pulse sequencer will change to show labels that mimic a 16 step grid. Tap on each button to make the step/pulse "active" (play) or "inactive" (mute).</p>
            <p>&rarr; </p>
        </div>
    </div>

    <div class = 'numpad pad'>
        <div class = 'pad-button'>1</div>
        <div class = 'pad-button'>2</div>
        <div class = 'pad-button'>3</div>
        <div class = 'pad-button'>4</div>

        <div class = 'pad-button'>5</div>
        <div class = 'pad-button'>6</div>
        <div class = 'pad-button'>7</div>
        <div class = 'pad-button'>8</div>

        <div class = 'pad-button'>9</div>
        <div class = 'pad-button'>10</div>
        <div class = 'pad-button'>11</div>
        <div class = 'pad-button'>12</div>

        <div class = 'pad-button'>13</div>
        <div class = 'pad-button'>14</div>
        <div class = 'pad-button'>15</div>
        <div class = 'pad-button'>16</div>
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
        text-align: center;
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
        font-size:          0.8vh;
    }
    .active{
        background:         var(--col-highlight);
        color:           #000;
    }

    .inactive{
        opacity:            0.25;
    }
</style>
