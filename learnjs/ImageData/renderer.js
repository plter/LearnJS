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

        let width = img.width;
        for (let i = 0; i < id.data.length; i += 4) {
            this.context2d.save();
            this.context2d.fillStyle = `rgba(${id.data[i]},${id.data[i + 1]},${id.data[i + 2]},1)`;
            this.context2d.fillRect(i / 4 % width, Math.floor(i / 4 / width), 1, 1);
            this.context2d.restore();

            await this.wait(1);
        }


        // let newId = this.drawingBoardContext2d.createImageData(id.width, id.height);

        // let index = 0;
        // let idMat = [];

        // function putValueToIdMat(idMat, x, y, value) {
        //     if (!idMat[y]) {
        //         idMat[y] = [];
        //     }
        //     idMat[y][x] = value;
        // }
        //
        // for (let y = 0; y < id.height; y++) {
        //     for (let x = 0; x < id.width; x++) {
        //         putValueToIdMat(idMat, x, y, [id.data[index], id.data[index + 1], id.data[index + 2], id.data[index + 3]]);
        //         index += 4;
        //     }
        // }
        //
        // console.log(idMat);
        //
        // // this.context2d.putImageData(newId, 0, 0);
        //
        // //draw mat
        // for (let y = 0; y < idMat.length; y++) {
        //     let arr = idMat[y];
        //     for (let x = 0; x < arr.length; x++) {
        //         this.context2d.save();
        //         this.context2d.fillStyle = `rgba(${arr[x][0]},${arr[x][1]},${arr[x][2]},1)`;
        //         this.context2d.fillRect(x, y, 1, 1);
        //         this.context2d.restore();
        //     }
        //     await this.wait(20);
        // }
    }

    wait(delay) {
        return new Promise(resolve => {
            setTimeout(resolve, delay);
        });
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