/**
 * Created by plter on 6/20/16.
 */

(function () {


    function Main() {
        this._div = document.getElementById("div");
        this._div.useCustomContextMenu = true;
        var menu = new ContextMenu();
        menu.addMenuItem(new ContextMenuItem("http://ucai.cn", "优才"));
        menu.addMenuItem(new ContextMenuItem("http://baidu.com", "百度"));
        this._div.contextMenu = menu;

        this._div1 = document.getElementById("div1");
        this._div1.useCustomContextMenu = true;
        menu = new ContextMenu();
        menu.addMenuItem(new ContextMenuItem("http://g.cn", "谷歌"));
        menu.addMenuItem(new ContextMenuItem("http://www.apple.com", "苹果"));
        menu.addMenuItem(new ContextMenuItem("http://www.microsoft.com", "微软"));
        this._div1.contextMenu = menu;
    }

    new Main();
})();