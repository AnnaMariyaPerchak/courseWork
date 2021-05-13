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
exports.AdminOrdersComponent = void 0;
var core_1 = require("@angular/core");
var AdminOrdersComponent = /** @class */ (function () {
    function AdminOrdersComponent(modalService, orderService) {
        this.modalService = modalService;
        this.orderService = orderService;
        this.arrayOrders = [];
    }
    AdminOrdersComponent.prototype.ngOnInit = function () {
        this.getOrders();
    };
    AdminOrdersComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getCloudOrders().subscribe(function (data) {
            _this.arrayOrders = data.map(function (e) {
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
        });
    };
    AdminOrdersComponent = __decorate([
        core_1.Component({
            selector: 'app-admin-orders',
            templateUrl: './admin-orders.component.html',
            styleUrls: ['./admin-orders.component.scss']
        })
    ], AdminOrdersComponent);
    return AdminOrdersComponent;
}());
exports.AdminOrdersComponent = AdminOrdersComponent;
