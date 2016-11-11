/**
 * Created by plter on 4/7/16.
 */

plter.Container = function () {

    return {
        __proto__: plter.Display(),
        _children: [],

        addChild: function (child) {
            this._children.push(child);
        },

        removeChild: function (child) {
            this._children.remove(child);
        },

        removeAllChild: function () {
            this._children.length = 0;
        },

        onDrawContent: function (context) {
            var length = this._children.length;
            for (var i = 0; i < length; i++) {
                this._children[i].render(context);
            }
        }
    };
};