import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Nutrition } from './../../shared/modules/nutrition.module';
import { INutrition } from './../../shared/interfaces/nutrition.interface';
import { NutritionsService } from './../../shared/services/nutritions.service';
import { Category } from 'src/app/shared/modules/category.module';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';
import { Description } from 'src/app/shared/modules/description.module';
import { IDescription } from 'src/app/shared/interfaces/description.interface';

@Component({
  selector: 'app-admin-nutritions',
  templateUrl: './admin-nutritions.component.html',
  styleUrls: ['./admin-nutritions.component.scss']
})
export class AdminNutritionsComponent implements OnInit {

  arrayNutritions:Array<INutrition>=[]
  arrayCategories:Array<any>=[]
  category:string
  newCategory:string
  newCategoryUkr:string
  categoryId:string
  newName:string
  newNameUkr:string
  newBreakfast:string
  newBreakfastUkr:string
  newLunch:string
  newLunchUkr:string
  newFirstDinner:string
  newFirstDinnerUkr:string
  newSupper:string
  newSupperUkr:string
  newSecondDinner:string
  newSecondDinnerUkr:string
  newPrice:number
  newKcal:number
  newDuration:number
  nutritionId:string
  deleteNutrition:INutrition;
  modalRef: BsModalRef;
  search:string
  searchName:string
  editStatus: boolean;
  selected :string
  
  constructor(private modalService: BsModalService,
              private nutritionService:NutritionsService,
              private categoryService:CategoryService) {}

  ngOnInit(): void {
    this.getNutrition()
    this.getCategory()
  }

  addModal(template: TemplateRef<any>) {
    this.resetForm()
    this.modalRef = this.modalService.show(template);
    this.editStatus=false
  }

  deleteModal(template: TemplateRef<any>,nutrition:INutrition) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
    this.deleteNutrition=nutrition
  }

  editModal(template: TemplateRef<any>,nutrition:INutrition) {
    this.modalRef = this.modalService.show(template);
    this.nutritionId=nutrition.id
    this.newCategory=nutrition.category.name
    this.newCategoryUkr=nutrition.category.nameUkr
    this.newName=nutrition.name
    this.newNameUkr=nutrition.nameUkr
    this.newPrice=nutrition.price
    this.newKcal=nutrition.kcal
    this.newBreakfast=nutrition.description.breakfast
    this.newBreakfastUkr=nutrition.description.breakfastUkr
    this.newLunch=nutrition.description.lunch
    this.newLunchUkr=nutrition.description.lunchUkr
    this.newFirstDinner=nutrition.description.firstDinner
    this.newFirstDinnerUkr=nutrition.description.firstDinnerUkr
    this.newSupper=nutrition.description.supper
    this.newSupperUkr=nutrition.description.supperUkr
    this.newSecondDinner=nutrition.description.secondDinner
    this.newSecondDinnerUkr=nutrition.description.secondDinnerUkr
    this.editStatus = true;
  }

  private getNutrition():void{
    this.nutritionService.getCloudNutrition().subscribe(data => {
      this.arrayNutritions = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Nutrition;
      })
    });
  }

  private getCategory():void{
    this.categoryService.getCloudCategories().subscribe(data => {
      this.arrayCategories = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Category;
      })
    });
  }

  addNutrition():void{
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
      }
    }
    if (this.newCategory==='nutrition programs for men'){
      this.newCategoryUkr='програма харчування для чоловіків'
    }
    if (this.newCategory==='nutrition programs for women'){
      this.newCategoryUkr='програма харчування для жінок'
    }
    const nutritionCategory:ICategory=new Category(this.categoryId,this.newCategory,this.newCategoryUkr)
    const description:IDescription=new Description(
      this.newBreakfast,
      this.newBreakfastUkr,
      this.newLunch,
      this.newLunchUkr,
      this.newFirstDinner,
      this.newFirstDinnerUkr,
      this.newSupper,
      this.newSupperUkr,
      this.newSecondDinner,
      this.newSecondDinnerUkr
    )
    const newNutrition:INutrition=new Nutrition(
      `${this.uuid()}`,
      nutritionCategory,
      this.newName,
      this.newNameUkr,
      this.newPrice,
      this.newKcal,
      description
    )
    // console.log(newNutrition)
    // console.log(description)
    this.arrayNutritions.push(newNutrition)
    this.nutritionService.addCloudNutrition(newNutrition)
    this.getNutrition()
    this.resetForm()
    this.modalRef.hide()
  }

  deleteNutritionProgram(nutrition:INutrition):void{
    this.nutritionService.deleteCloudNutrition(nutrition)
    this.getNutrition()
    this.modalRef.hide()
  }

  dismissNutrition():void{
    this.modalRef.hide()
  }

  public saveEditNutrition(): void{
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
      }
    }
    if (this.newCategory==='nutrition programs for men'){
      this.newCategoryUkr='програма харчування для чоловіків'
    }
    if (this.newCategory==='nutrition programs for women'){
      this.newCategoryUkr='програма харчування для жінок'
    }
    const editNutrition: INutrition = new Nutrition(this.nutritionId,
      new Category(this.categoryId,this.newCategory,this.newCategoryUkr),
      this.newName,
      this.newNameUkr,
      this.newPrice,
      this.newKcal,
      new Description(this.newBreakfast,this.newBreakfastUkr,this.newLunch,this.newLunchUkr,this.newFirstDinner,this.newFirstDinnerUkr,this.newSupper,this.newSupperUkr,this.newSecondDinner,this.newSecondDinnerUkr)
      );
    this.nutritionService.updateCloudNutrition(editNutrition)
    this.getNutrition()
    this.modalRef.hide()
  }

  private resetForm():void{
    this.newCategory=''
    this.newCategoryUkr=''
    this.newName=''
    this.newNameUkr=''
    this.newBreakfast=''
    this.newBreakfastUkr=''
    this.newLunch=''
    this.newLunchUkr=''
    this.newFirstDinner=''
    this.newFirstDinnerUkr=''
    this.newSupper=''
    this.newSupperUkr=''
    this.newSecondDinner=''
    this.newSecondDinnerUkr=''
    this.newPrice=null
    this.newKcal=null
    this.newDuration=null
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

}
