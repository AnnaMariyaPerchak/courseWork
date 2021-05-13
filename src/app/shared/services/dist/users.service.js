"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var UsersService = /** @class */ (function () {
    function UsersService(firestore) {
        this.firestore = firestore;
        this.user = new rxjs_1.Subject();
    }
    UsersService.prototype.addCloudUser = function (user) {
        return this.firestore.collection('users').doc(user.id).set({ id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            address: user.address,
            phone: user.phone,
            //  preferences:{},
            //  preferences:{
            //   id:user.preferences.id,
            //   optionMeat: user.preferences.optionMeat,
            //   optionFish: user.preferences.optionFish,
            //   optionDairyProduct: user.preferences.optionDairyProduct,
            //   optionSugar: user.preferences.optionSugar,
            //   optionGluten: user.preferences.optionGluten},
            role: user.role });
    };
    UsersService.prototype.updateCloudUser = function (user) {
        // delete dish.id
        return this.firestore.doc('users/' + user.id).update({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            address: user.address,
            phone: user.phone,
            // preferences:{},
            // preferences:{
            //  id:user.preferences.id,
            //  optionMeat: user.preferences.optionMeat,
            //  optionFish: user.preferences.optionFish,
            //  optionDairyProduct: user.preferences.optionDairyProduct,
            //  optionSugar: user.preferences.optionSugar,
            //  optionGluten: user.preferences.optionGluten},
            role: user.role
        });
    };
    UsersService.prototype.getCloudUser = function () {
        return this.firestore.collection('users').snapshotChanges();
    };
    UsersService.prototype.getCloudOneUser = function (id) {
        return this.firestore.collection('users').doc('id').snapshotChanges();
        // return this.http.get<IUser>(`${this.url}/${id}`)
    };
    UsersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
