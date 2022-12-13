import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { Post } from "./post.model"

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];
    }

    // this allows us to listen to Observables (Subjects(postUpdated))
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {
            title: title,
            content: content
        };
        // updates the post[]
        this.posts.push(post);
        // make a copy of that updated post[] for usage
        this.postUpdated.next([...this.posts]);
    }
}