import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  templateUrl: './post-messages.component.html',
  styleUrls: ['./post-messages.component.css']
})
export class PostMessagesComponent implements OnInit {

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  private postId: string;
  public post: Post;
  public isLoading = false;
  form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      message: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('postId')) {
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath,
            creator: postData.creator,
            course: postData.course,
            university: postData.university,
            author: postData.author,
            messages: postData.messages,
            startingPrice: postData.startingPrice,
            minimumAllowedPrice: postData.minimumAllowedPrice,
            winner: postData.winner
          };
        });
      }
    });
  }

  onPostMessage() {
    if(this.form.invalid) {
      return;
    }
    this.post.messages.push(this.form.value.message);
    this.postsService.updatePostMessage(
      this.post.id,
      this.post.title,
      this.post.content,
      this.post.imagePath,
      this.post.course,
      this.post.university,
      this.post.author,
      this.post.messages,
      this.post.startingPrice,
      this.post.minimumAllowedPrice,
      this.post.winner
    );
    this.form.reset();
  }
}
