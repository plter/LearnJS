/**
 * Created by plter on 3/31/16.
 */

plter.Rectangle = function () {
    return {
        __proto__: plter.Display(),

        _width: 100, _height: 100, _color: "#000000",
        _type: plter.RectangleType.TYPE_NORMAL, index: plter.Index2D(),
        preRect: null, gScore: 0, hScore: 0, fScore: 0,

        RectangleInit: function (width, height, type) {
            this._width = width || this._width;
            this._height = height || this._height;
            this.type = type || this._type;

            return this;
        },
        /**
         *
         * @param context {CanvasRenderingContext2D}
         */
        onDrawContent: function (context) {
            context.fillStyle = this._color;
            context.fillRect(0, 0, this._width, this._height);
        },

        computeHScore: function (endRect) {
            this.hScore = Math.sqrt(Math.pow(this.index.x - endRect.index.x, 2) + Math.pow(this.index.y - endRect.index.y, 2));
        },

        computeFScore: function (endRect) {
            this.fScore = this.gScore + this.hScore;
        },

        get centerX() {
            return this.x + this._width / 2;
        },

        get centerY() {
            return this.y + this._height / 2;
        },

        get type() {
            return this._type;
        },
        set type(value) {
            this._type = value;

            switch (this._type) {
                case plter.RectangleType.TYPE_NORMAL:
                    this._color = "#dddddd";
                    break;
                case plter.RectangleType.TYPE_BLOCK:
                    this._color = "#000000";
                    break;
                case plter.RectangleType.TYPE_START:
                    this._color = "#0000ff";
                    break;
                case plter.RectangleType.TYPE_END:
                    this._color = "#00ff00";
                    break;
                case plter.RectangleType.TYPE_WAY:
                    this._color = "#00ffff";
                    break;
                default:
                    this._color = "#ff0000";
                    break;
            }
        }
    }
};

plter.Rectangle.fScoreSortFunc = function (obj1, obj2) {
    return obj1.fScore > obj2.fScore;
};

plter.RectangleType = {
    TYPE_NORMAL: 0,
    TYPE_BLOCK: 1,
    TYPE_START: 2,
    TYPE_END: 3,
    TYPE_WAY: 4
};