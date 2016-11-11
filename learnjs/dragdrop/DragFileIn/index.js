/**
 * Created by plter on 6/21/16.
 */

(function () {

    var currentElement;

    function showContent(url, type) {
        if (currentElement) {
            document.body.removeChild(currentElement);
        }

        console.log(type);

        switch (type) {
            case "image/png":
            case "image/jpeg":
                currentElement = document.createElement("img");
                currentElement.src = url;
                document.body.appendChild(currentElement);
                break;
            case "audio/mp3":
                currentElement = document.createElement("audio");
                currentElement.src = url;
                currentElement.controls = true;
                currentElement.autoplay = true;
                document.body.appendChild(currentElement);
                break;
        }
    }

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
                showContent(reader.result, file.type);
            };
            reader.readAsDataURL(file);
        }
    }
})();