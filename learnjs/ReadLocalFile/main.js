/**
 * Created by plter on 10/10/16.
 */
(function () {

    var fileInput = $("input[type='file']");
    var btnBrowse = $("#btn-browse");
    btnBrowse.button();

    var fileReader = new FileReader();
    fileReader.onload = function (e) {
        var img = new Image();
        img.src = this.result;
        img.style.display = "block";
        document.body.appendChild(img);
    };

    btnBrowse.click(function () {
        fileInput.click();
    });

    fileInput.on("change", function (e) {
        if (this.files && this.files.length) {
            fileReader.readAsDataURL(this.files[0]);
        }
    });
})();