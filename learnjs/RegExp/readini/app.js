/**
 * Created by plter on 6/24/16.
 */

(function () {
    $.get("config.ini").done(function (data) {

        var pSectionName = /\[(.*)\]/g;
        var pKv = /(.*)=(.*)/g;
        var obj = {};

        while (true) {
            var result = pSectionName.exec(data);

            if (result) {
                var str = result[0];
                var name = result[1];
                obj[name] = {};

                var startIndex = result.index + str.length;
                var endIndex = data.indexOf("[", startIndex);
                if (endIndex == -1) {
                    endIndex = data.length;
                }
                var content = data.substring(startIndex, endIndex);

                while (true) {
                    var r = pKv.exec(content);
                    if (r) {
                        obj[name][r[1].trim()] = r[2].trim();
                    } else {
                        break;
                    }
                }
            } else {
                break;
            }
        }

        console.log(obj);
    });

})();