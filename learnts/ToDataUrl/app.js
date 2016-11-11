///<reference path="../libs/jquery.d.ts"/>
/**
 * Created by plter on 2/24/16.
 */
var plter;
(function (plter) {
    var App = (function () {
        function App() {
            this.initUI();
            this.renderUI();
            this.addListeners();
        }
        App.prototype.initUI = function () {
            this.btnToDataUrl = jQuery("#btn_to_data_url");
        };
        App.prototype.renderUI = function () {
            this.btnToDataUrl.button();
        };
        App.prototype.addListeners = function () {
            this.btnToDataUrl.click(this.btnToDataUrlClickedHandler.bind(this));
        };
        App.prototype.btnToDataUrlClickedHandler = function () {
            location.href = "data:application/octet-stream;base64," + btoa("Hello World");
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=app.js.map