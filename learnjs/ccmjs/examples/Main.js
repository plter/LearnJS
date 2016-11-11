/**
 * Created by plter on 6/21/16.
 */

(function () {

    var _div1 = document.getElementById("div1");
    _div1.useCustomContextMenu = true;
    var menu = new plter.CustomContextMenu();
    menu.addItem(new plter.CustomContextMenuItem("弹出信息", function () {
        alert("JavaScript是世界上最强大的编程语言,没有之一");
    }));
    _div1.customContextMenu = menu;

    var _div2 = document.getElementById("div2");
    _div2.useCustomContextMenu = true;
    menu = new plter.CustomContextMenu();
    menu.addItem(new plter.CustomContextMenuItem("打开我的主页", function () {
        window.location.href = "http://plter.com"
    }));
    menu.addItem(new plter.CustomContextMenuItem("打开github", function () {
        window.location.href = "http://github.com"
    }));
    _div2.customContextMenu = menu;

    $(".ccmjs ul").addClass("list-group");
    $(".ccmjs li").addClass("list-group-item");
})();