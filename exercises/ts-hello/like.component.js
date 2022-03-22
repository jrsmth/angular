"use strict";
exports.__esModule = true;
exports.LikeComponent = void 0;
var LikeComponent = /** @class */ (function () {
    function LikeComponent(likesCount, isSelected) {
        this.likesCount = likesCount;
        this.isSelected = isSelected;
    }
    LikeComponent.prototype.click = function () {
        this.likesCount += (this.isSelected) ? -1 : +1; // if on, decrement; if off, increment
        this.isSelected = !this.isSelected; // toggle on (true) / off (false)
        console.log("likesCount: ".concat(this.likesCount, ", isSelected: ").concat(this.isSelected));
    };
    return LikeComponent;
}());
exports.LikeComponent = LikeComponent;
