import { Component } from '@angular/core';

import { Post } from './post/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedPosts: Post[] = [];

  // recieve postfrorm PostCreate emmitter and store it in this posts array
  onPostAdded(post: Post){
    this.storedPosts.push(post)
  }
}
