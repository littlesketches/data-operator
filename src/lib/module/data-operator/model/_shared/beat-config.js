/**
 *  LIBRARY FOR BEAT CONFIG PATTERNS
 *  - Mostly (if not all) transcribed from https://shittyrecording.studio/
 *  - Provides options for presets: each wiht strudel 'pattern' and a 'vis' array that is used in Data Operator sync visualisations
 *  - Sidechained versions TBA
 */
export const beatConfig = {
    // A. 4/4 on-the-beats:
    four_on_the_floor:  {
        label:   'Four on the floor',
        pattern: '<bd - - -  bd - - -  bd - - -  bd - - - >*16',
        vis: [
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
        ]
    },
    back_beat:  {
        label:   '+ back beat',
        pattern: 'bd [bd,sd] bd [bd,sd]',
        vis: [
            ['bd'],         ['-'], ['-'], ['-'],
            ['bd', 'sd'],   ['-'], ['-'], ['-'],
            ['bd'],         ['-'], ['-'], ['-'],
            ['bd', 'sd'],   ['-'], ['-'], ['-'],
        ]
    },
    rock_1: {
        label:   'Rock 1',
        pattern: '<bd - - -  sd - - bd  bd -  bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['bd'],
            ['bd'], ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rock_2: {
        label:   'Rock 2',
        pattern: '<bd - - -  sd - - bd  bd -  bd -  sd - sd sd >*16',
        vis: [
            ['bd'], ['-'], ['-'],   ['-'],
            ['sd'], ['-'], ['-'],   ['bd'],
            ['bd'], ['-'], ['bd'],  ['-'],
            ['sd'], ['-'], ['sd'],  ['sd']
        ]
    },
    //
    good_to_go: {
        label:   'Good to go',
        pattern: '<bd - - bd  sd - bd -  - - bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['bd'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    // 1-11 + 5-13
    rolling_break_1: {      // Rolling break 1
        label:   'Breakbeat 1',
        pattern: '<bd - - -  sd - - -  - - bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_2: {      // Rolling break 2
        label:   'Breakbeat 2',
        pattern: '<bd - - -  sd - - -  - - bd -  sd bd - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['bd'], ['-'],   ['-']
        ]
    },
    rolling_break_3: {      // Rolling break 3A
        label:   'Breakbeat 3',
        pattern: '<bd - - -  sd - - -  - - bd -  sd bd - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_4: {      // Rolling break 4B
        label:   'Breakbeat 4',
        pattern: '<bd - - -  sd - - bd  - bd bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['bd'],
            ['-'],  ['bd'], ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_5: {      // Rolling break 5A
        label:   'Breakbeat 5',
        pattern: '<bd - bd -  sd - - -  - - bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_6: {      // Break beat 3
        label:   'Breakbeat 6',
        pattern: '<bd - bd -  sd - bd sd  - sd bd -  sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['bd'], ['-'],
            ['sd'], ['-'],  ['bd'], ['sd'],
            ['-'],  ['sd'], ['bd'], ['-'],
            ['sd'], ['-'],  ['-'],  ['-']
        ]
    },
    irregular_break_1: {   // Irregular break 1A
        label:   'Irregular break 1 ',
        pattern: '<bd - bd bd  sd - bd sd  - - bd -  sd - - sd >*16',
        vis: [
            ['bd'], ['-'],  ['bd'],  ['bd'],
            ['sd'], ['-'],  ['bd'],  ['sd'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['sd']
        ]
    },
    irregular_break_2: {   // Irregular break 2B
        label:   'Irregular break 2 ',
        pattern: '<bd - bd -  sd - - bd  - - bd -  sd - - sd >*16',
        vis: [
            ['bd'], ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['bd'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['sd']
        ]
    },

    // B. The 1-7 beat + 5-13 backbeat
    _1_7_5_13:  {
        label:   '1-7-5-13',
        pattern: '<bd - - -  sd - bd -   - - - -   sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    electro_1a:  {
        label:   'Electro-1A', // Same as _1_7_5_13
        pattern: '<bd - - -  sd - bd -   - - - -   sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    electro_1b:  {
        label:   'Electro-1B',
        pattern: '<bd - - -  sd - bd -   - - bd -  sd - bd - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
        ]
    },
    electro_2b:  {
        label:   'Electro-2B',
        pattern: '<bd - - -  sd - bd -   - - - -   sd bd - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['bd'], ['-'],   ['-'],
        ]
    },
    new_wave:  {
        label:   'New wave',
        pattern: '<bd - - -  sd - bd -   bd bd - -   sd - - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['bd'], ['bd'], ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    dirty_house:  {
        label:   'Dirty house',
        pattern: '<bd - - -  sd - bd -   bd bd - -   sd - - bd >*16',
        vis: [
            ['bd'],         ['-'],  ['bd'],  ['-'],
            ['bd' , 'sd'],  ['-'],  ['bd'],  ['-'],
            ['bd'],         ['-'],  ['bd'],  ['-'],
            ['bd', 'sd'],   ['-'],  ['-'],   ['bd'],
        ]
    },

    planet_rock_a:  {
        label:   'Planet Rock A',
        pattern: '<bd - - -   sd - bd -   - - bd -  sd bd - - >*16',
        vis: [
            ['bd'],     ['-'],   ['-'],  ['-'],
            ['sd'],     ['-'],   ['bd'], ['-'],
            ['-'],      ['-'],   ['bd'], ['-'],
            ['sd'],     ['bd'],  ['-'],  ['-'],
        ]
    },

    planet_rock_b:  {
        label:   'Planet Rock B',
        pattern: '<bd - - -   sd - bd -    - bd -  sd bd - - >*16',
        vis: [
            ['bd'], ['-'],  ['-'],  ['-'],
            ['sd'], ['-'],  ['bd'], ['-'],
            ['bd'], ['bd'], ['-'],  ['-'],
            ['sd'], ['-'],  ['-'],  ['-'],
        ]
    },

    //  Hip hop: no kick on the 9
    hip_hop_1: {      // Hip hop 
        label:   'Hip hop 1',
        pattern: '<bd - bd -  [sd,cp] - bd bd  - - - -  [sd,cp] - bd - >*16',
        vis: [
            ['bd'],         ['-'],  ['bd'], ['-'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd'],
            ['bd'],         ['-'],  ['-'],  ['-'],
            ['sd', 'cp'],   ['-'],  ['bd'], ['-']
        ]
    },
    hip_hop_2: {   // Hip hop 1-A
        label:   'Hip hop 2',
        pattern: '<bd - - -  sd - bd bd  - - - bd  sd - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],   ['-'],
            ['sd'],  ['-'],  ['bd'],  ['bd'],
            ['-'],   ['-'],  ['-'],   ['bd'],
            ['sd'],  ['-'],  ['bd'],  ['-']
        ]
    },

    hip_hop_3: {   //  'Hip hop 2-A',
        label:   'Hip hop 3',
        pattern: '<bd - - -  sd - bd bd  - - - bd  sd - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['bd'],
            ['-'],   ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },

    hip_hop_4: {    //  'Hip hop 3-B',
        label:   'Hip hop 4',
        pattern: '<bd - bd -  sd - - -  bd bd - bd  sd - - - >*16',
        vis: [
            ['bd'],  ['-'],  ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['-'],
            ['bd'],  ['bd'], ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    hip_hop_5: {    //  'Hip hop  4-A'
        label:   'Hip hop 5',
        pattern: '<bd - - bd  sd - - bd  - bd bd -  sd - - bd >*16',
        vis: [
            ['bd'],         ['-'],  ['-'],  ['bd'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd'],
            ['-'],          ['-'],  ['bd'], ['bd'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd']
        ]
    },

    ice: {
        label:   'Ice',
        pattern: '<bd - - -  sd - bd -  - - bd -  sd - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-'],
            ['-'],   ['-'],  ['bd'], ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    amen_break_1: {
        label:   'Amen break 1',
        pattern: '<bd - bd -  sd - - sd  - sd bd bd  sd - - sd >*16',
        vis: [
            ['bd'],  ['-'],  ['bd'],  ['-'],
            ['sd'],  ['-'],  ['-'],   ['sd'],
            ['-'],   ['sd'], ['bd'],  ['bd'],
            ['sd'],  ['-'],  ['-'],   ['sd']
        ]
    },
    amen_break_2: {
        label:   'Amen break 2',
        pattern: '<bd - bd -  sd - - sd  - sd bd -  sd - - sd >*16',
        vis: [
            ['bd'],  ['-'],  ['bd'],  ['-'],
            ['sd'],  ['-'],   ['-'],   ['sd'],
            ['-'],   ['sd'],  ['bd'],  ['-'],
            ['sd'],  ['-'],   ['-'],   ['sd']
        ]
    },
    // Funk and Soul
    impeach: {
        label:   'Impeach the Pres.',
        pattern: '<bd - - -  sd - - bd  bd - - -  sd - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    funky_president: {
        label:   'Funky President',
        pattern: '<bd - - bd  sd - - bd  - sd sd -  sd - - - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    new_day: {
        label:   'Its a new day',
        pattern: '<bd - bd -  sd - - -  - - bd bd  sd - - bd >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    big_beat: {
        label:   'The big beat',
        pattern: '<bd - bd -  sd - - -  - - bd bd  sd - - bd >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    lady_marmalade: {
        label:   'Lady marmalade',
        pattern: '<bd - bd -  sd - bd -  bd - - -  sd - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['bd'], ['-'],
            ['sd'],  ['-'],  ['bd'], ['-'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    // Afro cuban
    gahu: {
        label:   'Gahu',
        pattern: '<bd - rim rim  bd - rim rim  bd - rim rim  bd - [bd, rim] rim >*16',
        vis: [
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['bd','rim'],  ['rim']
        ]
    },
    soukous: {
        label:   'Soukous',
        pattern: '<[bd, rim] - - rim  bd - rim -  [bd,rim] - - rim   bd - [bd, rim] - >*16',
        vis: [
            ['bd', 'rim'],  ['-'],  ['-'],         ['rim'],
            ['bd'],         ['-'],  ['rim'],       ['-'],
            ['bd', 'rim'],  ['-'],  ['-'],         ['rim'],
            ['bd'],         ['-'],  ['bd','rim'],  ['-']
        ]
    },
    // Drum and bass
    drum_and_bass_1a: {
        label:   'DnB #1A',
        pattern: '<bd - - bd  sd - - bd  - bd bd -  sd - - bd >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd']
        ]
    },
    drum_and_bass_1b: {
        label:   'DnB #1B',
        pattern: '<bd - - bd  sd - - bd  - bd bd bd  sd - - - >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['bd'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    drum_and_bass_2a: {
        label:   'DnB #2A',
        pattern: '<bd - - -  sd - - bd  - bd - bd  sd - - bd >*16',
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd']
        ]
    },
    jungle_a: {
        label:   'Jungle A',
        pattern: '<bd - bd -  sd - - sd  - sd bd -  - - bd - >*16',
        vis: [
            ['bd'],  ['-'],  ['bd'],  ['-'],
            ['sd'],  ['-'],  ['-'],   ['sd'],
            ['-'],   ['sd'], ['bd'],  ['-'],
            ['-'],   ['-'],  ['bd'],  ['-']
        ]
    },
    jungle_b: {
        label:   'Jungle B',
        pattern: '<- [bd, sd] bd -  sd - - sd   - sd bd -   - - sd - >*16',
        vis: [
            ['-'],   ['bd','sd'], ['bd'],  ['-'],
            ['sd'],  ['-'],       ['-'],   ['sd'],
            ['-'],   ['sd'],      ['bd'],  ['-'],
            ['-'],   ['-'],       ['sd'],  ['-']
        ]
    },

    techno: {
        label:   'Techno',
        pattern: '<bd - - -  [bd, sd] - - -   bd - - -   [bd, sd] - bd - >*16',
        vis: [
            ['bd','sd'],  ['-'] , ['-'],  ['-'],
            ['bd'],       ['-'],  ['-'],  ['-'],
            ['bd','sd'],  ['-'],  ['-'],  ['-'],
            ['bd'],       ['-'],  ['bd'],  ['-']
        ]
    },

    dubstep_a: {
        label:   'Dubstep A',
        pattern: '<bd - - -  - - - -   sd - bd -   - - b- - >*16',
        vis: [
            ['bd'], ['-'] , ['-'],  ['-'],
            ['-'],  ['-'],  ['-'],  ['-'],
            ['sd'], ['-'], ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],  ['-']
        ]
    },
    dubstep_b: {
        label:   'Dubstep B',
        pattern: '<bd - - bd  - - bd -   sd - bd -   - - - - >*16',
        vis: [
            ['bd'], ['-'] , ['-'],  ['bd'],
            ['-'],  ['-'],  ['bd'], ['-'],
            ['sd'], ['-'],  ['bd'], ['-'],
            ['-'],  ['-'],  ['-'],  ['-']
        ]
    },
    garage_a: {
        label:   'Garage A',
        pattern: '<bd rim - -  cp mt - rim   - - bd mt   cp rim - - >*16',
        vis: [
            ['bd'], ['rim'], ['-'],  ['-'],
            ['cp'], ['mt'],   ['-'],  ['rim'],
            ['-'],  ['-'],   ['bd'], ['mt'],
            ['cp'], ['rim'], ['-'],  ['-']
        ]
    },

    // Toms
    groove_b: {
        label:   'Groove B',
        pattern: '<bd - - bd   sd - - bd   - ht ht [bd,mt]   sd mt lt lt >*16',
        vis: [
            ['bd'], ['-'],  ['-'],  ['bd'],
            ['sd'], ['-'],  ['-'],  ['bd'],
            ['-'],  ['ht'], ['ht'], ['bd', 'mt'],
            ['sd'], ['mt'], ['lt'], ['lt']
        ]
    }
}