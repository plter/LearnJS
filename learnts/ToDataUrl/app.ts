///<reference path="../libs/jquery.d.ts"/>
/**
 * Created by plter on 2/24/16.
 */

namespace plter{
    export class App{

        private btnToDataUrl;

        constructor() {
            this.initUI();
            this.renderUI();
            this.addListeners();
        }

        private initUI():void {
            this.btnToDataUrl = jQuery("#btn_to_data_url");
        }

        private renderUI(){
            this.btnToDataUrl.button();
        }

        private addListeners():void {
            this.btnToDataUrl.click(this.btnToDataUrlClickedHandler.bind(this));
        }

        private btnToDataUrlClickedHandler():void{
            location.href = "data:application/octet-stream;base64,"+btoa("Hello World");
        }
    }
}

new plter.App();