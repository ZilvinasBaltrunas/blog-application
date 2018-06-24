import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { POSTS } from '../mock-posts';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
	posts = POSTS;

  constructor() {
    this.saveToLocalStorage();
  }

  ngOnInit() {
  
  }

  saveToLocalStorage() {
    if(!window.localStorage.posts) {
      window.localStorage.posts = JSON.stringify(this.posts)
    } else {
      this.posts = JSON.parse(window.localStorage.posts);
    }
  }
}