/**
 * KEY GUIDE FOR "instant-fun" UI
 */
import { punchFX } from "./fx-config"

export const keyguide = {
    def:{
        1: {
            master: 'Cycle<br>BEATS<br>(C-1)',
            group:  'Select<br>#1'
        },
        2: {
            master: 'Cycle<br>PERC.<br>(C-2)',
            group:  'Select<br>#2'
        },
        3: {
            master: 'Cycle<br>CHORDS<br>(C-3)',
            group:  'Select<br>#3'
        },
        4: {
            master: 'Cycle<br>BASS (B)<br>back',
            group:  'Select<br>#4'
        },
        5: {
            master: 'Cycle<br>BASS (B)<br>forward',
            group:  'Select<br>#5'
        },
        6: {
            master: '<br>Scale<br>root<br>+',
            group:  'Select<br>#6'
        },
        7: {
            master: 'Cycle<br>LEAD (A)<br>back',
            group:  'Select<br>#7'
        },
        8: {
            master: 'Cycle<br>LEAD (A)<br>forward',
            group:  'Select<br>#8'
        },
        9: {
            master: '<br>Scale<br>type<br>+',
            group:  'Select<br>#9'
        },
        0: {
            master: 'Select<br>MIX',
            group:  'Select<br>MIX'
        },
        plus: {
            master: 'Increase<br>volume',
            group:  '<span class = "group>Increase<br>volume</span>'
        },
        minus: {
            master: 'Reduce<br>volume',
            group:  '<span class = "group>Reduce<br>volume</span>'
        },
    },
    select: {
        1: {
            master: 'Select<br>BEATS<br>(C-1)',
            group:  'Select<br>BEATS<br>(C-1)'
        },
        2: {
            master: 'Select<br>PERC.<br>(C-2)',
            group:  'Select<br>PERC.<br>(C-2)'
        },
        3: {
            master: 'Select<br>CHORDS<br>(C-3)',
            group:  'Select<br>CHORDS<br>(C-3)'
        },
        4: {
            master: 'Select<br>BASS<br>(B)',
            group:  'Select<br>BASS<br>(B)'
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
            master: 'Select<br>LEAD<br>(A)',
            group:  'Select<br>LEAD<br>(A)'
        },
        8: {
            master: 'Scale<br>type<br>-',
            group:  'Scale<br>type<br>-'
        },
        9: {
            master: '<Scale<br>type<br>+',
            group:  '<Scale<br>type<br>+'
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
            master: 'Mute<br>BEATS',
            group:  'Mute<br>BEATS'
        },
        2: {
            master: 'Mute<br>PERC.',
            group:  'Mute<br>PERC.'
        },
        3: {
            master: 'Mute<br>CHORDS',
            group:  'Mute<br>CHORDS'
        },
        4: {
            master: 'Mute<br>BASS',
            group:  'Mute<br>BASS'
        },
        5: {
            master: 'Open<br>bass<br>sequencer',
            group:  {
                A: '<span class = "group">Lead euclidean rotation A<br>-</span>',
                B: '<span class = "group">Bass euclidean rotation B<br>-</span>',
                C: ' '
            }
        },
        6: {
            master: 'Bass<br>legato<br>notes',
            group:  {
                A: '<span class = "group">Lead euclidean rotation A<br>+</span>',
                B: '<span class = "group">Bass euclidean rotation B<br>+</span>',
                C: ' '
            }
        },
        7: {
            master: 'Mute<br>LEAD',
            group:  'Mute<br>LEAD'
        },
        8: {
            master: 'Open<br>lead<br>sequencer',
            group:  {
                A: '<span class = "group">Lead euclidean pulse<br>-</span>',
                B: '<span class = "group">Bass euclidean pulse<br>-</span>',
                C: ' '
            }
        },
        9: {
            master: 'Lead<br>legato<br>notes',
            group:  {
                A: '<span class = "group">Lead euclidean pulse<br>+</span>',
                B: '<span class = "group">Bass euclidean pulse<br>+</span>',
                C: ' '
            }
        },
        0: {
            master: 'Unmute<br>all',
            group:  'Unmute<br>all',
        },
        plus: {     
            master: 'Increase tempo',
            group:  {
                A: '<span class = "group">Lead<br>clock divider<br>+</span>',
                B: '<span class = "group">Bass<br>clock divider<br>+</span>',
                C: '<span class = "group">Part<br>clock divider<br>+</span>',
            }
        },
        minus: {
            master: 'Reduce tempo',
            group:  {
                A: '<span class = "group">Lead<br>clock divider<br>-</span>',
                B: '<span class = "group">Bass<br>clock divider<br>-</span>',
                C: '<span class = "group">Part<br>clock divider<br>-</span>',
            }
        },
    },
    shift: {
        1: {
            master: 'Solo<br>BEATS',
            group:  'Solo<br>BEATS'
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