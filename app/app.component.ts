import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router'

import { NavbarComponent } from './navbar.component';
import { HomeComponent } from './home.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './users/user-form.component';
import { PostsComponent } from './posts/posts.component';

@RouteConfig([
    { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
    { path: 'users', name: 'Users', component: UsersComponent },
    { path: 'users/new', name: 'NewUser', component: UserFormComponent },
    { path: 'users/:id', name: 'EditUser', component: UserFormComponent },
    { path: 'posts', name: 'Posts', component: PostsComponent },
    { path: '*other', name: 'Other', redirectTo: ['Home'] },
])

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    directives: [NavbarComponent, ROUTER_DIRECTIVES]
})

export class AppComponent { }