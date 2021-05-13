"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SearchPipe = void 0;
var core_1 = require("@angular/core");
var SearchPipe = /** @class */ (function () {
    function SearchPipe() {
    }
    SearchPipe.prototype.transform = function (numbers, searchName) {
        if (!searchName) {
            return numbers;
        }
        if (!numbers) {
            return [];
        }
        return numbers.filter(function (dish) { return dish.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1; });
        // return numbers.filter(dish => dish.category.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    };
    SearchPipe = __decorate([
        core_1.Pipe({
            name: 'search'
        })
    ], SearchPipe);
    return SearchPipe;
}());
exports.SearchPipe = SearchPipe;
