/**
 * Created by plter on 3/31/16.
 */

plter.RandomMap = function () {
    return {
        __proto__: plter.Container()
        , _rows: 40, _columns: 60
        , _map: [], _rectangleWidth: 10, _rectangleHeight: 10,
        _closeSet: [], _openSet: [], _paths: [],
        _theRect: null, _dstRect: null, _endRect: null, _theWay: null,

        RandomMapInit: function () {
            this.resetMap();
            return this;
        },

        _getRandomMapType: function () {
            return Math.random() > 0.3 ? plter.RectangleType.TYPE_NORMAL : plter.RectangleType.TYPE_BLOCK;
        },

        _createRectWithType: function (type) {
            return plter.Rectangle().RectangleInit(this._rectangleWidth, this._rectangleHeight, type);
        },

        resetMap: function () {
            this.removeAllChild();

            this._theRect = this._createRectWithType(plter.RectangleType.TYPE_START);

            this._dstRect = this._createRectWithType(plter.RectangleType.TYPE_END);
            this._dstRect.index.x = this._columns - 1;
            this._dstRect.index.y = this._rows - 1;
            this.syncPositionByIndex(this._dstRect);

            var i = 0, j = 0, rect;
            for (i = 0; i < this._columns; i++) {
                this._map[i] = [];
            }

            for (i = 0; i < this._columns; i++) {
                for (j = 0; j < this._rows; j++) {
                    rect = this._createRectWithType(this._getRandomMapType());
                    rect.index.x = i;
                    rect.index.y = j;
                    rect.computeHScore(this._dstRect);
                    this.syncPositionByIndex(rect);
                    this._map[i][j] = rect;
                    this.addChild(rect);
                }
            }

            this.addChild(this._theRect);
            this.addChild(this._dstRect);
        },

        find: function (currentRect) {

            if (!this._theWay) {

                if (currentRect.hScore == 0) {
                    this._theWay = currentRect;
                } else {

                    //console.log(currentRect.index.x, currentRect.index.y);

                    var neighbors = this.getNeighbors(currentRect);
                    if (neighbors.length) {
                        neighbors.forEach(function (obj) {
                            this._openSet.push(obj);
                        }.bind(this));

                        this._openSet.sort(plter.Rectangle.fScoreSortFunc);
                    } else {
                        this._openSet.remove(currentRect);
                        this._closeSet.push(currentRect);
                    }

                    if (this._openSet.length) {
                        var node = this._openSet.shift();
                        this._closeSet.push(node);
                        this.find(node);
                    }
                }
            }
        },

        findWay: function () {
            this._theWay = null;
            this._closeSet.length = 0;
            this._openSet.length = 0;

            var startRect = this._map[this._theRect.index.x][this._theRect.index.y];
            startRect.type = plter.RectangleType.TYPE_NORMAL;
            this._endRect = this._map[this._dstRect.index.x][this._dstRect.index.y];
            this._endRect.type = plter.RectangleType.TYPE_NORMAL;
            startRect.computeFScore(this._endRect);
            this._openSet.push(startRect);
            this.find(startRect);

            if (this._theWay) {
                return this._theWay;
            }

            return null;
        },

        /**
         *
         * @param context {CanvasRenderingContext2D}
         */
        showWay: function (context) {
            if (this._theWay) {

                context.save();

                context.strokeStyle = "#ff0000";
                var rect = this._theWay;

                context.beginPath();
                context.moveTo(rect.centerX, rect.centerY);
                rect = rect.preRect;

                while (rect) {
                    context.lineTo(rect.centerX, rect.centerY);
                    rect = rect.preRect;
                }
                context.stroke();

                context.restore();
            }
        },

        syncPositionByIndex: function (rect) {
            rect.x = this._rectangleWidth * rect.index.x;
            rect.y = this._rectangleHeight * rect.index.y;
        },

        getNeighbors: function (currentRect) {
            var neighbors = [];

            if (currentRect.index.x > 0) {
                var left = this._map[currentRect.index.x - 1][currentRect.index.y];
                if (left.type == plter.RectangleType.TYPE_NORMAL && !this._closeSet.hasObj(left) && !this._openSet.hasObj(left)) {
                    left.gScore = currentRect.gScore + 1;
                    left.preRect = currentRect;
                    left.computeFScore(this._endRect);
                    neighbors.push(left);
                }
            }
            if (currentRect.index.x < this._columns - 1) {
                var right = this._map[currentRect.index.x + 1][currentRect.index.y];
                if (right.type == plter.RectangleType.TYPE_NORMAL && !this._closeSet.hasObj(right) && !this._openSet.hasObj(right)) {
                    right.gScore = currentRect.gScore + 1;
                    right.preRect = currentRect;
                    right.computeFScore(this._endRect);
                    neighbors.push(right);
                }
            }
            if (currentRect.index.y > 0) {
                var up = this._map[currentRect.index.x][currentRect.index.y - 1];
                if (up.type == plter.RectangleType.TYPE_NORMAL && !this._closeSet.hasObj(up) && !this._openSet.hasObj(up)) {
                    up.gScore = currentRect.gScore + 1;
                    up.preRect = currentRect;
                    up.computeFScore(this._endRect);
                    neighbors.push(up);
                }
            }
            if (currentRect.index.y < this._rows - 1) {
                var down = this._map[currentRect.index.x][currentRect.index.y + 1];
                if (down.type == plter.RectangleType.TYPE_NORMAL && !this._closeSet.hasObj(down) && !this._openSet.hasObj(down)) {
                    down.gScore = currentRect.gScore + 1;
                    down.preRect = currentRect;
                    down.computeFScore(this._endRect);
                    neighbors.push(down);
                }
            }

            return neighbors;
        }
    }
};