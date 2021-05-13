"use strict";
exports.__esModule = true;
exports.Order = void 0;
var Order = /** @class */ (function () {
    function Order(id, user, 
    // public userFirstName:string,
    // public userLastName:string,
    // public userAddress:string,
    // public userPhone:string,
    dishesForOrder, totalPayment
    // public userEmail:string
    ) {
        this.id = id;
        this.user = user;
        this.dishesForOrder = dishesForOrder;
        this.totalPayment = totalPayment;
    }
    return Order;
}());
exports.Order = Order;
