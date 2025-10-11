<!-- DATA OPERATOR +LAYOUT.SVELTE -->
<script>
    // Layout children prop
	let { children, data } = $props();

   
    // iv. Canvas overlay to prevent default gestures
    import { onMount } from 'svelte';

    let canvas

    onMount(() => {
        if (!canvas) return;

        // Prevent default gestures inside the canvas
        const prevent = e => e.preventDefault();

        canvas.addEventListener('touchstart', prevent, { passive: false });
        canvas.addEventListener('touchend', prevent, { passive: false });
        canvas.addEventListener('touchmove', prevent, { passive: false });

        return () => {
            canvas.removeEventListener('touchstart', prevent);
            canvas.removeEventListener('touchend', prevent);
            canvas.removeEventListener('touchmove', prevent);
        };
    });

</script>


<!-- SVELTE SPECIAL ELEMENTS-->
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/style.css'>
</svelte:head>


<!-- LAYOUT-->
{@render children?.()}
    
<!-- <canvas bind:this={canvas}></canvas> -->


<!-- STYLES -->
<style>
    canvas {
        position:       fixed;
        top:            0;
        left:           0;
        width:          100vw;
        height:         100vh;
        /* touch-action:   none; */
    }
</style>