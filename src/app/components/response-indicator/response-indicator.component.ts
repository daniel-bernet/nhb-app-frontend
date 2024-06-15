import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-response-indicator',
  templateUrl: './response-indicator.component.html',
  styleUrls: ['./response-indicator.component.scss'],
  standalone: true,
})
export class ResponseIndicatorComponent implements OnChanges {
  @Input() responseCounts: Map<string, number> = new Map();
  totalResponses: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['responseCounts']) {
      this.calculateTotalResponses();
    }
  }

  private calculateTotalResponses(): void {
    this.totalResponses = Array.from(this.responseCounts.values()).reduce(
      (acc, curr) => acc + curr,
      0
    );
  }
}
