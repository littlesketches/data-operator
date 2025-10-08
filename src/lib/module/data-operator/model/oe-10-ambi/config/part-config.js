/**
 *   PRESET PERCUSSION PATTERNS: OE-10
 *   - Strudel sound (drum kit) patterns with manually defined event arrays use with visuals
 *   - "vis" arrays are in a format matched to the VisPattern chart component = > used for synced charts and visuals
 */


export const groupPartPresets =  {
    1: { // Part 1. Percussion patters: "membrane" layer
        sound: {
            0:  {
                pattern: '<bd:7 - - -  bd:7 - - -  bd:4 - - - bd:7 - - ->*16',
                vis: [
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                ]
            },
            1:  {
                pattern: 'bd [bd,sd] bd [bd,sd]',
                vis: [
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd', 'sd'], ['-'], ['-'], ['-'],
                    ['bd'], ['-'], ['-'], ['-'],
                    ['bd', 'sd'], ['-'], ['-'], ['-'],
                ]
            },
            2:  {
                pattern: '<[bd, ht] - - mt  [bd,sd] lt - -  [bd, mt] ht mt lt  [bd, sd, mt] - lt ->*16',
                vis: [
                    ['bd', 'ht'], ['-'], ['-'], ['mt'],
                    ['bd', 'sd'], ['lt'], ['-'], ['-'],
                    ['bd', 'mt'], ['ht'], ['mt'], ['lt'],
                    ['bd', 'sd', 'mt'], ['-'], ['lt'], ['-'],
                ]
            },
            3: {
                pattern: '<bd bd - -  bd - bd -  - bd - -  bd - - ->*16',
                vis: [
                    ['bd'], ['bd'], ['-'],  ['-'],
                    ['bd'], ['-'],  ['bd'], ['-'],
                    ['-'],  ['bd'], ['-'],  ['-'],
                    ['bd'], ['-'],  ['-'],  ['-'],
                ]
            }        
        }
    },
    2: { // Part 2. Percussion patterns: "metal and misc" layer
        sound: {
            0:  {
                pattern: '<- - - -  - - - -  - - - -  - - - ->*16',
                vis:    [
                    ['-'], ['-'], ['-'], ['-'],
                    ['-'], ['-'], ['-'], ['-'],
                    ['-'], ['-'], ['-'], ['-'],
                    ['-'], ['-'], ['-'], ['-']
                ]  
            },
            1:  {
                pattern: '<- - hh -  - - hh -  - - hh hh  - - hh ->*16',
                vis:    [
                    ['-'], ['-'], ['hh'], ['-'],
                    ['-'], ['-'], ['hh'], ['-'],
                    ['-'], ['-'], ['hh'], ['hh'],
                    ['-'], ['-'], ['hh'], ['-']
                ]  
            },
            2:  {
                pattern: '<rim rim oh -  - - oh -  - - oh -  - - oh ->*16',
                vis:    [
                    ['rim'], ['rim'], ['oh'], ['-'],
                    ['-'], ['-'], ['oh'], ['-'],
                    ['-'], ['-'], ['oh'], ['-'],
                    ['-'], ['-'], ['oh'], ['-']
                ]  
            },
            3:  {
                pattern: '<rim rim oh -   - - [oh, rim] -   - rim [oh,rim] rim  - rim oh ->*16',
                vis:    [
                    ['rim'], ['rim'], ['oh'], ['-'],
                    ['-'],  ['-'],  ['oh', 'rim'], ['-'],
                    ['-'],  ['rim'], ['oh', 'rim'], ['rim'],
                    ['-'], ['rim'],  ['oh'], ['-']
                ]  
            },
            4:  {
                pattern: '<rim rim oh -   cp - [oh, rim] -   - rim [oh,rim] rim  cp rim oh ->*16',
                vis:    [
                    ['rim'], ['rim'],   ['oh'],         ['-'],
                    ['cp'],  ['-'],     ['oh', 'rim'],  ['-'],
                    ['-'],   ['rim'],   ['oh', 'rim'],  ['rim'],
                    ['cp'],  ['rim'],   ['oh'],          ['-']
                ]  
            },
            5:  {
                pattern: '<[rim, rd, cr] rim [oh, rd]  -   rd - [oh, rim, rd] -   rd rim [oh,rim, rd] rim  rd rim [oh, rd] ->*16',
                vis:    [
                    ['rim', 'rd', 'cr'], ['rim'],   ['oh', 'rd'],        ['-'],
                    ['rd'],              ['-'],     ['oh', 'rim', 'rd'], ['-'],
                    ['rd'],              ['rim'],   ['oh', 'rim', 'rd'], ['rim'],
                    ['rd'],              ['rim'],   ['oh', 'rd'],        ['-']
                ]  
            },
            6:  {
                pattern: '<hh - - -   hh - - -  hh - - -  hh - - ->*16',
                vis:    [
                    ['hh'], ['-'], ['-'], ['-'],
                    ['hh'], ['-'], ['-'], ['-'],
                    ['hh'], ['-'], ['-'], ['-'],
                    ['hh'], ['-'], ['-'], ['-']
                ]  
            },
            7:  {
                pattern: '<hh - oh -   hh - oh -  hh - oh -  hh - oh ->*16',
                vis:    [
                    ['hh'], ['-'], ['oh'], ['-'],
                    ['hh'], ['-'], ['oh'], ['-'],
                    ['hh'], ['-'], ['oh'], ['-'],
                    ['hh'], ['-'], ['oh'], ['-']
                ]  
            },
            8:  {
                pattern: '<hh - oh -   [cp, hh] - oh -  hh - oh -  [cp, hh] - oh ->*16',
                vis:    [
                    ['hh'], ['-'], ['oh'], ['-'],
                    ['cp', 'hh'], ['-'], ['oh'], ['-'],
                    ['hh'], ['-'], ['oh'], ['-'],
                    ['cp', 'hh'], ['-'], ['oh'], ['-']
                ]  
            },
            9:  {
                pattern: '<hh rim oh rim   [cp, hh] - oh -  hh - oh -  [cp, hh] rim oh ->*16',
                vis:    [
                    ['hh'],       ['rim'], ['oh'], ['-'],
                    ['cp', 'hh'], ['rim'], ['oh'], ['-'],
                    ['hh'],       ['-'],   ['oh'], ['-'],
                    ['cp', 'hh'], ['rim'], ['oh'], ['-']
                ]  
            }     
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
                name:       'supersaw',
                gain:       0.6,
                modifier:   '.lpf(2500).lpq(8).lpenv(3).adsr("0.5:0.1:0.8:1").clip(0.85)'
            },
            1: {
                label:      'Vibraphone',
                name:       'vibraphone',
                gain:       0.65,
            },
            2: {
                label:      'Piano',
                name:       'piano',
                gain:       3,
            },
            3: {
                label:      'Harp',
                name:       'folkharp',
                gain:       2,
            },
            4: {
                label:      'Wine glass',
                name:       'wineglass',
                gain:       2,
            },
            5: {
                label:      'Pipe organ',
                name:       'pipeorgan_loud_pedal',
                gain:       0.6,
            }
        }
    }
}