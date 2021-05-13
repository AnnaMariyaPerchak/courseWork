"use strict";
exports.__esModule = true;
exports.Nutrition = void 0;
var Nutrition = /** @class */ (function () {
    function Nutrition(id, category, name, nameUkr, price, kcal, description, 
    // public duration:number,
    count) {
        if (count === void 0) { count = 1; }
        this.id = id;
        this.category = category;
        this.name = name;
        this.nameUkr = nameUkr;
        this.price = price;
        this.kcal = kcal;
        this.description = description;
        this.count = count;
    }
    return Nutrition;
}());
exports.Nutrition = Nutrition;
