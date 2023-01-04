import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // INPUT allows you to receive data from direct parent component (CreatePost)
 
  posts: Post[] = [];
  isLoading = false;
  private postsSub: Subscription;

  // We use Dependency Injection in the PostList constructor to have excess to the PostService.
  // We then store the instance of PostService class in the postService property.
  constructor(public postsService: PostService) { }

  // Angular runs this methods at the begining of it's life cycle
  // Do basic intialization tasks here
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string){
    this.postsService.deletePost(postId);
  }

  ngOnDestroy(): void {
    // removes subscriptions and prevents memory leaks
      this.postsSub.unsubscribe();
  }

}
