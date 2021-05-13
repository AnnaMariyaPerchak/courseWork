"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProfileComponent = void 0;
var core_1 = require("@angular/core");
var user_module_1 = require("../shared/modules/user.module");
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(auth, userService, 
    // private prefService: PreferencesService,
    orderService, modalService) {
        this.auth = auth;
        this.userService = userService;
        this.orderService = orderService;
        this.modalService = modalService;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    ProfileComponent.prototype.close = function () {
        this.modalRef.hide();
    };
    ProfileComponent.prototype.logOut = function () {
        this.auth.signOut();
    };
    ProfileComponent.prototype.getUser = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.userName = this.user.firstName + ' ' + this.user.lastName;
        this.userEmail = this.user.email;
        this.userAddress = this.user.address;
        this.userPhone = this.user.phone;
        // this.userPreferences = this.user.preferences
        // this.optionMeat = this.user.preferences.optionMeat
        // this.optionFish = this.user.preferences.optionFish
        // this.optionDairyProduct = this.user.preferences.optionDairyProduct
        // this.optionSugar = this.user.preferences.optionSugar
        // this.optionGluten = this.user.preferences.optionGluten
        this.userId = this.user.id;
        this.userPassword = this.user.password;
        // this.prefService.preference.next(this.userPreferences)
        this.orderService.getCloudOrdersPersonal(this.user.email).subscribe(function (data) {
            _this.personalOrders = data;
        });
    };
    ProfileComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.editFirstName = this.user.firstName;
        this.editLastName = this.user.lastName;
        this.editEmail = this.user.email;
        this.editAddress = this.user.address;
        this.editPhone = this.user.phone;
        // const newPref = JSON.parse(localStorage.getItem('preference'))
        // this.prefId = newPref.id
        // this.prefService.preference.subscribe(
        //   data => {
        //     console.log(data)
        //     if (data.optionMeat) {
        //       this.optionMeat = data.optionMeat
        //     } else if (!data.optionMeat) {
        //       this.optionMeat = newPref.optionMeat
        //     }
        //     if (data.optionFish) {
        //       this.optionFish = data.optionFish
        //     } else if (!data.optionFish) {
        //       this.optionFish = data.optionFish
        //     }
        //     if (data.optionDairyProduct) {
        //       this.optionDairyProduct = data.optionDairyProduct
        //     } else if (!data.optionDairyProduct) {
        //       this.optionDairyProduct = data.optionDairyProduct
        //     }
        //     if (data.optionSugar) {
        //       this.optionSugar = data.optionSugar
        //     } else if (!data.optionSugar) {
        //       this.optionSugar = data.optionSugar
        //     }
        //     if (data.optionGluten) {
        //       this.optionGluten = data.optionGluten
        //     } else if (!data.optionGluten) {
        //       this.optionGluten = data.optionGluten
        //     }
        //   }
        // )
        // if (newPref.optionMeat === 'yes') {
        //   this.meat = true
        // } else if (newPref.optionMeat === 'no') {
        //   this.meat = false
        // }
        // if (newPref.optionFish === 'yes') {
        //   this.fish = true
        // } else if (newPref.optionFish === 'no') {
        //   this.fish = false
        // }
        // if (newPref.optionDairyProduct === 'yes') {
        //   this.dairyProducts = true
        // } else if (newPref.optionDairyProduct === 'no') {
        //   this.dairyProducts = false
        // }
        // if (newPref.optionSugar === 'yes') {
        //   this.sugar = true
        // } else if (newPref.optionSugar === 'no') {
        //   this.sugar = false
        // }
        // if (newPref.optionGluten === 'yes') {
        //   this.gluten = true
        // } else if (newPref.optionGluten === 'no') {
        //   this.gluten = false
        // }
    };
    ProfileComponent.prototype.saveEditProfile = function () {
        // const oldUser = JSON.parse(localStorage.getItem('user'))
        // const newPreferene: IPreference = new Preference(oldUser.preferences.id,
        //   this.optionMeat,
        //   this.optionFish,
        //   this.optionDairyProduct,
        //   this.optionSugar,
        //   this.optionGluten)
        // localStorage.setItem('preference', JSON.stringify(newPreferene))
        // this.prefService.updateCloudPreference(newPreferene)
        // this.prefService.preference.next(newPreferene);
        var editProfile = new user_module_1.User(this.userId, this.editFirstName, this.editLastName, this.editEmail, this.userPassword, this.editAddress, this.editPhone, 
        // newPreferene,
        'user');
        this.userService.updateCloudUser(editProfile);
        localStorage.setItem('user', JSON.stringify(editProfile));
        this.userService.updateCloudUser(editProfile);
        this.getUser();
        this.modalRef.hide();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss']
        })
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
