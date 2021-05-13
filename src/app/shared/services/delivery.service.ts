import { IOrder } from './../interfaces/order.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { IDelivery } from '../interfaces/delivery.interface';
import {map} from 'rxjs/operators'
import { Delivery } from '../modules/delivery.module';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private firestore:AngularFirestore) { }

  addCloudOrder(delivery:IDelivery):any{
    return this.firestore.collection('deliveries').doc(delivery.id).set({
      id:delivery.id,
      order:delivery.order,
      courier:delivery.courier,
      inProgress:delivery.inProgress,
      delivered:delivery.delivered
    })
  }
  getCloudOrders():any{
    return this.firestore.collection('deliveries').snapshotChanges();
  }
  updateCloudDish(delivery:IDelivery): any {
    return this.firestore.doc('deliveries/' + delivery.id).update({
      id:delivery.id,
      order:delivery.order,
                                                    // dishOrders:delivery.dishOrders,
                                                    // user:delivery.user,
                                                    courier:delivery.courier,
                                                    inProgress:delivery.inProgress,
                                                    delivered:delivery.delivered
    })
  }
  getCloudDelivery(order:IOrder):any{
    return this.firestore.collection<any>('deliveries',ref=>ref.where('order','==',order)).snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data()
        const id=a.payload.doc.id
        // console.log(order)
        return {id,...data}
      }))
    )
  }
}
