/**
 * KEY GUIDE FOR "instant-fun" UI
 */
import { punchFX } from "./fx-config"

export const keyguide = {
    select: {
        1: {
            master: 'Select<br>BEATS<br>(C-1)',
            group:  'Select<br>BEATS<br>(C-1)'
        },
        2: {
            master: 'select<br>PERC.<br>(C-2)',
            group:  'select<br>PERC.<br>(C-2)'
        },
        3: {
            master: 'select<br>CHORDS<br>(C-3)',
            group:  'select<br>CHORDS<br>(C-3)'
        },
        4: {
            master: 'select<br>BASS<br>(B)',
            group:  'select<br>BASS<br>(B)'
        },
        5: {
            master: '<br>Scale<br>root<br>-',
            group:  '<br>Scale<br>root<br>-'
        },
        6: {
            master: '<br>Scale<br>root<br>+',
            group:  '<br>Scale<br>root<br>+'
        },
        7: {
            master: 'select<br>LEAD<br>(A)',
            group:  'select<br>LEAD<br>(A)'
        },
        8: {
            master: '<br>Scale<br>type<br>-',
            group:  '<br>Scale<br>type<br>-'
        },
        9: {
            master: '<br>Scale<br>type<br>+',
            group:  '<br>Scale<br>type<br>+'
        },
        0: {
            master: 'Select<br>MIX',
            group:  'Select<br>MIX'
        },
        plus: {
            master: 'Next<br>scene',
            group:  'Next<br>scene'
        },
        minus: {
            master: 'Previous<br>scene',
            group:  'Previous<br>scene'
        },
    },
    modify:{
        1: {
            master: 'mute<br>BEATS',
            group:  'mute<br>BEATS'
        },
        2: {
            master: 'mute<br>PERC.',
            group:  'mute<br>PERC.'
        },
        3: {
            master: 'mute<br>CHORDS',
            group:  'mute<br>CHORDS'
        },
        4: {
            master: 'mute<br>BASS',
            group:  'mute<br>BASS'
        },
        5: {
            master: 'open<br>bass<br>sequencer',
            group:  {
                A: '<span class = "group"><br>Euclidean rotation A<br>-</span>',
                B: '<span class = "group"><br>Euclidean rotation B<br>-</span>',
                C: ' '
            }
        },
        6: {
            master: 'Bass<br>legato<br>notes',
            group:  {
                A: '<span class = "group"><br>Euclidean rotation A<br>+</span>',
                B: '<span class = "group"><br>Euclidean rotation B<br>+</span>',
                C: ' '
            }
        },
        7: {
            master: 'mute<br>LEAD',
            group:  'mute<br>LEAD'
        },
        8: {
            master: 'Open<br>lead<br>sequencer',
            group:  {
                A: '<span class = "group"><br>Euclidean pulse A<br>-</span>',
                B: '<span class = "group"><br>Euclidean pulse B<br>-</span>',
                C: ' '
            }
        },
        9: {
            master: 'Lead<br>legato<br>notes',
            group:  {
                A: '<span class = "group"><br>Euclidean pulse A<br>+</span>',
                B: '<span class = "group"><br>Euclidean pulse B<br>+</span>',
                C: ' '
            }
        },
        0: {
            master: 'Unmute<br>all',
            group:  'Unmute<br>all',
        },
        plus: {     
            master: 'Increase tempo',
            group:  'Increase tempo',
        },
        minus: {
            master: 'Reduce tempo',
            group:  'Reduce tempo',
        },
    },
    shift: {
        1: {
            master: 'Solo<br>BEAS',
            group:  'Solo<br>BEAS'
        },
        2: {
            master: 'Solo<br>PERC.',
            group:  'Solo<br>PERC.'
        },
        3: {
            master: 'Solo<br>CHORDS',
            group:  'Solo<br>CHORDS'
        },
        4: {
            master: 'Solo<br>BASS',
            group:  'Solo<br>BASS'
        },
        5: {
            master: 'Transpose<br>bass<br>down',
            group:  'Transpose<br>bass<br>down',
        },
        6: {
            master: 'Transpose<br>bass<br>up',
            group:  'Transpose<br>bass<br>up',
        },
        7: {
            master: 'Solo<br>LEAD',
            group:  'Solo<br>LEAD'
        },
        8: {
            master: 'Transpose<br>lead<br>down',
            group:  'Transpose<br>lead<br>down',
        },
        9: {
            master: 'Transpose<br>lead<br>up',
            group:  'Transpose<br>lead<br>up',
        },
        0: {
            master: 'Unmute<br>all',
            group:  'Unmute<br>all',
        },
        plus: {
            master:  ' ',
            group:  {
                A:  '<span class = "group">Increase<br>lead<br>swing</span>',
                B:  '<span class = "group">Increase<br>bass<br>swing</span>',
                C:  '<span class = "group">Increase<br>beats<br>swing</span>'
            }
        },
        minus: {
            master:  'Export<br>+<br>share',
            group:  {
                A:  '<span class = "group">Reduce<br>lead<br>swing</span>',
                B:  '<span class = "group">Reduce<br>bass<br>swing</span>',
                C:  '<span class = "group">Reduce<br>beats<br>swing</span>'
            }
        },
    }, 
    fx: {
        1: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 1)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 1)[0].label}`
        },
        2: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 2)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 2)[0].label}`
        },
        3: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 3)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 3)[0].label}`
        },
        4: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 4)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 4)[0].label}`
        },
        5: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 5)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 5)[0].label}`
        },
        6: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 6)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 6)[0].label}`
        },
        7: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 7)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 7)[0].label}`
        },
        8: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 8)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 8)[0].label}`
        },
        9: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 9)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 9)[0].label}`
        },
        0: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 0)[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 0)[0].label}`
        },
        plus: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 'plus')[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 'plus')[0].label}`
        },
        minus: {
            master: `<span class = "group">${Object.values(punchFX).filter(d => d.key === 'minus')[0].label}`,
            group:  `<span class = "group">${Object.values(punchFX).filter(d => d.key === 'minus')[0].label}`
        }
    }
}