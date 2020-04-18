import {Component, OnInit} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  templateUrl: './post-messages.component.html',
  styleUrls: ['./post-messages.component.css']
})
export class PostMessagesComponent implements OnInit {

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  private postId: string;
  public post: Post;
  public isLoading = false;
  messages: Array<string> = ['Is it new?', 'Hello!', 'Are you ok?'];

  ngOnInit() {
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
            author: postData.author
          };
        });
      }
    });
  }
}
