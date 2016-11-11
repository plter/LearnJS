/**
 * Created by plter on 3/28/16.
 */

(function () {

    function App(){
        this.init = function(){
            this._stage = new createjs.Stage("canvas");

            this._text = new createjs.Text("Hello World");
            this._stage.addChild(this._text);

            this._stage.update();
        };


        this.init();
    }


    new App();
}());