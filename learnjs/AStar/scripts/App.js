/**
 * Created by plter on 3/31/16.
 */

plter.App = function () {
    return {
        _context: null,
        _randomMap: null,
        _msgDiv: null,

        AppInit: function () {
            this._msgDiv = document.getElementById("msg");

            this._context = document.getElementById("canvas").getContext("2d");

            this._randomMap = plter.RandomMap().RandomMapInit();
            this._randomMap.render(this._context);

            return this;
        }

        , btnResetMapClicked: function () {
            this._context.clearRect(0, 0, this._context.canvas.width, this._context.canvas.height);
            this._randomMap.resetMap();
            this._randomMap.render(this._context);
        }

        , btnFindWayClicked: function () {
            var way = this._randomMap.findWay();
            if (way) {
                this._randomMap.showWay(this._context);
                this._msgDiv.innerHTML = "";
            } else {
                this._msgDiv.innerHTML = "<div style='color: red'>找不到路</div>";
            }
        }
    };
};

var app = plter.App().AppInit();
