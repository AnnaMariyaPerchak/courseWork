import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Nutrition } from 'src/app/shared/modules/nutrition.module';
import { INutrition } from 'src/app/shared/interfaces/nutrition.interface';
import { NutritionsService } from './../../shared/services/nutritions.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core'

// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// import { NgbDropdown} from '@ng-bootstrap/ng-bootstrap';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nutrion-programs',
  templateUrl: './nutrion-programs.component.html',
  styleUrls: ['./nutrion-programs.component.scss']
})
export class NutrionProgramsComponent implements OnInit {

  private nutritionCollection: AngularFirestoreCollection<Nutrition>;

  nutritions: Array<Nutrition>
  currentNutrition: any
  categoryName: string
  categoryNameUkr: string
  category: string
  i: number = 0
  modalRef: BsModalRef

  nutritionName:string
  nutritionNameUkr:string
  nutritionKcal:number
  nutritionBreakfast:string
  nutritionBreakfastUkr:string
  nutritionLunch:string
  nutritionLunchUkr:string
  nutritionFirstDinner:string
  nutritionFirstDinnerUkr:string
  nutritionSupper:string
  nutritionSupperUkr:string
  nutritionSecondDinner:string
  nutritionSecondDinnerUkr:string

  browserLang:string
//   nutritionCount:number
  

//   options = [1, 7,14,21];
// optionSelected: any;

// onOptionsSelected(event){
//  console.log(event); //option value will be sent as event
//  this.nutritionCount=event
//  console.log(this.nutritionCount)
// }

  constructor(private nutritionsService: NutritionsService,
    // private nutrService:NutritionsService,
    private modalService:BsModalService,
    private translate: TranslateService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: OrdersService,
              private afs: AngularFirestore) {
    this.nutritionCollection = afs.collection('nutrition programs')

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const nameOfCategory = this.activatedRoute.snapshot.paramMap.get('category');
        this.categoryName = nameOfCategory
        // console.log(nameOfCategory)
        this.getNutritions(nameOfCategory)
      }
    });
  }

  ngOnInit(): void { 
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang
    });
    this.browserLang=localStorage.getItem('language')
    // this.nutritionsService.getCloudNutrition().subscribe(data=>(data.map(e=>console.log(e.payload.doc.data()))))
  }

  
  private getNutritions(categoryName: string = 'nutrition programs for men'): void {
    // console.log(categoryName)
    this.nutritionsService.getCloudCategoryNutritions(categoryName).subscribe(
      data => {
        this.nutritions = data
        this.categoryNameUkr=this.nutritions[1].category.nameUkr
        // console.log(data)
        // console.log(this.dishes)
      }
    )
  }

  addModal(template: TemplateRef<any>,nutrition: INutrition) {
    this.modalRef = this.modalService.show(template);

    this.nutritionName=nutrition.name
    this.nutritionNameUkr=nutrition.nameUkr
    this.nutritionKcal=nutrition.kcal
    this.nutritionBreakfast=nutrition.description.breakfast
    this.nutritionBreakfastUkr=nutrition.description.breakfastUkr
    this.nutritionLunch=nutrition.description.lunch
    this.nutritionLunchUkr=nutrition.description.lunchUkr
    this.nutritionFirstDinner=nutrition.description.firstDinner
    this.nutritionFirstDinnerUkr=nutrition.description.firstDinnerUkr
    this.nutritionSupper=nutrition.description.supper
    this.nutritionSupperUkr=nutrition.description.supperUkr
    this.nutritionSecondDinner=nutrition.description.secondDinner
    this.nutritionSecondDinnerUkr=nutrition.description.secondDinnerUkr
  }

  public addBasket(nutrition: INutrition): void {
    let localDishes: Array<INutrition> = [];
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      localDishes = JSON.parse(localStorage.getItem('dishes'));
      if (localDishes.some(d => d.id === nutrition.id)) {
        const index = localDishes.findIndex(d => d.id === nutrition.id);
        // localDishes[index].count += nutrition.count;
        localDishes[index].count += nutrition.count;
      } else {
        localDishes.push(nutrition);
      }
    } else {
      localDishes.push(nutrition);
    }
    localStorage.setItem('dishes', JSON.stringify(localDishes));
    nutrition.count = 1;
    this.orderService.basket.next(localDishes);
  }

  public nutritionCount(nutrition: INutrition, status: boolean): void {
    if (status) {
      nutrition.count++;
    }
    else {
      if (nutrition.count > 1) {
        nutrition.count--;
      }
    }
  }
}

// this.nutrService.getCloudNutrition().subscribe(data=>(data.map(e=>console.log(e.payload.doc.data()))))