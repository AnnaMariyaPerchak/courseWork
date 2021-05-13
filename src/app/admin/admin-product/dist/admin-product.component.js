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
exports.AdminProductComponent = void 0;
var core_1 = require("@angular/core");
require("firebase/storage");
var dish_module_1 = require("src/app/shared/modules/dish.module");
var category_module_1 = require("src/app/shared/modules/category.module");
var AdminProductComponent = /** @class */ (function () {
    function AdminProductComponent(modalService, dishService, categoryService, afStorage) {
        this.modalService = modalService;
        this.dishService = dishService;
        this.categoryService = categoryService;
        this.afStorage = afStorage;
        this.arrayDishes = [];
        this.arrayCategories = [];
    }
    AdminProductComponent.prototype.ngOnInit = function () {
        this.getProduct();
        this.getCategory();
    };
    AdminProductComponent.prototype.addModal = function (template) {
        this.resetForm();
        this.modalRef = this.modalService.show(template);
        this.editStatus = false;
        for (var i = 0; i < this.arrayCategories.length; i++) {
            if (this.arrayCategories[i].name.includes('nutrition programs')) {
                console.log(this.arrayCategories[i]);
                console.log(i);
                this.arrayCategories.splice(i, 1);
            }
        }
        console.log(this.arrayCategories);
    };
    AdminProductComponent.prototype.deleteModal = function (template, product) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-sm');
        this.deleteDish = product;
    };
    AdminProductComponent.prototype.editModal = function (template, dish) {
        this.modalRef = this.modalService.show(template);
        this.newCategory = dish.category.name;
        this.newCategoryUkr = dish.category.nameUkr;
        this.newName = dish.name;
        this.newNameUkr = dish.nameUkr;
        this.newDescription = dish.description;
        this.newDescriptionUkr = dish.descriptionUkr;
        this.newWeight = dish.weight;
        this.newPrice = dish.price;
        this.productImage = dish.image;
        this.dishId = dish.id;
        this.editStatus = true;
    };
    AdminProductComponent.prototype.getProduct = function () {
        var _this = this;
        this.dishService.getCloudDishes().subscribe(function (data) {
            _this.arrayDishes = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminProductComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCloudCategories().subscribe(function (data) {
            _this.arrayCategories = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminProductComponent.prototype.addDish = function () {
        for (var i = 0; i < this.arrayCategories.length; i++) {
            if (this.arrayCategories[i].name == this.newCategory) {
                this.categoryId = this.arrayCategories[i].id;
            }
        }
        if (this.newCategory === 'meat') {
            this.newCategoryUkr = "м'ясо";
        }
        if (this.newCategory === 'smoothie') {
            this.newCategoryUkr = 'смузі';
        }
        if (this.newCategory === 'salad') {
            this.newCategoryUkr = 'салат';
        }
        if (this.newCategory === 'soup') {
            this.newCategoryUkr = 'супи';
        }
        if (this.newCategory === 'bowl') {
            this.newCategoryUkr = 'боул';
        }
        if (this.newCategory === 'desserts') {
            this.newCategoryUkr = 'десерти';
        }
        if (this.newCategory === 'fish') {
            this.newCategoryUkr = 'риба';
        }
        if (this.newCategory === 'pasta') {
            this.newCategoryUkr = 'паста';
        }
        var dishCategory = new category_module_1.Category(this.categoryId, this.newCategory, this.newCategoryUkr);
        var newDish = new dish_module_1.Dish("" + this.uuid(), dishCategory, this.newName, this.newNameUkr, this.newDescription, this.newDescriptionUkr, this.newWeight, this.newPrice, this.productImage);
        this.arrayDishes.push(newDish);
        this.dishService.addCloudDish(newDish);
        this.getProduct();
        this.resetForm();
        this.modalRef.hide();
    };
    AdminProductComponent.prototype.deleteDishFunction = function (dish) {
        this.dishService.deleteCloudDish(dish);
        this.getProduct();
        this.modalRef.hide();
    };
    AdminProductComponent.prototype.dismissDish = function () {
        this.modalRef.hide();
    };
    AdminProductComponent.prototype.saveEditDish = function () {
        for (var i = 0; i < this.arrayCategories.length; i++) {
            if (this.arrayCategories[i].name == this.newCategory) {
                this.categoryId = this.arrayCategories[i].id;
            }
        }
        var editDish = new dish_module_1.Dish(this.dishId, new category_module_1.Category(this.categoryId, this.newCategory, this.newCategoryUkr), this.newName, this.newNameUkr, this.newDescription, this.newDescriptionUkr, this.newWeight, this.newPrice, this.productImage);
        this.dishService.updateCloudDish(editDish);
        this.getProduct();
        this.modalRef.hide();
    };
    AdminProductComponent.prototype.resetForm = function () {
        this.newCategory = '';
        this.newCategoryUkr = '';
        this.newName = '';
        this.newNameUkr = '';
        this.newDescription = '';
        this.newDescriptionUkr = '';
        this.newWeight = '';
        this.newPrice = null;
        this.productImage = '';
    };
    AdminProductComponent.prototype.uploadFile = function (event) {
        var _this = this;
        var file = event.target.files[0];
        var filePath = "images/" + this.uuid() + "." + file.type.split('/')[1];
        var task = this.afStorage.upload(filePath, file);
        this.uploadProgress = task.percentageChanges();
        task.then(function (e) {
            _this.afStorage.ref("images/" + e.metadata.name).getDownloadURL().subscribe(function (url) {
                _this.productImage = url;
            });
        });
    };
    AdminProductComponent.prototype.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    AdminProductComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-product',
            templateUrl: './admin-product.component.html',
            styleUrls: ['./admin-product.component.scss']
        })
    ], AdminProductComponent);
    return AdminProductComponent;
}());
exports.AdminProductComponent = AdminProductComponent;
