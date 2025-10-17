/**
 *   PRESET PERCUSSION PATTERNS: OE-10 AMBI
 *   - Strudel sound (drum kit) patterns with manually defined event arrays use with visuals
 *   - "vis" arrays are in a format matched to the VisPattern chart component = > used for synced charts and visuals
 */
import { beatConfig as beat } from "../../../_shared/beat-config"
import { percConfig as perc } from "../../../_shared/perc-config"

export const groupPartPresets =  {
    1: { // Part 1. Percussion patters: "membrane" layer
        sound: {
            // A. On the beat:
            0:  beat.four_on_the_floor,
            1:  beat.back_beat,
            2:  beat.heartbeat,
            3:  beat.hip_hop_1,
            4:  beat.hip_hop_3,
            5:  beat.amen_break_1,
            6:  beat.groove_b,
            7:  beat.gahu,
            8:  beat.soukous,          
        }
    },
    2: { // Part 2. Percussion patterns: "metal and misc" layer
        sound: {
            0:  perc.silence,
            1:  perc.hats_open_4,
            2:  perc.hats_closed_8,
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
            0: "[0, 2, 4, 7]",      // I
            1: "[3, 5, 6, 9]",      // IV
            2: "[4, 6, 8, 11]",      // V
            3: "[5, 7, 9, 12]",      // VI
        },
        sound: {
            0: {
                label:      'Supersaw synth',
                gain:       0.6,
                code:      `.s("supersaw")
                            .adsr("1.5:0.1:0.8:0.25")
                            .lpf(sine.range(1200,1500).slow(4))
                            .phaser(0.25)
                            .tremolo(0.5)
                            .tremolodepth(sine.range(0.25,0.5).slow(16))
                            .tremolosync(1)
                            .tremoloshape("sine")  
                            .delay(0.25)`,
            },
            1: {
                label:      'Vibraphone',
                code:      `.s("vibraphone")`,
                gain:       0.65,
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