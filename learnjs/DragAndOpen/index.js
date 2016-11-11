/**
 * Created by plter on 6/21/16.
 */


(function () {

    function Main() {
        this.addListeners();
    }

    Main.prototype.addListeners = function () {
        (function (self) {
            document.ondragover = function (event) {
                event.preventDefault();
            };

            document.ondrop = function (event) {
                event.preventDefault();

                var files = event.dataTransfer.files;
                if (files && files.length) {
                    var file = files[0];

                    var reader = new FileReader();
                    reader.onload = function () {
                        self.showContent(reader.result, file.type);
                    };
                    reader.readAsDataURL(file);
                }
            };
        })(this);
    };

    Main.prototype.createNewCurrentElement = function (tagName, src) {
        if (this._currentElement) {
            document.body.removeChild(this._currentElement);
        }
        this._currentElement = document.createElement(tagName);
        this._currentElement.src = src;
        document.body.appendChild(this._currentElement);
        return this._currentElement;
    };


    Main.prototype.showContent = function (url, type) {
        var e;

        switch (type) {
            case "image/png":
            case "image/jpeg":
                this.createNewCurrentElement("img", url);
                break;
            case "audio/mp3":
                e = this.createNewCurrentElement("audio", url);
                e.controls = true;
                e.autoplay = true;
                break;
            case "video/mp4":
                e = this.createNewCurrentElement("video", url);
                e.controls = true;
                e.autoplay = true;
                break;
        }
    };

    new Main();
})();