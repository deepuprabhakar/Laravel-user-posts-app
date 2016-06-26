System.register(['angular2/core', 'angular2/router', './posts.service', '../users/users.service', '../shared/loading.component', '../shared/pagination.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, posts_service_1, users_service_1, loading_component_1, pagination_component_1;
    var PostsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (posts_service_1_1) {
                posts_service_1 = posts_service_1_1;
            },
            function (users_service_1_1) {
                users_service_1 = users_service_1_1;
            },
            function (loading_component_1_1) {
                loading_component_1 = loading_component_1_1;
            },
            function (pagination_component_1_1) {
                pagination_component_1 = pagination_component_1_1;
            }],
        execute: function() {
            PostsComponent = (function () {
                function PostsComponent(_postsService, _usersService) {
                    this._postsService = _postsService;
                    this._usersService = _usersService;
                    this.isLoading = true;
                    this.posts = [];
                    this.pagedPosts = [];
                    this.comments = [];
                    this.users = [];
                    this.pageSize = 10;
                }
                PostsComponent.prototype.getPosts = function (filter) {
                    var _this = this;
                    this.postsLoading = true;
                    this._postsService.getPosts(filter)
                        .subscribe(function (posts) {
                        _this.posts = posts;
                        _this.pagedPosts = _.take(_this.posts, _this.pageSize);
                    }, null, function () { _this.postsLoading = _this.isLoading = false; });
                };
                PostsComponent.prototype.getUsers = function () {
                    var _this = this;
                    this._usersService.getUsers()
                        .subscribe(function (users) {
                        _this.users = users;
                    });
                };
                PostsComponent.prototype.ngOnInit = function () {
                    this.getPosts();
                    this.getUsers();
                };
                PostsComponent.prototype.readPost = function (post) {
                    var _this = this;
                    this.currentPost = post;
                    this.commentLoading = true;
                    this._postsService.getComments(post.id)
                        .subscribe(function (comments) {
                        _this.comments = comments;
                        _this.commentLoading = false;
                    });
                };
                PostsComponent.prototype.reloadPosts = function (filter) {
                    this.currentPost = null;
                    this.getPosts(filter);
                };
                PostsComponent.prototype.onPageChanged = function (page) {
                    var startIndex = (page - 1) * this.pageSize;
                    this.pagedPosts = _.take(_.rest(this.posts, startIndex), this.pageSize);
                };
                PostsComponent = __decorate([
                    core_1.Component({
                        templateUrl: 'app/posts/posts.component.html',
                        directives: [router_1.ROUTER_DIRECTIVES, loading_component_1.LoadingComponent, pagination_component_1.PaginationComponent],
                        providers: [posts_service_1.PostsService, users_service_1.UsersService]
                    }), 
                    __metadata('design:paramtypes', [posts_service_1.PostsService, users_service_1.UsersService])
                ], PostsComponent);
                return PostsComponent;
            }());
            exports_1("PostsComponent", PostsComponent);
        }
    }
});
//# sourceMappingURL=posts.component.js.map