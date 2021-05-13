import { ICategory } from './category.interface';
import {IDescription} from './description.interface'

export interface INutrition {
    id:string;
    category:ICategory;
    name:string;
    nameUkr:string;
    price:number;
    kcal:number;
    description:IDescription;
    // duration:number;
    count:number;
}