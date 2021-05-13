import { IDescription } from '../interfaces/description.interface';

export class Description implements IDescription{
  constructor(
    public breakfast:string,
    public breakfastUkr:string,
    public lunch:string,
    public lunchUkr:string,
    public firstDinner:string,
    public firstDinnerUkr:string,
    public supper:string,
    public supperUkr:string,
    public secondDinner:string,
    public secondDinnerUkr:string
  ){}
}
