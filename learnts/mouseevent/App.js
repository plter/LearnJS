/**
 * Created by plter on 3/4/16.
 */
var plter;
(function (plter) {
    var App = (function () {
        function App() {
            this.info = document.getElementById("info");
            this.canvas = document.getElementById("canvas");
            this.canvas.addEventListener("click", function (event) {
                this.info.innerHTML = "x:" + event.clientX + ",y:" + event.clientY;
            }.bind(this));
        }
        return App;
    })();
    plter.App = App;
})(plter || (plter = {}));
new plter.App();
//# sourceMappingURL=App.js.map