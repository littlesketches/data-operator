/**
 *  CHORD MAP TO SCALE DEGREES
 */

/**
 *  LIBRARY FOR "CHORD" SYNTH & SOUND 
 */

export const chordSoundConfig = {
    supersaw: {
        label:      'Supersaw synth',
        gain:       0.75,
        code:      `.s("supersaw").lpf(2500).lpq(8).lpenv(3)`,
        ampEnv:     `0.5:0.1:0.8:1`
    },
    ambientpad: {
        label:      'Ambient saw',
        gain:       0.6,
        code:      `.s("supersaw")
                    .lpf(sine.range(1200,1500).slow(4))
                    .phaser(0.25)
                    .tremolo(0.5)
                    .tremolodepth(sine.range(0.25,0.5).slow(16))
                    .tremolosync(1)
                    .tremoloshape("sine")  
                    .delay(0.25)`,
        ampEnv:     `1.5:0.1:0.8:0.25`
    },
    dfampad: {
        label:      'Pad synth',
        gain:       1,
        code:      `.s("supersaw").lpf(440).lpq(14).lpd(0.5).lpenv(5)`,
        ampEnv:     `1:0:1:0.5`
    },
    // Sounds
    vibraphone: {
        label:      'Vibraphone',
        code:      `.s("vibraphone")`,
        gain:       0.65,
    },
    piano: {
        label:      'Piano',
        code:      `.s("piano")`,
        gain:       3,
    },
    harp: {
        label:      'Harp',
        code:      `.s("folkharp")`,
        gain:       2,
    },
    wineglass: {
        label:      'Wine glass',
        code:      `.s("wineglass")`,
        gain:       2,
    },
    pipeorgan: {
        label:      'Pipe organ',
        code:      `.s("pipeorgan_loud_pedal")`,
        gain:       0.6,
    }
}