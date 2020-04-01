import {Component} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../post.service';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    const post: Post = {
      id: 'dsadsadas',
      title: form.value.enteredTitle,
      content: form.value.enteredContent
      };
      this.postsService.addPost(post.title,post.content);
      form.resetForm();
    }
}
