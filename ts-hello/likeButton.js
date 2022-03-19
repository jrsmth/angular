"use strict";
exports.__esModule = true;
exports.LikeButton = void 0;
var LikeButton = /** @class */ (function () {
    function LikeButton(_numLikes) {
        this._liked = false;
        this._numLikes = _numLikes;
    }
    Object.defineProperty(LikeButton.prototype, "numLikes", {
        get: function () {
            return this._numLikes;
        },
        set: function (value) {
            this._numLikes = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LikeButton.prototype, "liked", {
        get: function () {
            return this._liked;
        },
        set: function (value) {
            this._liked = value;
        },
        enumerable: false,
        configurable: true
    });
    LikeButton.prototype.press = function () {
        if (this._liked === true) { // if on, turn off
            this._numLikes -= 1;
            this._liked = false;
        }
        else if (this._liked === false) { // if off, turn on
            this._numLikes += 1;
            this._liked = true;
        }
    };
    return LikeButton;
}());
exports.LikeButton = LikeButton;
