/**
 * Created by plter on 11/11/16.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
function sleep(time) {
    return new Promise((resovle) => {
        setTimeout(resovle, time, "Result message");
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start");
        var result = yield sleep(1000);
        console.log(result);
        console.log("End");
    });
}
main();
//# sourceMappingURL=Main.js.map