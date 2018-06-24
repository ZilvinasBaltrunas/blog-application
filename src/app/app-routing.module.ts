import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { BlogComponent } from './blog/blog.component';
import { EditPostComponent } from './blog/edit-post/edit-post.component';
import { PostComponent } from './blog/post/post.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'home', component: HomeComponent },
	{ path: 'blog', component: BlogComponent },
	{ path: 'blog/:id/edit', component: EditPostComponent },
	{ path: 'blog/:id', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }