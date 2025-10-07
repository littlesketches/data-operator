<!-- ABOUT SILENT SHOUT-->
<script>

</script>


<!-- HTML MARKUP-->
<article>
    <div class = 'content-wrapper'>

        <h1>Data Operator</h1>
        <p class = 'subtitle'>Sonification notes</p>

        <section>
            <p>Here you will find some extra ramblings and documentation about the sonification techniques used in the <i>Data Operator</i> instruments. First up are links sonification notes for each Data Operator model. 
            </p>
            <ul>
                <li><a href='/docs/sonification/oe-10'>OE-10</a></li>
                <li><a href='/docs/sonification/oe-10-dfam'>OE-10 DFAM</a></li>
            </ul>

        </section>

        <section>
            <h2>Lessons and ramblings</h2>
            <p>This section is in draft. It contains an unfinished notes on learnings from the process of designing the Data Operator as a sonification tool, and the limitations and tradeoffs made while developing a sonification tool in the context of both a web application, and the design language of a fun and engaging, interactive 'data instrument'. 
            </p>
            <p> Some working design principles for the <i>Data Operator</i>: </p>
            <ul>
                <li>It must be fun to use. depth and advanced features (e.g. sound design) are pared back whenever in doubt. This does not mean 'Fischer Price music toy' approach, but it means that there are at least, a limited depth applied to  "button combinations".
                </li>
                <li>It must be interactive and provide users with immediate feedback to their actions: primarily audio, and/or through supporting visual/information. The immediacy of feedback is a a key acharacteristic of a creative tool or 'tool for expression'.</li>
                <li>It must work across mobile phone, tablet and traditional computer-with-keyboard devices.
                    <ul>
                        <li>This presents a 'minimum interface' and associated control/input(e.g. touch vs keyboard vs mouse) challenge that often set the design direction and bound the possible design solution space for the sonification (parameter mapping). In short, the interface is/was found to be the limiting factor for sound design (over say, technical limitations od devices)
                        </li>
                        <li>Mobile support is key to immediacy (see 'fun')</li>
                        <li>Multiple 'optimised' interfaces are required, particularly for small touch screens (i.e. mobile phones)</li>
                    </ul>
                </li>
                <li>It should showcase data that 'swappable': this requirement is more to showcase how a data sonification 'platform' and associated 'instrument' interface can be scalable. This places more emphasis on designing a robust parameter mapping design algorithm that supports 'lots of data', rather than focusing on a tweaking a bespoke sonificaiton composition. It also puts more focus on 'instrument design choices' and data mapping for timbral and dynamics parameters.
                </li>
                <li>It should preference musicality and sonic aesthetics. It should sound "good" and musical, wherever possible. This is a design choice to appeal to a wider audience (see, 'fun')</li>
            </ul>
        </section>

        <section>
            <h3>Parameters that work(ed)</h3>

        </section>
    </div>
</article>


<!-- STYLES-->
<style>
    p, li{
        line-height: 1.75;
    }
    /* Navigation */
    nav{
        padding:            0.5rem 1rem;

    }
    nav a:visited,
    nav div,
    nav a {
        /* color:           #fff; */
        text-decoration:    none;
    }


    /* Keyboard key style */
    span.key{
        display:            inline-block;
        border-top:         solid 2px;
        border-left:        solid 2px;
        border-right:       solid 0.25px;
        border-bottom:      solid 0.25px;
        border-radius:      0.25rem;
        padding:            0.1rem 0.5rem;
        margin:             0rem 0;
        min-width:          1rem;
        text-align:         center;  
        font-size:          1rem;
    }
    span.key span{
        font-size:          1rem;
    }
    /* In text 'button' style */
    span.text-button{
        display:            inline-block;
        border-top:         solid 2px;
        border-left:        solid 2px;
        border-right:       solid 0.25px;
        border-bottom:      solid 0.25px;
        border-radius:      1rem;
        padding:            0rem 0.5rem;
        margin:             0rem 0;
        min-width:          1rem;
        text-align:         center;   
    }

    /* Slide container */
    .slide-button{
        text-decoration:    underline dotted;
        cursor:             pointer;
    }
    .slide-button:hover{
        width: 100%;
    }


    /* Overrides */
    li{
        margin-bottom: 1rem;
    } 
</style>