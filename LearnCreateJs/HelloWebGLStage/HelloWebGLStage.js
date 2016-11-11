/**
 * Created by plter on 3/28/16.
 */


(function () {

    function App(){

        this.init = function () {
            this._stage = new createjs.SpriteStage("canvas");
        };

        this.init();
    }

    new App();
}());