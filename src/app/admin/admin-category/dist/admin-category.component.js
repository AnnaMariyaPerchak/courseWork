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
exports.AdminCategoryComponent = void 0;
var core_1 = require("@angular/core");
var category_module_1 = require("src/app/shared/modules/category.module");
var AdminCategoryComponent = /** @class */ (function () {
    function AdminCategoryComponent(modalService, categoryService) {
        this.modalService = modalService;
        this.categoryService = categoryService;
        this.arrayCategories = [];
    }
    AdminCategoryComponent.prototype.ngOnInit = function () {
        this.getCategory();
    };
    AdminCategoryComponent.prototype.addModal = function (template) {
        this.modalRef = this.modalService.show(template);
        this.editStatus = false;
    };
    AdminCategoryComponent.prototype.deleteModal = function (template, category) {
        this.modalRef = this.modalService.show(template);
        this.modalRef.setClass('modal-sm');
        this.deleteCat = category;
    };
    AdminCategoryComponent.prototype.editModal = function (template, category) {
        this.modalRef = this.modalService.show(template);
        this.newCategory = category.name;
        this.newCategoryUkr = category.nameUkr;
        this.categoryId = category.id;
        this.editStatus = true;
    };
    AdminCategoryComponent.prototype.getCategory = function () {
        var _this = this;
        this.categoryService.getCloudCategories().subscribe(function (data) {
            _this.arrayCategories = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminCategoryComponent.prototype.addCategory = function () {
        var newCat = new category_module_1.Category("" + this.uuid(), this.newCategory, this.newCategoryUkr);
        // console.log(newCat)
        // console.log(this.newCategoryUkr)
        this.arrayCategories.push(newCat);
        this.categoryService.addCloudCategory(newCat);
        this.newCategory = '';
        this.newCategoryUkr = '';
        this.modalRef.hide();
    };
    AdminCategoryComponent.prototype.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    AdminCategoryComponent.prototype.deleteCategory = function (category) {
        this.categoryService.deleteCloudCategory(category);
        this.getCategory();
        this.modalRef.hide();
    };
    AdminCategoryComponent.prototype.dismissCategory = function () {
        this.modalRef.hide();
    };
    AdminCategoryComponent.prototype.saveEditCategory = function () {
        var editCat = new category_module_1.Category(this.categoryId, this.newCategory, this.newCategoryUkr);
        this.categoryService.updateCloudCategory(editCat);
        this.getCategory();
        this.newCategory = '';
        this.newCategoryUkr = '';
        this.modalRef.hide();
    };
    AdminCategoryComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-category',
            templateUrl: './admin-category.component.html',
            styleUrls: ['./admin-category.component.scss']
        })
    ], AdminCategoryComponent);
    return AdminCategoryComponent;
}());
exports.AdminCategoryComponent = AdminCategoryComponent;
