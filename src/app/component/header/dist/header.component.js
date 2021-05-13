"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HeaderComponent = void 0;
var core_1 = require("@angular/core");
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(orderService, prefService, auth, translate) {
        this.orderService = orderService;
        this.prefService = prefService;
        this.auth = auth;
        this.translate = translate;
        this.myBasket = [];
        this.totalPrice = 0;
        this.adminPage = false;
        this.userPage = false;
        this.courierPage = false;
        // translate.setDefaultLang('en')
        translate.addLangs(['en', 'ukr']);
        translate.setDefaultLang('en');
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkBasket();
        this.getLocalStorage();
        this.checkUser();
        this.checkUserLocalStorage();
        localStorage.setItem('language', 'en');
        // setTimeout(()=>{window.location.reload()},1000)
        this.prefService.preference.subscribe(function (data) {
            console.log(data);
            if (data.optionMeat === 'yes') {
                _this.recomendMeat = 'recomend to you';
            }
            else {
                _this.recomendMeat = '';
            }
            if (data.optionFish === 'yes') {
                _this.recomendFish = 'recomend to you';
            }
            else {
                _this.recomendFish = '';
            }
            if (data.optionMeat === 'yes' && data.optionFish === 'yes') {
                _this.recomendSoup = 'recomend to you';
            }
            else {
                _this.recomendSoup = '';
            }
            if (data.optionMeat === 'yes' && data.optionFish === 'yes' && data.optionGluten === 'no') {
                _this.recomendPasta = 'recomend to you';
            }
            else {
                _this.recomendPasta = '';
            }
            if (data.optionMeat === 'yes' && data.optionFish === 'yes') {
                _this.recomendBowl = 'recomend to you';
            }
            else {
                _this.recomendBowl = '';
            }
            if (data.optionMeat === 'yes' && data.optionFish === 'yes' && data.optionDairyProduct === 'yes') {
                _this.recomendSalad = 'recomend to you';
            }
            else {
                _this.recomendSalad = '';
            }
            if (data.optionDairyProduct === 'yes' && data.optionSugar === 'yes') {
                _this.recomendBakery = 'recomend to you';
            }
            else {
                _this.recomendBakery = '';
            }
            if (data.optionDairyProduct === 'no' && data.optionSugar === 'no' && data.optionGluten === 'yes') {
                _this.recomendDesserts = 'recomend to you';
            }
            else {
                _this.recomendDesserts = '';
            }
        });
    };
    HeaderComponent.prototype.useLanguage = function (language) {
        this.translate.use(language);
        localStorage.setItem('language', language);
        // console.log(this.translate.currentLang)
    };
    HeaderComponent.prototype.checkBasket = function () {
        var _this = this;
        this.orderService.basket.subscribe(function () {
            _this.getLocalStorage();
        });
    };
    HeaderComponent.prototype.getLocalStorage = function () {
        if (localStorage.length > 0 && localStorage.getItem('dishes')) {
            this.myBasket = JSON.parse(localStorage.getItem('dishes'));
            this.totalPrice = this.myBasket.reduce(function (total, product) { return total + (product.price * product.count); }, 0);
        }
    };
    HeaderComponent.prototype.checkUser = function () {
        var _this = this;
        this.auth.userStatusChanges.subscribe(function () {
            _this.checkUserLocalStorage();
        });
    };
    HeaderComponent.prototype.checkUserLocalStorage = function () {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
            if (user.role == 'admin') {
                this.adminPage = true;
                this.urlLogin = 'admin';
                // this.pageLogin = 'Admin';
                // if (localStorage.getItem('language') == 'en'){
                // if (this.translate.currentLang === 'en'){
                //   this.pageLogin = 'Admin';
                //   console.log(localStorage.getItem('language'))
                //   console.log('Admin')
                // } else {
                //   this.pageLogin = 'Адмін';
                //   console.log(localStorage.getItem('language'))
                //   console.log('Фдмін')
                // }
            }
            // else 
            if (user.role == 'user') {
                this.userPage = true;
                this.urlLogin = 'profile';
                // this.pageLogin = 'Cabinet';
            }
            // else
            if (user.role == 'courier') {
                console.log(user);
                this.courierPage = true;
                this.urlLogin = 'courier';
                // this.pageLogin = 'Courier';
            }
            // if (user.role=='cooker'){
            //   console.log(user)
            //   this.urlLogin = 'cooker';
            //   this.pageLogin = 'Cooker';
            // }
            // else {
            // console.log(user)
            // this.urlLogin = 'courier';
            // this.pageLogin = 'Courier';
            // }
            this.statusLogin = true;
        }
        else {
            this.statusLogin = false;
            this.urlLogin = '';
            this.pageLogin = '';
        }
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
