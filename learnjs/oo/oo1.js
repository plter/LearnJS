//方式一
(function () {
    function Hello() {
        this.sayHello = function() {
            console.log("Hello World");
        };
    }

    var h = new Hello();
    h.sayHello();
}());


//方式二
(function () {
    function Hello() {

    }
    Hello.prototype.sayHello = function () {
        console.log("Hello World");
    };

    var h = new Hello();
    h.sayHello();
}());


//方式三
(function () {
    function Hello() {
        var self = {};
        self.sayHello = function () {
            console.log("Hello World");
        };
        return self;
    }

    var h = Hello();
    h.sayHello();
}());

//方式四
(function () {
    function Hello() {
        return {init:function () {
            return this;
        },sayHello:function () {
            console.log("Hello World");
        }};
    }

    var h = Hello().init();
    h.sayHello();
}());