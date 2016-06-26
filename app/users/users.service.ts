import { Http } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersService{
    private _url = "http://jsonplaceholder.typicode.com/users";

    constructor(private _http: Http){}

    //get all users
    getUsers(){
        return this._http.get(this._url)
        .map(res => res.json());
    }

    //add new user
    addUser(user){
        return this._http.post(this._url, JSON.stringify(user))
        .map(res => res.json());
    }

    //get user
    getUser(id){
        return this._http.get(this._url + "/" + id)
        .map(res => res.json());
    }

    //update user
    updateUser(user){
        return this._http.put(this._url + "/" + user.id, JSON.stringify(user))
        .map(res => res.json());
    }

    //delete user
    deleteUser(id){
        return this._http.delete(this._url + "/" + id)
        .map(res => res.json);
    }
    
}