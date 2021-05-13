import { Component, OnInit } from '@angular/core';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { PreferencesService } from 'src/app/shared/services/preferences.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  myBasket: Array<IDish> = [];
  totalPrice = 0;
  statusLogin: boolean;
  urlLogin: string;
  pageLogin: string;

  recomendMeat: string
  recomendFish: string
  recomendGluten: string
  recomendDairy: string
  recomendSugar: string
  recomendBowl: string
  recomendSalad: string
  recomendSoup: string
  recomendPasta: string
  recomendBakery: string
  recomendDesserts: string

  adminPage:boolean=false
  userPage:boolean=false
  courierPage:boolean=false

  constructor(private orderService: OrdersService, 
              private prefService: PreferencesService, 
              private auth: LogInService,
              private translate:TranslateService) {
                // translate.setDefaultLang('en')
                translate.addLangs(['en','ukr'])
    translate.setDefaultLang('en')
              }

  ngOnInit(): void {
    this.checkBasket();
    this.getLocalStorage();
    this.checkUser()
    this.checkUserLocalStorage()
    localStorage.setItem('language','en')

    
    // setTimeout(()=>{window.location.reload()},1000)

    this.prefService.preference.subscribe(
      (data:any) => {
        console.log(data)
      if (data.optionMeat === 'yes') {this.recomendMeat = 'recomend to you'}
      else { this.recomendMeat = '' }

      if (data.optionFish === 'yes') { this.recomendFish = 'recomend to you' }
      else { this.recomendFish = '' }

      if (data.optionMeat === 'yes' && data.optionFish === 'yes') { this.recomendSoup = 'recomend to you' }
      else { this.recomendSoup = '' }

      if (data.optionMeat === 'yes' && data.optionFish === 'yes' && data.optionGluten === 'no') { this.recomendPasta = 'recomend to you' }
      else { this.recomendPasta = '' }

      if (data.optionMeat === 'yes' && data.optionFish === 'yes') { this.recomendBowl = 'recomend to you' }
      else { this.recomendBowl = '' }

      if (data.optionMeat === 'yes' && data.optionFish === 'yes' && data.optionDairyProduct === 'yes') { this.recomendSalad = 'recomend to you' }
      else { this.recomendSalad = '' }

      if (data.optionDairyProduct === 'yes' && data.optionSugar === 'yes') { this.recomendBakery = 'recomend to you' }
      else { this.recomendBakery = '' }

      if (data.optionDairyProduct === 'no' && data.optionSugar === 'no' && data.optionGluten === 'yes') { this.recomendDesserts = 'recomend to you' }
      else { this.recomendDesserts = '' }
      }
    )
  }

  useLanguage(language:string){
    this.translate.use(language)
    localStorage.setItem('language',language)
    // console.log(this.translate.currentLang)
  }
  
  private checkBasket(): void {
    this.orderService.basket.subscribe(
      () => {
        this.getLocalStorage();
      }
    );
  }

  private getLocalStorage(): void {
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      this.myBasket = JSON.parse(localStorage.getItem('dishes'));
      this.totalPrice = this.myBasket.reduce((total, product) => total + (product.price * product.count), 0);
    }
  }
  private checkUser(): void {
    this.auth.userStatusChanges.subscribe(
      () => {
        this.checkUserLocalStorage();
      }
    );
  }

  private checkUserLocalStorage(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null) {
      if (user.role == 'admin') {
        this.adminPage=true
        this.urlLogin = 'admin';
        // this.pageLogin = 'Admin';
        // if (localStorage.getItem('language') == 'en'){
        // if (this.translate.currentLang === 'en'){
        //   this.pageLogin = 'Admin';
        //   console.log(localStorage.getItem('language'))
        //   console.log('Admin')
        // } else {
        //   this.pageLogin = 'Адмін';
        //   console.log(localStorage.getItem('language'))
        //   console.log('Фдмін')
        // }
        
      } 
      // else 
      if (user.role=='user'){
        this.userPage=true
        this.urlLogin = 'profile';
        // this.pageLogin = 'Cabinet';
      } 
      // else
      if (user.role=='courier'){
        console.log(user)
        this.courierPage=true
        this.urlLogin = 'courier';
        // this.pageLogin = 'Courier';
      }
      // if (user.role=='cooker'){
      //   console.log(user)
      //   this.urlLogin = 'cooker';
      //   this.pageLogin = 'Cooker';
      // }
      // else {
        // console.log(user)
        // this.urlLogin = 'courier';
        // this.pageLogin = 'Courier';
      // }
      this.statusLogin = true;
    } else {
      this.statusLogin = false;
      this.urlLogin = '';
      this.pageLogin = '';
    }
  }
}
