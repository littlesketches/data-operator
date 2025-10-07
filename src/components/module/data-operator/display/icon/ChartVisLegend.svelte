<!-- INLINE GROUP LIST ICONS: MATCHED TO CHARTS-->
<script>
    // Props
    let {group, active, solo} = $props()

</script>

<!-- HTML-->
<div class = 'icon-wrapper' class:active class:solo>
    {#if group ==='A'}
    <svg viewBox = '0 0 50 50'>
        <circle class = 'shape' cx = 25 cy = 25 r=25/>
    </svg>
    {:else if group === 'B'}
    <svg viewBox = '0 0 50 50'>
        <rect class = 'shape' x = 0 y = 0 height=50 width = 50/>
    </svg>
    {:else if group === 'C'}
    <svg viewBox = '0 0 50 50'>
        <path class ='shape' d = "M0,20 L25,0 L50,20z"/>
        <circle class = 'shape' cx = 6.25   cy = 31.25 r = 6.25/>
        <circle class = 'shape' cx = 25     cy = 31.25 r = 6.25/>
        <circle class = 'shape' cx = 43.75  cy = 31.25 r = 6.25/>
        <rect class = 'shape' x = 0 y = 42.5 height=10 width = 50/>
    </svg>
    {/if}
</div>


<!-- STYLES -->
<style>
    .icon-wrapper{
        display:        flex;
        justify-items:  center;
        height:         1vh;
    }

    svg{
        overflow:       visible;
        height:         100%;
        opacity:        0.25;
    }

    .active svg{
        opacity:        1;
    }

    .shape{ 
        fill:           var(--pixel-0);   
    }

    .solo .shape{
        fill:           var(--col-highlight-alt);
    }
</style>