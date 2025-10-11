<!-- CALCULATOR BUTTON INTERFACE-->
<script>
   // Props
    let { model } = $props()

    // Models
    const {sonification, operatorConfig} = model

    // Variables and operator-specific config
    const fxNames   = Object.keys(operatorConfig.ui.punchFX),
        keyguide    = operatorConfig.ui.keyguide,
        ui          = operatorConfig.ui.type,   
        groupA_type = sonification.state.selection.group.A.chart,
        groupB_type = sonification.state.selection.group.B.chart

    // Reactive derived variables
    let heldKeys  = $derived(sonification.state.selection.heldKeys),
        selection = $derived(sonification.state.selection),
        modeState = $derived(sonification.state.mode),
        mode      = $derived(sonification.state.selection.activeMode),  
        group     = $derived(sonification.state.selection.group.active),
        part      = $derived(sonification.state.selection.group.C.activePart),
        shift     = $derived(sonification.state.selection.shift)

    /**
     *  SCREEN BUTTON HANDLERS
     */

    const handle = {
        pointerdown: function(ev){
            const type = this.getAttribute('data-type'),           // Button type    
                keyGroup = this.getAttribute('data-keygroup')

            // 1. Variables to configure sate (#4)
            let activateMode,       // Variable to store mode to 'activate'
                activatePattern,    // No mode: pattern index to select
                groupSelect,        // Group to select but not activate
                activatePart        // Flag part to select


            // 3. On screen key event methods
            switch(type){
                case 'shift':
                    sonification.state.selection.shift = true;
                    break

                case 'mode':
                    Object.keys(sonification.state.mode).forEach(d => sonification.state.mode[d] = d === this.id)    // Set only active node to true
                    selection.heldModes.add(this.id)        // Add to held nodes 
                    selection.activeMode = this.id          // Set active mode                                    
                    break

                case 'numpad':
                    const num = +this.id.slice(4)   
                    const direction = +this.getAttribute('data-direction')             
                    numkeyAction(mode, num, keyGroup, direction)
                    break

                case 'nav':
                    switch( this.id ){
                        case 'plus':
                            navkeyAction(mode, 1, 10);
                            break
                        case 'minus':
                            navkeyAction(mode, -1, 11);
                            break
                    }
                    break
            }

            // 4. Activate interactive methods
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

            // X. Numkey & navkey handlers: replicated in/from KeyboardUI
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
                        let type 
                        switch(group){
                            case 'master':
                                sonification.handle.adjustBPM(direction)  
                                break   
                            case 'A': case 'B':
                                group = ui === 'custom-dfam' ? 'A' : group
                                type = sonification.schema.group[group].type
                                part = undefined    
                                sonification.handle.cycleClock(group, part, type, direction)
                                break
                            case 'C':
                                type = 'sound' 
                                part = group === 'C' ? part :undefined
                                sonification.handle.cycleClock(group, part, type, direction)
                                break
                        }
                        break
                    case 'select':    // Cycle scene data
                        sonification.handle.cycleScene(direction)      
                        break
                    case 'shift':   // Swing adjust: group level
                        switch(group){
                            case 'master':
                                if(direction === -1){ // -
                                    sonification.handle.exportCode()
                                    sonification.state.userMessage.overlay.isShown = true
                                } else { // +
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
        },
        pointerup: function(ev){
            const type = this.getAttribute('data-type')

            switch(type){
                case 'shift':
                    selection.shift = false;
                    break
                case 'mode':
                    Object.keys(sonification.state.mode).forEach(d => sonification.state.mode[d] = false)    // Set only active node to true                     
                    sonification.state.selection.activeMode = null
                    break

                case 'numpad':
                    const num = +this.id.slice(4)
                    switch(mode){
                        case 'fx':    
                            sonification.handle.punchInFX(group, fxNames[num], false)
                            break
                    }
                    break

                case 'nav':
                    switch(this.id){
                        case 'plus':
                            switch(mode){
                                case 'fx':    
                                    sonification.handle.punchInFX(group, fxNames[10], false)
                                    break
                            }
                            break
                        case 'minus':
                            switch(mode){
                                case 'fx':    
                                    sonification.handle.punchInFX(group, fxNames[11], false)
                                    break
                            }
                            break
                    }
                    break
            }
        }
    }

</script>


<!-- CALCULATOR 4x4 PAD BUTTON MARKUP-->

<!-- ROW #1 -->
<div id = 'num_7' data-type = 'numpad' data-keygroup = 'A'  class = 'button numpad row-1'
    class:modeguide={mode}
    class:active = {heldKeys.has('7') || heldKeys.has('&') || heldKeys.has('q') || heldKeys.has('Q')}  
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 7 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 7 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 7 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 7 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 7 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 1 : 3)}; grid-row:1'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label'>7</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["7"].master : keyguide[mode]["7"].group[group] ? keyguide[mode]["7"].group[group] : keyguide[mode]["7"].group  : ''}
        </div>
    </div>
