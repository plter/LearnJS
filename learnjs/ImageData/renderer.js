// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

class Main {

    constructor() {
        this.canvas = document.querySelector("canvas");
        this.context2d = this.canvas.getContext("2d");

        this.drawingBoard = document.createElement("canvas");
        this.drawingBoard.width = 1000;
        this.drawingBoard.height = 1000;
        this.drawingBoardContext2d = this.drawingBoard.getContext("2d");

        this.showPhoto();
    }

    async showPhoto() {
        let img = await this.loadImage("photo.jpg");
        this.drawingBoardContext2d.drawImage(img, 0, 0);
        let id = this.drawingBoardContext2d.getImageData(0, 0, img.width, img.height);
        let newId = this.drawingBoardContext2d.createImageData(id.width, id.height);

        let index = 0;
        let idMat = [];

        function putValueToIdMat(idMat, x, y, value) {
            if (!idMat[x]) {
                idMat[x] = [];
            }
            idMat[x][y] = value;
        }

        for (let y = 0; y < id.height; y++) {
            for (let x = 0; x < id.width; x++) {
                putValueToIdMat(idMat, x, y, [id.data[index], id.data[index + 1], id.data[index + 2], id.data[index + 3]]);
                index += 4;
            }
        }

        console.log(idMat);

        // this.context2d.putImageData(newId, 0, 0);

        //draw mat
        for (let y = 0; y < idMat.length; y++) {
            let arr = idMat[y];
            for (let x = 0; x < arr.length; x++) {
                this.context2d.save();
                this.context2d.fillStyle = `rgba(${idMat[x][y][0]},${idMat[x][y][1]},${idMat[x][y][2]},1)`;
                this.context2d.fillRect(x, y, 1, 1);
                this.context2d.restore();
            }
        }
    }

    /**
     *
     * @param src
     * @returns {Promise<Image>}
     */
    loadImage(src) {
        return new Promise(function (resolve, reject) {
            let i = new Image();
            i.onload = function () {
                resolve(i);
            };
            i.onerror = reject;
            i.src = src;
        });

    }

}

new Main();