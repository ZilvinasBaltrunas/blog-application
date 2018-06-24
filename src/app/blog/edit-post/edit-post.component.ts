import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

type UserFields = 'title' | 'post' | 'img';
type FormsErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
	posts;
	post;
	id;
	isNew: Boolean = false;

  inputTitle: string;
  inputPost: string;
  inputImg: string;

  userForm: FormGroup;
  formErrors: FormsErrors = {
    'title': '',
    'post': '',
    'img': ''
  }

  validationMessage = {
    'title': {
      'required' : 'Title is required',
      'minlength' : 'Title must be atleast 3 chars long',
      'maxlength' : 'Title cannot be more than 30 chars long'
    },
    'post': {
      'required' : 'Post is required',
      'minlength' : 'Post must be atleast 10 chars long',
      'maxlength' : 'Post cannot be more than 500 chars long'
    },
    'img': {
      'required' : 'Image link is required',
      'minlength' : 'Image link must be atleast 5 chars long',
      'maxlength' : 'Image link cannot be more than 500 chars long'
    }
  }

  constructor( 
  	private aR: ActivatedRoute,
  	private router: Router,
    private formBuilder: FormBuilder
  ) {
  	this.getId();
  }

  ngOnInit() {
   	if(this.id == -1) {
  		this.isNew = true;
  	}
    this.getPost();
	
  	if(this.isNew) {
	    this.post = { 
	  	  id: JSON.parse(window.localStorage.posts).length + this.idGen(),
	      title: '',
	      post: '',
	      img: ''
	    }
    }
  }

  validateData() {
    this.userForm = this.formBuilder.group(
    {
      'title': ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],
      'post': ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]],
      'img': ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(500)
      ]]
    });
    this.userForm.valueChanges.subscribe(
      data => this.onValueChanged(data)
    );
    this.onValueChanged();
  }

  onValueChanged(data? :any) {
    if (!this.userForm) {return;}

    const form = this.userForm;

    for (const field in this.formErrors) {
      if (Object.prototype.hasOwnProperty.call(this.formErrors, field)) {
        this.formErrors[field] = '';
        const control = form.get(field);
        if(control && control.dirty && !control.valid) {
          const messages = this.validationMessage[field];
          if(control.errors) {
            for(const key in control.errors) {
              if(Object.prototype.hasOwnProperty.call(control.errors, key)) {
                this.formErrors[field] += `${(messages as {[key:string]: string})[key]}. `;
              }
            }
          }
        }
      }
    }
  }

  getInputValues() {
    this.inputTitle = this.post.title;
    this.inputPost = this.post.post;
    this.inputImg = this.post.img;
  }

  getPost() {
    this.posts = JSON.parse(window.localStorage.posts);
    this.post = this.posts.find( elm => elm.id == this.id );
  }

  getId() {
    this.aR.params.subscribe((params:Params) => {
  	  this.id = params['id'];
    }
  )}

  idGen() {
 	  return '_' + Math.random().toString(36).substr(2,9);
  }

  send(form1) {
    this.getInputValues();
    this.validateData();
	  this.posts = JSON.parse(window.localStorage.posts)
	  if(this.isNew) {
		  this.posts.push(this.post);  		 	
    } else {
      this.posts[this.posts.indexOf(this.posts.find( elm => elm.id == this.id))] = this.post;  			
    }
    window.localStorage.posts = JSON.stringify(this.posts);
    this.router.navigate(['blog']);
	}

  delete(form1) {
    this.getInputValues();
    this.validateData();
    let i = this.posts.indexOf(this.posts.find( elm => elm.id == this.id));
    this.posts.splice(i, 1);
    
    window.localStorage.posts = JSON.stringify(this.posts);
    this.router.navigate(['blog']);
  }
}