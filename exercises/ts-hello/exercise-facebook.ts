import { LikeButton } from './likeButton';

let likeButton = new LikeButton(0);
console.log("Default liked condition: " + likeButton.liked);
console.log("Default number of likes: " + likeButton.numLikes);

console.log("\nThe like button is pressed");
likeButton.press();
console.log("Current liked condition: " + likeButton.liked);
console.log("Current number of likes: " + likeButton.numLikes);

console.log("\nThe like button is pressed again");
likeButton.press();
console.log("Current liked condition: " + likeButton.liked);
console.log("Current number of likes: " + likeButton.numLikes);



