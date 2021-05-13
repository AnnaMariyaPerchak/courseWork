"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogInGuard = void 0;
var core_1 = require("@angular/core");
var LogInGuard = /** @class */ (function () {
    function LogInGuard(logIn, router) {
        this.logIn = logIn;
        this.router = router;
    }
    LogInGuard.prototype.canActivate = function (next, state) {
        return this.checkLogin();
    };
    LogInGuard.prototype.checkLogin = function () {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
            console.log(user);
            console.log(user.role);
            // if(user.role==='user'){ this.router.navigateByUrl('profile'); } 
            // else if(user.role==='admin'){ this.router.navigateByUrl('admin'); }
            return true;
        }
        else {
            // console.log(user.role)
            this.router.navigateByUrl('log-in');
            return false;
        }
    };
    LogInGuard = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LogInGuard);
    return LogInGuard;
}());
exports.LogInGuard = LogInGuard;
