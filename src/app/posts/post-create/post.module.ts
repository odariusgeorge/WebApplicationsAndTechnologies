import { NgModule } from '@angular/core';
import { PostListComponent } from '../post-create/post-list/post-list.component';
import { PostListSellingComponent } from '../post-create/post-list-selling/post-list-selling.component';
import { PostListBuyingComponent } from '../post-create/post-list-buying/post-list-buying.component';
import { PostListExpiredComponent } from '../post-create/post-list-expired/post-list-expired.component';
import { PostCreateComponent } from '../post-create/post-create/post-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JsonFilterByPipe } from '../../helpers/json-filter-by.pipe'
import { FilterPipe } from '../../helpers/filter.pipe';
import { PostMessagesComponent } from './post-messages/post-messages.component';
import { PostBidComponent } from './post-bid/post-bid.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { PostListWonComponent } from './post-list-won/post-list-won.component';


@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostListSellingComponent,
    PostListBuyingComponent,
    PostListExpiredComponent,
    PostListWonComponent,
    PostMessagesComponent,
    PostBidComponent,
    JsonFilterByPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PostsModule {}
