import { ICategory } from '../interfaces/category.interface';
import { IDescription } from '../interfaces/description.interface';
import { INutrition } from './../interfaces/nutrition.interface';

export class Nutrition implements INutrition{
  constructor(
    public id:string,
    public category:ICategory,
    public name:string,
    public nameUkr:string,
    public price:number,
    public kcal:number,
    public description:IDescription,
    // public duration:number,
    public count:number=1
  ){}
}
