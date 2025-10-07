<!-- METRONOME SVG WITH ON BEAT ANIMATION-->
<script>
    let {strudel} = $props()

    // SVG dims
    const dims = {
        width:  50,
        height: 50
    }

</script>

<!-- SVG-->
<svg viewBox = '{-dims.width * 0.5} 0 {dims.width} {dims.height} ' >
    <path class = 'outline' d = "M -5 0 h10 l10 50 h-30 z"/>
    <g id = 'pendulum-group' style = 'transform:rotate({strudel.state.time.beat%2 === 0 ? -25: 25 }deg)'>
        <line class = 'pendulum-stem-bg' y1 = 5 y2 = 45> </line>
        <line class = 'pendulum-stem' y1 = 5 y2 = 45> </line>
        <circle class = 'pendulum-ball' cy = 6 r = 4/> 
    </g>
</svg>


<!-- STYLES -->
<style>
    svg{
        overflow: visible;
    }
    line.pendulum-stem-bg{
        stroke-width:       6px;
        stroke:             var(--screen-color);  
    }
    path.outline,
    line.pendulum-stem{
        stroke:             var(--pixel-0);   
        stroke-width:       2px;
        stroke-linejoin:    round;
        fill:               none;
    }
    #pendulum-group{
        transform-origin:   0% 100%;
    }
    circle.pendulum-ball{
        fill:               var(--pixel-0);   
    }
</style>
