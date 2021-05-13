import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/shared/services/dish.service';
import { Dish } from 'src/app/shared/modules/dish.module';
import {TranslateService, LangChangeEvent} from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dishes: Array<Dish>=[]
  
  browserLang:string

  constructor(public dishService:DishService,
    private translate: TranslateService) {
      
     }

  ngOnInit(): void {
    this.getDish('soup')
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.browserLang = event.lang
      });
      
      this.browserLang=localStorage.getItem('language')
  }

  getDish(category:string='soup'):void{
    this.dishService.getCloudCategoryDishes(category).subscribe(
      data => {
        this.dishes.unshift(data[0])
        this.dishes.unshift(data[1])
        this.dishes.unshift(data[2])
      }
      
    )
    this.dishes=[]
  }
}
