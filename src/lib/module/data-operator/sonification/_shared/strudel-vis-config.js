/**
 *  CONFIG FOR STRUDEL BACKGROUND VIS
 *  - Basic config to allow selection standard strudel visuals, configured/positioned to complement the Data Operator UI
 */
export const strudelVisOptions =   {
    none:           '',
    scope:          `.scope({pos: 0.36, scale: 0.25, thickness: 7.5})`,     
    pianoroll:      `.pianoroll({playhead: 0, vertical: false, flipTime: false  })`,
    spectrum:       `.spectrum()`
}


export const strudelVisPalette = {
    operator: {
        A:  '#fff', 
        B:  '#22baf1',
        C:  '#f15a22',
    },
    dfam: {
        A:  '#fff',    
        B:  '#fff',
        C:  '#66cc00',
    },
    ambi: {
        A:  '#d40481', 
        B:  '#fff',
        C:  '#d40481',
    }
}
