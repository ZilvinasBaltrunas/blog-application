import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
	post;
	id;

  constructor(
  	private aR: ActivatedRoute
  ) {
  	this.getId()
  }

  ngOnInit() {
  	this.getPost();
  }

  getPost() {
  	this.post = JSON.parse(window.localStorage.posts);
    this.post = this.post.find( elm => elm.id == this.id );
  }

  getId() {
  	this.aR.params.subscribe((params:Params) =>
  	{
  		this.id = params['id'];
    }
  )}
}