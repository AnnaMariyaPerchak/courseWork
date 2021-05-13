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
exports.AdminNutritionsComponent = void 0;
var core_1 = require("@angular/core");
require("firebase/storage");
var nutrition_module_1 = require("./../../shared/modules/nutrition.module");
var category_module_1 = require("src/app/shared/modules/category.module");
var description_module_1 = require("src/app/shared/modules/description.module");
var AdminNutritionsComponent = /** @class */ (function () {
    function AdminNutritionsComponent(modalService, nutritionService, categoryService) {
        this.modalService = modalService;
        this.nutritionService = nutritionService;
        this.categoryService = categoryService;
        this.arrayNutritions = [];
        this.arrayCategories = [];
    }
    AdminNutritionsComponent.prototype.ngOnInit = function () {
        this.getNutrition();
        this.getCategory();
    };
    AdminNutritionsComponent.prototype.addModal = function (template) {
        this.resetForm();
        this.modalRef = this.modalService.show(template);
        this.editStatus = false;
    };
    AdminNutritionsComponent.prototype.deleteModal = function (template, nutrition) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-sm');
        this.deleteNutrition = nutrition;
    };
    AdminNutritionsComponent.prototype.editModal = function (template, nutrition) {
        this.modalRef = this.modalService.show(template);
        this.nutritionId = nutrition.id;
        this.newCategory = nutrition.category.name;
        this.newCategoryUkr = nutrition.category.nameUkr;
        this.newName = nutrition.name;
        this.newNameUkr = nutrition.nameUkr;
        this.newPrice = nutrition.price;
        this.newKcal = nutrition.kcal;
        this.newBreakfast = nutrition.description.breakfast;
        this.newBreakfastUkr = nutrition.description.breakfastUkr;
        this.newLunch = nutrition.description.lunch;
        this.newLunchUkr = nutrition.description.lunchUkr;
        this.newFirstDinner = nutrition.description.firstDinner;
        this.newFirstDinnerUkr = nutrition.description.firstDinnerUkr;
        this.newSupper = nutrition.description.supper;
        this.newSupperUkr = nutrition.description.supperUkr;
        this.newSecondDinner = nutrition.description.secondDinner;
        this.newSecondDinnerUkr = nutrition.description.secondDinnerUkr;
        this.editStatus = true;
    };
    AdminNutritionsComponent.prototype.getNutrition = function () {
        var _this = this;
        this.nutritionService.getCloudNutrition().subscribe(function (data) {
            _this.arrayNutritions = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminNutritionsComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCloudCategories().subscribe(function (data) {
            _this.arrayCategories = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminNutritionsComponent.prototype.addNutrition = function () {
        for (var i = 0; i < this.arrayCategories.length; i++) {
            if (this.arrayCategories[i].name == this.newCategory) {
                this.categoryId = this.arrayCategories[i].id;
            }
        }
        if (this.newCategory === 'nutrition programs for men') {
            this.newCategoryUkr = 'програма харчування для чоловіків';
        }
        if (this.newCategory === 'nutrition programs for women') {
            this.newCategoryUkr = 'програма харчування для жінок';
        }
        var nutritionCategory = new category_module_1.Category(this.categoryId, this.newCategory, this.newCategoryUkr);
        var description = new description_module_1.Description(this.newBreakfast, this.newBreakfastUkr, this.newLunch, this.newLunchUkr, this.newFirstDinner, this.newFirstDinnerUkr, this.newSupper, this.newSupperUkr, this.newSecondDinner, this.newSecondDinnerUkr);
        var newNutrition = new nutrition_module_1.Nutrition("" + this.uuid(), nutritionCategory, this.newName, this.newNameUkr, this.newPrice, this.newKcal, description);
        // console.log(newNutrition)
        // console.log(description)
        this.arrayNutritions.push(newNutrition);
        this.nutritionService.addCloudNutrition(newNutrition);
        this.getNutrition();
        this.resetForm();
        this.modalRef.hide();
    };
    AdminNutritionsComponent.prototype.deleteNutritionProgram = function (nutrition) {
        this.nutritionService.deleteCloudNutrition(nutrition);
        this.getNutrition();
        this.modalRef.hide();
    };
    AdminNutritionsComponent.prototype.dismissNutrition = function () {
        this.modalRef.hide();
    };
    AdminNutritionsComponent.prototype.saveEditNutrition = function () {
        for (var i = 0; i < this.arrayCategories.length; i++) {
            if (this.arrayCategories[i].name == this.newCategory) {
                this.categoryId = this.arrayCategories[i].id;
            }
        }
        if (this.newCategory === 'nutrition programs for men') {
            this.newCategoryUkr = 'програма харчування для чоловіків';
        }
        if (this.newCategory === 'nutrition programs for women') {
            this.newCategoryUkr = 'програма харчування для жінок';
        }
        var editNutrition = new nutrition_module_1.Nutrition(this.nutritionId, new category_module_1.Category(this.categoryId, this.newCategory, this.newCategoryUkr), this.newName, this.newNameUkr, this.newPrice, this.newKcal, new description_module_1.Description(this.newBreakfast, this.newBreakfastUkr, this.newLunch, this.newLunchUkr, this.newFirstDinner, this.newFirstDinnerUkr, this.newSupper, this.newSupperUkr, this.newSecondDinner, this.newSecondDinnerUkr));
        this.nutritionService.updateCloudNutrition(editNutrition);
        this.getNutrition();
        this.modalRef.hide();
    };
    AdminNutritionsComponent.prototype.resetForm = function () {
        this.newCategory = '';
        this.newCategoryUkr = '';
        this.newName = '';
        this.newNameUkr = '';
        this.newBreakfast = '';
        this.newBreakfastUkr = '';
        this.newLunch = '';
        this.newLunchUkr = '';
        this.newFirstDinner = '';
        this.newFirstDinnerUkr = '';
        this.newSupper = '';
        this.newSupperUkr = '';
        this.newSecondDinner = '';
        this.newSecondDinnerUkr = '';
        this.newPrice = null;
        this.newKcal = null;
        this.newDuration = null;
    };
    AdminNutritionsComponent.prototype.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    AdminNutritionsComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-nutritions',
            templateUrl: './admin-nutritions.component.html',
            styleUrls: ['./admin-nutritions.component.scss']
        })
    ], AdminNutritionsComponent);
    return AdminNutritionsComponent;
}());
exports.AdminNutritionsComponent = AdminNutritionsComponent;
