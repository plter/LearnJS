/**
 * Created by plter on 3/31/16.
 */

plter.Display = function () {
    return {
        _x: 0, _y: 0,
        get x() {
            return this._x;
        },
        get y() {
            return this._y;
        },
        set x(value) {
            this._x = value;
        },
        set y(value) {
            this._y = value;
        },

        /**
         *
         * @param context {CanvasRenderingContext2D}
         */
        render: function (context) {
            context.save();
            context.translate(this.x, this.y);
            this.onDrawContent(context);
            context.restore();
        },

        /**
         *
         * @param context {CanvasRenderingContext2D}
         */
        onDrawContent: function (context) {
        }

    };
};