/**
 *  Set of musical scales available in the Data Operator
 */ 

const rootPitches = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#',' G',  'G#', 'A',  'A#', 'B'] // Major key root notes


const musicalScale = {     
    // Pentatonic scals
    'major:pentatonic': { notes: 5 },
    'minor:pentatonic': { notes: 5 },
    // Hexatonic scals
    'major:blues':      { notes: 6 },
    'minor:blues':      { notes: 6 },
    // Heptatonic scals:  modes
    'ionian':           { notes: 7 },  // Major
    'aeolian':          { notes: 7 },  // minor
    'phrygian':         { notes: 7 },
    'mixolydian':       { notes: 7 },
    'dorian':           { notes: 7 },
    'lydian':           { notes: 7 },
    'locrian':          { notes: 7 },
    'harmonic:minor':   { notes: 7 }
}


const chordMap = {
    5: { 
        I:      "[0, 2, 4]",      
        II:     "[1, 3, 5]",      
        III:    "[2, 4, 5]",      
        IV:     "[3, 5, 6]",      
        V:      "[4, 6, 7]",    
        VI:     "[5, 7, 9]",    
        VII:    "[6, 8, 10]",    
    },
    6: { 
        I:      "[0, 2, 4]",    
        II:     "[1, 3, 5]",    
        III:    "[2, 4, 6]",  
        IV:     "[3, 5, 6]",      
        V:      "[4, 6, 7]",    
        VI:     "[5, 7, 8]",    
        VII:    "[6, 8, 10]",    
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
export { musicalScale, rootPitches}