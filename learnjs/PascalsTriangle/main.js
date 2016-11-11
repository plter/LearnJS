/**
 * Created by plter on 8/2/16.
 */


var str, s;
console.log("1");

for (var i = 2; i < 15; i++) {
    str = "1 ";
    s = 1;
    for (var j = 1; j < i; j++) {
        s = (i - j) * s / j;
        str += s + " ";
    }
    console.log(str);
}