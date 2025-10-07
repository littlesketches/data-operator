<!-- ABOUT SILENT SHOUT-->
<script>

</script>


<!-- HTML MARKUP-->
<article>
    <div class = 'content-wrapper'>

        <h1>Data Operator</h1>
        <p class = 'subtitle'>Design + technical notes</p>

        <section>
            <p>Here you will find some extra ramblings and documentation about the design and technical implementation of the Data Operator, and features that made it into the interface. On first glance, the topics in these notes may seem loosely connected, however they tended to introduce compromises on one another, that shaped the final design of the Data Operator. 
            </p>
            <ul>
                <li>User mindset</li>
                <li>Multiple devices: interface challenges</li>
                <li>Instrument approach</li>
                <li>Data & data models</li>
                <li>Sonification approach</li>
                <li>Audio engine</li>
            </ul>

        </section>

        <section>
            <h2>Data</h2>
            <p>The <i>Data Operator</i> platform has been developed around the wonderful <a href = 'https://strudel.cc/learn/getting-started/' target ="_blank">Strudel</a> live coding audio engine; and takes design inspiration from the lovable Teenage Engineering <a href = 'https://teenage.engineering/products/po' target = '_blank'>Pocket Operator</a> series of instruments. 
            </p>
            <p>Each <i>Data Operator</i> starts with data. This data can be static, or a stream, or be part of a model or simulation that that the <i>Data Operator</i> can be hooked into (i.e. as a data model controller). The primary role of the Data Operator, is to then map incoming data, to parameters of its internal instruments and sound patterns, to produce music. The interface of the <i>Data Operator</i> then allows users to use a set of music-related tools to explore and <i>play with</i> the source data: controlling and manipulating the data sonification on-the-fly, in real-time. </p>

            <p>With <i>Data Operator</i> basically get one looping  bar of music (a 'cycle' with 16-step) to sequence and jam with, using (up to) 5 tracks for instruments and sounds. It doesn't sound like much, but you can make a hell of racket with this little setup. The input data will generally be chosen and modelled with multiple data series can be swapped in and out of the <i>Data Operator</i>. The standard approach is to have 10 data series or sound patterns and available per track, which is 100,000 combinations per for every 'slice' of data, known as a 'scene'. And most data sets chosen have dozens or hundreds (or more) scenes available!
            </p>
            <p>Each <i>Data Operator</i> comes with a a bunch of useful musical tools to help you spice up your sonification. 
            </p>
            <ul>
                <li>Firstly, there are scales. When data is mapped to pitch (frequency), these data scales are quantized to musical scale degrees. This is an aesthetic (musical) decision to make it easier to hear and harmonize the changes in data. You can choose from dozens of musical scales, and adjust their root notes.</li>
                <li>You can also transpose any melodic tracks along their scales.</li>
                <li>Every track has a Euclidean rhythm applied to it. This is brilliant piece of math that chooses which notes in a 16 step sequence are played, by adjusting how many pulses (steps) you want to hear, and whether (and by how much) you'd like that pulse pattern rotated/offset. It's a quick way to cycle through and test out 172 different rhythms, for every* track. Of course, if you want to manually choose the pulses...
                </li>
                <li>Four tracks have their own pulse sequencer (coming soon). Why not all 5? Well actually, we found that the interface doesn't quite have enough buttons to make it...so that's a UI limitation. That said, the last track (C3) is designed to be used for multi-cycle chord progressions, drones and textures, so it </li>
            </ul>
            


            <p>Of course, the goals and design of the <i>Data Operator</i> differ significantly from the <a href = 'https://strudel.cc/' target = '_blank'>REPL-based Strudel interface</a>
            </p> 

         
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