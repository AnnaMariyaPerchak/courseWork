import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Component, OnInit } from '@angular/core';
import { LogInService } from '../shared/services/log-in.service';


import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Order } from 'src/app/shared/modules/order.module';
import { DeliveryService } from '../shared/services/delivery.service';
import { IDelivery } from '../shared/interfaces/delivery.interface';
import { Delivery } from '../shared/modules/delivery.module';


@Component({
  selector: 'app-courier',
  templateUrl: './courier.component.html',
  styleUrls: ['./courier.component.scss']
})
export class CourierComponent implements OnInit {

  // arrayOrders:Array<IOrder>=[]
  arrayDelivered:Array<IOrder>=[]
  deliveryCheck:boolean

  deliveryName:string
  newDel:IDelivery
  // del:any

  constructor(private auth: LogInService,
    private orderService:OrdersService,
    private delivaryService:DeliveryService ) { }

    
    delete(i){
      console.log(i)
      console.log(this.arrayDelivered[i])
      // console.log(this.arrayDelivered)
      // const newDel:IDelivery=new Delivery(this.arrayDelivered[i].id,this.arrayDelivered[i],JSON.parse(localStorage.getItem('user')),true,true)
      console.log(this.newDel)
      // this.newDel.delivered=true
      // console.log(this.newDel)
      const del=new Delivery(this.newDel.id,this.arrayDelivered[i],JSON.parse(localStorage.getItem('user')),true,true)
      console.log(del)
      this.delivaryService.updateCloudDish(del).then()
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
    }
  ngOnInit(): void {
    // console.log(JSON.parse(localStorage.getItem('user')))
    this.getOrders();
    this.deliveryName=`${JSON.parse(localStorage.getItem('user')).firstName} ${JSON.parse(localStorage.getItem('user')).lastName}` 
    // console.log(this.arrayOrders)
  }
  logOut(): void {
    this.auth.signOut();
  }
  inProgress(i){
    console.log(i)
    console.log(this.arrayDelivered[i])
    console.log(JSON.parse(localStorage.getItem('user')))
    this.newDel=new Delivery(`${this.uuid()}`,this.arrayDelivered[i],JSON.parse(localStorage.getItem('user')),true,false)
    console.log(this.newDel)
    this.delivaryService.addCloudOrder(this.newDel)
  }
  private getOrders():void{
    this.orderService.getCloudOrders().subscribe(data=>{
      this.arrayDelivered=data.map(e=>{
        // console.log(data)
        // console.log(e)
        return {
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        } as Order
      })
      console.log(this.arrayDelivered)
      for(let i=0;i<this.arrayDelivered.length;i++){
        // if(this.arrayDelivered[i].delivered==true){
          console.log(this.arrayDelivered[i])
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
    })
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
        
  }
  

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
