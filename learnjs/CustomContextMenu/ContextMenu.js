/**
 * Created by plter on 6/20/16.
 */

(function () {

    function ContextMenu() {
        this._node = document.createElement("div");
        this._node.style.width = 300 + "px";
        this._node.style.backgroundColor = "#dddddd";
        this._ul = document.createElement("ul");
        this._node.appendChild(this._ul);
    }

    ContextMenu.prototype.showMenu = function (x, y) {
        if (ContextMenu._currentMenu) {
            ContextMenu._currentMenu.getNode().style.display = "none";
        }

        ContextMenu._currentMenu = this;

        this._node.style.position = "fixed";
        this._node.style.left = x + "px";
        this._node.style.top = y + "px";
        this._node.style.display = "block";

        (function (self) {
            document.addEventListener("click", function (event) {
                if (event.button == 0) {
                    self._node.style.display = "none";

                    document.removeEventListener("click", arguments.callee);
                }
            });
        })(this);
    };

    ContextMenu.prototype.getNode = function () {
        return this._node;
    };

    ContextMenu.prototype.addMenuItem = function (item) {
        this._ul.appendChild(item.getNode());
    };

    window.ContextMenu = ContextMenu;
})();