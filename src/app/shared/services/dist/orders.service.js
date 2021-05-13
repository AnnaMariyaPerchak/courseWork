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
exports.OrdersService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
require("firebase/firestore");
var OrdersService = /** @class */ (function () {
    function OrdersService(firestore) {
        this.firestore = firestore;
        this.basket = new rxjs_1.Subject();
    }
    OrdersService.prototype.addCloudOrder = function (order) {
        return this.firestore.collection('orders').doc(order.id).set({
            id: order.id,
            user: order.user,
            // userFirstName:order.userFirstName,
            // userLastName:order.userLastName,
            // userAddress:order.userAddress,
            // userPhone:order.userPhone,
            dishesForOrder: order.dishesForOrder,
            totalPayment: order.totalPayment
        });
    };
    OrdersService.prototype.getCloudOrders = function () {
        return this.firestore.collection('orders').snapshotChanges();
    };
    OrdersService.prototype.getCloudOrdersPersonal = function (email) {
        return this.firestore.collection('orders', function (ref) { return ref.where('user.email', '==', email); }).snapshotChanges().pipe(operators_1.map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            console.log(email);
            return __assign({ id: id }, data);
        }); }));
    };
    OrdersService.prototype.deleteCloudOrder = function (order) {
        return this.firestore.doc('orders/' + order.id)["delete"]();
    };
    OrdersService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], OrdersService);
    return OrdersService;
}());
exports.OrdersService = OrdersService;
