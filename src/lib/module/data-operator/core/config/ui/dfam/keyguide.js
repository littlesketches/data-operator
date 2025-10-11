/**
 *  KEY GUIDE FOR "dfam" UI
 *  -  
 */
import { punchFX } from "./fx-config"

export const keyguide = {
    noMode:{
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
            group:  '<span class = "group>Increase<br>volume</span'
        },
        minus: {
            master: 'Reduce<br>volume',
            group:  '<span class = "group>Reduce<br>volume</span'
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
            master: 'Select<br>VELOCITY<br>(B)',
            group:  'Select<br>VELOCITY<br>(B)'
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
            master: 'Select<br>PITCH<br>(A)',
            group:  'Select<br>PITCH<br>(A)'
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
            master: 'Mute<br>Oscillator<br>#2',
            group:  'Mute<br>Oscillator<br>#2',
        },
        5: {
            master: 'Noise<br>type',  
            group:  {
                A:  'Euclidean rotation<br>-',
                B:  'Euclidean rotation<br>-',
                C: ' '
            }
        },
        6: {
            master: 'Toggle<br>sidechain',
            group:  {
                A:  'Euclidean rotation<br>+',
                B:  'Euclidean rotation<br>+',
                C:  ' ',
            }
        },
        7: {
            master: 'Mute<br>Oscillator<br>#1',
            group:  'Mute<br>Oscillator<br>#1',
        },
        8: {
            master: 'Open<br>pulse<br>sequencer',
            group:  {
                A:  'Euclidean pulse<br>-',
                B:  'Euclidean pulse<br>-',  
                C: ' '
            }
        },
        9: {
            master: 'Toggle<br>legato<br>notes',
            group:  {
                A:  'Euclidean pulse<br>+',
                B:  'Euclidean pulse<br>+',      
                C:  ' ',
            }
        },
        0: {
            master: 'Unmute<br>all',
            group:  'Unmute<br>all',
        },
        plus: {     
            master: 'Increase tempo',
            group:  {
                A: '<span class = "group">Synth<br>clock divider<br>+</span>',
                B: '<span class = "group">Synth<br>clock divider<br>+</span>',
                C: '<span class = "group">Part<br>clock divider<br>+</span>',
            }
        },
        minus: {
            master: 'Reduce tempo',
            group:  {
                A: '<span class = "group">Synth<br>clock divider<br>-</span>',
                B: '<span class = "group">Synth<br>clock divider<br>-</span>',
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
            master: 'Solo<br>Oscillator<br>#2',
            group:  'Solo<br>Oscillator<br>#2',
        },
        5: {
            master: 'Noise<br>level<br>-',    // DFAM specific as there is no B pitch
            group:  'Noise<br>level<br>-',     // DFAM specific as there is no B pitch
        },
        6: {
            master:'Noise<br>level<br>+',   // DFAM specific as there is no B pitch
            group: 'Noise<br>level<br>+',   // DFAM specific as there is no B pitch
        },
        7: {
            master: 'Solo<br>Oscillator<br>#1',
            group:  'Solo<br>Oscillator<br>#1',
        },
        8: {
            master: 'Transpose<br>down',
            group:  'Transpose<br>down',
        },
        9: {
            master: 'Transpose<br>up',
            group:  'Transpose<br>up',
        },
        0: {
            master: 'Unmute<br>all',
            group:  'Unmute<br>all',
        },
        plus: {
            master: ' ',
            group:  {
                A:  '<span class = "group">Increase<br>synth<br>swing</span>',
                B:  '<span class = "group">Increase<br>synth<br>swing</span>',
                C:  '<span class = "group">Increase<br>beats<br>swing</span>'
            }
        },
        minus: {
            master:  'Export<br>+<br>share',
            group:  {
                A:  '<span class = "group">Reduce<br>synth<br>swing</span>',
                B:  '<span class = "group">Reduce<br>synth<br>swing</span>',
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