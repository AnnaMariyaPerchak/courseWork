import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';
import { Dish } from 'src/app/shared/modules/dish.module';
import { IDish } from 'src/app/shared/interfaces/dish.interface';
import { DishService } from 'src/app/shared/services/dish.service';
import { Category } from 'src/app/shared/modules/category.module';
import { ICategory } from 'src/app/shared/interfaces/category.interface';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  arrayDishes:Array<IDish>=[]
  arrayCategories:Array<any>=[]
  category:string
  newCategory:string
  newCategoryUkr:string
  categoryId:string
  newName:string
  newNameUkr:string
  newDescription:string
  newDescriptionUkr:string
  newWeight:string
  newPrice:number
  productImage:string
  dishId:string
  deleteDish:IDish;
  modalRef: BsModalRef;
  search:string
  searchName:string
  editStatus: boolean;
  selected :string
  uploadProgress: Observable<number>;
  
  constructor(private modalService: BsModalService,
              private dishService:DishService,
              private categoryService:CategoryService,
              private afStorage:AngularFireStorage) {}

  ngOnInit(): void {
    this.getProduct()
    this.getCategory()
  }

  addModal(template: TemplateRef<any>) {
    this.resetForm()
    this.modalRef = this.modalService.show(template);
    this.editStatus=false
    for(let i=0;i<this.arrayCategories.length;i++){
      
      if(this.arrayCategories[i].name.includes('nutrition programs')){
        console.log(this.arrayCategories[i])
        console.log(i)
        this.arrayCategories.splice(i,1)
      }
    }
    console.log(this.arrayCategories)
  }

  deleteModal(template: TemplateRef<any>,product:IDish) {
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-sm');
    this.deleteDish=product
  }

  editModal(template: TemplateRef<any>,dish:IDish) {
    this.modalRef = this.modalService.show(template);
    this.newCategory=dish.category.name
    this.newCategoryUkr=dish.category.nameUkr
    this.newName=dish.name
    this.newNameUkr=dish.nameUkr
    this.newDescription=dish.description
    this.newDescriptionUkr=dish.descriptionUkr
    this.newWeight=dish.weight
    this.newPrice=dish.price
    this.productImage=dish.image
    this.dishId=dish.id
    this.editStatus = true;
  }

  private getProduct():void{
    this.dishService.getCloudDishes().subscribe(data => {
      this.arrayDishes = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Dish;
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

  addDish():void{
    
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
      }
    }
    if (this.newCategory==='meat'){
      this.newCategoryUkr="м'ясо"
    }
    if (this.newCategory==='smoothie'){
      this.newCategoryUkr='смузі'
    }
    if (this.newCategory==='salad'){
      this.newCategoryUkr='салат'
    }
    if (this.newCategory==='soup'){
      this.newCategoryUkr='супи'
    }
    if (this.newCategory==='bowl'){
      this.newCategoryUkr='боул'
    }
    if (this.newCategory==='desserts'){
      this.newCategoryUkr='десерти'
    }
    if (this.newCategory==='fish'){
      this.newCategoryUkr='риба'
    }
    if (this.newCategory==='pasta'){
      this.newCategoryUkr='паста'
    }
    const dishCategory:ICategory=new Category(this.categoryId,this.newCategory,this.newCategoryUkr)
    const newDish:IDish=new Dish(`${this.uuid()}`,dishCategory,this.newName,this.newNameUkr,this.newDescription,this.newDescriptionUkr,this.newWeight,this.newPrice,this.productImage);
    this.arrayDishes.push(newDish)
    this.dishService.addCloudDish(newDish)
    this.getProduct()
    this.resetForm()
    this.modalRef.hide()
  }

  deleteDishFunction(dish:IDish):void{
    this.dishService.deleteCloudDish(dish)
    this.getProduct()
    this.modalRef.hide()
  }

  dismissDish():void{
    this.modalRef.hide()
  }

  public saveEditDish(): void{
    for(let i=0;i<this.arrayCategories.length;i++){
      if (this.arrayCategories[i].name==this.newCategory){
        this.categoryId=this.arrayCategories[i].id
      }
    }
    const editDish: IDish = new Dish(this.dishId,
      new Category(this.categoryId,this.newCategory,this.newCategoryUkr),
                                              this.newName,
                                              this.newNameUkr,
                                              this.newDescription,
                                              this.newDescriptionUkr,
                                              this.newWeight,
                                              this.newPrice,
                                              this.productImage);
    this.dishService.updateCloudDish(editDish)
    this.getProduct()
    this.modalRef.hide()
  }

  private resetForm():void{
    this.newCategory=''
    this.newCategoryUkr=''
    this.newName=''
    this.newNameUkr=''
    this.newDescription=''
    this.newDescriptionUkr=''
    this.newWeight=''
    this.newPrice=null
    this.productImage=''
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = `images/${this.uuid()}.${file.type.split('/')[1]}`;
    const task = this.afStorage.upload(filePath, file);
    this.uploadProgress = task.percentageChanges();
    task.then( e => {
      this.afStorage.ref(`images/${e.metadata.name}`).getDownloadURL().subscribe( url => {
        this.productImage = url;
      });
    });
  }

  uuid(): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
