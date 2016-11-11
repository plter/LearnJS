/**
 * Created by plter on 6/25/16.
 */


(function () {

    var db;

    function openDb() {
        var request = indexedDB.open("MyDb", 1);
        request.onerror = function (event) {
            console.error(event)
        };
        request.onsuccess = function (event) {
            db = request.result;

            var result = db.transaction("MyTable").objectStore("MyTable").getAll();
            console.log(result);
        };
        request.onupgradeneeded = function (event) {

            var os = event.target.result.createObjectStore("MyTable", {keyPath: "title"});
            os.createIndex("my_name", "my_name");
        };
    }

    function createNewButton(text, callback) {
        var btn = document.createElement("button");
        btn.innerHTML = text;
        btn.onclick = callback;
        return btn;
    }

    function init() {

        openDb();

        document.body.appendChild(createNewButton("Clear DB", function () {
            indexedDB.deleteDatabase("MyDb");
        }));

        document.body.appendChild(createNewButton("Add", function () {

            var trans = db.transaction("MyTable", "readwrite");
            var os = trans.objectStore("MyTable");
            os.add({"title": "Haha", "my_name": "Hello"});
            console.log(os);
        }));
    }

    init();
})();