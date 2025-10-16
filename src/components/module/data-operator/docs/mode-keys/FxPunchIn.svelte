<script>
    let {isAside = false} = $props() 
</script>


<!-- HTML COMPONENT MARKUP -->


<div class = 'pad__container'>
    <div class = 'numpad pad'>
        <div class = 'pad-button '>7</div>
        <div class = 'pad-button '>8</div>
        <div class = 'pad-button '>9</div>
        <div class = 'pad-button inactive'>-</div>

        <div class = 'pad-button '>4</div>
        <div class = 'pad-button'>5</div>
        <div class = 'pad-button'>6</div>
        <div class = 'pad-button inactive'>+</div>

        <div class = 'pad-button '>1</div>
        <div class = 'pad-button '>2</div>
        <div class = 'pad-button '>3</div>
        <div class = 'pad-button active'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button inactive'>&times;</div>
        <div class = 'pad-button '>0</div>
        <div class = 'pad-button inactive'>.</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">shift_lock</span></div>
    </div>

    <div class = 'pad-aside'>
        <div class = 'aside-left'>
            <p>&larr; Hold down <span class = 'key'><span class="material-symbols-outlined">function</span></span> to access 10 different audio effects with the number keys.
            </p>
        </div>
        <div class = 'aside-right'>
            <p>Hold down <span class = 'key'><span class="material-symbols-outlined">function</span></span> and tap on <span class = 'key'>-</span> or  <span class = 'key'>+</span> for slow down/speed up effects.</p>
            <p>&rarr; </p>
        </div>
    </div>

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
        <div class = 'pad-button active'><span class="material-symbols-outlined">function</span></div>

        <div class = 'pad-button inactive'>&times;</div>
        <div class = 'pad-button '>0</div>
        <div class = 'pad-button inactive'>.</div>
        <div class = 'pad-button inactive'><span class="material-symbols-outlined">shift_lock</span></div>
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
