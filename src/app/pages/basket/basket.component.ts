import { IUser } from 'src/app/shared/interfaces/user.interface';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { IOrder } from 'src/app/shared/interfaces/order.interface';
import { Order } from 'src/app/shared/modules/order.module';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/shared/modules/user.module';
import { Preference } from 'src/app/shared/modules/preference.module';
import { IPreference } from 'src/app/shared/interfaces/preference.interface';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core'

import { DeliveryService } from 'src/app/shared/services/delivery.service';
import { IDelivery } from 'src/app/shared/interfaces/delivery.interface';
import { Delivery } from 'src/app/shared/modules/delivery.module';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  orders: Array<IDish> = [];
  userFirstName: string 
  userLastName: string 
  userAddress: string
  userPhone: string
  userEmail: string

  userCheckAddress:string
  userCheckStreet:string
  userCheckHouse:string
  userCheckFlat:string

  totalPrice: number

  makeOrder: boolean = true

  modalRef: BsModalRef;

  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  dishesForOrder: Array<IDish>

  browserLang:string

  constructor(private orderService: OrdersService, 
    private modalService: BsModalService,
    private translate: TranslateService,
    private deliveryService:DeliveryService ) { }

  ngOnInit(): void {
    this.checkBasket();
    if (localStorage.getItem('user')) {
      this.makeOrder = true;
      this.userCheckAddress=JSON.parse(localStorage.getItem('user')).address
      console.log(this.userCheckAddress)
      console.log(this.userCheckAddress.split(','))
      this.userCheckStreet=this.userCheckAddress.split(',')[0]
      console.log(this.userCheckStreet)
      console.log(this.userCheckAddress.split(',')[1].split('/'))
      this.userCheckHouse=this.userCheckAddress.split(',')[1].split('/')[0]
      console.log(this.userCheckHouse)
      if (this.userCheckAddress.split(',')[1].split('/')[1]){
        this.userCheckFlat=this.userCheckAddress.split(',')[1].split('/')[1]
        console.log(this.userCheckAddress.split(',')[1].split('/')[1])
      }
      else {
        this.userCheckFlat=''
        console.log('no flat')
      }
    } else {
      this.makeOrder = false
    }

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang
    });
    
    this.browserLang=localStorage.getItem('language')

    // this.deliveryService.getCloudOrders().subscribe(data=>console.log(data));
    // const newOrder = new Order(`${this.uuid()}`,JSON.parse(localStorage.getItem('user')),this.orders,this.totalPrice)
    // const tempCourier=new User('LB54lpcEOSa9RdSkBrUw6ER0HK23','Zakhar','Barulyak','zakhar@delivery.com','zakhar2208','Zelena,98','0985313542','user')
    // const newDelivery=new Delivery(`${this.uuid()}`,newOrder,tempCourier,true)
    // console.log(newDelivery)
    // this.deliveryService.addCloudOrder(newDelivery)
  }


  checkAddress():void{
    console.log(this.userCheckStreet)
    console.log(this.userCheckHouse)
    console.log(this.userCheckFlat)
    
    this.userCheckAddress=`${this.userCheckStreet},${this.userCheckHouse}/${this.userCheckFlat}`
    console.log(this.userCheckAddress)

    console.log(JSON.parse(localStorage.getItem('user')))
    const user :IUser = JSON.parse(localStorage.getItem('user'))
    this.userFirstName = user.firstName
    this.userLastName = user.lastName
    user.address = this.userCheckAddress
    this.userPhone = user.phone
    this.userEmail=user.email
    console.log(user)

    const newOrder = new Order(`${this.uuid()}`,user,this.orders,this.totalPrice)
    const tempCourier=new User('LB54lpcEOSa9RdSkBrUw6ER0HK23','Zakhar','Barulyak','zakhar@delivery.com','zakhar2208','Zelena,98','0985313542','user')
    const newDelivery=new Delivery(`${this.uuid()}`,newOrder,tempCourier,true)

    this.orderService.addCloudOrder(newOrder)
    this.deliveryService.addCloudOrder(newDelivery).then(
      console.log('done')
    )

    this.orders = [];
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
  }

  private checkBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      this.orders = JSON.parse(localStorage.getItem('dishes'));
    }
    this.total()
  }

  public orderCount(dish: IDish, status: boolean): void {
    if (status) {
      dish.count++;
    }
    else {
      if (dish.count > 1) {
        dish.count--;
      }
    }
    this.updateLocalStorage();
    this.total()
  }

  public deleteOrder(dish: IDish) {
    const index = this.orders.findIndex(d => d.id === dish.id);
    this.orders.splice(index, 1);
    this.total()
    this.updateLocalStorage();
  }

  private updateLocalStorage() {
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
  }

  private total() {
    this.totalPrice = this.orders.reduce((total, elem) => {
      return total + (elem.price * elem.count);
    }, 0);
  }

  // public addOrder(template: TemplateRef<any>): void {
  //   this.modalRef = this.modalService.show(template);
  // }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  orderWithoutLogIn(): void {
    let preferencesWithoutLogIn:IPreference
    // if(localStorage.getItem('preference')){
    //   preferencesWithoutLogIn=JSON.parse(localStorage.getItem('preference'))
    // } else {
    //   preferencesWithoutLogIn=new Preference(`${this.uuid()}`,true,true,true,true,true)
    //   localStorage.setItem('preference',JSON.stringify(preferencesWithoutLogIn))
    // }
    // console.log(preferencesWithoutLogIn)
    const userWithoutLogIn=new User(`${this.uuid()}`,this.userFirstName,this.userLastName,
    this.email,'111111',this.userAddress,this.phone,'user')
    localStorage.setItem('user', JSON.stringify(userWithoutLogIn));

    const newOrder: IOrder = new Order(`${this.uuid()}`,
                                        userWithoutLogIn,
                                        this.orders,
                                        this.totalPrice)
                            
    const tempCourier=new User('LB54lpcEOSa9RdSkBrUw6ER0HK23','Zakhar','Barulyak','zakhar@delivery.com','zakhar2208','Zelena,98','0985313542','user')
    const newDelivery=new Delivery(`${this.uuid()}`,newOrder,userWithoutLogIn,true)
    console.log(newOrder)
    // console.log(tempCourier)
    // console.log(newDelivery)
                                        
                                        this.orderService.addCloudOrder(newOrder)
                                    
                                        this.deliveryService.addCloudOrder(newDelivery).then(
                                          console.log('done')
                                        )
                

    this.orders = [];
    localStorage.setItem('dishes', JSON.stringify(this.orders));
    this.orderService.basket.next(this.orders);
    // this.orderService.addCloudOrder(newOrder)
  }

}