</div>

<div id = 'num_8' data-type = 'numpad' data-keygroup = 'A' data-direction = -1 class = 'button numpad row-1'
    class:modeguide={mode}
    class:active = {heldKeys.has('8') || (heldKeys.has('*') && shift) || heldKeys.has('w') || heldKeys.has('W')}  
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 8 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 8 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 8 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 8 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 8 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 2 : 4)}; grid-row:1'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label'>8</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["8"].master : keyguide[mode]["8"].group[group] ? keyguide[mode]["8"].group[group] : keyguide[mode]["8"].group  : ''}
        </div>
    </div>
</div>

<div id = 'num_9' data-type = 'numpad' data-keygroup = 'A' data-direction = 1 class = 'button numpad row-1'
    class:modeguide={mode}  
    class:active = {heldKeys.has('9') || heldKeys.has('(') || heldKeys.has('e') || heldKeys.has('E')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 9 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 9 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 9 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 9 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 9 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 3 : 5)}; grid-row:1'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label '>9</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["9"].master : keyguide[mode]["9"].group[group] ? keyguide[mode]["9"].group[group] : keyguide[mode]["9"].group  : ''}
        </div>
    </div>
</div>

<div id = 'minus' data-type = 'nav' class = 'button nav'
    class:modeguide={mode}
    class:active = {heldKeys.has('-') || heldKeys.has('_') || heldKeys.has('r') || heldKeys.has('R')}
    style  = 'grid-column: {(sonification.state.isMobile ? 4 : 6)}; grid-row:1'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">

    <div class = 'button__wrapper'>
        <div class = 'button-label'>&minus;</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode].minus.master : keyguide[mode].minus.group[group]  ? keyguide[mode].minus.group[group] : keyguide[mode].minus.group : ''}
        </div>
    </div>
</div>

<!--  ROW #2 -->
<div id = 'num_4' data-type = 'numpad' data-keygroup = 'B' class = 'button numpad row-2'
    class:modeguide={mode}
    class:active = {heldKeys.has('4') || heldKeys.has('$') || heldKeys.has('a') || heldKeys.has('A')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 4 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 4 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 4 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 4 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 4 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 1 : 3)}; grid-row:2'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label'>4</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["4"].master : keyguide[mode]["4"].group : ''}
        </div>
    </div>
</div>

<div id = 'num_5' data-type = 'numpad' data-keygroup = 'B' data-direction = -1 class = 'button numpad row-2'
    class:modeguide={mode}
    class:active = {heldKeys.has('5') || heldKeys.has('%') || heldKeys.has('s') || heldKeys.has('S')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 5 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 5 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 5 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 5 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 5 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 2 : 4)}; grid-row:2'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper numpad'>
        <div class = 'button-label'>5</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["5"].master : keyguide[mode]["5"].group[group] ? keyguide[mode]["5"].group[group] : keyguide[mode]["5"].group  : ''}
        </div>
    </div>
</div>

<div id = 'num_6' data-type = 'numpad' data-keygroup = 'B' data-direction = 1 class = 'button numpad row-2'
    class:modeguide={mode}
    class:active = {heldKeys.has('6') || heldKeys.has('^') || heldKeys.has('d') || heldKeys.has('D')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 6 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 6 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 6 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 6 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 6 - 1
    }
    style  = 'grid-column: {(sonification.state.isMobile ? 3 : 5)}; grid-row:2'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper numpad'>
        <div class = 'button-label'>6</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["6"].master : keyguide[mode]["6"].group[group] ? keyguide[mode]["6"].group[group] : keyguide[mode]["6"].group  : ''}
        </div>
    </div>
</div>

<div id = 'plus' data-type = 'nav' class = 'button nav'
    class:modeguide={mode}
    class:active = {heldKeys.has('+') || heldKeys.has('=') || heldKeys.has('Backspace') || heldKeys.has('f')|| heldKeys.has('F') }
    style  = 'grid-column: {(sonification.state.isMobile ? 4 : 6)}; grid-row:2'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label'>&plus;</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode].plus.master : keyguide[mode].plus.group[group]  ? keyguide[mode].plus.group[group] : keyguide[mode].plus.group : ''}
        </div>
    </div>
</div>

