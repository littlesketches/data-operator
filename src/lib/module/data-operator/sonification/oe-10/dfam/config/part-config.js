/**
 *   PRESET PERCUSSION PATTERNS: OE-10-DFAM
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
            // A. On the beat:
            0:  beat.four_on_the_floor,
            1:  beat.back_beat,
            2:  beat.electro_1a,
            3:  beat.blank_space,
            4:  beat.hip_hop_3,
            5:  beat.amen_break_1,
            6:  beat.rolling_break_4,
            7:  beat.gahu,
            8:  beat.soukous,          
        }
    },
    2: { // Part 2. Percussion patterns: "metal and misc" layer
        sound: {
            0:  perc.xtal,
            1:  perc.ageiopolis,
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
        sound: {
            0: chord.dfampad,
            1: chord.supersaw,
            2: chord.ambientpad,
            3: chord.vibraphone,
            4: chord.piano,
            5: chord.harp,
            6: chord.wineglass,
            7: chord.pipeorgan,
        }
    }
}