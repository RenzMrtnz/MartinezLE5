import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-list-posts',
  templateUrl: './list-posts.component.html',
  styleUrls: ['./list-posts.component.css']
})
export class ListPostsComponent implements OnInit {

  posts: Post[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Post[]>(
      'https://localhost:7263/api/Post'
    ).subscribe({
      next: (data) => {
        this.posts = data;
        console.log('Posts loaded:', data);
      },
      error: (error) => {
        console.error('Error loading posts:', error);
      }
    });
  }
}
