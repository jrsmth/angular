import { FavoriteChangedEventArgs } from './favorite/favorite.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mosh-soln';

  // Component API: Input & Output Properties
  post = {
    title: "How to do xyz in Angular",
    isFavorite: true
  }

  onFavoriteChanged(eventArgs: FavoriteChangedEventArgs) {
    console.log('onFavoriteChange from AppComponent', eventArgs);
  }
  
}
