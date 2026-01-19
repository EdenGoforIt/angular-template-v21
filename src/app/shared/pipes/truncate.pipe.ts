import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string | null | undefined, limit = 50): string | null | undefined {
    if (!value || typeof value !== 'string') {
      return value;
    }
    return value.length < limit ? value : value.slice(0, limit) + '...';
  }
}
