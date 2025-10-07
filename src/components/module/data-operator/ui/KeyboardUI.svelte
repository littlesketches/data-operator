<!-- KEYBOARD UI-->
<script>
    // Props
    let { model} = $props()

    // Models
    const { sonification, strudel, operatorConfig }  = model

    // Variables and references
    const fxNames = Object.keys(operatorConfig.ui.punchFX),
        ui = operatorConfig.ui.type   

    let modeState = $derived(sonification.state.mode) 

    // Reactive derived variables
    let mode      = $derived(sonification.state.selection.activeMode),  
        group     = $derived(sonification.state.selection.group.active),
        part      = $derived(sonification.state.selection.group.C.activePart),
        shift     = $derived(sonification.state.selection.shift)
 
    /**
     * KEYBOARD EVENTS
     */

    const keyHandle = {
        keydown: function(ev){
            switch(sonification.state.sequencer.ui.isOpen){
                /**
                 *  I. ACTION MODE
                 */
                case false: // Action mode
                    //  Store active keys
                    sonification.state.selection.heldKeys.add(ev.key);
                    sonification.state.selection.heldKeys = new Set(sonification.state.selection.heldKeys) 

                    // 1. Variables to configure state 
                    let activateMode,       // Variable to store mode to 'activate'
                        activatePattern,    // No mode: pattern index to select
                        groupSelect,        // Group to select but not activate
                        activatePart        // Flag part to select

                    // 2. Keyboard event methods
                    switch(ev.key) {
                        ////  MODES 
                        case "Shift":                   // SHIFT mode 
                            sonification.state.selection.shift =  true;  
                            activateMode = 'shift';   
                            break
                        case "Enter":                   // FX mode
                            ev.preventDefault()
                            activateMode = 'fx';    
                            break
                        case ".":  case ">": case "m": case "M":    // MODIFY mode
                            activateMode = 'modify';    
                            break
                        case "ArrowRight": ev.preventDefault()      // SELECT mode
                        case "\\":  case ",":  case "<": case "|":  
                            activateMode = 'select';    
                            break

                        //// TRANSPORT 
                        case " ": case "Clear":  // Play | Stop + reset all
                            if(!strudel.state.audioWorkletInit) return  // Prevent initial "play" from keyboard as this bypasses Strudel setting up some audioworklets 
                            ev.preventDefault();                    
                            switch(strudel.state.transport){
                                case "stopped":
                                    sonification.handle.start();  break
                                case "playing":
                                    sonification.handle.stop();                              
                                    break
                            }                    
                            break

                        //// NAV KEYS +/- nav keys               
                        case "+": case "=": case "Backspace": case "ArrowUp": case "f": case "F":  // "UP"+ or = 
                            ev.preventDefault()
                            navkeyAction(mode, 1, 10)
                            break

                        case "-": case "_": case "ArrowDown":  // "DOWN" shift -
                            ev.preventDefault()
                            navkeyAction(mode, -1, 11)
                            break

                        case "r": case "R":         // Allow default (e.g. reload page)
                            navkeyAction(mode, -1, 11)
                            break

                        //// NUMPAD KEYS: with [shift] + num
                        case "1": case "!": case "z": case "Z":  numkeyAction(mode, 1, 'C'); break
                        case "2": case "@": case "x": case "X":  numkeyAction(mode, 2, 'C'); break
                        case "3": case "#": case "c": case "C":  numkeyAction(mode, 3, 'C'); break
                        case "4": case "$": case "a": case "A":  numkeyAction(mode, 4, 'B'); break
                        case "5": case "%": case "s": case "S":  numkeyAction(mode, 5, 'B', -1) ; break 
                        case "6": case "^": case "d": case "D":  numkeyAction(mode, 6, 'B', 1) ;  break 
                        case "7": case "&": case "q": case "Q":  numkeyAction(mode, 7, 'A'); break
                        case "8": case "w": case "W":            numkeyAction(mode, 8, 'A', -1); break 
                        case "*":  
                            if(shift)           numkeyAction(mode, 8, 'A', -1);  break
                            if(!shift)    break
                        case "9": case "(": case "e": case "E":  numkeyAction(mode, 9, 'A', 1) ; break
                        case "0": case ")": case "Alt": 
                            ev.preventDefault() 
                            numkeyAction(mode, 0, 'master'); 
                            break

                        //// KEYBOARD ONLY SHORTCUTS
                        case '[': case '{': case 'PageUp'  : sonification.handle.cycleGroup(-1); break
                        case ']': case '}': case 'PageDown': sonification.handle.cycleGroup(1);  break
                        case "p":       sonification.handle.exportCode(); break
                        case 'Escape':  sonification.handle.closePulseSequencer()
                    }

                    // 3. Activate mode and pattern selections
                    // i. Set (single) active mode 
                    if(activateMode){
                        Object.keys(modeState).forEach(d => modeState[d] = d === activateMode)    // Set only active node to true
                        sonification.state.selection.heldModes.add(activateMode)        // Add to held nodes 
                        sonification.state.selection.activeMode = activateMode          // Set active mode                                    
                    }
                    // ii. Select pattern: covers numkey selection on master/non-master group pages 
                    if(!isNaN(activatePattern)){
                        const index = group !== 'master' ? activatePattern - 1 : activatePattern        // Offset between master and other groups
                        sonification.handle.selectPattern(index, groupSelect, activatePart ?? part)
                    } 
                    
                    // 4. Update action state indicator
                    updateActionState(ev, sonification, shift, group, part)
                    break

                    // X. Numkey & navkey handlers
                    function numkeyAction(mode, numkey, keyGroup, direction){
                        switch(mode){
                            case 'fx':      // Numkey activates punch-in FX for 0-9, for selected group
                                sonification.handle.punchInFX(group, fxNames[numkey], true) 
                                break

                            case 'select':  
                                switch(numkey){
                                    case 0:
                                        sonification.handle.selectGroupPart('master')
                                        break
                                    case 1: case 2: case 3: case 4: case 7: // Mute/unmute group/part
                                        activatePart = numkey;  // Select the group 
                                        sonification.handle.selectGroupPart(keyGroup, activatePart);  
                                        break
                                    case 5: case 6:
                                        sonification.handle.cycleScaleRootPitch(direction)   
                                        break
                                    case 8: case 9:
                                        sonification.handle.cycleScaleType(direction)   
                                        break
                                }
                                break

                            case 'modify':
                                switch(numkey){
                                    case 0:    // Unmute all
                                        sonification.handle.resetGain()
                                        break
                                    case 1: case 2: case 3: case 4: case 7: // Mute/unmute group/part
                                        sonification.handle.toggleMute({group: keyGroup, part: numkey}) 
                                        break
                                    case 5: case 6:
                                        switch(group){
                                            case 'master':
                                                switch(ui){
                                                    case 'custom-dfam':     // Fixed to Group A
                                                        if(numkey === 5) sonification.handle.cycleNoiseType()
                                                        if(numkey === 6) sonification.handle.toggleSidechain()
                                                        break   
                                                    default:
                                                        if(numkey === 5) sonification.handle.openPulseSequencer('A')
                                                        if(numkey === 6) sonification.handle.toggleLegato(group)
                                                }
    
                                                break
                                            case 'A': case 'B':
                                                switch(ui){
                                                    case 'custom-dfam':     // Fixed to Group A
                                                        sonification.handle.adjustEuclideanRhythm(0, direction, 'A'); break   
                                                    default:
                                                        sonification.handle.adjustEuclideanRhythm(0, direction, group); break
                                                }
                                        }
                                        break
                                    case 8: case 9:
                                        switch(group){
                                            case 'master':
                                                if(numkey === 8) sonification.handle.openPulseSequencer('A')
                                                if(numkey === 9) sonification.handle.toggleLegato('A')
                                                break
                                            case 'A': case 'B':
                                                switch(ui){
                                                    case 'custom-dfam':     // Fixed to Group A
                                                        sonification.handle.adjustEuclideanRhythm(direction, 0, 'A');   break   
                                                    default:
                                                        sonification.handle.adjustEuclideanRhythm(direction, 0, group);
                                                }
                                                break
                                        }
                                        break
                                }
                                break

                            case 'shift':  
                                switch(numkey){
                                    case 0: // Unsolo all
                                        sonification.handle.resetGain()
                                        break
                                    case 1: case 2: case 3: case 4: case 7: // Solo/unsolo group/part
                                        sonification.handle.toggleSolo({group: keyGroup, part: numkey}) 
                                        sonification.handle.selectGroupPart(keyGroup, activatePart, false);  
                                        break
                                    case 5: case 6:
                                        switch(ui){
                                            case 'custom-dfam': // Adjust noise
                                                sonification.handle.adjustNoiseLevel(0.05 * direction)                                    
                                                break           
                                            default:            // Transpose group B
                                                sonification.handle.transposePatternDegree(direction, 'B') 
                                        }
                                        break       
                                    case 8: case 9: // Transpose group A
                                        sonification.handle.transposePatternDegree(direction, 'B') 
                                        break
                                 }
                                break

                            default: // Default 'no mode'
                                if (numkey === 0){
                                    sonification.handle.selectGroupPart('master')
                                } else {
                                    if(group === 'master') {
                                        switch(numkey){
                                            case 1: case 2: case 3: // Cycle C.part 1-3 forwards only
                                                sonification.handle.cyclePattern(numkey, keyGroup, numkey)
                                                break
                                            case 4: case 7:      // Cycle A/B backward
                                                sonification.handle.cyclePattern(-1, keyGroup)
                                                break
                                            case 5: case 8:      // Cycle A/B forward
                                                sonification.handle.cyclePattern(1, keyGroup)
                                                break
                                            case 6:
                                                sonification.handle.cycleTempoPresets()   
                                                break
                                            case 9:      // Randomise euclidean pattern
                                                switch(ui){
                                                    case 'dfam':
                                                        sonification.handle.randomEuclideanRhythm(keyGroup); break

                                                    case 'std':
                                                    default:
                                                        sonification.handle.randomEuclideanRhythm('A', undefined, false, false, 9, 15)
                                                        sonification.handle.randomEuclideanRhythm('B', undefined, false, true, 5, 9)
                                                        sonification.state.userMessage.text = `Random melodic rhythms!`
                                                        sonification.handle.userMessage()
                                                }
                                                break
                                        }
                                    } else { // Group select
                                        activatePattern = numkey    // Change pattern
                                        groupSelect = group
                                    }
                                }
                        }
                    }

                    function navkeyAction(mode, direction, fxIndex){
                        switch(mode){
                            case 'fx':         // Punch FX:                                                              
                                sonification.handle.punchInFX(group, fxNames[fxIndex], true)
                                break
                            case 'modify':    // Modify
                                sonification.handle.adjustBPM(direction)  
                                break
                            case 'select':    // Cycle scene data
                                sonification.handle.cycleScene(-direction)      
                                break
                            case 'shift':   // Swing adjust: group level
                                switch(group){
                                    case 'master':
                                        if(direction === -1){
                                            sonification.handle.exportCode()
                                            sonification.state.userMessage.overlay.isShown = true
                                        }
                                        break   
                                    default:
                                        sonification.handle.adjustSwing(direction, group, part);  
                                }
                                break
                            default:        // Adjust group gain: default   
                                sonification.handle.adjustGain(0.05 * direction, group)                             
                        } 
                    }

                /**
                 *  II. SEQUENCER MODE
                 */ 
                case true:
                    let step 
                    switch(ev.key) {
                        //// 4 x 4 m
                        case "1":  step = 1; break
                        case "2":  step = 2; break
                        case "3":  step = 3; break
                        case "4":  step = 4; break

                        case "q":  step = 5; break
                        case "w":  step = 6; break
                        case "e":  step = 7; break
                        case "r":  step = 8; break

                        case "a":  step = 9; break
                        case "s":  step = 10; break
                        case "d":  step = 11; break
                        case "f":  step = 12; break

                        case "z":  step = 13; break
                        case "x":  step = 14; break
                        case "c":  step = 15; break
                        case "v":  step = 16; break

                        //// KEYBOARD ONLY SHORTCUTS
                        case 'Escape':  
                            sonification.handle.closePulseSequencer(); 
                        break

                        //// TRANSPORT 
                        case " ": case "Clear":  // Play | Stop + reset all
                            ev.preventDefault();                    
                            switch(strudel.state.transport){
                                case "stopped":
                                    sonification.handle.start();  break
                                case "playing":
                                    sonification.handle.stop();                              
                                    break
                            }                    
                            break
                    }

                    // Update sequencer
                    if(step){
                        const array = sonification.state.sequencer[sonification.state.sequencer.ui.group].array
                        array[step-1] = array[step-1] === 1 ? 0 : 1
                        sonification.handle.updateSequencePulse(array)
                    }
                    break
            }
        },

        keyup: function(ev){
            sonification.state.selection.heldKeys.delete(ev.key);   // Remove active keys
            sonification.state.selection.heldKeys = new Set(sonification.state.selection.heldKeys) 

            // 1. Variables 
            const mode = sonification.state.selection.activeMode,               // Active mode
                group  = sonification.state.selection.group.active,              // Active group     
                part   = sonification.state.selection.group.C.activePart,  // Active part  (group C)       
                shift  = sonification.state.selection.shift                // If shift is held   
  

            let deactivateMode,     // Variable to store mode to 'deactivate'
                deactivatePunch,    // Variable to store index of punchFX to 'activate'
                numkey              // Stores the key number for use with 'shift + numkey' keyboard events

            // 2.  Key event methods
            switch(ev.key) {
                ////  MODES 
                case "Shift":               // SHIFT mode
                    sonification.state.selection.shift  = false
                    deactivateMode = 'shift'     
                    break
                case "Enter":               // FX mode
                    deactivateMode = 'fx'                    
                    fxNames.forEach(fxName => sonification.handle.punchInFX(group, fxName, false))   // Deactivate all punch in FX                      
                    break
                case ".":  case ">": case "m": case "M":    // MODIFY mode
                    deactivateMode = 'modify'
                    break
                case "ArrowRight": ev.preventDefault()      // SELECT Mode
                case "\\":  case ",":  case "<":  case "|":   
                    deactivateMode = 'select' 
                    break

                //// NAV KEYS +/- nav keys  
                case "+": case "=": case "Backspace": case "ArrowUp":     // "UP" (+)+ or = 
                    switch(sonification.state.selection.activeMode){
                        case 'fx':     deactivatePunch = 10 ; break
                    } 
                    break
                case "-": case "_": case "ArrowDown":   // "DOWN" shift -
                    switch(sonification.state.selection.activeMode){
                        case 'fx':     deactivatePunch = 11 ; break
                    } 
                    break

                // NUMPAD KEYS
                case "1":  case "!": case "z": case "Z": // Shift + 1
                    numkey = 1
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    }
                    break
                case "2":  case "@": case "x": case "X": // Shift + 2
                    numkey = 2
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    }
                    break
                case "3":  case "#": case "c": case "C": // Shift + 3
                    numkey = 3
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "4":  case "$": case "a": case "A": // Shift + 4
                    numkey = 4
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "5":  case "%": case "s": case "S": // Shift + 5
                    numkey = 5
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "6":  case "^": case "d": case "D": // Shift + 6
                    numkey = 6
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "7":  case "&": case "q": case "Q": // Shift + 7
                    numkey = 7
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "8":  case "w": case "W":  // 8
                    numkey = 8
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "*":   // Shift + 8
                    if(shift){
                        numkey = 8
                        switch(mode){
                            case 'fx':  deactivatePunch = numkey;   break
                        } 
                    } // else/non-shift case is for * on numpad
                    break
                case "9":  case "(": case "e": case "E":  // Shift + 9
                    numkey = 9 
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
                case "0":  case ")": case "Alt": // Shift + 0
                    ev.preventDefault() 
                    numkey = 0 
                    switch(mode){
                        case 'fx':      deactivatePunch = numkey;   break
                    } 
                    break
            }

            // 3. Activate mode (if mode key is unpressed )
            if(deactivateMode){
                sonification.state.selection.heldModes.delete(deactivateMode)                                // Add to held nodes 
                const lastActiveMode = sonification.state.selection.activeMode = [...sonification.state.selection.heldModes].at(-1) // Set active mode to last held (ca be undefined)
                Object.keys(modeState).forEach(d => modeState[d] = d === lastActiveMode)    // Set only active node to true                     
            }

            // 4. Deactivate Punch-in FX
            if(!isNaN(deactivatePunch) && sonification.state.selection.activeMode === 'fx'){
                sonification.handle.punchInFX(group, fxNames[deactivatePunch], false)
            }

            // 5. Update and remaining held action state indicator
            updateActionState(ev, sonification, shift, group, part)
        } 
    }

    ///////////////
    /// HELPERS ///
    ///////////////

    function updateActionState(ev, sonification, shift, group, part){
        // Modes
        switch(ev.key) {
            case "Enter":   // FX Mode
                ev.preventDefault()
                sonification.state.selection.numKeyAction = !shift ? `${(group === 'master'? 'Master' : 'Group' )} FX` : `fx II: ${group}`  // FX applied at group level

                sonification.state.selection.navKeyAction = group === 'master' ?  // I. Master group
                                                                                    'speed FX'      // I.i. UNUSED
                                                                                : // II. Non-master groups
                                                                                    !shift ? `e-pulse` : `e-rotate`    // II.i. without and II.ii.with + shift
                break
            case ".":  case ">": case "m": case "M":    // MODIFY mode 
                sonification.state.selection.numKeyAction = group === 'master' ?  // I. Master group
                                                                                    !shift ?  'toggle mute' : 'toggle solo'  // I.i. without and I.ii.with + shift
                                                                                : // II. Non-master groups
                                                                                    !shift ?  `transpose: ${group}` : 'FILTER? '   // II.i. without and II.ii.with + shift
                sonification.state.selection.navKeyAction = group === 'master' ?  // I. Master group
                                                                                !shift ? 'bpm'  : 'bpm:10'  // I.i. without and I.ii.with + shift
                                                                                : // II. Non-master groups
                                                                                    !shift ?  'bpm'  // II.i. without  shift
                                                                                        : `${group} ${part} swing`       //  II.ii.with + shift
                break
            case "ArrowRight": ev.preventDefault()      // SELECT Mode
            case "\\":  case ",":  case "<": case "|": case "s": case "S":   
                sonification.state.selection.numKeyAction = !shift ? 'group' : 'sel scl-type'    // I. without and II. with + shift
                sonification.state.selection.navKeyAction = !shift ? 'group' : 'scl root'    // I. without and II. with + shift                                                   
                break

            case "p": case "P": case "/": case "?":            // PROJECT Mode  (and randomiser
                sonification.state.selection.numKeyAction  = shift ? `` : 'date'   // Not group specific and no shift available as shift>data combo reserved for randomiser
                sonification.state.selection.navKeyAction  = shift ? `` : 'date'   // Not group specific and no shift available as shift>data combo reserved for randomiser
                break
            case "i": case "I":  
                sonification.state.selection.numKeyAction   = '???'
                sonification.state.selection.navKeyAction   = '???'
                break
        }   

        // Main 'default'/ no mode
        if(sonification.state.selection.activeMode === undefined){
            sonification.state.selection.numKeyAction   = 'pattern'
            sonification.state.selection.navKeyAction   = `${group} level`
        }   
    }
</script>

<svelte:window on:keydown={keyHandle.keydown} on:keyup={keyHandle.keyup} />

