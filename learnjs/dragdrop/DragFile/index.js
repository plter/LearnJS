/**
 * Created by plter on 6/21/16.
 */

(function () {
    function Main() {
        this._field = document.getElementById("field");
        this._field.ondragover = function (event) {
            event.preventDefault();
        };

        this._field.ondrop = function (event) {
            event.preventDefault();

            var files = event.dataTransfer.files;
            if (files && files.length) {

                var first = files[0];
                var reader = new FileReader();
                console.log(reader.result);

                reader.onload = function (event) {
                    console.log(reader.result);
                };
                reader.readAsText(first);
            }
        };
    }

    new Main();
})();