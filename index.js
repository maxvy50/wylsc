/**
 * Created by vysokov-mg on 05.07.2018.
 */

'use strict';

var vm = new Vue({

    el: "#canvas",

    data: {
        meta: {width: 0, height: 0, visible: false, shiftX: 0, shiftY: 0},
        x0Abs: 0,
        y0Abs: 0,
        xAbs: 0,
        yAbs: 0
    },

    computed: {
        x0: this.x0Abs - this.meta.shiftX,
        y0: this.x0Abs - this.meta.shiftY,
        x: this.xAbs - this.meta.shiftX,
        y: this.yAbs - this.meta.shiftY
    },

    methods: {

        start: function () {
            this.meta.visible = true;
            var canvas = this.getCanvas();
            canvas.font = "50px Comic Sans MS";
            canvas.fillStyle = "dodgerblue";
            canvas.textAlign = "center";
            canvas.fillText("SELECT SOME AREA", this.meta.width / 2, this.meta.height / 2);
        },

        getCanvas: function () {
            return document.getElementById("canvas").getContext("2d");
        },

        onKeyDown: function (event) {
            this.x0Abs = event.clientX;
            this.y0Abs = event.clientY;
            console.log(this.x0);
            console.log(this.y0);
        },

        onKeyUp: function (event) {

            this.xAbs = event.clientX;
            this.yAbs = event.clientY;

            console.log(this.x);
            console.log(this.y);

            var signedWidth = this.x - this.x0;
            var signedHeight = this.y - this.y0;
            if (signedWidth * signedHeight === 0) {return;}

            var img = new Image();
            console.log("http://placekitten.com/" + Math.abs(signedWidth) + "/" + Math.abs(signedHeight));
            img.src = "http://placekitten.com/" + Math.abs(signedWidth) + "/" + Math.abs(signedHeight);

            img.onload = (function () {
                this.getCanvas().drawImage(img, this.x0, this.y0, signedWidth, signedHeight);
            }).bind(this);
        }

    },

    created: function () {
        this.meta.width = 0.8 * window.innerWidth;
        this.meta.height = 0.8 * window.innerHeight;
        var rect = document.getElementById("canvas").getBoundingClientRect();
        this.meta.shiftX = rect.left;
        this.meta.shiftY = rect.top;
        this.meta.visible = false;
    }
});

var greet = new Vue({

    el: "#greetings",

    data: {
        meta: {visible: true}
    },

    methods: {

        onClick: function () {
            this.meta.visible = false;
            vm.start();
        }
    }
});