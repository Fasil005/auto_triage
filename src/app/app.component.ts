import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TriageComponent } from "./triage/triage.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, FormsModule, TriageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'auto_triage';

  selectedTab = 'triage';

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
