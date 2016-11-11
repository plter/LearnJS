/**
 * Created by plter on 3/31/16.
 */

window.plter = {};


/**
 * 该函数可用于实现类的多重继承
 * @param to
 * @param from
 * @returns {*}
 */
plter.copyProperties = function (to, from) {
    for (var k in from) {
        to[k] = from[k];
    }
    return to;
};


Array.prototype.hasObj = function (obj) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (this[i] == obj) {
            return true;
        }
    }
    return false;
};


Array.prototype.remove = function (obj) {
    var length = this.length;
    for (var i = 0; i < length; i++) {
        if (this[i] == obj) {
            this.splice(i, 1);
            break;
        }
    }
};