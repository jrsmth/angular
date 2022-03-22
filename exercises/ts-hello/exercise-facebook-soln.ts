import { LikeComponent } from './like.component';

let likeButton = new LikeComponent(100, false);

console.log("Like button is pressed");
likeButton.click();

console.log("Like button is pressed again");
likeButton.click();