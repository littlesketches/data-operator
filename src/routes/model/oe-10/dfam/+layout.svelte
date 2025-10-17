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
    const queryParams = app.state.global.urlParams = data.url.searchParams,
        mobileFlag = queryParams.get('mobile') !== null ? true : false,
        apiData = queryParams.get('api') !== null ? true : false

    // iii. Programmatic mobile screen size check (on window resize)
    sonification.checkScreenSize(mobileFlag)

</script>

<svelte:window
    bind:innerWidth  = {data.app.state.global.device.screen.width} 
    bind:innerHeight = {data.app.state.global.device.screen.height}
    on:resize        = {() => sonification.checkScreenSize(mobileFlag)}
/>

<!-- LAYOUT-->
{@render children?.()}