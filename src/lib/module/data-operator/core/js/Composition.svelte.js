/**
 *  COMPOSITION CLASS FOR STRUDEL-SONIFICATION
 *  - Custom methods to 
 *  - Used for synching sonification, visuals and UI
 */


// => 
export class Composition{

    state      = $state()

    /////////////////////
    //// CONSTRUCTOR ////
    /////////////////////

    constructor(app, sonification, strudel ){
        // Add app and module references
        this.app           = app
        this.sonification  = sonification
        this.strudel       = strudel

        // Add composition to sonification state
        this.sonification.state.composition = this
    }

    //////////////////////////
    ////  PUBLIC METHODS  ////
    //////////////////////////

    init(){
        // this.sonification.param.A.gain = 0        
        // this.sonification.param.C.gain = 0        
    }

    schedule(){

        // Composition based on cycles
        if(this.strudel.state.time.cycle === 0){
            // this.sonification.param.C.gain = 0
            this.sonification.handle.updateREPL()
        }

        // if(this.strudel.state.time.cycle === 2){
        //     console.log('Update for cycle', this.strudel.state.time.cycle)
        //     this.sonification.param.C.gain = 0.5
        //     this.sonification.handle.updateREPL()
        // }

        // if(this.strudel.state.time.cycle === 2){
        //     console.log('Update for cycle', this.strudel.state.time.cycle)
        //     this.sonification.param.C.gain = 0.5
        //     this.sonification.handle.updateREPL()
        // }

        // if(this.strudel.state.time.cycle === 8){
        //     console.log('Update for cycle', this.strudel.state.time.cycle)
        //     this.sonification.param.percussion.gain = 0
        //     this.sonification.handle.updateREPL()
        // }

        // if(this.strudel.state.time.cycle === 10){
        //     console.log('Update for cycle', this.strudel.state.time.cycle)
        //     this.sonification.param.percussion.gain = 0.5
        //     this.sonification.handle.updateREPL()
        // }
    }
}