<!-- ROW #3 -->
<div id = 'num_1' data-type = 'numpad'  data-keygroup = 'C' class = 'button numpad row-3'
    class:modeguide={mode}
    class:active = {heldKeys.has('1') || heldKeys.has('!') || heldKeys.has('z') || heldKeys.has('Z')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 1 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 1 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 1 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 1 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 1 - 1

    }
    class:part-active = { group === 'C' ? sonification.state.selection.group.C.activePart === 1 : false }
    style  = 'grid-column: {(sonification.state.isMobile ? 1 : 3)}; grid-row:3'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper numpad'>
        <div class = 'button-label'>1</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-part-indicator__container'>
            <div class = 'button-part-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["1"].master : keyguide[mode]["1"].group[group] ? keyguide[mode]["1"].group[group] : keyguide[mode]["1"].group  : ''}
        </div>
    </div>
</div>

<div id = 'num_2' data-type = 'numpad' data-keygroup = 'C' class = 'button numpad row-3'
    class:modeguide={mode}
    class:active = {heldKeys.has('2') || heldKeys.has('@') || heldKeys.has('x') || heldKeys.has('X')} 
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 2 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 2 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 2 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 2 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 2 - 1

    }
    class:part-active = { group === 'C' ? sonification.state.selection.group.C.activePart === 2 : false }
    style  = 'grid-column: {(sonification.state.isMobile ? 2 : 4)}; grid-row:3'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper numpad'>
        <div class = 'button-label'>2</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-part-indicator__container'>
            <div class = 'button-part-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["2"].master : keyguide[mode]["2"].group[group] ? keyguide[mode]["2"].group[group] : keyguide[mode]["2"].group  : ''}
        </div>
    </div>
</div>

<div id = 'num_3' data-type = 'numpad' data-keygroup = 'C' class = 'button numpad row-3'
    class:modeguide={mode}
    class:active = {heldKeys.has('3') || heldKeys.has('#') || heldKeys.has('c') || heldKeys.has('C')}
    class:pattern-select = { group === 'master' ? false
        : group === 'A' ? sonification.schema.group.A[groupA_type].series.indexOf(sonification.state.selection.group.A[`${groupA_type}Pattern`]) === 3 - 1
            : group === 'B' ? sonification.schema.group.B[groupB_type].series.indexOf(sonification.state.selection.group.B[`${groupB_type}Pattern`]) === 3 - 1
                : part === 1 ? sonification.schema.group.C.part["1"].series.indexOf(sonification.state.selection.group.C.part["1"].series) === 3 - 1
                    : part === 2 ? sonification.schema.group.C.part["2"].series.indexOf(sonification.state.selection.group.C.part["2"].series) === 3 - 1
                        : sonification.schema.group.C.part["3"].series.indexOf(sonification.state.selection.group.C.part["3"].series) === 3 - 1
    }
    class:part-active = { group === 'C' ? sonification.state.selection.group.C.activePart === 3 : false }
    style  = 'grid-column: {(sonification.state.isMobile ? 3 : 5)}; grid-row:3'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper numpad'>
        <div class = 'button-label'>3</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-part-indicator__container'>
            <div class = 'button-part-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["3"].master : keyguide[mode]["3"].group[group] ? keyguide[mode]["3"].group[group] : keyguide[mode]["3"].group  : ''}
        </div>
    </div>
</div>

<div id = 'fx' data-type = 'mode' class = 'button mode'
    class:modeguide={mode}
    class:active={sonification.state.mode.fx}
    style  = 'grid-column: {(sonification.state.isMobile ? 4 : 6)}; grid-row:3'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label invert'>
            <span class="material-symbols-outlined">function</span>
        </div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
    </div>
</div>

<!-- ROW #4 -->
<div id = 'select' data-type = 'mode' class = 'button mode'
    class:modeguide={mode}
    class:active={sonification.state.mode.select} 
    style  = 'grid-column: {(sonification.state.isMobile ? 1 : 3)}; grid-row:4'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label invert'>
            <div class ='button-label__wrapper'>&times;</div>
        </div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
    </div>
</div>

<div id = 'num_0' data-type = 'numpad' class = 'button numpad row-4'
    class:modeguide={mode}
    class:active = {heldKeys.has('0') || heldKeys.has(')') || heldKeys.has('Alt')} 
    style  = 'grid-column: {(sonification.state.isMobile ? 2 : 4)}; grid-row:4'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label'>0</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
        <div class = 'button-guidance'>
            {@html mode ? group === 'master' ? keyguide[mode]["0"].master : keyguide[mode]["0"].group : ''}
        </div>
    </div>
</div>

<div id = 'modify' data-type = 'mode' class = 'button mode'
    class:modeguide={mode}
    class:active={sonification.state.mode.modify} 
    style  = 'grid-column: {(sonification.state.isMobile ? 3 : 5)}; grid-row:4'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper '>
        <div class = 'button-label invert'>&sdot;</div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
    </div>
</div>

