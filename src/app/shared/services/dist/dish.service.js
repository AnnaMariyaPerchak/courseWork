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
exports.DishService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
require("firebase/firestore");
var DishService = /** @class */ (function () {
    function DishService(firestore, router) {
        this.firestore = firestore;
        this.router = router;
    }
    DishService.prototype.addCloudDish = function (dish) {
        return this.firestore.collection('dishes').doc(dish.id).set({
            id: dish.id,
            category: { id: dish.category.id, name: dish.category.name, nameUkr: dish.category.nameUkr },
            name: dish.name,
            nameUkr: dish.nameUkr,
            description: dish.description,
            descriptionUkr: dish.descriptionUkr,
            weight: dish.weight,
            price: dish.price,
            image: dish.image,
            count: dish.count
        });
    };
    DishService.prototype.getCloudDishes = function () {
        return this.firestore.collection('dishes').snapshotChanges();
    };
    DishService.prototype.deleteCloudDish = function (dish) {
        return this.firestore.doc('dishes/' + dish.id)["delete"]();
    };
    DishService.prototype.updateCloudDish = function (dish) {
        return this.firestore.doc('dishes/' + dish.id).update({
            category: { id: dish.category.id, name: dish.category.name, nameUkr: dish.category.nameUkr },
            name: dish.name,
            nameUkr: dish.nameUkr,
            description: dish.description,
            descriptionUkr: dish.descriptionUkr,
            weight: dish.weight,
            price: dish.price,
            image: dish.image,
            count: dish.count
        });
    };
    DishService.prototype.getCloudOneDish = function (id) {
        return this.firestore.collection('dishes').doc('id').snapshotChanges();
    };
    DishService.prototype.getCloudCategoryDishes = function (categoryName) {
        return this.firestore.collection('dishes', function (ref) { return ref.where('category.name', '==', categoryName); }).snapshotChanges().pipe(operators_1.map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            // console.log({id,...data})
            return __assign({ id: id }, data);
        }); }));
    };
    DishService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DishService);
    return DishService;
}());
exports.DishService = DishService;
