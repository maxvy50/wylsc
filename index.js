/**
 * Created by vysokov-mg on 05.07.2018.
 */
'use strict';
var vm = new Vue ({
    el: "#canvas",
    data: {
        x0: 0,
        y0: 0
    },
    methods: {
        onKeyDown: function (event) {
            this.x0 = event.clientX;
            this.y0 = event.clientY;
            console.log(this.x0);
            console.log(this.y0);
        },
        onKeyUp: function (event) {
            var width = Math.abs(event.clientX - this.x0);
            var height = Math.abs(event.clientY - this.y0);

            console.log(width);
            console.log(height);

            var canvas = document.getElementById("canvas");
            var context = canvas.getContext("2d");
            var img = new Image();
            img.src = "http://placekitten.com/" + width + "/" + height;

            img.onload = function () {
                context.drawImage(img, vm.x0, vm.y0);
            };
        }

    }
});