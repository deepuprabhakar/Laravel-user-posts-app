import { Injectable } from 'angular2/core'
import { Http } from 'angular2/http'

@Injectable() 
export class PostsService{
    private _url = "http://jsonplaceholder.typicode.com/posts";

    constructor(private _http: Http){}

    getPosts(filter?){
        var url = this._url;

        if(filter && filter.userId)
            url += "?userId=" + filter.userId;

        return this._http.get(url)
        .map(res => res.json());
    }

    getComments(id){
        return this._http.get(this._url + "/" + id + "/comments")
        .map(res => res.json());
    }
}