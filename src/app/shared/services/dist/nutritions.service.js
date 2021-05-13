"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NutritionsService = void 0;
var core_1 = require("@angular/core");
// import { Router } from '@angular/router';
var operators_1 = require("rxjs/operators");
require("firebase/firestore");
var NutritionsService = /** @class */ (function () {
    function NutritionsService(firestore) {
        this.firestore = firestore;
    }
    NutritionsService.prototype.getCloudNutrition = function () {
        return this.firestore.collection('nutrition programs').snapshotChanges();
    };
    NutritionsService.prototype.addCloudNutrition = function (nutrition) {
        return this.firestore.collection('nutrition programs').doc(nutrition.id).set({
            id: nutrition.id,
            category: { id: nutrition.category.id, name: nutrition.category.name, nameUkr: nutrition.category.nameUkr },
            name: nutrition.name,
            nameUkr: nutrition.nameUkr,
            price: nutrition.price,
            kcal: nutrition.kcal,
            description: {
                breakfast: nutrition.description.breakfast,
                breakfastUkr: nutrition.description.breakfastUkr,
                lunch: nutrition.description.lunch,
                lunchUkr: nutrition.description.lunchUkr,
                firstDinner: nutrition.description.firstDinner,
                firstDinnerUkr: nutrition.description.firstDinnerUkr,
                supper: nutrition.description.supper,
                supperUkr: nutrition.description.supperUkr,
                secondDinner: nutrition.description.secondDinner,
                secondDinnerUkr: nutrition.description.secondDinnerUkr
            },
            // duration:nutrition.duration,
            count: nutrition.count
        });
    };
    // getCloudNutritions(): any {
    //   return this.firestore.collection('nutrition programs').snapshotChanges();
    // }
    NutritionsService.prototype.deleteCloudNutrition = function (nutrition) {
        return this.firestore.doc('nutrition programs/' + nutrition.id)["delete"]();
    };
    NutritionsService.prototype.updateCloudNutrition = function (nutrition) {
        return this.firestore.doc('nutrition programs/' + nutrition.id).update({
            category: { id: nutrition.category.id, name: nutrition.category.name, nameUkr: nutrition.category.nameUkr },
            name: nutrition.name,
            nameUkr: nutrition.nameUkr,
            price: nutrition.price,
            kcal: nutrition.kcal,
            count: nutrition.count,
            // duration:nutrition.description,
            description: {
                breakfast: nutrition.description.breakfast,
                breakfastUkr: nutrition.description.breakfastUkr,
                lunch: nutrition.description.lunch,
                lunchUkr: nutrition.description.lunchUkr,
                firstDinner: nutrition.description.firstDinner,
                firstDinnerUkr: nutrition.description.firstDinnerUkr,
                supper: nutrition.description.supper,
                supperUkr: nutrition.description.supperUkr,
                secondDinner: nutrition.description.secondDinner,
                secondDinnerUkr: nutrition.description.secondDinnerUkr
            }
        });
    };
    NutritionsService.prototype.getCloudOneNutrition = function (id) {
        return this.firestore.collection('nutrition programs').doc('id').snapshotChanges();
    };
    NutritionsService.prototype.getCloudCategoryNutritions = function (categoryName) {
        return this.firestore.collection('nutrition programs', function (ref) { return ref.where('category.name', '==', categoryName); }).snapshotChanges().pipe(operators_1.map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            // console.log({id,...data})
            return __assign({ id: id }, data);
        }); }));
    };
    NutritionsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], NutritionsService);
    return NutritionsService;
}());
exports.NutritionsService = NutritionsService;
