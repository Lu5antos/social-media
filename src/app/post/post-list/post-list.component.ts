import { Component, OnDestroy, OnInit, } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalPosts: number = 0;
  postPerPage: 5;
  currentPage = 1;
  pageSizeOptions: Array<number> = [1, 2, 5, 10];
  private postsSub: Subscription;

  // We use Dependency Injection in the PostList constructor to have excess to the PostService.
  // We then store the instance of PostService class in the postService property.
  constructor(public postsService: PostService) { }

  // Angular runs this methods at the begining of it's life cycle
  // Do basic intialization tasks here
  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postPerPage, 1);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postData: { post: Post[], postCount: number }) => {
        this.isLoading = false;
        this.totalPosts = postData.postCount
        this.posts = postData.post;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postPerPage, 1);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postPerPage, this.currentPage);
    })
  }

  ngOnDestroy(): void {
    // removes subscriptions and prevents memory leaks
    this.postsSub.unsubscribe();
  }

}
