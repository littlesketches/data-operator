<!-- DATA OPERATOR +LAYOUT.SVELTE -->
<script>
    // Layout props
	let { children, data } = $props();

    // i. Models
    const app = data.app, 
        sonification = data.sonification 

    // ii. Query params
    const queryParams   = app.state.global.urlParams = data.url.searchParams,
        mobileFlag      = queryParams.get('mobile') !== null ? true : false,
        apiData         = queryParams.get('api') !== null ? true : false
</script>


<!-- WINDOW ACTIONS -->
<svelte:window 
    bind:innerWidth=  {app.state.global.device.screen.width} 
    bind:innerHeight= {app.state.global.device.screen.height}
    on:resize=        {() => sonification.checkScreenSize(mobileFlag)}
 />


<!-- LAYOUT-->
{@render children?.()}