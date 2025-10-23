/**
 * CUSTOM HANDLERS FOR DFAM EDITIONS
 */
export function addCustomHandlersDFAM(sonification){

    // DFAM
    sonification.handle.toggleOscPitch = (oscNo) => {
        // 1. Toggle pitch sync
        sonification.param.synth.DFAM[`osc${oscNo}pitched`] = !sonification.param.synth.DFAM[`osc${oscNo}pitched`]
        // 2. Handle user message
        sonification.state.userMessage.text = `Oscillator #${oscNo} pitch sync ${sonification.param.synth.DFAM[`osc${oscNo}pitched`]? 'on' : 'off'}`
        sonification.handle.userMessage()
        // => Call update
        sonification.handle.update()
    }

    sonification.handle.cycleOscType = (oscNo) => {
        // 1. Cycle oscillator type
        const types = ['square', 'triangle']
        sonification.param.synth.DFAM[`vco${oscNo}wave`] = util.cycleFromValue(types, sonification.param.synth.DFAM[`vco${oscNo}wave`], 1)

        // 2. Handle user message
        sonification.state.userMessage.text = `Osc. #${oscNo} changed to ${sonification.param.synth.DFAM[`vco${oscNo}wave`]}`
        sonification.handle.userMessage()

        // => Call update
        sonification.handle.update()
    }

    sonification.handle.cycleNoiseType = () => {
        // 1. Cycle oscillator type
        const types = ['white', 'pink', 'brown']
        sonification.param.synth.DFAM.noiseType = util.cycleFromValue(types, sonification.param.synth.DFAM.noiseType, 1)

        // 2. Handle user message
        sonification.state.userMessage.text = `Noise type changed to ${sonification.param.synth.DFAM.noiseType}`
        sonification.handle.userMessage()

        // => Call update
        sonification.handle.update()
    }

    sonification.handle.adjustNoiseLevel = (gainChange) => {
        // 1. Calculate newGain clamped to min/max
        const minGain = 0, maxGain = 1
        const newGain = Math.min(Math.max( sonification.param.synth.DFAM.noiseLvl + gainChange, minGain), maxGain)

        // 2. Update param
        sonification.param.synth.DFAM.noiseLvl = newGain

        // 3. Handle user message
        sonification.state.userMessage.text = `Noise level changed to ${d3.format('.2f')(sonification.param.synth.DFAM.noiseLvl)}`
        sonification.handle.userMessage()

        // => Call update
        sonification.handle.update()
    }

    sonification.handle.toggleSidechain = () => {
        // 1. Update orbt (toggle between 1 and 2)
        sonification.param.synth.DFAM.duck = !sonification.param.synth.DFAM.duck

        // 2. Handle user message
        sonification.state.userMessage.text = `Ducking is ${sonification.param.synth.DFAM.orbit === 1 ? 'off' : 'on' }`
        sonification.handle.userMessage()
        // => Call update
        sonification.handle.update()
    }
}

