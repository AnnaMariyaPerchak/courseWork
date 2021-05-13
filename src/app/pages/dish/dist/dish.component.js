"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DishComponent = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var DishComponent = /** @class */ (function () {
    function DishComponent(dishService, 
    // private nutrService:NutritionsService,
    translate, router, activatedRoute, orderService, afs) {
        var _this = this;
        this.dishService = dishService;
        this.translate = translate;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this.orderService = orderService;
        this.afs = afs;
        this.i = 0;
        this.dishCollection = afs.collection('dishes');
        this.router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                var nameOfCategory = _this.activatedRoute.snapshot.paramMap.get('category');
                _this.categoryName = nameOfCategory;
                // console.log(nameOfCategory)
                _this.getDishes(nameOfCategory);
            }
        });
        //   translate.onLangChange.subscribe(lang=>{
        //     this.browserLang = lang;
        //     console.log(this.browserLang)
        // })
    }
    DishComponent.prototype.ngOnInit = function () {
        var _this = this;
        // if (localStorage.getItem('language')==='en'){
        //   console.log('hi en')
        // }
        // if (localStorage.getItem('language')==='ukr'){
        //   console.log('hi ukr')
        // }
        this.translate.onLangChange.subscribe(function (event) {
            _this.browserLang = event.lang;
        });
        this.browserLang = localStorage.getItem('language');
    };
    DishComponent.prototype.getDishes = function (categoryName) {
        var _this = this;
        if (categoryName === void 0) { categoryName = 'soup'; }
        this.dishService.getCloudCategoryDishes(categoryName).subscribe(function (data) {
            _this.dishes = data;
            _this.categoryNameUkr = _this.dishes[1].category.nameUkr;
            // console.log(this.categoryNameUkr)
            // console.log(this.dishes[1].category.nameUkr)
            // console.log(this.dishes)
            // console.log(localStorage.getItem('language'))
        });
    };
    DishComponent.prototype.addBasket = function (dish) {
        var localDishes = [];
        if (localStorage.length > 0 && localStorage.getItem('dishes')) {
            localDishes = JSON.parse(localStorage.getItem('dishes'));
            if (localDishes.some(function (d) { return d.id === dish.id; })) {
                var index = localDishes.findIndex(function (d) { return d.id === dish.id; });
                localDishes[index].count += dish.count;
            }
            else {
                localDishes.push(dish);
            }
        }
        else {
            localDishes.push(dish);
        }
        localStorage.setItem('dishes', JSON.stringify(localDishes));
        dish.count = 1;
        this.orderService.basket.next(localDishes);
        console.log(this.dishes);
    };
    DishComponent.prototype.dishCount = function (dish, status) {
        if (status) {
            dish.count++;
        }
        else {
            if (dish.count > 1) {
                dish.count--;
            }
        }
    };
    DishComponent = __decorate([
        core_1.Component({
            selector: 'app-dish',
            templateUrl: './dish.component.html',
            styleUrls: ['./dish.component.scss']
        })
    ], DishComponent);
    return DishComponent;
}());
exports.DishComponent = DishComponent;
