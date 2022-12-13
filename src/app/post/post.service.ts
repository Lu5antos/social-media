import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { Post } from "./post.model"
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private posts: Post[] = [];
    private postUpdated = new Subject<Post[]>();

    constructor(private http: HttpClient) { }

    getPosts() {
        this.http.get<{ message: string, posts: Post[] }>(`http://localhost:3000/api/posts`)
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postUpdated.next([...this.posts]);
            });
    }

    // this allows us to listen to Observables (Subjects(postUpdated))
    getPostUpdateListener() {
        return this.postUpdated.asObservable();
    }

    addPost(title: string, content: string) {
        const post: Post = {
            id: '',
            title: title,
            content: content
        };
        this.http.post<{ message: string }>(`http://localhost:3000/api/posts`, post)
            .subscribe((responseData) => {
                console.log(responseData.message);
                // updates the post[]
                this.posts.push(post);
                // make a copy of that updated post[] for usage
                this.postUpdated.next([...this.posts]);
            });
    }
}