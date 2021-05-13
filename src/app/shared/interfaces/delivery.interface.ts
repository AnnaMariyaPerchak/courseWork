import { IOrder } from "./order.interface";
import { IUser } from "./user.interface";

export interface IDelivery {
    id:string,
    order:IOrder,
    // dishForOrders:Array<IDish>,
    // price:number,
    courier:IUser,
    inProgress:boolean,
    delivered:boolean
}
