/**
 * Created by plter on 6/20/16.
 */

(function () {

    function ContextMenuItem(link, text) {
        this._link = link;
        this._text = text;

        this._node = document.createElement("li");
        this._node.innerHTML = "<a href='" + this._link + "'>" + this._text + "</a>";
    }

    ContextMenuItem.prototype.getNode = function () {
        return this._node;
    }
    
    window.ContextMenuItem = ContextMenuItem;

})();