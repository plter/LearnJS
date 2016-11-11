/**
 * Created by plter on 2/24/16.
 */
var plter;
(function (plter) {
    var App = (function () {
        function App() {
            this.divClock = document.getElementById("div_clock");
            this.showTimeHandler();
        }
        App.prototype.showTimeHandler = function () {
            var date = new Date();
            this.divClock.innerText = date.toString();
            setTimeout(this.showTimeHandler.bind(this), 999);
        };
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=app.js.map