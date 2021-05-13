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
exports.DeliveryService = void 0;
var core_1 = require("@angular/core");
var operators_1 = require("rxjs/operators");
var DeliveryService = /** @class */ (function () {
    function DeliveryService(firestore) {
        this.firestore = firestore;
    }
    DeliveryService.prototype.addCloudOrder = function (delivery) {
        return this.firestore.collection('deliveries').doc(delivery.id).set({
            id: delivery.id,
            order: delivery.order,
            courier: delivery.courier,
            inProgress: delivery.inProgress,
            delivered: delivery.delivered
        });
    };
    DeliveryService.prototype.getCloudOrders = function () {
        return this.firestore.collection('deliveries').snapshotChanges();
    };
    DeliveryService.prototype.updateCloudDish = function (delivery) {
        return this.firestore.doc('deliveries/' + delivery.id).update({
            id: delivery.id,
            order: delivery.order,
            // dishOrders:delivery.dishOrders,
            // user:delivery.user,
            courier: delivery.courier,
            inProgress: delivery.inProgress,
            delivered: delivery.delivered
        });
    };
    DeliveryService.prototype.getCloudDelivery = function (order) {
        return this.firestore.collection('deliveries', function (ref) { return ref.where('order', '==', order); }).snapshotChanges().pipe(operators_1.map(function (actions) { return actions.map(function (a) {
            var data = a.payload.doc.data();
            var id = a.payload.doc.id;
            // console.log(order)
            return __assign({ id: id }, data);
        }); }));
    };
    DeliveryService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DeliveryService);
    return DeliveryService;
}());
exports.DeliveryService = DeliveryService;
