/**
 *  LIBRARY FOR BEAT CONFIG PATTERNS
 *  - Mostly (if not all) transcribed from https://shittyrecording.studio/
 *  - Provides options for presets: each with strudel 'pattern' and a 'vis' array that is used in Data Operator sync visualisations
 *  - Sidechained versions TBA
 */
export const beatConfig = {
    // A. 4/4 on-the-beats:
    four_on_the_floor:  {
        label:   'Four on the floor',
        pattern: {
            combined:   '<bd - - -  bd - - -  bd - - -  bd - - - >*16',
            ducked:     '<bd - - -  bd - - -  bd - - -  bd - - - >*16',
            normal:     '<-  - - -  -  - - -  -  - - -  -  - - - >*16',
        },
        vis: [
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
            ['bd'], ['-'], ['-'], ['-'],
        ]
    },
    back_beat:  {
        label:   '+ back beat',
        pattern: {
            combined:   'bd [bd,sd] bd [bd,sd]',
            ducked:    'bd [bd, sd] bd [bd,sd]',
            normal:    '-  -        -  -',
        },
        vis: [
            ['bd'],         ['-'], ['-'], ['-'],
            ['bd', 'sd'],   ['-'], ['-'], ['-'],
            ['bd'],         ['-'], ['-'], ['-'],
            ['bd', 'sd'],   ['-'], ['-'], ['-'],
        ]
    },
    rock_1: {
        label:   'Rock 1',
        pattern: {
            combined:   '<bd - - -  sd - - bd  bd - bd -  sd - - - >*16',
            ducked:     '<bd - - -  -  - - -   bd - -  -  -  - - - >*16',
            normal:     '<-  - - -  sd - - bd  -  - bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['bd'],
            ['bd'], ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rock_2: {
        label:   'Rock 2',
        pattern: {
            combined:   '<bd - - -  sd - - bd  bd - bd -  sd - sd sd >*16',
            ducked:     '<bd - - -  - - - -    bd - -  -  -  - -  -  >*16',
            normal:     '<- - - -   sd - - bd  -  - bd -  sd - sd sd >*16'
        },
        vis: [
            ['bd'], ['-'], ['-'],  ['-'],
            ['sd'], ['-'], ['-'],  ['bd'],
            ['bd'], ['-'], ['bd'], ['-'],
            ['sd'], ['-'], ['sd'], ['sd']
        ]
    },
    //
    good_to_go: {
        label:   'Good to go',
        pattern: {
            combined:   '<bd - - bd  sd - bd -  - - bd -  sd - - - >*16',
            ducked:     '<bd - - -   -  - bd -  - - bd -  -  - - - >*16',
            normal:     '<-  - - bd  sd - bd -  - - bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['bd'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    blank_space: {
        label:   'Blank space',
        pattern: {
            combined:   '<bd [- bd] sd bd  - - sd -  bd [- bd] [sd -] bd   - bd sd - >*8',
            ducked:     '<bd -      -  -   - - -  -  bd -      -      -    - - - - >*8',
            normal:     '<-  [- bd] sd bd  - - sd -  -  [- bd] [sd -] bd   - bd sd - >*8'
        },
        vis: [
            ['bd'], ['-'],  ['-'],  ['bd'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  [''],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    // B. Break beats
    rolling_break_1: {      // Rolling break 1
        label:   'Breakbeat 1',
        pattern:{
            combined:   '<bd - - -  sd - - -  - - bd -  sd - - - >*16',
            ducked:     '<bd - - -  -  - - -  - - -  -  -  - - - >*16',
            normal:     '<-  - - -  sd - - -  - - bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_2: {      // Rolling break 2
        label:   'Breakbeat 2',
        pattern: {
            combined:   '<bd - - -  sd - - -  - - bd -  sd bd - - >*16',
            ducked:     '<bd - - -  -  - - -  - - -  -  -  -  - - >*16',
            normal:     '<-  - - -  sd - - -  - - bd -  sd bd - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['bd'], ['-'],   ['-']
        ]
    },
    rolling_break_3: {      // Rolling break 3A
        label:   'Breakbeat 3',
        pattern: {
            combined:   '<bd - - -  sd - - -  - - bd -  sd bd - - >*16',
            ducked:     '<bd - - -  -  - - -  - - -  -  -  -  - - >*16',
            normal:     '<-  - - -  sd - - -  - - bd -  sd bd - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_4: {      // Rolling break 4B
        label:   'Breakbeat 4',
        pattern: {
            combined:   '<bd - - -  sd - - bd  - bd bd -  sd - - - >*16',
            ducked:     '<bd - - -  -  - - -   - -  -  -  -  - - - >*16',
            normal:     '<-  - - -  sd - - bd  - bd bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['bd'],
            ['-'],  ['bd'], ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_5: {      // Rolling break 5A
        label:   'Breakbeat 5',
        pattern: {
            combined:   '<bd - bd -  sd - - -  - - bd -  sd - - - >*16',
            ducked:     '<bd - -  -  -  - - -  - - -  -  -  - - - >*16',
            normal:     '<-  - bd -  sd - - -  - - bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['-']
        ]
    },
    rolling_break_6: {      // Break beat 3
        label:   'Breakbeat 6',
        pattern: {
            combined:   '<bd - bd -  sd - bd sd  - sd bd -  sd - - - >*16',
            ducked:     '<bd - -  -  -  - -  -   - -  -  -  -  - - - >*16',
            normal:     '<-  - bd -  sd - bd sd  - sd bd -  sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['bd'], ['-'],
            ['sd'], ['-'],  ['bd'], ['sd'],
            ['-'],  ['sd'], ['bd'], ['-'],
            ['sd'], ['-'],  ['-'],  ['-']
        ]
    },
    irregular_break_1: {   // Irregular break 1A
        label:   'Irregular break 1 ',
        pattern: {
            combined:   '<bd - bd bd  sd - bd sd  - - bd -  sd - - sd >*16',
            ducked:     '<bd - -  -   -  - -  -   - - -  -  -  - - - >*16',
            normal:     '<-  - bd bd  sd - bd sd  - - bd -  sd - - sd >*16'
        },
        vis: [
            ['bd'], ['-'],  ['bd'],  ['bd'],
            ['sd'], ['-'],  ['bd'],  ['sd'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['-'],   ['sd']
        ]
    },
    irregular_break_2: {   // Irregular break 2B
        label:   'Irregular break 2 ',
        pattern: {
            combined:   '<bd - bd -  sd - - bd  - - bd -  sd - - sd >*16',
            ducked:     '<bd - -  -  -  - - -   - - -  -  -  - - -  >*16',
            normal:     '<bd - -  -  -  - - -   - - -  -  -  - - -  >*16'
        },
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
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - - -   sd - - - >*16',
            ducked:     '<bd - - -  -  - -  -   - - - -   -  - - - >*16',
            normal:     '<-  - - -  sd - bd -   - - - -   sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    electro_1a:  {
        label:   'Electro-1A', // Same as _1_7_5_13
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - - -   sd - - - >*16',
            ducked:     '<bd - - -  -  - -  -   - - - -   -  - - - >*16',
            normal:     '<-  - - -  sd - bd -   - - - -   sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    electro_1b:  {
        label:   'Electro-1B',
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - bd -  sd - bd - >*16',
            ducked:     '<bd - - -  -  - -  -   - - - -   -  - -  - >*16',
            normal:     '<-  - - -  sd - bd -   - - bd -  sd - bd - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['bd'],  ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
        ]
    },
    electro_2b:  {
        label:   'Electro-2B',
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - - -   sd bd - - >*16',
            ducked:     '<bd - - -  -  - -  -   - - - -   -  - -  - >*16',
            normal:     '<-  - - -  sd - bd -   - - - -   sd bd - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],   ['-'],
            ['sd'], ['bd'], ['-'],   ['-'],
        ]
    },
    new_wave:  {
        label:   'New wave',
        pattern: {
            combined:   '<bd - - -  sd - bd -   bd bd - -   sd - - - >*16',
            ducked:     '<bd - - -  -  - -  -   -  -  - -   -  - - - >*16',
            normal:     '<-  - - -  sd - bd -   bd bd - -   sd - - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],   ['-'],
            ['sd'], ['-'],  ['bd'],  ['-'],
            ['bd'], ['bd'], ['-'],   ['-'],
            ['sd'], ['-'],  ['-'],   ['-'],
        ]
    },
    dirty_house:  {
        label:   'Dirty house',
        pattern: {
            combined:   '<bd - - -  sd - bd -   bd bd - -   sd - - bd >*16',
            ducked:     '<bd - - -  -  - -  -   bd -  - -   -  - - -  >*16',
            normal:     '<-  - - -  sd - bd -   -  bd - -   sd - - bd >*16',
        },
        vis: [
            ['bd'],         ['-'],  ['bd'],  ['-'],
            ['bd' , 'sd'],  ['-'],  ['bd'],  ['-'],
            ['bd'],         ['-'],  ['bd'],  ['-'],
            ['bd', 'sd'],   ['-'],  ['-'],   ['bd'],
        ]
    },

    planet_rock_a:  {
        label:   'Planet Rock A',
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - bd -  sd bd - - >*16',
            ducked:    '<bd - - -  -  - -  -   - - -  -  -  -  - - >*16',
            normal:    '<- - - -   sd - bd -   - - bd -  sd bd - - >*16'
        },
        vis: [
            ['bd'],  ['-'],   ['-'],  ['-'],
            ['sd'],  ['-'],   ['bd'], ['-'],
            ['-'],   ['-'],   ['bd'], ['-'],
            ['sd'],  ['bd'],  ['-'],  ['-'],
        ]
    },
    planet_rock_b:  {
        label:   'Planet Rock B',
        pattern: {
            combined:   '<bd - - -  sd - bd -   - - bd -  sd bd - - >*16',
            ducked:    '<bd - - -  -  - -  -   - - -  -  -  -  - - >*16',
            normal:    '<-  - - -  sd - bd -   - - bd -  sd bd - - >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],  ['-'],
            ['sd'], ['-'],  ['bd'], ['-'],
            ['bd'], ['bd'], ['-'],  ['-'],
            ['sd'], ['-'],  ['-'],  ['-'],
        ]
    },

    //  Hip hop:
    hip_hop_1: {      // Hip hop 
        label:   'Hip hop 1',
        pattern: {
            combined:   '<bd - bd -  [sd,cp] - bd bd  - - - -  [sd,cp] - bd - >*16',
            ducked:    '<bd - -  -  -       -  - -   - - - -  -       - -  - >*16',
            normal:    '<-  - bd -  [sd,cp] - bd bd  - - - -  [sd,cp] - bd - >*16'
        },
        vis: [
            ['bd'],         ['-'],  ['bd'], ['-'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd'],
            ['bd'],         ['-'],  ['-'],  ['-'],
            ['sd', 'cp'],   ['-'],  ['bd'], ['-']
        ]
    },
    hip_hop_2: {   // Hip hop 1-A
        label:   'Hip hop 2',
        pattern: {
            combined:   '<bd - - -  sd - bd bd  - - - bd  sd - bd - >*16',
            ducked:    '<bd - - -  -  - -  -   - - - -   -  - -  - >*16',
            normal:    '<-  - - -  sd - bd bd  - - - bd  sd - bd - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],   ['-'],
            ['sd'],  ['-'],  ['bd'],  ['bd'],
            ['-'],   ['-'],  ['-'],   ['bd'],
            ['sd'],  ['-'],  ['bd'],  ['-']
        ]
    },
    hip_hop_3: {   //  'Hip hop 2-A',
        label:   'Hip hop 3',
        pattern: {
            combined:   '<bd - - -  sd - bd bd  - - - bd  sd - bd - >*16',
            ducked:     '<-  - - -  -  - -  -   - - -  -  -  -  - - >*16',
            normal:     '<bd - - -  sd - bd bd  - - - bd  sd - bd - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['bd'],
            ['-'],   ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    hip_hop_4: {    //  'Hip hop 3-B',
        label:   'Hip hop 4',
        pattern: {
            combined:   '<bd - bd -  sd - - -  bd bd - bd  sd - - - >*16',
            ducked:     '<bd - -  -  -  - - -  bd - -  -   -  - - - >*16',
            normal:     '<-  - bd -  sd - - -  -  bd - bd  sd - - - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['-'],
            ['bd'],  ['bd'], ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    hip_hop_5: {    //  'Hip hop  4-A'
        label:   'Hip hop 5',
        pattern: {
            combined:   '<bd - - bd  sd - - bd  - bd bd -  sd - - bd >*16',
            ducked:     '<bd - -  -  -  - - -  bd -  -  -   -  - - - >*16',
            normal:     '<-  - - bd  sd - - bd  - bd bd -  sd - - bd >*16'
        },
        vis: [
            ['bd'],         ['-'],  ['-'],  ['bd'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd'],
            ['-'],          ['-'],  ['bd'], ['bd'],
            ['sd', 'cp'],   ['-'],  ['-'],  ['bd']
        ]
    },

    ice: {
        label:   'Ice',
        pattern: {
            combined:        '<bd - - -  sd - bd -  - - bd -  sd - bd - >*16',
            ducked:     '<bd - - -  -  - -  -  - - -  -  -  -  - - >*16',
            normal:     '<-  - - -  sd - bd -  - - bd -  sd - bd - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-'],
            ['-'],   ['-'],  ['bd'], ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    // Amen break
    amen_break_1: {
        label:   'Amen break 1',
        pattern: {
            combined:   '<bd - bd -  sd - - sd  - sd bd bd  sd - - sd >*16',
            ducked:     '<bd - - -  -  - -  -  - - -  -  -  -  - - >*16',
            normal:     '<-  - bd -  sd - - sd  - sd bd bd  sd - - sd >*16',
        },
        vis: [
            ['bd'],  ['-'],  ['bd'],  ['-'],
            ['sd'],  ['-'],  ['-'],   ['sd'],
            ['-'],   ['sd'], ['bd'],  ['bd'],
            ['sd'],  ['-'],  ['-'],   ['sd']
        ]
    },
    amen_break_2: {
        label:   'Amen break 2',
        pattern: {
            combined:   '<bd - bd -  sd - - sd  - sd bd -  sd - - sd >*16',
            ducked:     '<bd - - -  -  - -  -  - - -  -  -  -  - - >*16',
            normal:     '<-  - bd -  sd - - sd  - sd bd -  sd - - sd >*16'
        },
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
        pattern: {
            combined:        '<bd - - -  sd - - bd  bd - - -  sd - bd - >*16',
            ducked:     '<bd - - -  -  - - -   bd - - -  -  - -  - >*16',
            normal:     '<-  - - -  sd - - bd  -  - - -  sd - bd - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    funky_president: {
        label:   'Funky President',
        pattern: {
            combined:        '<bd - - bd  sd - - bd  - sd sd -  sd - - - >*16',
            ducked:     '<bd - - -   -  - - -   - -  -  -  -  - - - >*16',
            normal:     '<-  - - bd  sd - - bd  - sd sd -  sd - - - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    new_day: {
        label:   'Its a new day',
        pattern: {
            combined:   '<bd - bd -  sd - - -  - - bd bd  sd - - bd >*16',
            ducked:     '<bd - -  -  -  - - -  - - -  -   -  - - -  >*16',
            normal:     '<-  - bd -  sd - - -  - - bd bd  sd - - bd >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    big_beat: {
        label:   'The big beat',
        pattern: {
            combined:   '<bd - bd -  sd - - -  - - bd bd  sd - - bd >*16',
            ducked:    '<bd - -  -  -  - - -  - - -  -   -  - - -  >*16',
            normal:    '<-  - bd -  sd - - -  - - bd bd  sd - - bd >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['bd'], ['-']
        ]
    },
    lady_marmalade: {
        label:   'Lady marmalade',
        pattern: {
            combined:   '<bd - bd -  sd - bd -  bd - - -  sd - bd - >*16',
            ducked:     '<bd - -  -  -  - -  -  bd - - -  -  - -  - >*16',
            normal:     '<-  - bd -  sd - bd -  -  - - -  sd - bd - >*16'
        },
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
        pattern: {
            combined:   '<bd - rim rim  bd - rim rim  bd - rim rim  bd - [bd, rim] rim >*16',
            ducked:    '<bd - -   -    bd - -   -    bd - -   -    bd - -         - >*16',
            normal:    '<-  - rim rim  -  - rim rim  -  - rim rim  -  - [bd, rim] rim >*16',
        },
        vis: [
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['rim'],       ['rim'],
            ['bd'],  ['-'],  ['bd','rim'],  ['rim']
        ]
    },
    soukous: {
        label:   'Soukous',
        pattern: {
            combined:   '<[bd, rim] - - rim  bd - rim -  [bd,rim] - - rim   bd - [bd, rim] - >*16',
            ducked:     '<[bd, rim] - - -    bd - -   -  [bd,rim] - - -     bd - -         - >*16',
            normal:     '<-         - - rim  -  - rim -  -        - - rim   -  - [bd, rim] - >*16'
        },
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
        pattern: {
            combined:   '<bd - - bd  sd - - bd  - bd bd -  sd - - bd >*16',
            ducked:     '<bd - - -   -  - - -   - -  -  -  -  - - -  >*16',
            normal:     '<-  - - bd  sd - - bd  - bd bd -  sd - - bd >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd']
        ]
    },
    drum_and_bass_1b: {
        label:   'DnB #1B',
        pattern: {
            combined:   '<bd - - bd  sd - - bd  - bd bd bd  sd - - - >*16',
            ducked:     '<bd - - -   -  - - -   - -  -  -   -  - - - >*16',
            normal:     '<-  - - bd  sd - - bd  - bd bd bd  sd - - - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['bd'], ['bd'],
            ['sd'],  ['-'],  ['-'],  ['-']
        ]
    },
    drum_and_bass_2a: {
        label:   'DnB #2A',
        pattern: {
            combined:   '<bd - - -  sd - - bd  - bd - bd  sd - - bd >*16',
            ducked:    '<bd - - -  -  - - -   - -  - -   -  - - - >*16',
            normal:    '<-  - - -  sd - - bd  - bd - bd  sd - - bd >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['-'],  ['-'],
            ['sd'],  ['-'],  ['-'],  ['bd'],
            ['-'],   ['bd'], ['-'],  ['bd'],
            ['sd'],  ['-'],  ['-'],  ['bd']
        ]
    },
    jungle_a: {
        label:   'Jungle A',
        pattern: {
            combined:   '<bd - bd -  sd - - sd  - sd bd -  - - bd - >*16',
            ducked:    '<bd - -  -  -  - - -   - -  -  -  - - -  - >*16',
            normal:    '<-  - bd -  sd - - sd  - sd bd -  - - bd - >*16'
        },
        vis: [
            ['bd'],  ['-'],  ['bd'],  ['-'],
            ['sd'],  ['-'],  ['-'],   ['sd'],
            ['-'],   ['sd'], ['bd'],  ['-'],
            ['-'],   ['-'],  ['bd'],  ['-']
        ]
    },
    jungle_b: {
        label:   'Jungle B',
        pattern: {
            combined:   '<- [bd, sd] bd -  sd - - sd  - sd bd -   - - sd - >*16',
            ducked:     '<- -        -  -  -  - - -   - -  -  -   - - -  - >*16',
            normal:     '<- [bd, sd] bd -  sd - - sd  - sd bd -   - - sd - >*16'
        },
        vis: [
            ['-'],   ['bd','sd'], ['bd'],  ['-'],
            ['sd'],  ['-'],       ['-'],   ['sd'],
            ['-'],   ['sd'],      ['bd'],  ['-'],
            ['-'],   ['-'],       ['sd'],  ['-']
        ]
    },

    techno: {
        label:   'Techno',
        pattern: {
            combined:   '<bd - - -  [bd, sd] - - -   bd - - -   [bd, sd] - bd - >*16',
            ducked:    '<bd - - -  [bd, sd] - - -   bd - - -   [bd, sd] - - - >*16',
            normal:    '<- - - -   -        - - -   -  - - -   -        - bd - >*16'
        },
        vis: [
            ['bd','sd'],  ['-'] , ['-'],  ['-'],
            ['bd'],       ['-'],  ['-'],  ['-'],
            ['bd','sd'],  ['-'],  ['-'],  ['-'],
            ['bd'],       ['-'],  ['bd'],  ['-']
        ]
    },

    dubstep_a: {
        label:   'Dubstep A',
        pattern: {
            combined:   '<bd - - -  - - - -   sd - bd -   - - bd - >*16',
            ducked:    '<bd - - -  - - - -   -  - -  -   - - -  - >*16',
            normal:    '<-  - - -  - - - -   sd - bd -   - - bd - >*16'
        },
        vis: [
            ['bd'], ['-'] , ['-'],  ['-'],
            ['-'],  ['-'],  ['-'],  ['-'],
            ['sd'], ['-'], ['bd'],  ['-'],
            ['-'],  ['-'],  ['-'],  ['-']
        ]
    },
    dubstep_b: {
        label:   'Dubstep B',
        pattern: {
            combined:   '<bd - - bd  - - bd -   sd - bd -   - - - - >*16',
            ducked:     '<bd - - -   - - -  -   -  - -  -   - - - - >*16',
            normal:     '<-  - - bd  - - bd -   sd - bd -   - - - - >*16'
        },
        vis: [
            ['bd'], ['-'] , ['-'],  ['bd'],
            ['-'],  ['-'],  ['bd'], ['-'],
            ['sd'], ['-'],  ['bd'], ['-'],
            ['-'],  ['-'],  ['-'],  ['-']
        ]
    },
    garage_a: {
        label:   'Garage A',
        pattern: {
            combined:   '<bd rim - -  cp mt - rim   - - bd mt  cp rim - - >*16',
            ducked:     '<bd -   - -  -  -  - -     - - -  -   -  -   - - >*16',
            normal:     '<-  rim - -  cp mt - rim   - - bd mt  cp rim - - >*16'
        },
        vis: [
            ['bd'], ['rim'], ['-'],  ['-'],
            ['cp'], ['mt'],   ['-'],  ['rim'],
            ['-'],  ['-'],   ['bd'], ['mt'],
            ['cp'], ['rim'], ['-'],  ['-']
        ]
    },

    // Groove
    groove_b: {
        label:   'Groove B',
        pattern: {
            combined:   '<bd - - bd   sd - - bd   - ht ht [bd,mt]   sd mt lt lt >*16',
            ducked:     '<bd - - -    -  - - -    - -  -  -         -  -  -  - >*16',
            normal:     '<-  - - bd   sd - - bd   - ht ht [bd,mt]   sd mt lt lt >*16'
        },
        vis: [
            ['bd'], ['-'],  ['-'],  ['bd'],
            ['sd'], ['-'],  ['-'],  ['bd'],
            ['-'],  ['ht'], ['ht'], ['bd', 'mt'],
            ['sd'], ['mt'], ['lt'], ['lt']
        ]
    },

    // Atmos and ambient
    heartbeat:  {
        label:   'Heart',
        pattern: {
            combined:   '<[bd - bd] - - -  - - - -  [bd - bd] - - -  - - - - >*16',
            ducked:     '<[bd - bd] - - -  - - - -  [bd - bd] - - -  - - - - >*16',
            normal:     '<-         - - -  - - - -  -         - - -  - - - - >*16',
        },
        vis: [
            ['bd'], ['-'], ['-'], ['-'],
            ['-'],  ['-'], ['-'], ['-'],
            ['bd'],  ['-'], ['-'], ['-'],
            ['-'],  ['-'], ['-'], ['-'],
        ]
    },

}