<!-- DATA OPERATOR +LAYOUT.SVELTE -->
<script>
    // Layout children prop
	let { children, data } = $props();

    // Models
    const app = data.app, 
        sonification = data.sonification 

    // i. Check device screen size (mobile check)
    let mobileScreen = $derived(data.app.state.global.device.screen.width < 770)

    // ii. Query params
    const queryParams = app.state.global.urlParams = data.url.searchParams

    const mobileFlag = queryParams.get('mobile') !== null ? true : false,
        apiData = queryParams.get('api') !== null ? true : false

    // iii. Programatic mobile screen size check (on window resize)
    const checkScreenSize = () => {
        sonification.state.isMobile = data.app.state.global.device.screen.width < 600 || mobileFlag 
    }


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

<svelte:window 
    bind:innerWidth={data.app.state.global.device.screen.width} 
    bind:innerHeight={data.app.state.global.device.screen.height}
    on:resize={checkScreenSize}
 />

<!-- LAYOUT-->
{@render children?.()}
    
<canvas bind:this={canvas}></canvas>


<!-- STYLES -->
<style>
  canvas {
        position:       fixed;
        top:            0;
        left:           0;
        width:          100vw;
        height:         100vh;
        touch-action:   none; /* hint to disable gestures */
  }
</style>