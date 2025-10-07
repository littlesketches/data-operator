/**
 *  STRUDEL DATA SONIFICATION CLASS
 *  - Set of utilities to assist with using @strudel/web for data visualisation
 *
 */
// Libs and utils
import { initStrudel }          from '@strudel/web';
// import { initHydra }    from '@strudel/hydra';


// Config
import { timingConfig } from "../config/global/timing-config"


// => StrudelSonification
export class StrudelUtility{

    ////////////////
    //// FIELDS ////
    ////////////////

    INTERVAL_MS = 30

    state      = $state()

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app){

        /* ----- SINGLETON PATTERN ---- */
        if (this.constructor.singleton) {
            return this.constructor.singleton   
        }
        this.constructor.singleton = this;      // Singleton reference

        /* ----- BASE CLASS STRUCTURE ---- */

        // Reference to app (optional)
        this.app = app

        // Strudel repl and pattern: defined on async initContext()
        this.repl       = undefined
        this.pattern    = undefined

        // Strudel state (manually updated from timer methods)
        this.state = {
            audioWorkletInit:   false,          // Flag to ensure audioworklets are initialised from startign transport from onscreen button (i.e. user interaction)
            transport:          "stopped",    // "stopped", "playing", "paused"
            time: {
                context:        0,              // audio context time 
                playback:       0,              // "Playhead" timer  (polled)
                playbackStart:  undefined,      // Playback context time on start   
                cycleProgress:  undefined,      // From this.repl.scheduler.now() (polled)
                bar:            0,              // 1m
                beat:           0,              // 4n 
                step:           0,              // 16n
                halfStep:       0,              // 32n
                cycle:          0
            }
        }

        // Animation sync timer methods
        this.timer = this.#initTimer()

    }

    ///////////////////////////
    ////  PRIVATE METHODS  ////
    ///////////////////////////

    #initTimer(){
        return {
            intervalId:     undefined,
            start: () => { 
                // Exit if interval is already running
                if (this.timer.intervalId) return; 
                // i. Reset timer props
                this.state.time.playback = this.state.time.bar = this.state.time.step = this.state.time.cycle = 0
                // ii. Record time when 'start' called
                this.state.playbackStart = this.repl.scheduler.getTime()
                // iii. Start (and store) timer (interval function)
                this.timer.intervalId    = this.timer.loop()
            },  
            loop: () => {
                return setInterval(() => {
                    // i. Get current time and cycleProgress
                    this.state.time.context       = this.repl.scheduler.getTime()         // Get context time 
                    this.state.time.cycleProgress = this.repl.scheduler.now()
                    // ii. Update step and cycle count 
                    this.state.time.bar     = Math.floor(this.state.time.cycleProgress) 
                    this.state.time.cycle   = this.state.time.bar + 1
                    this.state.time.step    = Math.floor((this.state.time.cycleProgress % 1) / ( 1 / timingConfig.steps.perBar) )
                    this.state.time.halfStep    = Math.floor((this.state.time.cycleProgress % 1) / ( 1 / timingConfig.steps.perBar / 2) )
                    this.state.time.beat    = Math.floor(this.state.time.step / timingConfig.steps.perBeat)
                    // iii. Update playback time
                    this.state.time.playback      = this.state.time.context - this.state.playbackStart
                }, this.INTERVAL_MS)
            },
            stop: () => {
                // Clear interval
                clearInterval(this.timer.intervalId);
                this.timer.intervalId = null;
            }, 
            pause: () => {
                // Clear interval
                clearInterval(this.timer.intervalId);
                this.timer.intervalId = null;
            }, 
            resume: () => {
                this.timer.intervalId = this.timer.loop()
            }
        }
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    async initREPL(){
        // Call initStrudel: required to return repl instance for playback
        const init = initStrudel({
            prebake: async () => {
                // Hydra (optional): note that that H pattern does not seem to work with @hydra v1.2.2
                // this.hydra = await initHydra()

                // Load samples: copied/adapted from https://codeberg.org/uzu/strudel/src/branch/main/packages/repl/prebake.mjs
                const ds = 'https://raw.githubusercontent.com/felixroos/dough-samples/main/';       //https://github.com/felixroos/dough-samples
                const ts = 'https://raw.githubusercontent.com/todepond/samples/main/';

                const smpl = await Promise.all([
                    registerSynthSounds(),
                    registerZZFXSounds(),
                    await import('@strudel/soundfonts').then(({ registerSoundfonts }) => { registerSoundfonts() }),
                    samples(`${ds}/tidal-drum-machines.json`),
                    samples(`${ds}/piano.json`),
                    samples(`${ds}/Dirt-Samples.json`),
                    samples(`${ds}/EmuSP12.json`),
                    samples(`${ds}/vcsl.json`),
                    samples(`${ds}/mridangam.json`),
                ]);

                aliasBank(`${ts}/tidal-drum-machines-alias.json`);

            }
        })

        this.repl = await init
    };
}