<!-- ROBOT DRUMMER: INSTRUMENT SYNCED SVG ANIMATION -->
<script>
    // Config
    import { groupPartPresets } from '$src/lib/module/data-operator/model/oe-10/operator/config/part-config';

    // Props
    let {model} = $props()

    // Models
    const {dataModel, sonification, strudel} = model

    // Config
    const drumMap = {
        kick_hitgroup:      [ 'bd' ],                   // kick      
        snare_hitgroup:     [ 'sd', 'cp', 'rim'],       // snare
        toms_hitgroup:      [ 'mt', 'lt', 'mt'],        // toms
        hats_hitgroup:      [ 'oh', 'hh'],              // hats
        cymbal_hitgroup:    [ 'cr', 'rd']               // crash and rides
    }

     /**
      * I.  GENERAL ANIMATION
      */
    let isPlaying = $derived(strudel.state.transport === 'playing')
    let animate = $derived.by( () => {
        const step = strudel.state?.time.step,
            beat = strudel.state?.time.beat

        const obj = {
            headRotation:    isPlaying && beat % 2 === 0 ? Math.random()* 3 + 3 : -(Math.random()* 5 + 5),
            footRotation:    isPlaying && step % 4 === 3 ? 10 : 0,
            mouthScaleX:     isPlaying && sonification.param.global.bpm > 90 ? 90 / sonification.param.global.bpm : 1,  
            mouthScaleY:     isPlaying && sonification.param.global.bpm > 90 ?  sonification.param.global.bpm / 90 : 1  
        }
        // const foot
        return obj
    })

     /**
      * II. DRUMMER ANIMATION
      */

    // i. Construct drumkit array from part1 and 2
    let drumkitData = $derived.by( () => {
        const part1_mute = sonification.param.C.part["1"].mute,
            part2_mute = sonification.param.C.part["2"].mute

        const part1_array = groupPartPresets["1"].sound[sonification?.state.selection.group["C"].part["1"].series]?.vis
                                .map( (d, i) => sonification.state.selection.group.C.part["1"].euclideanArray[i] && !part1_mute ? d : []) ,
            part2_array   = groupPartPresets["2"].sound[sonification?.state.selection.group["C"].part["2"].series]?.vis
                                 .map( (d, i) => sonification.state.selection.group.C.part["2"].euclideanArray[i] && !part2_mute  ? d : []) 

        return part1_array.map( (part1, i) =>  part1.concat(part2_array[i]) )
    })

    let activeDrum = $derived.by( () => {
        const halfStep = strudel.state?.time.halfStep,
            isStep = halfStep % 2 === 0,
            step = strudel.state?.time.halfStep

        const stepDrums = drumkitData[strudel.state?.time.step] ?? []
        
        const obj = {
            cymbal_hitgroup:    isPlaying && isStep && stepDrums?.map(d => drumMap.cymbal_hitgroup.includes(d)).includes(true) ,
            hats_hitgroup:      isPlaying && isStep && stepDrums?.map(d => drumMap.hats_hitgroup.includes(d)).includes(true) ,
            toms_hitgroup:      isPlaying && isStep && stepDrums?.map(d => drumMap.toms_hitgroup.includes(d)).includes(true),
            snare_hitgroup:     isPlaying && isStep && stepDrums?.map(d => drumMap.snare_hitgroup.includes(d)).includes(true),

        }
        const arm = !Object.values(obj).includes(true)
        const kick_hitgroup =   isStep && stepDrums?.map(d => drumMap.kick_hitgroup.includes(d)).includes(true)

        // => Return combined object of active drums
        return {...obj, kick_hitgroup, arm }
    })


    /**
     * II.  SYNTH ANIMATION
     */

    // i. Get pitch data
    const leadDataInterval = sonification.schema.group.A.pitch.interval,
        bassDataInterval = sonification.schema.group.B.pitch?.interval

    let sceneIndex = $derived(sonification.state.selection.sceneIndex),
        data     = $derived(dataModel.scene[sceneIndex])       // Modelled data for selected day

    // ii. Derive lead pitch data with euclidean pulses and mutes
    let leadData = $derived.by( () => {
        const pitchSeries = sonification.state.selection.group.A.pitchPattern,
            scale      = data.scale[leadDataInterval].A.pitch[pitchSeries].pitchScale,
            euclidean  = sonification.state.selection.group.A.euclideanArray,
            pitchData   = data.scaledData[leadDataInterval].A.pitch[pitchSeries].map(d => d.quantized),
            muted      = sonification.param.A.mute
        
        return pitchData.map( (d, i) => euclidean[i] && !muted? d : null ) 
    })

    // iii. Derive bass pitch data with euclidean pulses and mutes  
    const hasBass = bassDataInterval
    let bassData = $derived.by( () => {

        const pitchSeries = sonification.state.selection.group.B.pitchPattern,
            scale      = data.scale[leadDataInterval].B.pitch[pitchSeries].pitchScale,
            euclidean  = sonification.state.selection.group.B.euclideanArray,
            pitchData   = data.scaledData[leadDataInterval].B.pitch[pitchSeries].map(d => d.quantized),
            muted      = sonification.param.B.mute

        return pitchData.map( (d, i) => euclidean[i] && !muted ? d : null ) 
    })

    // iv. Derive "active" octaves by step
    let activeSynth = $derived.by( () => {
        const step = strudel.state?.time.step
        
        const obj = {
            octave_1:      isPlaying && hasBass && bassData[step] !== null,
            octave_2:      isPlaying && false ,
            octave_3:      isPlaying && leadData[step] !== null && leadData[step] <= 5,
            octave_4:      isPlaying && leadData[step] !== null && leadData[step] > 5
        }
        const arm = !Object.values(obj).includes(true)

        // => Return combined object of active synth octaves
        return {...obj, arm }
    })

