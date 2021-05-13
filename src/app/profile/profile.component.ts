import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { IUser } from '../shared/interfaces/user.interface';
import { User } from '../shared/modules/user.module';
import { UsersService } from '../shared/services/users.service';
// import { PreferencesService } from '../shared/services/preferences.service';
// import { Preference } from '../shared/modules/preference.module';
// import { IPreference } from '../shared/interfaces/preference.interface';
import { OrdersService } from '../shared/services/orders.service';
import { Order } from '../shared/modules/order.module';
import { LogInService } from '../shared/services/log-in.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User

  userName: string;
  userEmail: string;
  userAddress: string
  userPhone: string
  // userPreferences: IPreference
  userId: string
  userPassword: string

  modalRef: BsModalRef;
  editFirstName: string
  editLastName: string
  editEmail: string
  editAddress: string
  editPhone: string

  // meat: boolean
  // fish: boolean
  // dairyProducts: boolean
  // sugar: boolean
  // gluten: boolean

  // optionMeat: boolean
  // optionFish: boolean
  // optionDairyProduct: boolean
  // optionSugar: boolean
  // optionGluten: boolean

  // options: any = [
  //   { name: 'yes', checked: true },
  //   { name: 'no', checked: false }
  // ];

  // prefId: string

  personalOrders: Array<Order>
  add: any

  constructor(private auth: LogInService,
    private userService: UsersService,
    // private prefService: PreferencesService,
    private orderService: OrdersService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUser()
  }

  close(): void {
    this.modalRef.hide()
  }

  logOut(): void {
    this.auth.signOut();
  }

  getUser() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.userName = this.user.firstName + ' ' + this.user.lastName
    this.userEmail = this.user.email
    this.userAddress = this.user.address
    this.userPhone = this.user.phone
    // this.userPreferences = this.user.preferences
    // this.optionMeat = this.user.preferences.optionMeat
    // this.optionFish = this.user.preferences.optionFish
    // this.optionDairyProduct = this.user.preferences.optionDairyProduct
    // this.optionSugar = this.user.preferences.optionSugar
    // this.optionGluten = this.user.preferences.optionGluten
    this.userId = this.user.id
    this.userPassword = this.user.password
    // this.prefService.preference.next(this.userPreferences)
    this.orderService.getCloudOrdersPersonal(this.user.email).subscribe(
      data => {
        this.personalOrders = data
      }
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.editFirstName = this.user.firstName
    this.editLastName = this.user.lastName
    this.editEmail = this.user.email
    this.editAddress = this.user.address
    this.editPhone = this.user.phone

    // const newPref = JSON.parse(localStorage.getItem('preference'))
    // this.prefId = newPref.id
    // this.prefService.preference.subscribe(
    //   data => {
    //     console.log(data)

    //     if (data.optionMeat) {
    //       this.optionMeat = data.optionMeat
    //     } else if (!data.optionMeat) {
    //       this.optionMeat = newPref.optionMeat
    //     }

    //     if (data.optionFish) {
    //       this.optionFish = data.optionFish
    //     } else if (!data.optionFish) {
    //       this.optionFish = data.optionFish
    //     }

    //     if (data.optionDairyProduct) {
    //       this.optionDairyProduct = data.optionDairyProduct
    //     } else if (!data.optionDairyProduct) {
    //       this.optionDairyProduct = data.optionDairyProduct
    //     }

    //     if (data.optionSugar) {
    //       this.optionSugar = data.optionSugar
    //     } else if (!data.optionSugar) {
    //       this.optionSugar = data.optionSugar
    //     }
    //     if (data.optionGluten) {
    //       this.optionGluten = data.optionGluten
    //     } else if (!data.optionGluten) {
    //       this.optionGluten = data.optionGluten
    //     }
    //   }
    // )
    // if (newPref.optionMeat === 'yes') {
    //   this.meat = true
    // } else if (newPref.optionMeat === 'no') {
    //   this.meat = false
    // }

    // if (newPref.optionFish === 'yes') {
    //   this.fish = true
    // } else if (newPref.optionFish === 'no') {
    //   this.fish = false
    // }

    // if (newPref.optionDairyProduct === 'yes') {
    //   this.dairyProducts = true
    // } else if (newPref.optionDairyProduct === 'no') {
    //   this.dairyProducts = false
    // }

    // if (newPref.optionSugar === 'yes') {
    //   this.sugar = true
    // } else if (newPref.optionSugar === 'no') {
    //   this.sugar = false
    // }
    // if (newPref.optionGluten === 'yes') {
    //   this.gluten = true
    // } else if (newPref.optionGluten === 'no') {
    //   this.gluten = false
    // }
  }

  saveEditProfile() {
    // const oldUser = JSON.parse(localStorage.getItem('user'))
    // const newPreferene: IPreference = new Preference(oldUser.preferences.id,
    //   this.optionMeat,
    //   this.optionFish,
    //   this.optionDairyProduct,
    //   this.optionSugar,
    //   this.optionGluten)
    // localStorage.setItem('preference', JSON.stringify(newPreferene))
    // this.prefService.updateCloudPreference(newPreferene)
    // this.prefService.preference.next(newPreferene);


    const editProfile: IUser = new User(this.userId,
      this.editFirstName,
      this.editLastName,
      this.editEmail,
      this.userPassword,
      this.editAddress,
      this.editPhone,
      // newPreferene,
      'user');

    this.userService.updateCloudUser(editProfile)
    localStorage.setItem('user', JSON.stringify(editProfile))
    this.userService.updateCloudUser(editProfile)
    this.getUser();
    this.modalRef.hide()
  }
  // Meat(value: boolean): void {
  //   this.optionMeat = value
  // }
  // Fish(value: boolean): void {
  //   this.optionFish = value
  // }
  // DairyProducts(value: boolean): void {
  //   this.optionDairyProduct = value
  // }
  // Sugar(value: boolean): void {
  //   this.optionSugar = value
  // }
  // Gluten(value: boolean): void {
  //   this.optionGluten = value
  // }
}
