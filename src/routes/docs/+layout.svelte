<!-- DATA OPERATOR DOCS +LAYOUT.SVELTE-->
<script>
	import { page } from '$app/state';

    // Props for layout
	let { children } = $props();

    // Get route
    let docRoute = $derived.by( () => {
        const url = page.url;
        const pathname = url.pathname;
        const segments = pathname.split('/').filter(Boolean);
        return segments.at(-1);
    })


</script>


<!-- HTML COMPONENT MARKUP: NAVBAR-->
<nav>
    <ul>
        <li class = 'home'>
            <a href = '/'>デ.オ.</a>
        </li>
        <li class:active={docRoute === 'docs'}>
            <a href = '/docs'>About</a>
        </li>
        <li class:active={docRoute === 'quick-start'}>
            <a href = '/docs/quick-start'>Quick start</a>
        </li>
        <li class:active={docRoute === 'user-manual'}>
            <a href = '/docs/user-manual'>User manual</a>
        </li>
        <li class:active={docRoute === 'design'}>
            <a href = '/docs/operator-design'>Operator design</a>
        </li>
        <li class:active={docRoute === 'sonification'}>
            <a href = '/docs/sonification'>Sonification notes</a>
        </li>
    </ul>
</nav>


<!-- LAYOUT-->
{@render children?.()}


<!-- STYLES -->
<svelte:head>
    <link rel="stylesheet" href = "/css/module/data-operator/docs/tufte.css"/>
</svelte:head>

<style>
    /* Navigation */
    nav{
        padding:            1rem 0;
        position:           fixed;
        background:         var(--docs-bg-col);
        width:              100%;
    }
    nav a:visited,
    nav a {
        text-decoration:    none;
    }

    ul{
        list-style:         none;
        margin:             0;
        padding:            0;
        display:            flex;

        align-items:        end;
    }

    li{
        padding-right:      1rem;
        margin-bottom:      0;
        transition:         all 500ms;
    }

    li:not(:first-of-type){
        padding-left:      1rem;
    }

    li:first-of-type{
        border-right:       1px solid var(--docs-fg-col);
    }

    li.active{
        text-decoration:                 underline;
        text-decoration-thickness:      4px;
        text-underline-offset:          4px;
    }
</style>
