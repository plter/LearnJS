/**
 * Created by plter on 6/22/16.
 */


(function () {

    function init() {
        $.get("Heartbeats.lrc", function (data) {
            var p = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;

            while (true) {
                var result = p.exec(data);
                if (result != null) {
                    console.log(result);
                } else {
                    break;
                }
            }
        });
    }

    init();
})();