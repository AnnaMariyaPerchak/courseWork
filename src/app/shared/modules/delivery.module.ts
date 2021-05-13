import { IUser } from './../interfaces/user.interface';
import { IDish } from '../interfaces/dish.interface';
import { IOrder } from '../interfaces/order.interface';
import { IDelivery } from './../interfaces/delivery.interface';
import { Order } from './order.module';
import { User } from './user.module';

export class Delivery implements IDelivery{
    constructor(
      public id:string,
      public order:IOrder,
      // public dishForOrders:Array<IDish>,
      // public price:number,
      public courier:IUser,
      public inProgress:boolean,
      public delivered:boolean=false){}
}