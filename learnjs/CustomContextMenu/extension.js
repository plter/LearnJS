/**
 * Created by plter on 6/20/16.
 */

(function () {

    Object.defineProperties(HTMLElement.prototype, {
        contextMenu: {
            get: function () {
                return this._contextMenu;
            },
            set: function (value) {
                if (this._contextMenu) {
                    this._contextMenu.parentNode.removeChild(this._contextMenu);
                }
                this._contextMenu = value;
                this._contextMenu.getNode().style.display = "none";
                document.body.appendChild(this._contextMenu.getNode());
            }
        },
        useCustomContextMenu: {
            get: function () {
                return this._useCustomContextMenu;
            },
            set: function (value) {
                this._useCustomContextMenu = value;
                if (this._useCustomContextMenu) {
                    this.oncontextmenu = function (event) {

                        if (this.contextMenu) {
                            this.contextMenu.showMenu(event.clientX, event.clientY);
                        }

                        event.preventDefault();
                    }
                } else {
                    this.oncontextmenu = null;
                }
            }
        }
    });

})();