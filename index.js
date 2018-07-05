/**
 * Created by vysokov-mg on 05.07.2018.
 */

'use strict';


var vm = new Vue({

    el: "#canvas",

    data: {
        meta: {width: 0, height: 0, visible: false},
        x0: 0,
        y0: 0
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
            this.x0 = event.clientX;
            this.y0 = event.clientY;
            console.log(this.x0);
            console.log(this.y0);
        },

        onKeyUp: function (event) {

            var signedWidth = event.clientX - this.x0;
            var signedHeight = event.clientY - this.y0;

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
        this.meta.visible = false;
        var rect = canvas.getBoundingClientRect();
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