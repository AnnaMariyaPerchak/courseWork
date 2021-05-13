
import { Injectable } from '@angular/core';
// import { IDish } from '../interfaces/dish.interface';
import { AngularFirestore,DocumentReference } from '@angular/fire/firestore';
// import { Router } from '@angular/router';
import {map} from 'rxjs/operators'
import 'firebase/firestore'
import { INutrition } from '../interfaces/nutrition.interface';
import { Nutrition } from '../modules/nutrition.module';

@Injectable({
  providedIn: 'root'
})
export class NutritionsService {

  constructor(private firestore: AngularFirestore) { }

  getCloudNutrition(): any {
    return this.firestore.collection('nutrition programs').snapshotChanges();
  }

  addCloudNutrition(nutrition:INutrition): any {
    return this.firestore.collection('nutrition programs').doc(nutrition.id).set({
      id: nutrition.id,
      category: { id: nutrition.category.id, name: nutrition.category.name,nameUkr: nutrition.category.nameUkr },
      name: nutrition.name,
      nameUkr: nutrition.nameUkr,
      price: nutrition.price,
      kcal:nutrition.kcal,
      description: {
        breakfast:nutrition.description.breakfast,
        breakfastUkr:nutrition.description.breakfastUkr,
        lunch:nutrition.description.lunch,
        lunchUkr:nutrition.description.lunchUkr,
        firstDinner:nutrition.description.firstDinner,
        firstDinnerUkr:nutrition.description.firstDinnerUkr,
        supper:nutrition.description.supper,
        supperUkr:nutrition.description.supperUkr,
        secondDinner:nutrition.description.secondDinner,
        secondDinnerUkr:nutrition.description.secondDinnerUkr
      },
      // duration:nutrition.duration,
      count: nutrition.count
      })
  }
  // getCloudNutritions(): any {
  //   return this.firestore.collection('nutrition programs').snapshotChanges();
  // }
  deleteCloudNutrition(nutrition:INutrition): any {
    return this.firestore.doc('nutrition programs/' + nutrition.id).delete()
  }
  updateCloudNutrition(nutrition:INutrition): any {
    return this.firestore.doc('nutrition programs/' + nutrition.id).update({
      category: { id: nutrition.category.id, name: nutrition.category.name,nameUkr: nutrition.category.nameUkr  },
      name: nutrition.name,
      nameUkr: nutrition.nameUkr,
      price: nutrition.price,
      kcal:nutrition.kcal,
      count: nutrition.count,
      // duration:nutrition.description,
      description: {
        breakfast:nutrition.description.breakfast,
        breakfastUkr:nutrition.description.breakfastUkr,
        lunch:nutrition.description.lunch,
        lunchUkr:nutrition.description.lunchUkr,
        firstDinner:nutrition.description.firstDinner,
        firstDinnerUkr:nutrition.description.firstDinnerUkr,
        supper:nutrition.description.supper,
        supperUkr:nutrition.description.supperUkr,
        secondDinner:nutrition.description.secondDinner,
        secondDinnerUkr:nutrition.description.secondDinnerUkr
    }
  })
  }
  getCloudOneNutrition(id: string): any {
    return this.firestore.collection('nutrition programs').doc('id').snapshotChanges()
  }
  getCloudCategoryNutritions(categoryName: string): any {
    return this.firestore.collection<any>('nutrition programs',ref=>ref.where('category.name', '==', categoryName)).snapshotChanges().pipe(
      map(actions=>actions.map(a=>{
        const data=a.payload.doc.data();
          const id=a.payload.doc.id;
        // console.log({id,...data})
        return {id,...data}
      }))
    )
  }
}
