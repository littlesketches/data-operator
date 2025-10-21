<!-- DATA OPERATOR +LAYOUT.SVELTE -->
<script>
    // Component:  
    import ClientSideSetup from "$src/components/module/data-operator/_core/ClientSideSetup.svelte";

    // Layout props
	let { children, data } = $props();

</script>

<!-- MODEL SETUP + LAYOUT-->
<ClientSideSetup {  data }/>

{@render children?.()}