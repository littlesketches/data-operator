<!-- DOCUMENTATION HOME: ABOUT DATA OPERATOR -->
<script>
     // Libs and utils
	import { fade, slide } from 'svelte/transition';

</script>


<!-- HTML MARKUP-->
<article in:fade>
    <div class = 'content-wrapper'>

        <section class = 'subtitle-block'>
            <div>データオペレーター</div>
            <div>Data Operator</div>
        </section>

        <h1>// About</h1>

        <section>
            <h2>What is it?</h2>                    
            <p>A <i>Data Operator</i> is a <strong>data instrument</strong>. It produces musical sounds from data!<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">You might call this is an interactive <i>data sonification</i>... with an novel interface and musically orientated features.</span> Just like a <i>musical</i> instrument, the Data Operator wants to be played with. And anyone can play! Start by mashing buttons to experience how the Data Operator behaves. Or be curious and learn how the instrument operates, by controlling data and adding musical spices to the sounds it produces. 
            </p>
            <p>The <i>Data Operator</i> can more precisely described as a <i>platform</i> for a collection of <i>data instruments</i>. Each <i>Data Operator</i> <strong>model</strong> is based around specific dataset that is mapped<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">This is a data sonification technique commonly known as as parameter mapping. You'll find that each <i>Data Operator</i> model and <i>edition</i> includes some common mappings, as well as few unique ways to map parameters from data to sound.</span> to a set of virtual instruments and sounds that are played on a <i>Data Operator</i><label for="sn-003" class="margin-toggle sidenote-number"><input type="checkbox" id="sn-003" class="margin-toggle"/></label><span class="sidenote">We hope to use the <i>Data Operator</i> platform to make lots <i>models</i> and <i>versions</i> to play with. Each <i>model</i> is given a short, somewhat cryptic name that represents the data. There can be different <i>versions</i> of a model, that use different instrument designs and (potentially) controls to produce different musical styles that may be matched to context/topic of the data.</span>. For the most part though, the controls and features of the <i>Data Operator</i> standardised. This helps you transfer what you've learned about playing a  <i>Data Operator</i>, from one model to another (much like a musical instrument!).


            </p>
            <p><i>Data Operators</i> are a quirky breed of data tools that invites exploration and encourages expression and creativity. Play each <i>Data Operator</i> the way <i>you</i> want to. Lose yourself in the happy beat and make your heart smile.
            </p>
        </section>

        <section>
            <h2>Want to learn more?</h2>
            <p>There are four areas of documentation for the  <i>Data Operator</i>: </p>

            <ul>
                <li><a href = '/docs/quick-start'><strong>Quick start guide</strong>: the place to start &rarr;</a></li>
                <li><a href = '/docs/user-manual'><strong>User manual</strong>: a more detailed documentation of features &rarr;</a></li>
                <li><a href = '/docs/design'><strong>Operator design</strong>: a set of design and interface notes &rarr;</a></li>
                <!-- <li><a href = '/docs/design' style="pointer-events:none; opacity: 0.5"><strong>Sonification notes</strong>: details of approaches and lessons (coming soon) &rarr;</a></li> -->
            </ul>
        </section>

        <section>
            <h2>Who is this thing for?</h2>

            <p>The <i>Data Operator</i> project is an experiment in delightful (rather than insightful) data design. It is more <i>toy</i> than <i>tool</i>. It is more playful than functional. It explores the area of <i>data sonification</i> and stretches into the areas of sound design, interaction design, and electronic musical instrument design. It is presented as a web application that can be used on mobile phones, tablets and computers<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">The <i>Data Operator</i> project uses native web technologies for getting, and then turning data, into the sounds you hear. Nothing is pre-recorded. Everything is synthesized and played in real time, on your device</span>. This approach invites interaction and provide real-time audio-visual feedback. The Data Operator is a data tool designed for <i>thought and expression</i>.</p> 

            <p>So you won't find deep or sophisticated data analytics in these instruments<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">A set of analysis tools, paired with visuals, are on the <i>Data Operator</i> roadmap.</span>. And you're unlikely to discover some earth-shattering insight from just listening to these data sonifications<label for="sn-007" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-007" class="margin-toggle"/><span class="sidenote">The <i>Data Operator</i> project is part of a broader endeavour to integrate interactive data sonification with interactive data visual and storytelling tools; in a dynamic medium. The Data Operator is however, much more focused on exploring the interactive sonification component.</span>. There are lots of very established, and very traditional 'data tools' made for analytics and 'intelligence'. If that's what you're after the (waves Jedi-like hand) <i>this is not the instrument you are looking for.</i>
            </p>
        </section>

        <section>
            <h2>Just a toy?</h2>

            <p>Right now, probably...</p> 

            <p>But here's an allegory and line of thought: Data design and 'storytelling' has long been focused on visuals<label for="sn-008" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-008" class="margin-toggle"/><span class="sidenote">We'll skip over the value of data visualisation for brevity. Our broader  concern is how we might better use data and <i>data models</i> to represent and understand real world systems, but at its core, its about understanding 'data'.</span>. At some point, data interactivity became (a bit more) widely adopted, and (some) data design pieces became more dynamic and explorable<label for="sn-009" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-009" class="margin-toggle"/><span class="sidenote">See Bret Victor's early work on <a href = 'https://worrydream.com/MediaForThinkingTheUnthinkable/' target = '_blank'>Media for Thinking the Unthinkable</a> for a thorough and considered approach to interactive information design.</span>. Mostly with the aid of new technologies and tools - data <i>representations</i> also got more beautiful, abstract and expressive<label for="sn-010" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-010" class="margin-toggle"/><span class="sidenote">For examples, see <a href = 'https://jjh.org/' target = '_blank'>Jonathan Harris'</a> <a href = 'https://jjh.org/artworks/data' target = "_blank">early works with data</a> and the brilliant work of the likes of  <a href = 'https://www.visualcinnamon.com/' target = '_blank'>Nadieh Bremer</a>  and <a href = 'https://truth-and-beauty.net/' target = "_blank">Moritz Stefaner</a>.</span>. Perhaps this is where practitioners veered into data art, or even a <i>data experiences</i>. Nevertheless, many of these imaginative data representations come without audio. In most cases, this is appropriate and understandable<label for="sn-011" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-011" class="margin-toggle"/><span class="sidenote">To be clear, we're definitely not talking about about 'business intelligence' data visuals here. But even so, many data graphics are designed to be static, or for print &mdash; mediums that don't support sound. Outside of well resourced data journalism pieces, multimedia data design is often reduced to static media (e.g. as an image) and put back into an interactive, multimedia medium like a webpage. That's not to say that the use-case for audio are not a 'niche' in comparison to visuals, but we can do better.</span>. But for interactive data pieces with high production value &mdash; works designed for public consumption and engagement &mdash; they can feel a bit...incomplete. If you've ever watched film without its musical score and sound effects removed; or played a video game with the sound off, you'll know the feeling.</p>

            <p>So our stating point, at least from an 'understanding data' perspective, is that adding sound can elevate an interactive data representation. And that adding interactive and contextually relevant sound heightens the experience further by providing (additional) feedback and/or a rich avenue for conveying emotions<label for="sn-011" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-011" class="margin-toggle"/><span class="sidenote">Without being flippant, the research and practice of using sound along, and sound with visuals is too voluminous to summarise and list in this side note.</span>.</p> 

            <p>Perhaps a more interesting train of thought is that a <strong>playable (data) instrument</strong> transforms the user from passive audience to active participant: an explorer of complex modelled system whose behaviours they seek to learn and manipulate, through play<label for="sn-012" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-012" class="margin-toggle"/><span class="sidenote">The work portfolio of <a href = 'https://chaim.io/ ' target ='_blank'>Chaim Gingold</a> and dissertation on <a href = 'https://www.proquest.com/docview/1806122688' target ='_blank'>Play Design</a> are instructive in this regard, as is the research agenda of  <a href = 'https://www.media.mit.edu/groups/lifelong-kindergarten/overview/' target = "_blank">MIT Media Lab's Lifelong Kindergarten</a> group. </span>. So while the <i>Data Operator</i> takes a toy-like approach to it's interface design<label for="sn-013" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-013" class="margin-toggle"/><span class="sidenote">The interface design of the <i>Data Operator</i> is unashamedly inspired by the design and experience of wonderful <a href ='https://teenage.engineering/products/po' target= '_blank'>Teenage Engineering Pocket Operator</a> series.</span>, it has been designed in the spirit of a musical instrument to encourages curious exploration and creative expression<label for="sn-014" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-014" class="margin-toggle"/><span class="sidenote">Think about how musicians and music producers operate (often very) complicated electronic instruments and tools in their creative pursuits. You'll often hear them describe their favourite instruments as 'inspiring and fun' &mdash; much like well designed toy.</span>.</p>

            <p>The playful design of the <i>Data Operator</i> will sit uncomfortably alongside serious data tools<label for="sn-015" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-015" class="margin-toggle"/><span class="sidenote">This is a deliberate design decision to avoid compromise and complications that may arise from the urge to explore and integrate 'sonification analysis' features. This is discussed further in the <a href = '/docs/operator-design'>Operator design</a> documentation.</span>.  But we think there's something unique in the <i>instrument</i> workflow that encourages players:</p>
            <ul>
                <li>to <i>really</i> to want to learn, understand and connect with the complex systems they are operating in;</li>
                <li>to be inspired to think freely and creatively; and</li>
                <li>to use that instrument to transform their ideas into something magical to share with the world.</li>
            </ul>

            <p>And finally, if we replace our trivial use of datasets with dynamic data models and sophisticated simulations &mdash; representations of complex, urgent problems &mdash; we reach an intriguing research agenda: <i>could tools for expression be the key to thinking unthinkable thoughts?</i></p>
        </section>


        <section>
            <h2>What's next?</h2>

            <p>The initial <i>Data Operator</i> project is a technical demo focused on exploring the design of an instrument-inspired and interactive 'data tool'. Coupled with it's sonification-focus, this version of the <i>Data Operator</i> does not address or solve any conventional data analysis or communication needs. Similarly, the instrument interface preferences ergonomics and musical functionality over aesthetics and visual expression.
            </p>

            <p>These are, of course, deliberate <a href = '/docs/design'>design decisions</a> and a starting point for both exploring and integrating interactive sound into data-driven web experiences. Moreover, the <i>Data Operator</i> platform has been designed with extensibility in mind that will allow data sonification to form part of more conventional interactive data tools. The key roadmap items are:
            </p>
            <ul>
                <li>A <strong>Composition</strong> component that supports track and parameter automation to be programmed and/or used interactively. The upshot is that control is provided over the musical composition in 'scenes' that can be synced to more conventional data analysis and storytelling features. 
                </li>

                <li>Alternate <strong>control interface</strong> components (e.g. button interfaces) that would be designed separately<label for="sn-016" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-016" class="margin-toggle"/><span class="sidenote">The design goal here is not "over complicate" the user interface and to retain a focused and consistent user experience. A modular approach to controls and visuals is favoured.</span> for data analysis or data storytelling.
                </li>

                <li>Alternate <strong>display interface</strong> components (e.g. data visuals and/or narrative) that would also be separately tailored to data analysis, data storytelling and data art.
                </li>

                <li><strong>Data model support</strong> that would be focused on controlling data simulation models, rather than static output<label for="sn-017" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-017" class="margin-toggle"/><span class="sidenote"> This is expected to lead to packaging a subset of <i>Data Operator</i> toolset as an interactive audio component for use in a separate (custom) data modelling/storytelling application.</span>.  
                </li>

                <li>Development of <strong>data sound design</strong> library that would provide a wide(r) range of 'preset' instruments, mappable parameters and patterns for use in sonifications. This is expected to include templates for new model 'editions' and act as a knowledge base for effective parameter mapping within the <i>Data Operator</i> platform.
                </li>
            </ul>

            <p>Whether and when these features are worked on is yet to be decided. The initial focus however, is to develop features that might one day support interactive sound in data storytelling experiences<label for="sn-018" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-018" class="margin-toggle"/><span class="sidenote"> This is a personal project that has no funding or support. And yes, these roadmap features are intended to make data sonification a viable part of 'commercial' data products and services; particularly those with a public communication and engagement focus.
            </span>.
            </p>

        </section>

        <!-- <section>
            <h2>Release notes</h2>
            <div class = 'slide-button' data-section = 'release-notes' onclick = {handle.toggleView}>
                {#if view['release-notes']}&#8854; Hide{:else}&#8853; Show{/if}
            </div>

            {#if view['release-notes']}
            <section transition:slide>
                <p>For development documentation purposes, this version:</p>
                    <ul>
                        <li>Touch screen interface to be optimised (especially for phone)</li>
                        <li>Composition component to be explored. Works but not really used. Would be best used in a 'storytelling' like context</li>
                    </ul>
            </section>
            {/if}
        </section> -->
    </div>
</article>


<!-- STYLES-->
<style>
    .subtitle-block{
        font-size:          x-small;
        display:            flex;
        text-transform:     uppercase;
        margin-top:         3.5rem;
        padding:            0.5rem;
    }
    .subtitle-block div{
        padding-right:      0.5rem;
    }

    /* Overrides */
    h1{
        margin-block-start: 0;
    }
    li{
        margin-bottom: 1rem;
    } 
</style>