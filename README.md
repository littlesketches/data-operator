# STRUDEL SONIFICATION

This is an exploration of using the @strudel.cc live coding audio tool - a JS port of Tidal Cycles - as the basis for data sonification applications (with synchronised visuals and interactivity). Strudel is designed for use in a live coding environment (via its REPL), however it's developers are strong open source advocates and publish code packages that allow the library to run in custom applications. 

To do this, we only need the @strudel/web package, which appears to have a comprehensive and stable feature set.


## Co-opting the Strudel engine?
Strudel's audio performance, in-built sample library, solid VA synth engines, mini notation language and patterning tools; make it an inviting prospect for data sonification. In particular, 'simpler' apps that do not require complicated synthesizer setups and 'performance instruments' are appealing candidate projects. That said, the traditional 'data model' > 'parameter mapping' steps in data sonification remain similar. In effect, idea here is to utilise the 'audio engine wrapper' of Strudel ('superdough'), over say,the ToneJS library, or working directly with the WebAudio API.

This approach does neuter many of Strudel's brilliant live coding and feedback features - data sonification is generally far more static than live coding - however the Strudel REPL does provide a much simpler sound design prototyping environment, which has proven to be be a "creative barrier" in developing with ToneJS (and the Easel scaffolding*).


## Licensing: AGPLv3
Strudel is licensed under AGPLv3. This is a strong copyleft license that requires derivative works to apply the same AGPLv3 license. The main 'restriction' may be that AGPLv3 requires source code to be available: this should be fine with say, a public Github repo.

Ultimately, the idea of the 'strudel sonification' would be for experimental 'private' projects, with any meaningful public works made open-sourced. Open source licensing is not an issue.


## Progress: 1 week
The initial exploration of @strudel/web has been positive. 
- The package has been proved to work with Svelte reactive variables
- The web package is able to (lazy) load sample packs 
- Sound quality is excellent: synth components appear to have wide sweet spots and sample integration is seamless 
- JavaScript string literal templating is sufficient for creating strudel code. This is also useful for copy and paste into REPL workflow for more convenient sound design.
- In built visualisations are working (useful for workflow)
- In built musical scale tools make it convenient to scale data to (musical) scale degrees, and apply scale names/types in strudel code.

Limitations and workarounds
- There is no callback timer in strudel to use for syncing visuals. A manual timer has been built (functional) with synced callbacks potentially mimicked by a svelte $effect rune and reactive variables/method calls (to be explored).
- Compositions
- The package must only be initiated on the client side, as it binds evaluation methods to the 'window'
- Hydra package doesn't fully work (the H pattern is missing?)
- The use of mapped data in the REPL requires a string that is formatted in a strudel format: a data array can't be transformed and used inside the REPL.
- Less control over effects and synth params, and less available control parameters. This however, doesn't seem to be an issue for most compositions

# DATA  Sonification 



## DS-303 | Acid Trax

TB-303 inspired data sonification, potentially with some call backs to Phuture's Acid Trax.

The main synth is TB-303 like a sawtooth oscillator with the Strudel/TidalCycles 24db resonant filter that has a 303-esque "squelch". The composition revolves around a repeating bassline (suited to 'time series' data) with rudimentary percussion (e.g. a four on the floor). 

### 303 Synth
- Data points > musical scale > note frequency (melody). 
    - 16 (steps) is the ideal number of data points, over 4 beats
    - 12 notes per bar work  bd*3,     
    - Maybe try euclidean if there are 'gaps'
    => "trend in the average"
- Chord progression
    - Able to transpose the scale with the same note melody. 
    - Might be useful if there's some other change in data, maybe over a longer timeframe
    - Might suit long term trend or change

- Timbre
    - amplitude envelope
        - release: makes it ring out
    - filter cutoff: this is a major one. Suitable for 'cyclical' data like sunlight
    - 

### Drum machine percussion
We're able to use drum machine samples that make it possible to use 'iconic' patterns. 
- The common 'four on the floor' with/without back beat is the most obvious for timing
-   



### Sample texture



# Data sonification with the @strudel/web audio engine 

Sonification apps made with the @strudel/web package in the Sveltekit framework comprise of an overarching 'app' instance, and 


## Strudel (sonification) utility documentation
The primary functions of this class are to:
1. Initialise the strudel REPL to provide access to code evaluation and transport control methods.

2. Add basic 'timer' functionality to track and expose bars, beats, steps and cycle count as a reactive variable that can be used to trigger/sync animations.
    - This means that callback timing for trigger events in say, a pattern will need to addded


The strudel sonificaton utility recommended to be assigned to the 'strudel' variable; is used alongside a 'DataSonification' model instance ('sonification')


## DataSonifcation class
The DataSonifcation class houses the 'custom' strudel data sonification logic, including:

1. Data loading and parsing (from async init)
2. Data wrangling/modelling construction
3. Strudel code template and parameter mapping
4. UI Handlers for data update (e.g. selections) and transport 
    - These handlers could be spread to the strudel utility, however may be expected to call/trigger other models (e.g. visuals in Threlte/D3/HTML)

There are multiple concerns here that might later be split into sub-classes (including a separate 'dataModel'  for 1# and #2; and the handlers which may be 'generic'). For now (in development) however all functionality here is quite tightly bound, so this will be reviewed and potentially separated later
