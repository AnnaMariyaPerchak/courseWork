"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignUpComponent = void 0;
var core_1 = require("@angular/core");
var SignUpComponent = /** @class */ (function () {
    // meat: boolean
    // fish: boolean
    // dairyProducts: boolean
    // sugar: boolean
    // gluten: boolean
    // optionMeat: boolean
    // optionFish: boolean
    // optionDairyProducts: boolean
    // optionSugar: boolean
    // optionGluten: boolean
    // options: any = [
    //   { name: 'yes', checked: true },
    //   { name: 'no', checked: false }
    // ];
    // pref: any
    // prefId: string
    function SignUpComponent(auth) {
        this.auth = auth;
        // preferences: IPreference = {
        //   id: "78", optionFish: true, optionMeat: true,
        //   optionDairyProduct: true, optionSugar: true, optionGluten: true
        // }
        this.users = [];
    }
    // private prefService: PreferencesService,
    SignUpComponent.prototype.ngOnInit = function () {
        // const newPref = JSON.parse(localStorage.getItem('preference'))
        // this.prefId = newPref.id
        // if (newPref.optionMeat === 'yes') {
        //   this.meat = true
        //   this.optionMeat = newPref.optionMeat
        // } else if (newPref.optionMeat === 'no') {
        //   this.meat = false
        //   this.optionMeat = newPref.optionMeat
        // }
        // if (newPref.optionFish === 'yes') {
        //   this.fish = true
        //   this.optionFish = newPref.optionFish
        // } else if (newPref.optionFish === 'no') {
        //   this.fish = false
        //   this.optionFish = newPref.optionFish
        // }
        // if (newPref.optionDairyProduct === 'yes') {
        //   this.dairyProducts = true
        //   this.optionDairyProducts = newPref.optionDairyProduct
        // } else if (newPref.optionDairyProduct === 'no') {
        //   this.dairyProducts = false
        //   this.optionDairyProducts = newPref.optionDairyProduct
        // }
        // if (newPref.optionSugar === 'yes') {
        //   this.sugar = true
        //   this.optionSugar = newPref.optionSugar
        // } else if (newPref.optionSugar === 'no') {
        //   this.sugar = false
        //   this.optionSugar = newPref.optionSugar
        // }
        // if (newPref.optionGluten === 'yes') {
        //   this.gluten = true
        //   this.optionGluten = newPref.optionGluten
        // } else if (newPref.optionGluten === 'no') {
        //   this.gluten = false
        //   this.optionGluten = newPref.optionGluten
        // }
    };
    SignUpComponent.prototype.signUp = function () {
        // const pref = JSON.parse(localStorage.getItem('preference'))
        // const newPreferene: IPreference = new Preference(this.prefId,
        //   pref.optionMeat,
        //   pref.optionFish,
        //   pref.optionDairyProduct,
        //   pref.optionSugar,
        //   pref.optionGluten)
        // localStorage.setItem('preference', JSON.stringify(newPreferene))
        // this.prefService.addCloudPreference(newPreferene)
        this.auth.signUp(this.firstName, this.lastName, this.email, this.password, this.phone, this.address
        // newPreferene
        );
        // localStorage.setItem('user', JSON.stringify())
    };
    SignUpComponent = __decorate([
        core_1.Component({
            selector: 'app-sign-up',
            templateUrl: './sign-up.component.html',
            styleUrls: ['./sign-up.component.scss']
        })
    ], SignUpComponent);
    return SignUpComponent;
}());
exports.SignUpComponent = SignUpComponent;
