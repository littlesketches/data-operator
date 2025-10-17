<!-- DATA OPERATOR +LAYOUT.SVELTE -->
<script>
    // Layout children prop
	let { children, data } = $props();
</script>


<!-- SVELTE SPECIAL ELEMENTS-->
<svelte:head>
    <link  rel='stylesheet' href='/css/module/data-operator/style.css'>
</svelte:head>


<!-- LAYOUT-->
{@render children?.()}
    

<!-- STYLES -->
<style>
</style>