import {Component, OnInit, AfterViewChecked} from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../post.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';

declare let paypal: any;

@Component({
  templateUrl: './post-bid.component.html',
  styleUrls: ['./post-bid.component.css']
})
export class PostBidComponent implements OnInit, AfterViewChecked {

  constructor(public postsService: PostsService, public route: ActivatedRoute) {}
  private postId: string;
  public post: Post;
  public isLoading = false;
  form: FormGroup;
  addScript: boolean = false;
  paypalLoad: boolean = false;
  finalAmount: number = 1;
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AZILAWi_q3OkRNvJv7UNMe_VVYkEn-aet3eC21Mdn4asXxNxQzwL9mSPpEZWS3QbPDBQobxsnW26fKGE'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            {amount: { total: this.finalAmount, currency: 'EUR'}}
          ]
        }
      })
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
      });
  }
}

ngAfterViewChecked(): void {
  if(!this.addScript) {
    this.addPaypalScript().then(() => {
      paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
      this.paypalLoad = false;
    })
  }
}

addPaypalScript() {
  this.addScript = true;
  return new Promise((resolve, reject) => {
    let scriptTagElement = document.createElement('script');
    scriptTagElement.src = "https://www.paypalobjects.com/api/checkout.js"
    scriptTagElement.onload = resolve;
    document.body.appendChild(scriptTagElement);
  })
}

  ngOnInit() {
    this.paypalLoad = true;
    this.addScript = false;
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
            messages: postData.messages
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
      this.post.messages
    );
    this.form.reset();
  }
}
