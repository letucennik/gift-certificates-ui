import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'itemCost'
})
export class ItemCostPipe implements PipeTransform {
    transform(value: number, args?: any): string {
        return value.toString().concat("$");
    }
}