/**
 * Created by plter on 11/11/16.
 */

function sleep(time) {
    return new Promise((resovle)=> {
        setTimeout(resovle, time, "Result message");
    });
}

async function main() {
    console.log("Start");
    var result = await sleep(1000);
    console.log(result);
    console.log("End");
}

main();

