import { NgModule } from '@angular/core';
import { PostListComponent } from '../post-create/post-list/post-list.component';
import { PostCreateComponent } from '../post-create/post-create/post-create.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { JsonFilterByPipe } from '../../helpers/json-filter-by.pipe'
import { FilterPipe } from '../../helpers/filter.pipe';
import { PostMessagesComponent } from './post-messages/post-messages.component';


@NgModule({
  declarations: [
    PostListComponent,
    PostCreateComponent,
    PostMessagesComponent,
    JsonFilterByPipe,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule,
    FormsModule
  ]
})
export class PostsModule {}
