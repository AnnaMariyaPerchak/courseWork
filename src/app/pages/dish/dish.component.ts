import { NutritionsService } from './../../shared/services/nutritions.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { DishService } from 'src/app/shared/services/dish.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Dish } from 'src/app/shared/modules/dish.module';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core'

export interface DishId extends Dish { id: string }

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  private dishCollection: AngularFirestoreCollection<Dish>;

  dishes: Array<Dish>
  currentDish: any
  categoryName: string
  categoryNameUkr: string
  category: string
  i: number = 0

  browserLang:string

  constructor(private dishService: DishService,
    // private nutrService:NutritionsService,
    private translate: TranslateService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private orderService: OrdersService,
              private afs: AngularFirestore) {
    this.dishCollection = afs.collection('dishes')

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const nameOfCategory = this.activatedRoute.snapshot.paramMap.get('category');
        this.categoryName = nameOfCategory
                // console.log(nameOfCategory)
        this.getDishes(nameOfCategory)
      }
    });
  //   translate.onLangChange.subscribe(lang=>{
  //     this.browserLang = lang;
  //     console.log(this.browserLang)
  // })
  }

  ngOnInit(): void {
    // if (localStorage.getItem('language')==='en'){
    //   console.log('hi en')
    // }
    // if (localStorage.getItem('language')==='ukr'){
    //   console.log('hi ukr')
    // }
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.browserLang = event.lang
    });
    this.browserLang=localStorage.getItem('language')
  }

  private getDishes(categoryName: string = 'soup'): void {
    this.dishService.getCloudCategoryDishes(categoryName).subscribe(
      data => {
        this.dishes = data
        this.categoryNameUkr=this.dishes[1].category.nameUkr
        // console.log(this.categoryNameUkr)
        // console.log(this.dishes[1].category.nameUkr)
        // console.log(this.dishes)
        // console.log(localStorage.getItem('language'))
        
      }
    )
  }

  public addBasket(dish: IDish): void {
    let localDishes: Array<IDish> = [];
    if (localStorage.length > 0 && localStorage.getItem('dishes')) {
      localDishes = JSON.parse(localStorage.getItem('dishes'));
      if (localDishes.some(d => d.id === dish.id)) {
        const index = localDishes.findIndex(d => d.id === dish.id);
        localDishes[index].count += dish.count;
      } else {
        localDishes.push(dish);
      }
    } else {
      localDishes.push(dish);
    }
    localStorage.setItem('dishes', JSON.stringify(localDishes));
    dish.count = 1;
    this.orderService.basket.next(localDishes);
    console.log(this.dishes)
  }

  public dishCount(dish: IDish, status: boolean): void {
    if (status) {
      dish.count++;
    }
    else {
      if (dish.count > 1) {
        dish.count--;
      }
    }
  }
}
