import { Component, OnInit, Input } from '@angular/core';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  // posts = [
  //   {
  //     title: 'First Post',
  //     content: 'This is this the first post'
  //   },
  //   {
  //     title: 'Second Post',
  //     content: 'This is this the Second post'
  //   },
  //   {
  //     title: 'Third Post',
  //     content: 'This is this the Third post'
  //   }
  // ]

  // INPUT allows you to receive data from direct parent component (CreatePost)
 
  @Input()
    posts: Post[] = [];

  // We use Dependency Injection in the PostList constructor to have excess to the PostService.
  // We then store the instance of PostService class in the postService property.
  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

}
