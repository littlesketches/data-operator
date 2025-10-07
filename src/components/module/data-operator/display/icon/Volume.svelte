<!-- VOLUME METER SVG-->
<script>
    let {level, active, solo,
        mutegroup = false,
        mutepart1 = false,
        mutepart2 = false,
        mutepart3 = false  } = $props()

    // SVG dims
    const dims = {
        width:  40,
        height: 20
    }

</script>

<!-- SVG-->
<svg viewBox = '0 0 {dims.width} {dims.height}' class:active class:solo>
    {#if mutegroup}<text class = 'group' y=6 x=-4>&#x2715;</text>{/if}
    {#if mutepart1}<text class = 'part'  y=6 x=-3>&#x2715;</text>{/if}
    {#if mutepart2}<text class = 'part'  y=6 x = 5>&#x2715;</text>{/if}
    {#if mutepart3}<text class = 'part'  y=6 x = 13>&#x2715;</text>{/if}

    <path class = 'outline' d = "M 0 20 h40 v-20z"/>
    <g class = 'value-group' transform='scale({level})'>
        <path class = 'value' d = "M 0 20 h40 v-20z"/>
    </g>
</svg>


<!-- STYLES -->
<style>
    svg{
        overflow:           visible;
        height:             100%;
        opacity:            0.35;
    }
    svg.active{
        opacity:            1;
    }
    path.outline{
        stroke:             var(--pixel-0);   
        stroke-width:       1px;
        stroke-linejoin:    round;
        fill:               none;
    }
    g.value-group{
        transform-origin:   0% 100%;
    }
    path.value{
        fill:               var(--pixel-0);    
        stroke:             none;
    }
    text{
        fill:               var(--pixel-0);   
        font-size:          16px;
    }
    text.part{
        font-size:          12px;
    }

    /* SOLO HIGHLIGHT */
    .solo path.outline{
        stroke:             var(--col-highlight-alt);
    }
    .solo text,
    .solo path.value{
        fill:               var(--col-highlight-alt);
    }

</style>
