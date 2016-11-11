/**
 * Created by plter on 10/24/16.
 */

class Item {

    constructor(file) {
        this._file = file;
        this._htmlNode = document.createElement("li");
        this._label = document.createElement("div");
        this._label.innerHTML = this._file.name;
        this._htmlNode.appendChild(this._label);

        $(this._label).click(function () {
            if (this.onSelect) {
                this.onSelect(this._file);
            }
        }.bind(this));
    }

    get htmlNode() {
        return this._htmlNode;
    }
}

class List {


    constructor(files) {
        this._items = [];
        this._htmlNode = document.createElement("ul");

        for (var i = 0; i < files.length; i++) {
            this.addItem(new Item(files[i]));
        }
        $(this._htmlNode).menu();
    }

    addItem(item) {
        this._htmlNode.appendChild(item.htmlNode);
        item.onSelect = function (file) {
            if (this.onSelect) {
                this.onSelect(file);
            }
        }.bind(this);
    }

    get htmlNode() {
        return this._htmlNode;
    }
}


(function () {

    var fileField = $("#file-field");

    $(".btn").button();

    $("#btn-browse-for-photos").click(function () {
        fileField.click();
    });

    function readFileToShow(file) {
        var reader = new FileReader();
        reader.onload = function () {
            $("#photo-container").html(`<img src="${reader.result}">`);
        };
        reader.readAsDataURL(file);
    }

    fileField.change(function () {
        var list = new List(this.files);
        $("#list-container").empty().append(list.htmlNode);
        list.onSelect = function (file) {
            readFileToShow(file);
        }
    });
})();