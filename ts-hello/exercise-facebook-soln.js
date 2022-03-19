"use strict";
exports.__esModule = true;
var like_component_1 = require("./like.component");
var likeButton = new like_component_1.LikeComponent(100, false);
console.log("Like button is pressed");
likeButton.click();
console.log("Like button is pressed again");
likeButton.click();
