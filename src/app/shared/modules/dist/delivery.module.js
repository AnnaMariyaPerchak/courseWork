"use strict";
exports.__esModule = true;
exports.Delivery = void 0;
var Delivery = /** @class */ (function () {
    function Delivery(id, order, 
    // public dishForOrders:Array<IDish>,
    // public price:number,
    courier, inProgress, delivered) {
        if (delivered === void 0) { delivered = false; }
        this.id = id;
        this.order = order;
        this.courier = courier;
        this.inProgress = inProgress;
        this.delivered = delivered;
    }
    return Delivery;
}());
exports.Delivery = Delivery;
