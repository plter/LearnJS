/**
 * Created by plter on 6/19/16.
 */
(function () {

    // function Main() {
    //     Promise.all([new Promise(function (suc, fail) {
    //         setTimeout(suc, 1000, 300);
    //     }), new Promise(function (suc, fail) {
    //         setTimeout(suc, 1000, 400);
    //     })]).then(function (result) {
    //         console.log(result);
    //     }).catch(function (reason) {
    //         console.log(reason);
    //     });
    // }
    //
    // new Main();


    var a = 10;

    new Promise(function (resolve, reject) {
        setTimeout(function () {
            a = 20;
            console.log("Step 1");
            resolve();
            // reject();
        }, 1000);
    }).then(function () {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                console.log(a);
                console.log("Step 2");
                // resolve();
                reject();
            }, 500)
        })
    }).then(function () {
        return new Promise(function () {
            console.log("Step 3");
        })
    }).catch(function (error) {
        console.log(error);
    });
})();