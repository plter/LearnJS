/**
 * Created by plter on 6/19/16.
 */

(function () {

    function PlaySoundWithLRC() {
        this.songName = "Heartbeats";
        this.syncLrcThreadId = -1;
        this.lrcMap = {};

        /**
         *
         * @type {HTMLMediaElement}
         */
        this._audio = document.createElement("audio");
        this._audio.autoplay = true;
        this._audio.src = this.songName + ".mp3";

        this.loadLrc();
    }

    PlaySoundWithLRC.prototype.loadLrc = function () {

        (function (self) {
            $.get(self.songName + ".lrc").done(function (data) {
                var lrc = data;

                var lines = data.split("\n");
                lines.forEach(function (line) {

                    var startIndex = line.indexOf("[");
                    if (startIndex != -1) {
                        var endIndex = line.indexOf(":", startIndex);
                        if (endIndex != -1) {
                            var minStr = line.substring(startIndex + 1, endIndex);
                            var min = parseInt(minStr);

                            startIndex = endIndex + 1;
                            endIndex = line.indexOf(".", startIndex);
                            if (endIndex != -1) {
                                var secStr = line.substring(startIndex, endIndex);
                                var sec = parseInt(secStr);

                                startIndex = line.indexOf("]", endIndex);

                                if (startIndex != -1) {
                                    self.lrcMap[min * 60 + sec] = line.substring(startIndex + 1);
                                }
                            }
                        }
                    }

                });

                self.startSyncLRC();
            }).fail(function () {
                console.error("Fail to load lrc");
            });
        })(this);
    };

    PlaySoundWithLRC.prototype.startSyncLRC = function () {
        if (this.syncLrcThreadId == -1) {
            setInterval(this.syncLrcHandler.bind(this), 1000);
        }
    };

    PlaySoundWithLRC.prototype.stopSyncLRC = function () {
        if (this.syncLrcThreadId != -1) {
            clearInterval(this.syncLrcThreadId);
            this.syncLrcThreadId = -1;
        }
    };

    PlaySoundWithLRC.prototype.syncLrcHandler = function () {
        var content = this.lrcMap[Math.round(this._audio.currentTime)];
        
        if (content) {
            document.body.innerHTML = content;
        }
    };

    new PlaySoundWithLRC();
})();