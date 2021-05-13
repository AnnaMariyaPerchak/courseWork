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
exports.CourierComponent = void 0;
var core_1 = require("@angular/core");
var delivery_module_1 = require("../shared/modules/delivery.module");
var CourierComponent = /** @class */ (function () {
    // del:any
    function CourierComponent(auth, orderService, delivaryService) {
        this.auth = auth;
        this.orderService = orderService;
        this.delivaryService = delivaryService;
        // arrayOrders:Array<IOrder>=[]
        this.arrayDelivered = [];
    }
    CourierComponent.prototype["delete"] = function (i) {
        console.log(i);
        console.log(this.arrayDelivered[i]);
        // console.log(this.arrayDelivered)
        // const newDel:IDelivery=new Delivery(this.arrayDelivered[i].id,this.arrayDelivered[i],JSON.parse(localStorage.getItem('user')),true,true)
        console.log(this.newDel);
        // this.newDel.delivered=true
        // console.log(this.newDel)
        var del = new delivery_module_1.Delivery(this.newDel.id, this.arrayDelivered[i], JSON.parse(localStorage.getItem('user')), true, true);
        console.log(del);
        this.delivaryService.updateCloudDish(del).then();
        // this.arrayDelivered.splice(i,1)
        // delete this.arrayDelivered[i]
        // console.log(this.arrayDelivered)
        // this.delivaryService.getCloudDelivery(this.arrayDelivered[i]).subscribe(
        //   data => {
        //     //this.del = data
        //     console.log(data)
        //   }
        // )
        // console.log(this.del)
        // this.delivaryService.updateCloudDish()
        // .splice($scope.names.indexOf(x), 1);
    };
    CourierComponent.prototype.ngOnInit = function () {
        // console.log(JSON.parse(localStorage.getItem('user')))
        this.getOrders();
        this.deliveryName = JSON.parse(localStorage.getItem('user')).firstName + " " + JSON.parse(localStorage.getItem('user')).lastName;
        // console.log(this.arrayOrders)
    };
    CourierComponent.prototype.logOut = function () {
        this.auth.signOut();
    };
    CourierComponent.prototype.inProgress = function (i) {
        console.log(i);
        console.log(this.arrayDelivered[i]);
        console.log(JSON.parse(localStorage.getItem('user')));
        this.newDel = new delivery_module_1.Delivery("" + this.uuid(), this.arrayDelivered[i], JSON.parse(localStorage.getItem('user')), true, false);
        console.log(this.newDel);
        this.delivaryService.addCloudOrder(this.newDel);
    };
    CourierComponent.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getCloudOrders().subscribe(function (data) {
            _this.arrayDelivered = data.map(function (e) {
                // console.log(data)
                // console.log(e)
                return __assign({ id: e.payload.doc.id }, e.payload.doc.data());
            });
            console.log(_this.arrayDelivered);
            for (var i = 0; i < _this.arrayDelivered.length; i++) {
                // if(this.arrayDelivered[i].delivered==true){
                console.log(_this.arrayDelivered[i]);
                // this.arrayDelivered.splice(i,1)
                // delete this.arrayDelivered[i]
            }
            // const tempUser:IUser=this.arrayDelivered[1].user
            //     const tempOrders=this.arrayDelivered[1]
            //     console.log(tempUser)
            //     console.log(tempOrders)
            //     const delivery:IDelivery=new Delivery(`${this.uuid()}`,tempOrders,tempUser,false)
            //     console.log(delivery)
            //     this.delivaryService.addCloudOrder(delivery)
        });
        // console.log(this.arrayDelivered)
        // this.arrayDelivered.map(data=>{
        //   if (data.delivered==true){
        //     this.arrayDelivered.indexOf(data)
        //   }
        // })
        // if(this.deliveryCheck.checked)
        //       for(let i=0;i<this.arrayDelivered.length;i++){
        //         if(this.arrayDelivered[i].delivered==true){
        //           this.arrayDelivered.splice(i,1)
        //         }
        //       }
        // this.orderService.getCloudOrders().subscribe(data => {
        //   this.arrayOrders = data.map(e => {
        //     // console.log(e)
        //     // this.delivaryService.addCloudOrder(`${this.uuid()}`,)
        //     return {
        //       id: e.payload.doc.id,
        //       ...e.payload.doc.data()
        //     } as Order;
        //   })
        // console.log(this.arrayOrders[1])
        // console.log(this.arrayOrders[0].dishesForOrder)
        // console.log(this.arrayOrders[0].user)
        // console.log(JSON.parse(localStorage.getItem('user')))
        // const newDelivery:IDelivery=new Delivery(`${this.uuid()}`,this.arrayOrders[1],JSON.parse(localStorage.getItem('user')) ,false)
        // console.log(newDelivery)
        // this.delivaryService.addCloudOrder(newDelivery)
    };
    CourierComponent.prototype.uuid = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    CourierComponent = __decorate([
        core_1.Component({
            selector: 'app-courier',
            templateUrl: './courier.component.html',
            styleUrls: ['./courier.component.scss']
        })
    ], CourierComponent);
    return CourierComponent;
}());
exports.CourierComponent = CourierComponent;
