/**
 *   PRESET PERCUSSION PATTERNS: OE-10-OPERATOR
 *   - Strudel sound (drum kit) patterns with manually defined event arrays use with visuals
 *   - "vis" arrays are in a format matched to the VisPattern chart component = > used for synced charts and visuals
 */

// Config
import { beatConfig       as beat }   from "../../../_shared/beat-config"
import { percConfig       as perc }   from "../../../_shared/perc-config"
import { chordSoundConfig as chord }  from "../../../_shared/chord-config"

// Preset selection
export const groupPartPresets =  {
    1: { // Part 1. Percussion patters: "membrane" layer
        sound: {
            0:  beat.hip_hop_1,
            1:  beat.hip_hop_3,
            2:  beat.electro_1a,
            3:  beat.amen_break_1,
            4:  beat.groove_b,
            5:  beat.gahu,
            6:  beat.soukous,   
            7:  beat.four_on_the_floor,
            8:  beat.back_beat,

       
        }
    },
    2: { // Part 2. Percussion patterns: "metal and misc" layer
        sound: {
            0:  perc.slow_deep_house,
            1:  perc.brit_house,
            2:  perc.unknown_drummer,
            3:  perc.siberian_nights,
            4:  perc.deeper_house,
            5:  perc.groove_b,
            6:  perc.hats_open_4,
            7:  perc.hats_closed_8,
            8:  perc.hats_closed_16,

        }
    },
    3: { // Part 3: Chords from synth or sampled sounds)
        sound: {
            0: chord.supersaw,
            1: chord.ambientpad,
            2: chord.dfampad,
            3: chord.vibraphone,
            4: chord.piano,
            5: chord.harp,
            6: chord.wineglass,
            7: chord.pipeorgan,
        }
    }
}