<div id = 'shift' data-type = 'mode' class = 'button mode shift'
    class:modeguide={mode}
    class:active = {selection.shift} 
    style  = 'grid-column: {(sonification.state.isMobile ? 4 : 6)}; grid-row:4'
    onpointerdown="{handle.pointerdown}" onpointerup="{handle.pointerup}">
    <div class = 'button__wrapper'>
        <div class = 'button-label invert'>
            <span class="material-symbols-outlined">shift_lock</span>
        </div>
        <div class = 'button-indicator__container'>
            <div class = 'button-indicator'></div>
        </div>
    </div>
</div>


<!-- STYLES-->
<style>
    /** BUTTON STYLING*/
    .button{
        cursor:                 pointer;     
        user-select:            none;
        -webkit-user-select:    none;     
        z-index:                1;
        aspect-ratio:           1/1;
    }

    .button__wrapper{
        display:                grid;
        justify-content:        center;
        align-items:            center;
        height:                 100%;
        transition:             all 0.2s;
        border-radius:          50%;
        box-sizing:             border-box; /* include border in dimensions */
        background:             linear-gradient(145deg, #e8e8e8, var(--color-grad-0));
        box-shadow:              2.5px  2.5px 5px #8e8d8d,
                                -2.5px -2.5px 5px #fff;
    }

    .numpad .button__wrapper{
        color:                  var(--col-light);
    }
    .numpad.row-1  .button__wrapper{
        background:             var(--col-grad-2);
    }  
    .numpad.row-2  .button__wrapper{
        background:             var(--col-grad-3);
    }  
    .numpad.row-3  .button__wrapper{
        background:             var(--col-grad-5);
    }  
    .numpad.row-4  .button__wrapper{
        background:             var(--col-grad-5);
    }  
    .mode .button__wrapper{
        color:                  var(--col-dark);  
    }
    .shift .button__wrapper{
        color:                  var(--col-light);
    }

    @media (hover: hover) and (pointer: fine) {
        .button:hover  .button__wrapper{
            filter:             brightness(1.15); 
        }
    }

    .button:active .button__wrapper,
    .button.active .button__wrapper{ 
        box-shadow:          1vh  1vh 1vh var(--pixel-0),
                            -1vh  1vh 1vh var(--pixel-0),
                            -1vh -1vh 1vh var(--pixel-0),      
                             1vh -1vh 1vh var(--pixel-0);      
    }


    /* LABELS AND ICONS */
    .button-label{
        grid-area:              1/ 1 / 2 / 2;
        font-size:              2.5vh;
        font-family:            "Orbit", sans-serif;
        z-index:                1;
        display:                flex;
        justify-content:        center;
        align-items:            center;
        width:                  100%;
        transition:             all 200ms;
        opacity:                1;
        line-height:            1;
    }

    .button-label.invert{
        width:                  4.5vh;
        height:                 4.5vh;
        background:             var(--col-grad-3);
        color:                  var(--col-light);
        border-radius:          50%
    }

    .nav .button-label{
        font-size:              4.25vh;
        margin-top:             -0.5vh;
        color:                  rgb(0, 0, 0, 0.5);
    }

    .button-label__wrapper{
        font-size:              3vh;
        height:                 3.5vh
    }

    #modify .button-label,
    #shift .button-label span,
    #fx .button-label span{
        font-size:              3vh;
        font-weight:            600;
    }

    /** BUTTON INDICATORS */
    .button-indicator__container,
    .button-part-indicator__container, 
    .button-guidance{
        grid-area:              1/ 1 / 2 / 2;
        display:                flex;
        justify-content:        center;
    }

    .button-indicator__container{
        height:                 3.5vh;
    }

    .button-part-indicator__container{
        height:                 4vh;
        align-items:            end;
    }

    .shift .button-indicator__container,
    .mode .button-indicator__container{
        height:                 4.5vh;
    }

    .button-indicator{
        border-radius:          50%;
        height:                 0.45vh;
        aspect-ratio:           1 /1;
    }

    .button.pattern-select .button-indicator{
        background:             var(--col-light);
    }

    .button-part-indicator{
        height:                 0.25vh;
        width:                  1.25vh;
    }

    .part-active .button-part-indicator{
        background:             var(--col-light);
    }

    /** BUTTON GUIDANCE */
    .button-guidance{
        font-family:            'Orbit';
        font-size:              1.25vh;        
        font-weight:            700;
        text-align:             center;
        line-height:            1.15;
        opacity:                0;
        transition:             all 500ms;
        z-index:                10;
    }

    :global(.button-guidance .group){
        font-style:             italic;
    }

    .modeguide .button-guidance{
        opacity:                1;
    }

    .modeguide.numpad .button-label,
    .modeguide.nav .button-label,
    .modeguide.button.pattern-select .button-indicator,
    .modeguide .button-part-indicator{
        opacity:                0.05;
    }

</style>