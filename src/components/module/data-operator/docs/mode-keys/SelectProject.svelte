<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->
<p><i>Projects</i> can be thought of as all the materials and pieces that make up musical composition. You might be tempted to think of it as a 'song', but its more like all the parts that make up a song<label for="sn-A" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-A" class="margin-toggle"/><span class="sidenote"> In a data sonification terms, a project is is a 'slice' of data used in the sonification. 'Data' projects can be broken up in different ways, depending on the Data Operator model: if you have time series data, you might have projects as a complete day (i.e. dates).</span>. The upshot is that you can change the 'project' on-the-fly, which is also a great way to compare patterns and variations in projects of data<label for="sn-B" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-B" class="margin-toggle"/><span class="sidenote">Depending how data is arranged as projects, this may be used for comparing patterns ands over time, or between entities.</span>.
</p>

<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button inactive'>7</div>
        <div class = 'pad-button inactive'>8</div>
        <div class = 'pad-button inactive'>9</div>
        <div class = 'pad-button'>-</div>

        <div class = 'pad-button inactive'>4</div>
        <div class = 'pad-button inactive'>5</div>
        <div class = 'pad-button inactive'>6</div>
        <div class = 'pad-button '>+</div>

        <div class = 'pad-button inactive'>1</div>
        <div class = 'pad-button inactive'>2</div>
        <div class = 'pad-button inactive'>3</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button active'>&times;</div>
        <div class = 'pad-button inactive'>0</div>
        <div class = 'pad-button inactive'>.</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">shift_lock</span></div>
    </div>

    <div class = 'pad-aside'>
        <div class = 'aside-left'>
            <p>&larr; Hold down the select key <span class = 'key'>&times;</span> and use   <span class = 'key'>-</span> / <span class = 'key'>+</span> to cycle back and forward through the available projects. The name of the project will be shown in the bottom right of the <i>Data Operator</i> display.
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
