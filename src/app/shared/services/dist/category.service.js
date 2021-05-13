"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CategoryService = void 0;
var core_1 = require("@angular/core");
require("firebase/firestore");
var CategoryService = /** @class */ (function () {
    function CategoryService(firestore) {
        this.firestore = firestore;
    }
    CategoryService.prototype.addCloudCategory = function (category) {
        return this.firestore.collection('categories').doc(category.id).set({ id: category.id, name: category.name, nameUkr: category.nameUkr });
        // .add({id:category.id,name:category.name})
    };
    CategoryService.prototype.getCloudCategories = function () {
        return this.firestore.collection('categories').snapshotChanges();
    };
    CategoryService.prototype.deleteCloudCategory = function (category) {
        // return firebase.firestore().collection('categories').where('name','==','category.name')
        return this.firestore.doc('categories/' + category.id)["delete"]();
    };
    CategoryService.prototype.updateCloudCategory = function (category) {
        // delete category.id
        return this.firestore.doc('categories/' + category.id).update({ name: category.name, nameUkr: category.nameUkr });
    };
    CategoryService.prototype.getCloudOneCategory = function (name) {
        return this.firestore.collection('categories').ref.where('name', '==', name).onSnapshot(function (data) { return console.log(data); });
    };
    CategoryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CategoryService);
    return CategoryService;
}());
exports.CategoryService = CategoryService;
