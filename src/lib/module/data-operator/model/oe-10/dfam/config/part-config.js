/**
 *   PRESET PERCUSSION PATTERNS: OE-DFAM
 *   - Strudel sound (drum kit) patterns with manually defined event arrays use with visuals
 *   - "vis" arrays are in a format matched to the VisPattern chart component = > used for synced charts and visuals
 */
import { beatConfig as beat } from "../../../_shared/beat-config"
import { percConfig as perc } from "../../../_shared/perc-config"

export const groupPartPresets =  {
    1: {
        sound: {
            0:      {
                pattern: {
                    ducked: 'bd bd bd bd',
                    normal:  '~ ~ ~ ~'
                },
                vis: [
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                ]
            },
            1:  {
                pattern: {
                    ducked: 'bd bd bd bd',
                    normal:  '~ sd ~ sd'
                },
                vis: [
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd', 'sd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd', 'sd'], ['-'], ['-'], ['-'],
                ]
            },
            2: {
                pattern: {
                    ducked: 'bd - [bd bd] -',
                    normal:  '- sd - cp'
                },
                vis: [
                    ['bd'], ['-'], ['-'], ['-'],
                    ['sd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['cp'], ['-'], ['-'], ['-'],
                ]
            },
            3:      {
                pattern: {
                    ducked: '<bd - - -  [bd, -] - - -   bd - - -  - - - - >*16',
                    normal: '<- - cp -  [-, sd] - lt -  - - mt -  sd - ht - >*16',
                },
                
                vis: [
                    ['bd'], ['-'], ['cp'], ['-'],
                    ['bd', 'sd'], ['-'], ['lt'], ['-'],
                    ['bd'], ['-'], ['mt'], ['-'],
                    ['sd'], ['-'], ['ht'], ['-'],
                ]
            }
        }
    },
    2: {
        sound: {
            0:  perc.hats_open_4,
            1:  perc.hats_closed_8,
            2:  perc.hats_closed_16,
            3:  perc.unknown_drummer,
            4:  perc.siberian_nights,
            5:  perc.brit_house,
            6:  perc.deeper_house,
            7:  perc.slow_deep_house,
            8:  perc.groove_b,
        }
    },
    3: { // Part 3: Chords from synth or sampled sounds)
        chord: { 
            0: "[0, 2, 4]",      // I
            1: "[3, 5, 6]",      // IV
            2: "[4, 6, 8]",      // V
            3: "[5, 7, 9]",      // VI
        },
        sound: {
            0: {
                label:      'Vibraphone',
                code:      `.s("vibraphone")`,
                gain:       0.65,
            },
            1: {
                label:      'Supersaw synth',
                gain:       0.6,
                code:      `.s("supersaw").lpf(2500).lpq(8).lpenv(3).adsr("0.5:0.1:0.8:1").clip(0.85)`,
            },
            2: {
                label:      'Piano',
                code:      `.s("piano")`,
                gain:       3,
            },
            3: {
                label:      'Harp',
                code:      `.s("folkharp")`,
                gain:       2,
            },
            4: {
                label:      'Wine glass',
                code:      `.s("wineglass")`,
                gain:       2,
            },
            5: {
                label:      'Pipe organ',
                code:      `.s("pipeorgan_loud_pedal")`,
                gain:       0.6,
            }
        }
    }
}             