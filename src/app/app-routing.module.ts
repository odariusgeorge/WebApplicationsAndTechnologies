import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostListComponent } from './posts/post-create/post-list/post-list.component';
import { PostCreateComponent } from './posts/post-create/post-create/post-create.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PostMessagesComponent } from './posts/post-create/post-messages/post-messages.component';
import { CreateModeratorComponent } from './auth/createModerator/createModerator.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';



const routes: Routes = [
  {
    path: '', redirectTo: 'postList', pathMatch: 'full'
  },
  {
    path: 'postList', component: PostListComponent
  },
  {
    path: 'createPost', component: PostCreateComponent, canActivate: [AuthGuard]
  },
  {
    path: 'edit/:postId', component: PostCreateComponent, canActivate: [AdminGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'signup', component: SignupComponent
  },
  {
    path: 'createModerator', component: CreateModeratorComponent, canActivate: [AdminGuard]
  },
  {
    path: 'message/:postId', component: PostMessagesComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard]
})

export class AppRoutingModule { }
