// DFAM Punch FX
export const punchFX =  {
    reverb:  {
        key:        0,
        label:      'Deep<br>reverb',
    }, 
    crusher: {
        key:        1,
        label:      'Bit<br>crusher',
        code:       '.crush(3)'
    },       
    distortion: {
        key:        2,
        label:      'Distortion',
        code:       '.distort(5)',
        postGain:   `1/8`
    },          
    filterLP:{
        key:        3,
        label:      'Low pass<br>filter<br>sweep',
        code:       `.lpf(sine.range(50, 80).slow(2))`
    },           
    juxPress: {
        key:        4,
        label:      'Juxta<br>stereo<br>syncopate',
        code:       `.jux(press)`
    },      
    juxRev:   {
        key:        5,
        label:      'Juxta<br>stereo<br>reverse',
        code:       `.jux(rev)`
    }, 
    filterHP: {
        key:        6,
        label:      'High pass<br>filter<br>sweep',
        code:       `.hpf(sine.range(2000, 3000).slow(2))`
    },     
    vibrato:  {
        key:        7,
        label:      'Vibrato',
        code:       `.vib(sine.range(0, 0.5)).vibmod(2)`
    },     
    delay:  {
        key:        8,
        label:      'Delay',
        code:        `.delay(0.5)`
    },  
    panner:  {
        key:        9,
        label:      'Panner',
        code:       `.pan(sine.fast(1))`
    },  

    doubleTime: {
        key:        'plus',
        label:      'Double<br>time',
        code:       `.fast(2)`
    },    
    halfTime:   {
        key:        'minus',
        label:      'Half<br>time',
        code:       `.slow(2)`
    }
}