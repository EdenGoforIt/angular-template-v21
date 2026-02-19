import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {
  transform<T extends Record<string, unknown>>(items: T[], search: Record<string, string>): T[] {
    return items
      ? items.filter((item) => {
          return Object.keys(search).find((key) => {
            const searchValue = search[key];
            const itemValue = item[key];
            return searchValue
              ? typeof itemValue === 'string' && itemValue.toLowerCase().includes(searchValue.toLowerCase())
              : true;
          });
        })
      : [];
  }
}
