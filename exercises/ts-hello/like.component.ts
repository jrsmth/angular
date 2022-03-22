export class LikeComponent {

    constructor(private likesCount: number, private isSelected: boolean){}
    
    click(){
        this.likesCount += (this.isSelected) ? -1 : +1; // if on, decrement; if off, increment
        this.isSelected = !this.isSelected; // toggle on (true) / off (false)
        console.log(`likesCount: ${this.likesCount}, isSelected: ${this.isSelected}`);
    }
}


