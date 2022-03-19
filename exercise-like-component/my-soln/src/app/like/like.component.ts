import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent {

  @Input('is-active') isActive = false;
  @Input('likes-count') likesCount = 0;
  @Output("like") like = new EventEmitter();

  onClick(){
    this.like.emit();
  }

}
