/**
 *  LIBRARY FOR PERCUSSION CONFIG PATTERNS
 */
export const percConfig = {
    // A. On the beat:
    hats_closed_8:  {
        label:   'Close hats 8n',
        pattern: '<hh - hh -  hh - hh -  hh - hh -  hh - hh - >*16',
        vis: [
            ['hh'], ['-'], ['hh'], ['-'],
            ['hh'], ['-'], ['hh'], ['-'],
            ['hh'], ['-'], ['hh'], ['-'],
            ['hh'], ['-'], ['hh'], ['-'],
        ]
    },
    hats_closed_16:  {
        label:   'Close hats 16n',
        pattern: 'hh*16',
        vis: [
            ['hh'], ['hh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['hh'], ['hh'],
        ]
    },

    hats_open_7_3_11_15:  {
        label:   'Open hats 7-3-11-15',
        pattern: '<- - oh -  - - oh -  - - oh -  - - oh - >*16',
        vis: [
            ['-'], ['-'], ['oh'], ['-'],
            ['-'], ['-'], ['oh'], ['-'],
            ['-'], ['-'], ['oh'], ['-'],
            ['-'], ['-'], ['oh'], ['-'],
        ]
    },
    unknown_drummer:  {
        label:   'Unknown drummer',
        pattern: '<- hh hh -  hh hh - hh  oh - -  -  - hh oh - >*16',
        vis: [
            ['-'],  ['hh'], ['hh'], ['-'],
            ['hh'], ['hh'], ['-'],  ['hh'],
            ['oh'], ['-'],  ['-'],  ['-'],
            ['-'],  ['hh'], ['oh'], ['-'],
        ]
    },
    siberian_nights:  {
        label:   'Siberian nights',
        pattern: '<hh - hh hh  hh - hh hh  hh - hh hh  hh - hh hh >*16',
        vis: [
            ['hh'], ['-'], ['hh'], ['hh'],
            ['hh'], ['-'], ['hh'], ['hh'],
            ['hh'], ['-'], ['hh'], ['hh'],
            ['hh'], ['-'], ['hh'], ['hh'],
        ]
    },
    brit_house:  {
        label:   'Brit house',
        pattern: '<hh hh oh hh  hh hh oh hh  hh hh oh hh  hh hh oh hh >*16',
        vis: [
            ['hh'], ['hh'], ['oh'], ['hh'],
            ['hh'], ['hh'], ['oh'], ['hh'],
            ['hh'], ['hh'], ['oh'], ['hh'],
            ['hh'], ['hh'], ['oh'], ['hh'],
        ]
    },
    deeper_house:  {
        label:   'Deeper house',
        pattern: '<- cp [oh,mt] -  cp - oh mt  - cp oh oh  - - oh - >*16',
        vis: [
            ['-'],  ['cp'], ['oh', 'mt'], ['-'],
            ['cp'], ['-'],  ['oh'],       ['mt'],
            ['-'],  ['cp'], ['oh'],       ['oh'],
            ['-'],  ['-'],  ['oh'],       ['-'],
        ]
    },
    slow_deep_house:  {
        label:   'Slow deep house',
        pattern: '<hh - oh oh  [hh,cp] - oh oh  hh - oh oh  [hh,cp] - oh - >*16',
        vis: [
            ['hh'],         ['-'], ['oh'], ['oh'],
            ['hh', 'cp'],   ['-'], ['oh'], ['oh'],
            ['hh'],         ['-'], ['oh'], ['oh'],
            ['hh','cp'],    ['-'], ['oh'], ['-'],
        ]
    },

    hip_hop_8:  {
        label:   'Hip hop 8',
        pattern: '<hh hh - hh   hh oh hh hh   hh hh - hh  hh oh hh hh >*16',
        vis: [
            ['hh'], ['hh'], ['-'],  ['hh'],
            ['hh'], ['oh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['-'],  ['hh'],
            ['hh'], ['oh'], ['hh'], ['hh'],
        ]
    },

    groove_b:  {
        label:   'Groove B',
        pattern: '<hh hh - hh   hh oh hh hh   hh hh - hh  hh oh hh hh >*16',
        vis: [
            ['hh'], ['hh'], ['-'],  ['hh'],
            ['hh'], ['oh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['-'],  ['hh'],
            ['hh'], ['oh'], ['hh'], ['hh'],
        ]
    },
    impeach:  {
        label:   'Impeach the Pres.',
        pattern: '<hh - hh -  hh o- hh hh  hh - oh -  hh - hh - >*16',
        vis: [
            ['hh'], ['-'],  ['hh'],  ['-'],
            ['hh'], ['-'],  ['hh'],  ['hh'],
            ['hh'], ['-'],  ['oh'],  ['-'],
            ['hh'], ['-'],  ['hh'],  ['-'],
        ]
    },
    superstition:  {
        label:   'Superstition hats',
        pattern: '<hh - hh -  hh - hh hh  hh hh hh -   hh - hh hh >*16',
        vis: [
            ['hh'], ['-'],  ['hh'], ['-'],
            ['hh'], ['hh'], ['hh'], ['hh'],
            ['hh'], ['hh'], ['hh'], ['-'],
            ['hh'], ['-'], ['hh'], ['hh'],
        ]
    },
}