<script>
    // Props
    let { model} = $props()

    // Models
    const {sonification, strudel} = model

    // Reactive variables
    let play = $derived(strudel.state.transport !== 'playing')
    let stop = $derived(strudel.state.transport === 'playing')

    function playStop(ev){
        switch(strudel.state.transport){
            case "stopped":
                sonification.handle.start();  break
            case "playing":
                sonification.handle.stop(); break
        }   
    }

    // Config
    const dims = {
        width: 100,
        height: 100
    }

    const n = 19;               // n x n   grid size 
    const radius = 1;           // circle radius

    const triangleWidth  = 8;    // max width in dots
    const triangleHeight = 15;   // max height in dots
    const squareLength   = 11;   // square size in dots

    const spacing = dims.width / (n - 1);

    const circles = [];

    // offsets to center triangle and square
    const triHOffset = Math.floor((n - triangleWidth) / 2);
    const triVOffset = Math.floor((n - triangleHeight) / 2);
    const triMid = (triangleHeight - 1) / 2;

    const squareHOffset = Math.floor((n - squareLength) / 2);
    const squareVOffset = Math.floor((n - squareLength) / 2);

    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // Triangle check
            const relTriRow = row - triVOffset;
            let triangleClass = "background";
            if (relTriRow >= 0 && relTriRow < triangleHeight) {
                let numCols = Math.round(triangleWidth - (Math.abs(relTriRow - triMid) / triMid) * (triangleWidth - 1));
                numCols = Math.max(numCols, 1);
                if (col >= triHOffset && col < triHOffset + numCols) {
                    triangleClass = "triangle";
                }
            }

            // Square check
            const inSquare = 
            row >= squareVOffset && row < squareVOffset + squareLength &&
            col >= squareHOffset && col < squareHOffset + squareLength;

            const squareClass = inSquare ? "square" : "background";

            circles.push({
                cx: col * spacing,
                cy: row * spacing,
                triangleClass,
                squareClass
            });
        }
    }

</script>


<!-- SVG-->
<div>
    <svg viewBox = '0 0 {dims.width} {dims.height}' class:stop class:play 
        onclick={playStop} role='button' tabindex="-1">
        {#each circles as c}
        <g transform='translate({c.cx}, {c.cy})'>
            <circle r={radius} class= {`${c.triangleClass}  ${c.squareClass} `} />
        </g>
        {/each}
    </svg>

</div>



<!-- STYLE-->
<style>
    svg{
        overflow:       visible;
        cursor:         pointer;
        outline:        none;
        height: 100%
    }
    circle {
        fill:       rgba(0, 0, 0, 0.15);
        transition:  all 500ms;
    }

    .play circle.triangle {
        fill:           rgba(0, 0, 0, 0.95);
        transform:      scale(1.5);
    }
    .stop circle.square {
        fill:       rgba(0, 0, 0, 0.95);
        transform:      scale(1.5);
    }
</style>