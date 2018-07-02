import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'fromNow',
  pure: false
})
@Injectable()
export class FromNowPipe implements PipeTransform {
  // Show moment.js dateFormat for time elapsed.
  transform(date: any, args?: any): any {
    var locale = window.navigator.language;
    moment.locale(locale);
    return moment(new Date(date)).fromNow();
  }
}
