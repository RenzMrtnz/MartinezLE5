import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {

  title = '';
  body = '';
  errorMessage = '';
  successMessage = '';

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    const token = this.tokenStorage.getToken();

    if (!token) {
      this.errorMessage = 'Please log in before adding a post.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const post = {
      title: this.title,
      body: this.body
    };

    this.http.post(
      'https://localhost:7263/api/Post/add',
      post,
      {
        headers,
        responseType: 'text'
      }
    ).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully!';
        this.title = '';
        this.body = '';

        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding post:', error);
        this.errorMessage = 'Failed to create post. Please log in again if your token has expired.';
      }
    });
  }
}