</script>


<!-- HTML MARKUP -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 70">

    <g id="head-group" style = 'transform: rotate({animate.headRotation}deg)'>
        <path id="neck" d="M40.264 31.1722h10v1.3112h-10z"/>
        <rect id="head" width="22.2902" height="15.7343" x="34.1189" y="13.9026" rx="1.9668"/>
        <circle id="right-eye" cx="39.6382" cy="20.6429" r="2.6226" stroke-width="1.25" class="invert-stroke"/>
        <circle id="left-eye" cx="50.8793" cy="20.6429" r="2.6226" stroke-width="1.25" class="invert-stroke"/>
        <rect id="mouth" style ='transform: scale({animate.mouthScaleX}, {animate.mouthScaleY})' width="8.5575" height="1.5101" x="40.9852" y="25.8944" class="invert-fill" rx=".4583"/>
        <rect id="ear-right" width="3.25" height="6.5" x="29.5297" y="18.5" rx=".6"/>
        <rect id="ear-left" width="3.25" height="6.5" x="57.2203" y="18.5" rx=".5"/>
        <g id="antenna-group">
            <circle id="antenna-ball" cx="45.264" cy="6.4263" r="2.1513"/>
            <path id="antenna" d="M44.0838 12.9423 44.667 9.39l1.177.0119.6001 3.549z"/>
        </g>
    </g>

    <g id="torso-limbs-group">
        <rect id="torso" width="15.3554" height="15.3976" x="37.3223" y="34.0539" ry="1.639"/>
        <path id="leg-left" d="M48.41 50.1029c.618 1.5298.6792 1.4327 1.0141 2.2123l1.8078-1.3118s.4056.419-.0874-.9057c-.7524.0376-1.64.001-2.7346.0052z"/>
        <path id="leg-right" d="m41.0379 50.1066-2.7702-.0186s-.6084 3.96-.8219 6.7015l.0384.023c.4559-.1332.9348-.2074 1.4342-.2228.4865-.0102.9526.0256 1.393.1024.2087-2.7094.7265-6.5855.7265-6.5855z"/>
        <path id="right-foot" style = 'transform: rotate({animate.footRotation}deg)' d="M38.8537 57.7139h-.1178c-1.2216.0589-2.246.4891-3.0757 1.2933-.7887.7708-1.2446 1.7414-1.37 2.9169l.0384.0384 7.0784-.0436c.0333-.4737-.0128-1.0679-.1434-1.7747-.1357-.6709-.315-1.2343-.5378-1.6901-.1741-.2766-.4072-.4687-.694-.5788-.3304-.105-.7248-.1588-1.178-.1613z"/>
        <g id="right-arm-group" class ='arm-group' class:active={activeSynth.arm}>
            <path id="right-arm" d="M22.291 23.5226c-.7088.3405-2.2053.5834-3.2173.1933 1.4484 2.0919 3.7888 9.7938 16.7517 12.3492.0024-1.0505.3015-1.919 1.2989-2.4427-6.2392-1.5087-13.6023-6.153-14.8333-10.0998Z"/>
            <path id="right-devel-hand" d="M21.7813 12.8672c-.4113 0-.7461.331-.7461.7383v4.0996c.5339-.0124 1.1464.013 1.4082.1777.0283.0178.0567.0369.084.0547v-4.332c0-.4073-.335-.7383-.7462-.7383zm-5.0157.8516c-.4112 0-.746.331-.746.7382v4.922c0 2.1272 1.7454 3.8593 3.8925 3.8593a3.904 3.904 0 0 0 2.1211-.623 3.9037 3.9037 0 0 0 .5762-.4532c.217-.2069.3679-.4748.4355-.7773l.4414-1.9649c.065-.2917-.0543-.5913-.3008-.7636-.0027-.0022-.005-.0051-.0078-.0078-.0038-.0032-.3657-.319-.832-.6133-.3708-.234-1.7415-.1458-2.2383-.0918-.0033.0005-.0065 0-.0098 0-.433 0-.7851.3484-.7851.7773 0 .429.3526.7774.7851.7774.3136-.0146 1.3665-.0522 1.5645.084a.0898.0898 0 0 1 .0234.125.09.09 0 0 1-.125.0214c-.1009-.0691-.8367-.08-1.459-.0508-.5366 0-.9687-.4292-.9687-.957 0-.053.0049-.1055.0137-.1562-.1702.2014-.4258.332-.711.332-.5104 0-.9238-.4124-.9238-.918v-.0078c-.0005-.0038-.002-.0079-.002-.0117v-3.4902c0-.0022.002-.0037.002-.006 0-.0022-.002-.0037-.002-.0059 0-.4072-.333-.7382-.7441-.7382zm3.3438 2.123c-.4112 0-.7461.331-.7461.7383v1.5215a.9678.9678 0 0 1 .7305-.338c.0512-.0053.3676-.037.7597-.0527v-1.1308c0-.4073-.333-.7383-.7441-.7383zm-1.6739.166c-.4112 0-.744.333-.744.7402v1.211c0 .0022-.0015.005-.002.0078.0005.0038.002.0079.002.0117 0 .4073.3334.7383.744.7383.4107 0 .7442-.331.7442-.7383 0-.0043.0014-.0079.002-.0117V16.748c0-.4073-.3349-.7402-.7461-.7402z"/>
        </g>
        <g id="left-arm-group" class ='arm-group'  class:active={activeDrum.arm}>
            <path id="left-arm" d="M52.9617 33.6356c1.2674.664 1.2882.8165 1.3232 2.6405 5.1868-2.8138 15.5742-9.7619 17.0678-12.3746-1.3316.316-2.4203.2919-3.2796-.0533-.6297 2.221-9.604 6.3558-15.1114 9.7874z"/>
            <g id="left-hand">
                <path id="drum-devil-hand" d="M66.6576 18.6296c.0027-.0022.0055-.0038.0082-.0065.0038-.0032.3659-.3204.8322-.6148.3708-.2338 1.7414-.1458 2.2382-.0918a.0597.0597 0 0 0 .0098.0006c.433 0 .7848.349.7848.7778 0 .429-.3523.7779-.7848.7779-.3136-.0146-1.3667-.053-1.5647.0832a.0888.0888 0 0 0-.023.1242.0907.0907 0 0 0 .1255.0227c.101-.0691.8355-.0805 1.4578-.0513.5366 0 .9696-.429.9696-.9567a.9218.9218 0 0 0-.0141-.1556.9286.9286 0 0 0 .7106.3306c.5104 0 .9255-.4116.9255-.9172 0-.0027-.0006-.0049-.0006-.0076a.088.088 0 0 0 .0011-.0119v-3.49c0-.0022-.0005-.0038-.0005-.006 0-.0021.0005-.0037.0005-.0058 0-.4073.3343-.739.7455-.739.4113 0 .7456.3317.7456.739v4.9221c0 2.1273-1.7463 3.858-3.8935 3.858-.7564 0-1.49-.215-2.1215-.6224a3.8895 3.8895 0 0 1-.5748-.4526c-.217-.207-.3681-.476-.4357-.7784l-.4407-1.9647a.735.735 0 0 1 .2989-.7638zm5.4968-.6887a.088.088 0 0 0-.0011.0119c0 .4073-.3343.7384-.745.7384s-.745-.3311-.745-.7384a.0871.0871 0 0 0-.001-.0124v-1.2192c0-.4073.3342-.739.7454-.739.4112 0 .7456.3317.7456.739v1.2127c0 .0022.0005.0043.001.007zm-1.6732.1355a.9676.9676 0 0 0-.7302-.3381 12.4252 12.4252 0 0 0-.7614-.054v-1.1296c0-.4073.3343-.739.7455-.739.4112 0 .7461.3317.7461.739zm-3.0802-.2187a5.5664 5.5664 0 0 0-.0834.0534v-4.3316c0-.4073.3343-.739.7455-.739.4112 0 .7455.3317.7455.739v4.0989c-.534-.0124-1.1458.0146-1.4076.1793z"/>
                <rect id="drum-devil-stick" width="13.0668" height="1.1944" x="-75.4931" y="-2.1762" stroke-width=".25" class="invert-stroke" rx=".6329" transform="scale(-1 1) rotate(-16.622)"/>
                <path id="drum-devil-thumb" d="M66.6576 18.6296c.0027-.0022.0055-.0038.0082-.0065.0038-.0032.3659-.3204.8322-.6148.3708-.2338 1.7414-.1458 2.2382-.0918a.0597.0597 0 0 0 .0098.0006c.433 0 .7848.349.7848.7778 0 .429-.3523.7779-.7848.7779-.3136-.0146-1.3667-.053-1.5647.0832a.0888.0888 0 0 0-.023.1242c.0285.0405.1255.0227.1255.0227l-1.4846 1.6551-.4406-1.9646a.735.735 0 0 1 .2989-.7638z"/>
            </g>
        </g>
    </g>

    <g id="synth-group">
        <path id="keyboard-stand" d="M32.0799 47.3516c-.2987-.2657-.784-.2657-1.0827 0l-9.4146 8.3747-9.4137-8.3747c-.2987-.2657-.784-.2657-1.0826 0-.2987.2657-.2987.6974 0 .9631l9.4136 8.3747-9.4146 8.3738c-.2987.2657-.2987.6974 0 .9631.1503.1337.3456.2001.5418.2001.1962 0 .3915-.0664.5418-.1992l9.4136-8.3747 9.4137 8.3738c.1503.1337.3456.2.5418.2.1962 0 .3915-.0664.5418-.1992.2987-.2657.2987-.6974 0-.963l-9.4147-8.3747 9.4147-8.3739c.2987-.2665.2987-.6974 0-.9639z"/>
        <g id="synth-body-group">
            <rect id="synth-body-bg" width="2.5499" height="4.4728" x="36.129" y="44.1162" fill="#fff" class="invert-fill" ry="1.214"/>
            <rect id="synth-body" width="32.3287" height="3.5832" x="5.9319" y="44.5259" ry=".9318"/>
        </g>
        <path id="synth-controls" d="m18.2144 41.5196-.9375.0136-.6075 1.5332h1.0508zm-2.209.0176-.7969 1.5292h1.0234l.6036-1.5175zm16.537.002a.7272.7272 0 0 0-.1054.002h-.4492l.9531 1.5253h.959l-.914-1.2578c-.1106-.1271-.2176-.2576-.4434-.2695zm-20.1581.002c-.1857 0-.3603.074-.4688.1972l-1.168 1.328h1.0079l1.0976-1.5253zm1.0039 0-1.0977 1.5253h.957l.9532-1.5253zm1.3125 0-.9531 1.5253h.9941l.8047-1.5253zm3.9472 0-.5136 1.5253h1.0722l.3653-1.5253zm1.3204 0-.3672 1.5253h1.0879l.2207-1.5253zm1.3222 0-.2207 1.5253h1.0996l.0723-1.5253zm1.3262 0-.0723 1.5253h1.1016l-.0742-1.5253zm1.33 0 .0723 1.5253h1.0997l-.2207-1.5253Zm1.334 0 .2188 1.5253h1.0879l-.3652-1.5253zm1.336 0 .3652 1.5253h1.0723l-.5117-1.5253zm4.0254 0 .8066 1.5253h.9922l-.9531-1.5253zm-2.6582.0175.4844 1.5078h1.0507l-.582-1.498zm1.3789.002.5937 1.5059H30.98l-.7637-1.504ZM11.103 43.258c-.2078 0-.404.018-.5254.0468l-1.3086.3106h1.127l1.2305-.3575zm1.123 0-1.2304.3574h1.0723l1.0664-.3574zm1.4669 0-1.0645.3574h1.1113l.9004-.3574zm1.461 0-.8927.3574h1.1465l.6758-.3555zm2.957 0-.5743.3574h1.1992l.4102-.3574zm1.4765 0-.4102.3574h1.2188l.246-.3574zm1.4805 0-.2461.3574h1.2304l.082-.3574zm1.4843 0-.082.3574h1.2324l-.082-.3574zm1.4883 0 .082.3574h1.2286l-.2461-.3574Zm1.4922 0 .2461.3574h1.2168l-.4082-.3574zm6 0 .9024.3574h1.1113L32.48 43.258zm1.5078 0 1.0645.3574h1.0722l-1.2285-.3574zm-4.4824.0039.543.3535h1.1738l-.6504-.3496zm1.543.002.666.3515h1.1445l-.8535-.3516zm-16.3711.5526-1.043.3575h1.338l.791-.3535zm-4.7363.002c-.243 0-.4715.0162-.6133.045l-1.5293.3105h1.3183l1.4375-.3555zm1.3125 0-1.4375.3555h1.2539l1.246-.3555zm1.7167 0-1.246.3555h1.2988l1.0527-.3555Zm5.1622 0-.672.3555h1.4024l.4785-.3555zm1.7265 0-.4804.3555h1.4238l.289-.3555zm1.7305 0-.2871.3555 7.1836.0137-.3301-.3477zm12.2305 0 1.0546.3555h1.2989l-1.2461-.3555zm1.7617 0 1.2441.3555h1.254l-1.4356-.3555Zm-5.2383.004.6348.3515h1.373l-.7617-.3496Zm1.8027 0 .7793.3515h1.338l-.998-.3516z"/>
    </g>

    <g id="drumkit-group">
        <path id="drumkit-frame" d="M80.0408 30.0352v-.7307c0-.5009-.4065-.9073-.9073-.9073s-.9073.4064-.9073.9073V59.994L75.03 63.1903l-3.1962-3.1962V52.332l-1.8146-.0006v7.6622l-3.691 3.6916a.9069.9069 0 0 0 0 1.283c.5229.4216 1.049.2345 1.2836 0l2.4074-2.408v4.112c0 .5008.4065.9072.9073.9072s.9073-.4064.9073-.9073v-4.1126l1.9133 1.9133-.9703.9702a.9069.9069 0 0 0 0 1.283c.523.4215 1.0076.276 1.2836 0l4.167-4.167v4.112c0 .5008.4065.9072.9073.9072.5009 0 .9073-.4064.9073-.9073v-4.1114l4.1665 4.167a.9044.9044 0 0 0 .6417.2656.9044.9044 0 0 0 .6418-.2655.9069.9069 0 0 0 0-1.283l-5.4494-5.45ZM66.2362 58.6289c0 5.5038-4.4615 9.966-9.966 9.966-5.505 0-9.966-4.4622-9.966-9.966 0-5.1977 3.9795-9.4615 9.0587-9.9194v-2.965h-.851v-1.8147h3.5167l.0006 1.814h-.851v2.9651c5.078.4591 9.058 4.7229 9.058 9.92zm-1.8914 0c0-4.4525-3.622-8.0751-8.0745-8.0751-4.4525 0-8.0752 3.622-8.0752 8.0752 0 4.452 3.622 8.0745 8.0751 8.0745 4.4526 0 8.0746-3.622 8.0746-8.0746z"/>
        <path id="snare-drum" d="M65.1261 47.7031h11.6583v3.7958H65.1261z"/>
        <path id="low-tom" d="M58.536 42.9951h6.9622v3.7773H58.536z"/>
        <g id="high-tom-group">
            <path id="high-tom-bg" d="M46.4188 42.4406h6.2533v4.7815h-6.2533z" class="invert-fill"/>
            <path id="high-tom" d="M47.0391 42.9427h6.9622V46.72h-6.9622z"/>
        </g>
        <circle id="kick-drum" cx="56.1262" cy="58.4945" r="6.8389"/>
        <path id="hats" class:active={activeDrum.hats_hitgroup}  d="m79.2324 41.168-6.125 1.7695h12.252zm-6.125 2.2129 6.125 1.7695 6.127-1.7695z"/>
        <ellipse id="cymbal" class:active={activeDrum.cymbal_hitgroup} cx="79.2051" cy="32.0786" rx="10.9911" ry="1.6562"/>
    </g>

    <g id="synth-play-group">
        <g id="synth-octave-4" class = 'pitch-group' class:active={activeSynth.octave_4}>
            <path id="octave-4-arm" d="M15.5368 37.725c.9678.1925 1.0865.4849 1.3896 1.3182 4.624-3.8612 14.8919-2.4984 18.7434-2.679.0024-.8849-.2382-1.9375 1.317-2.6637-6.4013-1.995-17.9702-.2265-21.45 4.0245z"/>
            <path id="octave-4-hand" d="m15.8126 38.444-.0543-.0324c-.3334-.203-.71-.2512-1.1282-.1448-.381.1127-.671.3426-.871.6918-.2833.5436-.2477 1.0784.1077 1.6053l.0168-.001 1.0444-1.3647a.2858.2858 0 0 1 .0583-.0589c.0922-.068.1922-.0865.3004-.0534.101.0329.1707.1079.2104.2274.0214.0838.0101.1657-.0321.2454l-1.066 1.3983.0147.0437c.3386.1604.701.1755 1.0853.0485a1.4544 1.4544 0 0 0 .4876-.2905c.0802-.061.1792-.1857.2959-.3747a1.5017 1.5017 0 0 0 .178-.5421 1.2852 1.2852 0 0 0 .0098-.19l-.004-.0949a1.5482 1.5482 0 0 0-.0269-.19c-.0858-.392-.2945-.7-.6268-.9232z"/>
        </g>
        <g id="synth-octave-3" class = 'pitch-group' class:active={activeSynth.octave_3}>
            <path id="octave-3-arm" d="M19.7433 37.9083c.9879-.1287 1.6871-.0065 1.9903.8268 4.624-3.7007 10.2395-3.023 13.8702-2.762-.0254-.8988.2553-1.738 1.3942-2.27-7.2844-1.1117-13.0322 1.2187-17.2547 4.2052z"/>
            <path id="octave-3-hand" d="m20.28 38.404-.063-.0051c-.3887-.0355-.748.0872-1.0766.367-.2925.269-.4515.603-.4773 1.0046-.015.6128.2526 1.0773.8038 1.3937l.0146-.0083.3366-1.6852a.2853.2853 0 0 1 .0264-.0785c.0527-.1017.1344-.1623.2462-.1803.1052-.015.2007.0217.289.1115.056.0658.082.1443.0793.2345l-.3412 1.7248.0325.0328c.3746-.0052.7067-.1513.9957-.4345a1.4544 1.4544 0 0 0 .3098-.4755c.0452-.0901.079-.2457.1005-.4668a1.5015 1.5015 0 0 0-.079-.565 1.2857 1.2857 0 0 0-.0748-.175l-.0453-.0833a1.5485 1.5485 0 0 0-.1079-.1588c-.2497-.3141-.5728-.4988-.9693-.5528z"/>
        </g>
        <g id="synth-octave-2" class = 'pitch-group' class:active={activeSynth.octave_2}>
            <path id="octave-2-arm" d="m25.2608 38.752-.0617.0014c-.3816.0057-.7039.1477-.9658.4247-.2292.2642-.317.5729-.2632.9283.1057.54.4545.923 1.0477 1.1488l.0125-.0086-.0057-1.5131a.2184.2184 0 0 1 .01-.0715c.031-.0945.0978-.1554.202-.1818.0985-.0232.1978 0 .3004.0705.067.0525.1074.1191.1224.1986l.009 1.5484.0377.0257c.36-.04.6515-.2.8747-.4763a1.0997 1.0997 0 0 0 .2054-.4474c.0259-.0835.028-.2234.0055-.4198-.0287-.1711-.0906-.3338-.1869-.4891-.0315-.05-.0667-.1-.1064-.1467l-.06-.069a1.6633 1.6633 0 0 0-.135-.1292c-.3023-.2524-.6499-.384-1.0426-.394z"/>
            <path id="octave-2-hand" d="M36.8968 33.6606c-8.838.7371-11.193 3.201-11.6952 4.6079.5302.0012 1.1138.1646 1.3575.6117 1.6855-2.3659 5.4415-2.6788 9.1016-2.8976.0301-.9636.3222-1.7717 1.2361-2.322z"/>
        </g>
        <g id="synth-octave-1" class = 'pitch-group' class:active={activeSynth.octave_1}>
            <path id="octave-1-arm" d="M36.8388 33.6886c-2.6026 1.0607-6.2884 2.9699-7.5458 4.7868.4591.0012 1.1604-.0082 1.5552.625 1.254-1.3518 2.917-2.2257 5.002-2.6387-.0531-.7417-.0922-1.7958.9886-2.7731z"/>
            <path id="octave-1-hand" d="m29.1688 38.9688-.0597.0155c-.3703.0925-.6518.304-.8437.6335-.163.3094-.1781.63-.0448.9638.2259.5018.6527.7952 1.2818.88l.0102-.0113-.3502-1.472a.218.218 0 0 1-.0065-.072c.0086-.0989.0599-.1735.1553-.223.0906-.045.1925-.045.3086.0003.0771.0359.1316.0915.1643.1655l.3616 1.5056.0425.0165c.3415-.121.5889-.3431.7432-.663a1.0997 1.0997 0 0 0 .098-.4824c.0063-.0872-.0234-.224-.0902-.41-.067-.1601-.1642-.3044-.2934-.4338a1.2845 1.2845 0 0 0-.137-.1185l-.0742-.0535a1.6652 1.6652 0 0 0-.1609-.0951c-.3518-.177-.7202-.226-1.1049-.146z"/>
        </g>
    </g>

    <g id="drum-play-group">
        <g id="cymbal_hitgroup" class = 'hit-group' class:active={activeDrum.cymbal_hitgroup}>
            <path id="cymbal-arm" d="M52.8419 33.5596c1.1122.5262 1.4696.686 1.4629 2.6895 3.9546-3.3738 7.7112-5.3842 12.1173-3.7402l1.9232-.5594c-3.318-3.828-12.1243-2.0455-15.5034 1.6101Z"/>
            <rect id="cymbal-stick" width="9.1757" height="1.0472" x="53.9676" y="50.5438" rx=".5541" transform="rotate(-16.382)"/>
            <path id="cymbal-impact" d="m71.517 27.1087 1.1504 3.0434c.2056.5605.4186.5683.2757-.0557l-.7035-3.0733c-.1578-.6347-.9069-.402-.7225.0856zm6.2703.5735-1.6986 2.7213c-.317.497-.1794.6525.232.1604l2.025-2.4232c.41-.5094-.2862-.8943-.5583-.4583zm-2.8785-1.6-.3827 3.162c-.076.58.1146.674.2779.0639l.8047-3.0053c.1549-.626-.6386-.7272-.7001-.2206z"/>
        </g>
        <g id="hats_hitgroup" class = 'hit-group'  class:active={activeDrum.hats_hitgroup}>
            <path id="hats-arm" d="M52.8605 33.5237c1.4718.7637 1.4763 1.0419 1.4432 2.3196 4.6275-.376 10.738 1.543 13.6092 4.3763.1332-.6101 1.6153.0771 2.4868.331-3.318-3.8278-8.9475-7.8607-17.5392-7.027z"/>
            <rect id="hats-stick" width="7.1436" height="1.0472" x="76.6258" y="20.0984" rx=".4314" transform="rotate(16.157)"/>
            <path id="hits-impact" d="m77.2461 41.1446-1.5923 1.377c-.2898.2554-.4118.1944-.1374-.1165l1.3507-1.531c.286-.3124.6341.05.379.2705zm-3.6979-1.5997.107 2.0688c.0233.38-.1023.426-.1801.02l-.383-1.9996c-.0716-.4154.439-.4205.456-.089zm2.1135-.0255-.7688 1.9152c-.1377.353-.274.348-.1759-.0491l.4831-1.9556c.1078-.4035.5847-.2173.4616.0896z"/>
        </g>
        <g id="toms_hitgroup" class = 'hit-group' class:active={activeDrum.toms_hitgroup}>
            <path id="toms-arm" d="M54.2084 34.9247c.024.861-.016 1.5622 0 2.3177 2.813.3298 4.4114 2.971 4.4114 2.971l1.0721.3952s-.5182-3.7762-5.4835-5.6839z"/>
            <rect id="toms-stick" width="5.442" height=".7549" x="67.1311" y="20.7651" rx=".2997" transform="rotate(17.863)"/>
            <path id="toms-impact" d="m62.9382 42.2966 1.994-.2383-.054.6889zm-.0313-.469 1.0176-.876.4352.5896zm-.4139-.185-.5088-.9422.8237-.2531z"/>
        </g>
        <g id="snare_hitgroup" class = 'hit-group' class:active={activeDrum.snare_hitgroup}>
            <path id="snare-arm" d="M54.0567 34.377c.353.488.1594 2.1717.1755 2.9272 4.594.3298 9.2226 2.5983 12.5032 5.8294.4631-.6592.8072-.7945 2.1453.3211-5.1122-5.1776-6.8533-7.8856-14.824-9.0777z"/>
            <rect id="snare-stick" width="6.0764" height="1.0789" x="79.9445" y="-4.2448" rx=".367" transform="rotate(35.572)"/>
            <path id="snare-impact" d="m72.6226 47.3054 2.3743-.6981-.152.7029zm.177-.7587 1.428-1.3262.5699.6649zm-2.0316.7021-1.9358.0044.114-.8929zm1.4553-1.2874-.551-1.6148.95-.057z"/>
        </g>
        <g id="kick_hitgroup" class="hit-group invert-fill" transform="matrix(.7717 0 0 .7483 12.8685 14.6808)" class:active={activeDrum.kick_hitgroup}>
            <circle id="kick-impact-1" class ='invert-stroke' cx="56.1262" cy="58.4945" r="1.3978" fill="none" stroke="#fff"stroke-width=".2044"/>
            <circle id="kick-impact-2" class ='invert-stroke' cx="56.1262" cy="58.4945" r="2.7956" fill="none" stroke="#fff"stroke-width=".4088"/>
            <circle id="kick-impact-3" class ='invert-stroke' cx="56.1262" cy="58.4945" r="4.1934" fill="none" stroke="#fff"stroke-width=".6132"/>       
        </g>
    </g>
</svg>


<!-- STYLES -->
<style>
    svg{ 
        overflow:           visible;
        opacity:            0.65;
        width:              100%;
        fill:               var(--pixel-0);
    }

    /* Inverted fill and stroke */
    .invert-stroke{
        stroke:             var(--screen-bg);
    }
    .invert-fill{
        fill:               var(--screen-bg);
    }

    /* Setup of individual "part" animations with rotation */
    #mouth, #head-group, #head-group, #right-foot,#cymbal, #hats{
        transform-box:      fill-box
    }
    #mouth{
        transform-origin:   50% 50%;
    }
    #head-group{
        transform-origin:   50% 100%;
    }
    #right-foot{
        transform-origin:   100% 100%;
    }
    #cymbal,
    #hats{
        transform-origin:   50% 0%;
    }
    
    #cymbal.active,
    #hats.active{
        transform:          rotate(-20deg);
    }
    #cymbal.active{
        transform:          rotate(-30deg);
    }

    .arm-group,
    .pitch-group,
    .hit-group{
        opacity:            0
    }

    .arm-group.active,
    .pitch-group.active,
    .hit-group.active{
        opacity:            1;
    }

</style>