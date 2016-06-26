import { Component, OnInit } from 'angular2/core';
import { FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { CanDeactivate, Router, RouteParams } from 'angular2/router'

import { BasicValidators } from '../shared/basicValidators';
import { UsersService } from './users.service';
import { User } from './user';

@Component({
    selector: 'user-form',
    templateUrl: 'app/users/user-form.component.html',
    providers: [UsersService]
})

export class UserFormComponent implements OnInit, CanDeactivate{
    title: string;
    form: ControlGroup;
    user = new User();

    //Bulid form for user
    constructor(
        fb: FormBuilder,
        private _usersService: UsersService,
        private _router: Router,
        private _routeParams: RouteParams
    ){
        this.form = fb.group({
            name: ['', Validators.required],
            email: ['', BasicValidators.email],
            phone: [],
            address: fb.group({
                street: [],
                suite: [],
                city: [],
                zipcode: []
            })
        });
    }

    ngOnInit(){
        var id = this._routeParams.get("id");

        this.title = id ? "Edit User" : "New User";

        console.log(this.title);

        if(!id)
            return;

        this._usersService.getUser(id)
        .subscribe(
            user => this.user = user,
            response => {
                if(response.status == 404 )
                    this._router.navigate(['Users']);
        });
        
    }
    
    //Dirty checking
    routerCanDeactivate(next, prev){
        if(this.form.dirty)
            return confirm('You have unsaved changes. Are you sure you want to navigate away?');
        
        return true; 
    }

    //Save new user
    save(){
        var result;

        if (this.user.id) 
            result = this._usersService.updateUser(this.user);
        else
            result = this._usersService.addUser(this.user)

        result.subscribe(res => {
            //this.form.markAsPristine();
            this._router.navigate(['Users']);
        });
        
    }
}