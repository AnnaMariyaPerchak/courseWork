"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogInService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
require("firebase/firestore");
var LogInService = /** @class */ (function () {
    function LogInService(http, afAuth, firestore, router) {
        this.http = http;
        this.afAuth = afAuth;
        this.firestore = firestore;
        this.router = router;
        this.userStatusChanges = new rxjs_1.Subject();
    }
    // login(): Observable<IUser> {
    //   return this.http.get<IUser>(this.url);  
    // }
    LogInService.prototype.signUp = function (firstName, lastName, email, password, phone, address) {
        var _this = this;
        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then(function (userResponse) {
            var user = {
                role: 'user',
                id: userResponse.user.uid,
                firstName: firstName,
                lastName: lastName,
                email: userResponse.user.email,
                password: password,
                phone: phone,
                address: address
            };
            _this.firestore.collection('users').doc(user.id).set(user);
            // .then(data => {
            //   data.get().then(x => {
            //     console.log(x.data());
            //   });
            // })
            // .catch(err => console.log('get data firestore collection', err));
            // alert(err)
        })["catch"](function (err) { console.log('create user', err); });
    };
    LogInService.prototype.signIn = function (email, password) {
        var _this = this;
        this.afAuth.signInWithEmailAndPassword(email, password)
            .then(function (user) {
            // console.log(user);
            _this.firestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(function (users) {
                users.forEach(function (userRef) {
                    _this.currentUser = userRef.data();
                    console.log(_this.currentUser);
                    localStorage.setItem('user', JSON.stringify(_this.currentUser));
                    if (_this.currentUser.role == 'admin') {
                        _this.checkAdminLogin = true;
                        _this.userStatusChanges.next('admin');
                        _this.router.navigateByUrl('admin');
                    }
                    else if (_this.currentUser.role == 'user') {
                        _this.checkUserLogin = true;
                        _this.userStatusChanges.next('user');
                        _this.router.navigateByUrl('profile');
                    }
                    else if (_this.currentUser.role == 'courier') {
                        _this.checkCourierLogin = true;
                        _this.userStatusChanges.next('courier');
                        _this.router.navigateByUrl('courier');
                    }
                    else if (_this.currentUser.role == 'cooker') {
                        _this.checkCookerLogin = true;
                        _this.userStatusChanges.next('cooker');
                        _this.router.navigateByUrl('cooker');
                    }
                });
            });
        })["catch"](function (err) {
            // console.log('user sign in ', err)
            alert("user sign in " + err);
            _this.router.navigateByUrl('log-in');
        });
    };
    LogInService.prototype.signOut = function () {
        var _this = this;
        this.afAuth.signOut()
            .then(function () {
            console.log('user signed out successfully');
            localStorage.removeItem('user');
            _this.userStatusChanges.next('signOut');
            _this.checkUserLogin = false;
            _this.checkAdminLogin = false;
            _this.checkCourierLogin = false;
            _this.checkCookerLogin = false;
            _this.router.navigateByUrl('home');
        })["catch"](function (err) { return console.log('SignOut error', err); });
    };
    LogInService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LogInService);
    return LogInService;
}());
exports.LogInService = LogInService;
