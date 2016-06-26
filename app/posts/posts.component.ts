import { Component, OnInit } from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {PostsService} from './posts.service'
import {UsersService} from '../users/users.service'
import {LoadingComponent} from '../shared/loading.component'
import {PaginationComponent} from '../shared/pagination.component'

@Component({
    templateUrl: 'app/posts/posts.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingComponent, PaginationComponent],
    providers: [PostsService, UsersService]
})

export class PostsComponent implements OnInit {
    isLoading = true;
    posts = [];
    pagedPosts = [];
    comments = [];
    users = [];
    currentPost;
    postsLoading;
    commentLoading;
    pageSize = 10;
    
    constructor(
        private _postsService: PostsService,
        private _usersService: UsersService
    ){}

    private getPosts(filter?)
    {
        this.postsLoading = true; 
		this._postsService.getPosts(filter)
			.subscribe(
                posts => {
                    this.posts = posts;
                    this.pagedPosts = _.take(this.posts, this.pageSize);
                },
                null,
                () => { this.postsLoading = this.isLoading = false; });
    }

    private getUsers()
    {
        this._usersService.getUsers()
        .subscribe( users => {
            this.users = users;
        });
    }

    ngOnInit(){
        this.getPosts();
        this.getUsers();
    }

    readPost(post){
        this.currentPost = post;
        this.commentLoading = true;

        this._postsService.getComments(post.id)
        .subscribe( comments => {
            this.comments = comments;
            this.commentLoading = false;
        });
    }

    reloadPosts(filter){
        this.currentPost = null;
        this.getPosts(filter);
    }

    onPageChanged(page) {
        var startIndex = (page - 1) * this.pageSize;
        this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
	}

}