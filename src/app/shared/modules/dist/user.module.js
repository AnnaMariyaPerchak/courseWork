"use strict";
exports.__esModule = true;
exports.User = void 0;
// import { IPreference } from '../interfaces/preference.interface';
var User = /** @class */ (function () {
    function User(id, firstName, lastName, email, password, address, phone, 
    // public preferences:IPreference,
    role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.role = role;
    }
    return User;
}());
exports.User = User;
