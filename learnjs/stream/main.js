/**
 * Created by plter on 7/11/16.
 */


(function () {

    var cols = [];
    var container;
    var imgs = [];
    var imgIndex = 0;
    var colCount = 4;

    function initImgs() {
        for (var i = 0; i < 100; i++) {
            imgs.push("img1.jpg", "img2.jpg", "img3.jpg");
        }
    }

    function createCols() {
        for (var i = 0; i < colCount; i++) {
            var col = document.createElement("div");
            col.style.width = "200px";
            col.style.float = "left";

            cols.push(col);
            container.appendChild(col);
        }
    }

    function findElements() {
        container = document.getElementById("container");
    }

    function getMinHeightCol() {
        var min = cols[0];

        for (var i = 1; i < cols.length; i++) {
            if (cols[i].clientHeight < min.clientHeight) {
                min = cols[i];
            }
        }
        return min;
    }


    function addImg() {
        var img = document.createElement("img");
        img.width = 200;
        img.onload = function () {
            getMinHeightCol().appendChild(this);

            //check to load next
            imgIndex++;
            if (imgIndex < imgs.length) {
                addImg();
            }
        };
        img.src = imgs[imgIndex];
    }

    function addImgs() {
        imgIndex = 0;

        addImg();
    }

    function init() {
        initImgs();
        findElements();
        createCols();
        addImgs();
    }

    init();

})();