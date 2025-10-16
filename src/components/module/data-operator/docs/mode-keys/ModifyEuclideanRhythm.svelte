<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p><strong>Available when a melodic track is selected</strong></p>

<p>A Euclidean Rhythm feature is available for melodic tracks<label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote">Melodic tracks are Group A, and in most cases Group B depending on the instrument configuration.</span>.
This will generate a pulse sequence that is applied to the 16-step data-driven melodies (i.e. a 'rhythm'), using the Euclidean Rhythm algorithm<label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">Based on Godfried Toussiant's seminal work and paper <a href = 'https://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf' target = '_blank'>The Euclidean Algorithm Generates Traditional Musical Rhythms</a></span>. The Euclidean Rhythm algorithm and controls for noo. pulses and 'rotation' are quick and effective ways to explore how rhythms can change the feel or a melody<label for="sn-C" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-C" class="margin-toggle"/><span class="sidenote">Remember that fine grain control of these rhythms is available through the <i>pulse sequencer</i> feature.</span>. 
</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button inactive'>7</div>
        <div class = 'pad-button '>8</div>
        <div class = 'pad-button '>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button inactive'>4</div>
        <div class = 'pad-button'>5</div>
        <div class = 'pad-button'>6</div>
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
            <p>&larr; Hold down the modify key <span class = 'key'>&times;</span>  and use these keys to adjust the number of pulses with <span class = 'key'>8</span> / <span class = 'key'>9</span>, and the rotation of the rhythm with <span class = 'key'>5</span> / <span class = 'key'>5</span> 
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
