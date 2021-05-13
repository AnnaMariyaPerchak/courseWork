"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasketComponent = void 0;
var core_1 = require("@angular/core");
var order_module_1 = require("src/app/shared/modules/order.module");
var user_module_1 = require("src/app/shared/modules/user.module");
var delivery_module_1 = require("src/app/shared/modules/delivery.module");
var BasketComponent = /** @class */ (function () {
    function BasketComponent(orderService, modalService, translate, deliveryService) {
        this.orderService = orderService;
        this.modalService = modalService;
        this.translate = translate;
        this.deliveryService = deliveryService;
        this.orders = [];
        this.makeOrder = true;
    }
    BasketComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.checkBasket();
        if (localStorage.getItem('user')) {
            this.makeOrder = true;
            this.userCheckAddress = JSON.parse(localStorage.getItem('user')).address;
            console.log(this.userCheckAddress);
            console.log(this.userCheckAddress.split(','));
            this.userCheckStreet = this.userCheckAddress.split(',')[0];
            console.log(this.userCheckStreet);
            console.log(this.userCheckAddress.split(',')[1].split('/'));
            this.userCheckHouse = this.userCheckAddress.split(',')[1].split('/')[0];
            console.log(this.userCheckHouse);
            if (this.userCheckAddress.split(',')[1].split('/')[1]) {
                this.userCheckFlat = this.userCheckAddress.split(',')[1].split('/')[1];
                console.log(this.userCheckAddress.split(',')[1].split('/')[1]);
            }
            else {
                this.userCheckFlat = '';
                console.log('no flat');
            }
        }
        else {
            this.makeOrder = false;
        }
        this.translate.onLangChange.subscribe(function (event) {
            _this.browserLang = event.lang;
        });
        this.browserLang = localStorage.getItem('language');
        // this.deliveryService.getCloudOrders().subscribe(data=>console.log(data));
        // const newOrder = new Order(`${this.uuid()}`,JSON.parse(localStorage.getItem('user')),this.orders,this.totalPrice)
        // const tempCourier=new User('LB54lpcEOSa9RdSkBrUw6ER0HK23','Zakhar','Barulyak','zakhar@delivery.com','zakhar2208','Zelena,98','0985313542','user')
        // const newDelivery=new Delivery(`${this.uuid()}`,newOrder,tempCourier,true)
        // console.log(newDelivery)
        // this.deliveryService.addCloudOrder(newDelivery)
    };
    BasketComponent.prototype.checkAddress = function () {
        console.log(this.userCheckStreet);
        console.log(this.userCheckHouse);
        console.log(this.userCheckFlat);
        this.userCheckAddress = this.userCheckStreet + "," + this.userCheckHouse + "/" + this.userCheckFlat;
        console.log(this.userCheckAddress);
        console.log(JSON.parse(localStorage.getItem('user')));
        var user = JSON.parse(localStorage.getItem('user'));
        this.userFirstName = user.firstName;
        this.userLastName = user.lastName;
        user.address = this.userCheckAddress;
        this.userPhone = user.phone;
        this.userEmail = user.email;
        console.log(user);
        var newOrder = new order_module_1.Order("" + this.uuid(), user, this.orders, this.totalPrice);
        var tempCourier = new user_module_1.User('LB54lpcEOSa9RdSkBrUw6ER0HK23', 'Zakhar', 'Barulyak', 'zakhar@delivery.com', 'zakhar2208', 'Zelena,98', '0985313542', 'user');
        var newDelivery = new delivery_module_1.Delivery("" + this.uuid(), newOrder, tempCourier, true);
        this.orderService.addCloudOrder(newOrder);
        this.deliveryService.addCloudOrder(newDelivery).then(console.log('done'));
        this.orders = [];
        localStorage.setItem('dishes', JSON.stringify(this.orders));
        this.orderService.basket.next(this.orders);
    };
    BasketComponent.prototype.checkBasket = function () {
        if (localStorage.length > 0 && localStorage.getItem('dishes')) {
            this.orders = JSON.parse(localStorage.getItem('dishes'));
        }
        this.total();
    };
    BasketComponent.prototype.orderCount = function (dish, status) {
        if (status) {
            dish.count++;
        }
        else {
            if (dish.count > 1) {
                dish.count--;
            }
        }
        this.updateLocalStorage();
        this.total();
    };
    BasketComponent.prototype.deleteOrder = function (dish) {
        var index = this.orders.findIndex(function (d) { return d.id === dish.id; });
        this.orders.splice(index, 1);
        this.total();
        this.updateLocalStorage();
    };
    BasketComponent.prototype.updateLocalStorage = function () {
        localStorage.setItem('dishes', JSON.stringify(this.orders));
        this.orderService.basket.next(this.orders);
    };
    BasketComponent.prototype.total = function () {
        this.totalPrice = this.orders.reduce(function (total, elem) {
            return total + (elem.price * elem.count);
        }, 0);
    };
    // public addOrder(template: TemplateRef<any>): void {
    //   this.modalRef = this.modalService.show(template);
    // }
    BasketComponent.prototype.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    BasketComponent.prototype.openModal = function (template) {
        this.modalRef = this.modalService.show(template);
    };
    BasketComponent.prototype.orderWithoutLogIn = function () {
        var preferencesWithoutLogIn;
        // if(localStorage.getItem('preference')){
        //   preferencesWithoutLogIn=JSON.parse(localStorage.getItem('preference'))
        // } else {
        //   preferencesWithoutLogIn=new Preference(`${this.uuid()}`,true,true,true,true,true)
        //   localStorage.setItem('preference',JSON.stringify(preferencesWithoutLogIn))
        // }
        // console.log(preferencesWithoutLogIn)
        var userWithoutLogIn = new user_module_1.User("" + this.uuid(), this.userFirstName, this.userLastName, this.email, '111111', this.userAddress, this.phone, 'user');
        localStorage.setItem('user', JSON.stringify(userWithoutLogIn));
        var newOrder = new order_module_1.Order("" + this.uuid(), userWithoutLogIn, this.orders, this.totalPrice);
        var tempCourier = new user_module_1.User('LB54lpcEOSa9RdSkBrUw6ER0HK23', 'Zakhar', 'Barulyak', 'zakhar@delivery.com', 'zakhar2208', 'Zelena,98', '0985313542', 'user');
        var newDelivery = new delivery_module_1.Delivery("" + this.uuid(), newOrder, userWithoutLogIn, true);
        console.log(newOrder);
        // console.log(tempCourier)
        // console.log(newDelivery)
        this.orderService.addCloudOrder(newOrder);
        this.deliveryService.addCloudOrder(newDelivery).then(console.log('done'));
        this.orders = [];
        localStorage.setItem('dishes', JSON.stringify(this.orders));
        this.orderService.basket.next(this.orders);
        // this.orderService.addCloudOrder(newOrder)
    };
    BasketComponent = __decorate([
        core_1.Component({
            selector: 'app-basket',
            templateUrl: './basket.component.html',
            styleUrls: ['./basket.component.scss']
        })
    ], BasketComponent);
    return BasketComponent;
}());
exports.BasketComponent = BasketComponent;
