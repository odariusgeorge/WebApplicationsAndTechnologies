import {Component, OnInit, OnDestroy} from '@angular/core';
import { Post } from '../post.model'
import { PostsService } from '../post.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from '../../../auth/auth.service';
import { formatDate } from '@angular/common';

declare let paypal: any;

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  isLoading = false;
  totalPosts = 0;
  postsPerPage = 10;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  userIsAuthenticated = false;
  userIsAdmin = false;
  userId: string;
  private postsSub: Subscription;
  private authStatusSub: Subscription;
  searchTitle: string;
  searchAuthor: string;
  searchUniversity: string;
  searchCourse: string;
  today = Date.now();
  expired: boolean;


  constructor(public postsService: PostsService, private authService: AuthService) {
    setInterval(() => {this.today = Date.now()}, 1);
  }


  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.userId = this.authService.getUserId();
    this.postsSub = this.postsService.getPostUpdateListener()
    .subscribe(
      (postData: {posts: Post[], postCount: number}) =>  {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
      }
    );

    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userIsAdmin = this.authService.getIsAdmin();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
      this.userId = this.authService.getUserId();
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe( () => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  onBid(amount: number) {
  }
}
