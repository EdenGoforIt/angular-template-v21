/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inactiveFilter',
  pure: false,
  standalone: true
})
export class InactiveFilterPipe implements PipeTransform {
  transform(items: { key: number | string; value: string; isActive?: boolean }[], selfId: number | string): any[] {
    if (!items?.length) {
      return [];
    }

    return items.filter((item) => this.isItemActive(item) || item.key === selfId || item?.isActive == null);
  }

  isItemActive(item: { key: number | string; value: string; isActive?: boolean }): boolean {
    return item && item?.isActive === true;
  }
}
