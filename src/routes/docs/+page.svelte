<!-- DOCUMENTATION HOME: ABOUT DATA OPERATOR -->
<script>
    import { slide } from "svelte/transition";

    const view = {
        'release-notes': false
    }

    const handle = {
        toggleView: function(){
            const sectionId = this.getAttribute('data-section')
            view[sectionId] = !view[sectionId]
            console.log(view )
        }
    }
</script>


<!-- HTML MARKUP-->
<article>
    <div class = 'content-wrapper'>
        <h1>Hello Data Operator</h1>

        <section>
            <h2>What is it?</h2>
                    
            <p>A Data Operator is a <i>data instrument</i> that produces musical sounds from data!<label for="sn-001" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-001" class="margin-toggle"/><span class="sidenote">You could call this is an interactive 'data sonification'... with an novel interface and musically orientated features.</span> Like a musical instrument, the Data Operator wants to be played with. And anyone can play! You can start by mashing buttons to experience how the Data Operator reacts. Or be curious and learn how the instrument works by exploring the data and adding musical spices to the sounds it produces. 
            </p>
            <p>Play the Data Operator the way <i>you</i> want to. Lose yourself in the beats and make your heart smile.
            </p>
        </section>

        <section>
            <h2>Guides + documentation</h2>

            <p>The <i>Data Operator</i> is more correctly be described as a <i>platform</i> for a series of <i>data instruments</i>. Each Data Operator <i>model</i> is based around specific dataset that is mapped<label for="sn-002" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-002" class="margin-toggle"/><span class="sidenote">This is a sonification technique commonly known as as parameter mapping.</span> to the underlying virtual instruments and sounds that are played on a Data Operator<label for="sn-003" class="margin-toggle sidenote-number"><input type="checkbox" id="sn-003" class="margin-toggle"/></label><span class="sidenote">We hope to use the Data Operator platform to make lots models and <i>versions</i> to play with: each with a short, somewhat cryptic model name. These versions use different instrument designs and (potentially) controls to produce different musical/sonification styles that may be matched to context/topic of the data.</span>. For the most part though, the controls and features of the Data Operators are standardised. This helps you transfer what you've learned about playing a Data Operator, from one model to another (much like a musical instrument!<label for="sn-003" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-003" class="margin-toggle"/><span class="sidenote">The interface design of the Data Operator is heavily inspired by the wonderful <a href ='https://teenage.engineering/products/po' target= '_blank'>Teenage Engineering Pocket Operator</a> series</span>) </p>

            <ul>
                <li><a href = '/docs/quick-start'>Quick start guide &rarr;</a></li>
                <li><a href = '/docs/user-manual'>User manual &rarr;</a></li>
                <li><a href = '/docs/design'>Design notes &rarr;</a></li>
                <li><a href = '/docs/design'>Sonification approach &rarr;</a>
                    <!-- <ul>
                        <li>OE-10</li>
                        <li>OE-DFAM</li>
                    </ul> -->
                </li>
            </ul>
        </section>

        <section>
            <h2>Who is this thing for?</h2>

            <p>The Data Operator project is an experiment in delightful (rather than insightful) data design. It is more <i>toy</i> than <i>tool</i>. It is more playful than functional. It primarily explores the area of <i>data sonification</i> and stretches into the areas of sound design, interaction design, and a bit of musical instrument design. It is presented as a web application that can be used on phones, tablets and computers<label for="sn-004" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-004" class="margin-toggle"/><span class="sidenote">This project uses native web technologies for getting, and then turning data, into the sounds you hear. Nothing is pre-recorded. Everything is synthesized and played in real time, on your device</span>. This approach invites interaction and provide real-time audio-visual feedback. The Data Operator is a data tool designed for <i>thought and expression</i>.</p> 

            <p>So you won't really find deep or sophisticated data analytics in these instruments, although a set of analysis tools, paired with visuals, are on the roadmap. And you're unlikely to discover some world-changing insight from listening to these data sonifications alone<label for="sn-005" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-005" class="margin-toggle"/><span class="sidenote">The medium-term goal here is to use sonification alongside interactive visual and storytelling tools in a dynamic, cohesive interactive medium: the Data Operator project focuses on exploring interactive sonfication.</span>. There are lots of very established, and very traditional 'data tools' made for analytics and 'intelligence'. If that's what you're after the (waves Jedi-like hand) <i>this is not the instrument you are looking for.</i>
            </p>
        </section>

        <section>
            <h2>Just a toy?</h2>

            <p>Right now, probably. But here's an allegory and line of thought: Data design and 'storytelling' has long been focused on visuals<label for="sn-006" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-006" class="margin-toggle"/><span class="sidenote">We'll skip over the value of data visualisation for brevity. The bigger picture concern is how we might better use data models to represent and understand real world systems, but at its core, its about understanding 'data'.</span>. At some point, data interactivity became (a bit more) widely adopted, and (some) data design pieces became more dynamic and explorable. Mostly with the aid of new technologies and tools - data <i>representations</i> also got more beautiful, abstract and expressive<label for="sn-007" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-007" class="margin-toggle"/><span class="sidenote">Cite Nadieh Bremer, Moritz Stefaner and Jonathan Harris as examples.</span>. Perhaps this is where practitioners veered into data art, or even a <i>data experiences</i>. Yet many of these fantastical data representations come without audio. In most cases this is appropriate and understandable<label for="sn-008" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-008" class="margin-toggle"/><span class="sidenote">To be clear, we're definitely not talking about about 'business intelligence' data visuals here. Moreover, a lot of data graphics are designed to be static, or for print, i.e. mediums that don't support sound. More often than not, they get transferred as static media (e.g. as an image) into a interactive, multimedia medium like a webpage. That's not to say that the use-cases for audio are not a 'niche', but this seems like a waste.</span>. But for interactive pieces with high production value, the can feel a bit...incomplete. If you've ever watched film without its epic musical score and soundtrack; or played a video game with the sound off, you'll know the feeling.</p>

            <p>So our stating point, at least from an 'understanding data' perspective, is that adding sound can elevate an interactive data representation [research tba]. And that adding interactive and contextually relevant sound heightens the experience further by providing (additional) feedback and/or a rich avenue for conveying emotions [research tba].</p> 
        </section>

        <section>
            <h2>Towards a data kindergarten</h2>

            <p>Another more interesting train of thought is that a <i>playable</i> data instrument transforms the user from passive audience to active participant: an explorer of complex modelled system whose behaviours they seek to learn and manipulate, through play<label for="sn-009" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-009" class="margin-toggle"/><span class="sidenote">Cite Chaim Gingold. Janet Murray?</span>. So while the Data Operator takes a toy-like approach to it's interface design, it has been designed in the spirit of a musical instrument to encourages curious exploration and creative expression<label for="sn-009" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-009" class="margin-toggle"/><span class="sidenote">Think about how musicians and music producers operate (often very) complicated electronic instruments and tools in their creative pursuits. You'll often hear them describe their favourite instruments as 'inspiring and fun' &mdash; much like well designed toy. There are also parallels to the <a href = 'https://www.media.mit.edu/groups/lifelong-kindergarten/overview/' target = "_blank">Lifelong Kindergarten</a> research group [TBA].</span>.</p>

            <p>We think there's something unique in the <i>instrument</i> workflow that encourages players:</p>
            <ul>
                <li>to <i>really</i> to want to learn, understand and connect with the complex systems they are operating in;</li>
                <li>to be inspired to think freely and creatively; and</li>
                <li>to use that instrument to transform their ideas into something magical to share with the world.</li>
            </ul>

            <p>And finally, if we replace our trivial use of datasets with dynamic data models and sophisticated simulations &mdash; representations of complex, urgent problems<label for="sn-010" class="margin-toggle sidenote-number"></label><input type="checkbox" id="sn-010" class="margin-toggle"/><span class="sidenote">Cite <a href = 'https://dougengelbart.org/content/view/309/'>Doug Engelbart</a></span> &mdash; we reach an intriguing research agenda: <i>could tools for expression be the key to thinking unthinkable thoughts?</i></p>
        </section>

        <section>
            <h2>Inspiration and acknowledgements</h2>


        </section>

        <section>
            <h2>Release notes</h2>
            <div class = 'slide-button' data-section = 'release-notes' onclick = {handle.toggleView}>
                {#if view['release-notes']}&#8854; Hide{:else}&#8853; Show{/if}
            </div>

            {#if view['release-notes']}
            <section transition:slide>
                <p>For development documentation purposes, this version:</p>
                    <ul>
                        <li>Screen buttons to be updated once keyboard interface is settled (i.e. to match)</li>
                        <li>Touch screen interface to be optimised (especially for phone)</li>
                        <li>Composition component to be explored. Works but not really used. Would be best used in a 'storytelling' like context</li>
                        <li>Add integrated/side-by-side guide for computers</li>
                        <li>Fix on start guidance and start (i.e. button interaction to star,t not keyboard shortcut)</li>
                    </ul>
            </section>
            {/if}
        </section>
    </div>
</article>


<!-- STYLES-->
<style>
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