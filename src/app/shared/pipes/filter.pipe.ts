/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter',
  pure: false,
  standalone: true
})

/**
 * Filter a KeyValue json list
 * To work with arrays it needs to be placed after a 'keyvalue' pipe
 */
export class FilterPipe implements PipeTransform {
  transform(items: any[], search: { [key: string]: any }): any[] {
    return items
      ? items.filter((item) => {
          return Object.keys(search).find((key) => {
            return search[key]
              ? !!item[key] && item[key].toLowerCase().indexOf(search[key].toLowerCase()) !== -1
              : true;
          });
        })
      : [];
  }
}
