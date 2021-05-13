"use strict";
exports.__esModule = true;
exports.Dish = void 0;
var Dish = /** @class */ (function () {
    function Dish(id, category, name, nameUkr, description, descriptionUkr, weight, price, image, count) {
        if (count === void 0) { count = 1; }
        this.id = id;
        this.category = category;
        this.name = name;
        this.nameUkr = nameUkr;
        this.description = description;
        this.descriptionUkr = descriptionUkr;
        this.weight = weight;
        this.price = price;
        this.image = image;
        this.count = count;
    }
    return Dish;
}());
exports.Dish = Dish;
