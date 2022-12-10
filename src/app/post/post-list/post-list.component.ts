import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts = [
    {
      title: 'First Post',
      content: 'This is this the first post'
    },
    {
      title: 'Second Post',
      content: 'This is this the Second post'
    },
    {
      title: 'Third Post',
      content: 'This is this the Third post'
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
