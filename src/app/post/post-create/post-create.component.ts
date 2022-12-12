import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Post } from '../post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';

  //OUTPUT turn this event to something that can be listened to from outside the component (Parent component)
  @Output() 
    postCreated = new EventEmitter<Post>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm) {
    // Check if form is filled out
    if(form.invalid) {
      return;
    }
    const post: Post = {
      // NgForm has a value property where we can get TITLE AND CONTENT. WE GET TITLE and CONTENT from the NAME property we defined in the HTML
      title: form.value.title,
      content: form.value.content
    };
    this.postCreated.emit(post);
  }

}
