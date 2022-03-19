export class LikeButton {

    private _liked: boolean;
    private _numLikes: number;
    
    constructor (_numLikes: number) {
        this._liked = false;
        this._numLikes = _numLikes;
    }

    get numLikes () {
        return this._numLikes;
    }

    set numLikes (value: number){
        this._numLikes = value;
    }

    get liked () {
        return this._liked;
    }

    set liked (value: boolean){
        this._liked = value;
    }

    press(){
        if (this._liked === true) { // if on, turn off
            this._numLikes -= 1;
            this._liked = false;
        } else if (this._liked === false) { // if off, turn on
            this._numLikes += 1; 
            this._liked = true;
        }
    }

}