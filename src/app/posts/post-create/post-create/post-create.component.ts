import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  private mode = 'create';
  private postId: string;
  public post: Post;
  public isLoading = false;

  ngOnInit() {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    this.isLoading = true;
    if(this.mode == "create") {
      this.postsService .addPost(form.value.enteredTitle,form.value.enteredContent);
    } else {
      this.postsService.updatePost(this.postId, form.value.enteredTitle, form.value.enteredContent);
    }
    form.resetForm();
    }
}
