import { Component, OnInit } from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UsersService} from './users.service';
import {LoadingComponent} from '../shared/loading.component';


@Component({
    templateUrl: 'app/users/users.component.html',
    directives: [ROUTER_DIRECTIVES, LoadingComponent],
    providers: [UsersService]
})

export class UsersComponent implements OnInit {
    isLoading = true;
    users = [];

    constructor(private _usersService: UsersService) { }

    ngOnInit() {
        this._usersService.getUsers()
            .subscribe(users => {
                this.isLoading = false;
                this.users = users;
            });
    }

    deleteUser(user) {
        if (confirm("Are you sure you want to delete " + user.name + "?")) {
            var index = this.users.indexOf(user);
            // Here, with the splice method, we remove 1 object
            // at the given index.
            this.users.splice(index, 1);

            //send it to server
            this._usersService.deleteUser(user.id)
                .subscribe(null,
                err => {
                    alert("Could not delete the user");
                    // Revert the view back to its original state
                    // by putting the user object at the index
                    // it used to be.
                    this.users.splice(index, 0, user);
                });
        }
    }
}