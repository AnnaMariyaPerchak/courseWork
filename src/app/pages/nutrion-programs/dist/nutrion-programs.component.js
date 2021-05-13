"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NutrionProgramsComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
var NutrionProgramsComponent = /** @class */ (function () {
    //   nutritionCount:number
    //   options = [1, 7,14,21];
    // optionSelected: any;
    // onOptionsSelected(event){
    //  console.log(event); //option value will be sent as event
    //  this.nutritionCount=event
    //  console.log(this.nutritionCount)
    // }
    function NutrionProgramsComponent(nutritionsService, 
    // private nutrService:NutritionsService,
    modalService, translate, router, activatedRoute, orderService, afs) {
        var _this = this;
        this.nutritionsService = nutritionsService;
        this.modalService = modalService;
        this.translate = translate;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.orderService = orderService;
        this.afs = afs;
        this.i = 0;
        this.nutritionCollection = afs.collection('nutrition programs');
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var nameOfCategory = _this.activatedRoute.snapshot.paramMap.get('category');
                _this.categoryName = nameOfCategory;
                // console.log(nameOfCategory)
                _this.getNutritions(nameOfCategory);
            }
        });
    }
    NutrionProgramsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.translate.onLangChange.subscribe(function (event) {
            _this.browserLang = event.lang;
        });
        this.browserLang = localStorage.getItem('language');
        // this.nutritionsService.getCloudNutrition().subscribe(data=>(data.map(e=>console.log(e.payload.doc.data()))))
    };
    NutrionProgramsComponent.prototype.getNutritions = function (categoryName) {
        var _this = this;
        if (categoryName === void 0) { categoryName = 'nutrition programs for men'; }
        // console.log(categoryName)
        this.nutritionsService.getCloudCategoryNutritions(categoryName).subscribe(function (data) {
            _this.nutritions = data;
            _this.categoryNameUkr = _this.nutritions[1].category.nameUkr;
            // console.log(data)
            // console.log(this.dishes)
        });
    };
    NutrionProgramsComponent.prototype.addModal = function (template, nutrition) {
        this.modalRef = this.modalService.show(template);
        this.nutritionName = nutrition.name;
        this.nutritionNameUkr = nutrition.nameUkr;
        this.nutritionKcal = nutrition.kcal;
        this.nutritionBreakfast = nutrition.description.breakfast;
        this.nutritionBreakfastUkr = nutrition.description.breakfastUkr;
        this.nutritionLunch = nutrition.description.lunch;
        this.nutritionLunchUkr = nutrition.description.lunchUkr;
        this.nutritionFirstDinner = nutrition.description.firstDinner;
        this.nutritionFirstDinnerUkr = nutrition.description.firstDinnerUkr;
        this.nutritionSupper = nutrition.description.supper;
        this.nutritionSupperUkr = nutrition.description.supperUkr;
        this.nutritionSecondDinner = nutrition.description.secondDinner;
        this.nutritionSecondDinnerUkr = nutrition.description.secondDinnerUkr;
    };
    NutrionProgramsComponent.prototype.addBasket = function (nutrition) {
        var localDishes = [];
        if (localStorage.length > 0 && localStorage.getItem('dishes')) {
            localDishes = JSON.parse(localStorage.getItem('dishes'));
            if (localDishes.some(function (d) { return d.id === nutrition.id; })) {
                var index = localDishes.findIndex(function (d) { return d.id === nutrition.id; });
                // localDishes[index].count += nutrition.count;
                localDishes[index].count += nutrition.count;
            }
            else {
                localDishes.push(nutrition);
            }
        }
        else {
            localDishes.push(nutrition);
        }
        localStorage.setItem('dishes', JSON.stringify(localDishes));
        nutrition.count = 1;
        this.orderService.basket.next(localDishes);
    };
    NutrionProgramsComponent.prototype.nutritionCount = function (nutrition, status) {
        if (status) {
            nutrition.count++;
        }
        else {
            if (nutrition.count > 1) {
                nutrition.count--;
            }
        }
    };
    NutrionProgramsComponent = __decorate([
        core_1.Component({
            selector: 'app-nutrion-programs',
            templateUrl: './nutrion-programs.component.html',
            styleUrls: ['./nutrion-programs.component.scss']
        })
    ], NutrionProgramsComponent);
    return NutrionProgramsComponent;
}());
exports.NutrionProgramsComponent = NutrionProgramsComponent;
// this.nutrService.getCloudNutrition().subscribe(data=>(data.map(e=>console.log(e.payload.doc.data()))))
