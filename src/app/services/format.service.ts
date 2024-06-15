import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FormatService {
  constructor() {}

  formatDate(dateUnformatted: string): string {
    const date = new Date(dateUnformatted);
    const weekday = ["Sun","Mon","Tue","Wen","Thu","Fri","Sat"];
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return weekday[date.getDay()] + " " + date.toLocaleDateString();
  }

  formatDuration(durationUnfromatted: number): string {
    const h = Math.floor(durationUnfromatted / 60) + ' h ';
    const min = Math.floor(durationUnfromatted % 60) + ' min';
    return h + min;
  }
}
