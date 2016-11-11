/**
 * Created by plter on 6/27/16.
 */

(function () {
    window.Config = {DB_NAME: "db", DB_VERSION: 1, USERS_OBJECT_STORE: "users"};
})();


(function () {

    function Main() {

        this.buildUI();
        this.connectDb(function () {
            this.readData();
        }.bind(this));
    }

    Main.prototype.readData = function () {
        var os = this._db.transaction(this._db.objectStoreNames).objectStore(Config.USERS_OBJECT_STORE);
        // var req = os.get(1);
        var index = os.index("name");

        var req = index.get("plter");
        req.onerror = function () {
            console.log("无法读取数据");
        };
        req.onsuccess = function () {
            console.log(req.result);
        };
    };

    Main.prototype.connectDb = function (connectedHandler) {
        (function (self) {
            self._request = indexedDB.open(Config.DB_NAME, Config.DB_VERSION);
            self._request.onsuccess = function (event) {
                self._db = self._request.result;
                connectedHandler();
            };
            self._request.onerror = function (event) {
                console.log("无法连接数据库");
            };
            self._request.onupgradeneeded = function (event) {
                var db = event.target.result;

                var os = db.createObjectStore(Config.USERS_OBJECT_STORE, {keyPath: "id", autoIncrement: true});
                os.createIndex("name", "name");
                os.createIndex("age", "age");
            };
        })(this);
    };

    Main.prototype.createButton = function (text, callback) {
        var btn = document.createElement("button");
        btn.innerHTML = text;
        btn.onclick = callback;
        return btn;
    };

    Main.prototype.buildUI = function () {
        document.body.appendChild(this.createButton("Clear DB", function () {
            var req = indexedDB.deleteDatabase(Config.DB_NAME);
            req.onsuccess = function () {
                console.log("成功删除数据库");
            };
            req.onerror = function () {
                console.error("删除数据库失败");
            }
        }));

        document.body.appendChild(this.createButton("Add User", function () {
            var os = this._db.transaction(this._db.objectStoreNames, "readwrite").objectStore(Config.USERS_OBJECT_STORE);
            // os.add("plter", "name");
            os.add({"name": "ucai", "age": 3});
        }.bind(this)));
    };


    new Main();
})();