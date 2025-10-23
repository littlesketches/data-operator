/**
 *  Set of musical scales available in the Data Operator
 */ 


const musicalScale = {     
    // Pentatonic 
    'major:pentatonic': {
        notes:          5
    },
    'minor:pentatonic': {
        notes:          5,
    },
    // Hexatonic
    'major:blues': {
        notes:          6,
    },
    'minor:blues': {
        notes:          6,
    },
    // Heptatonic Modes
    'ionian':{          // major
        notes:          7,
        chordMap: { 
            I:      "[0, 2, 4]",      
            IV:     "[3, 5, 6]",      
            V:      "[4, 6, 7]",    
            VI:     "[5, 7, 8]",    
        },
    },
    'aeolian':{          // minor
        notes:          7,
    },
    'phrygian':{         
        notes:          7,
    },
    'mixolydian': {
        notes:          7,
    },
    'dorian': {
        notes:          7,
    },
    'lydian': {
        notes:          7,
    },
    'locrian': {
        notes:          7,
    },
    'harmonic:minor': {
        notes:          7,
    }
}


const chordMap = {
    5: { 
        I:      "[0, 2, 4]",      
        II:     "[1, 3, 5]",      
        III:    "[2, 4, 5]",      
        IV:     "[3, 5, 6]",      
        V:      "[4, 6, 7]",    
        VI:     "[5, 7, 9]",    
    },
    6: { 
        I:      "[0, 2, 4]",    
        II:     "[1, 3, 5]",    
        III:    "[2, 4, 6]",  
        IV:     "[3, 5, 6]",      
        V:      "[4, 6, 7]",    
        VI:     "[5, 7, 8]",    
    },
    7: { 
        I:      "[0, 2, 4]",      
        II:     "[1, 3, 5]",      
        III:    "[2, 4, 6]",      
        IV:     "[3, 5, 7]",      
        V:      "[4, 6, 8]",    
        VI:     "[5, 7, 9]",    
        VII:    "[6, 8, 9]",    
    },
}

// Add chordMap for each scale
Object.entries(musicalScale).forEach( ([scale, obj]) => {
    obj.chordMap = chordMap[obj.notes]
})


// => Export 
export { musicalScale}