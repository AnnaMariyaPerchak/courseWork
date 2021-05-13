import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(numbers: Array<any>, searchName: string): unknown {
    if (!searchName) {
      return numbers;
    }
    if (!numbers) {
      return [];
    }
    return numbers.filter(dish => dish.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
    // return numbers.filter(dish => dish.category.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
  }

}
