import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CpuAlertsComponent } from './cpu-alerts/cpu-alerts.component';
import { CpuCurrentComponent } from './cpu-current/cpu-current.component';
import { CpuHistoryComponent } from './cpu-history/cpu-history.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';

/**
 * Angular Material Components used
 */
const MATERIAL_COMPONENTS = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule,
];

@NgModule({
  declarations: [
    AppComponent,
    CpuHistoryComponent,
    CpuCurrentComponent,
    CpuAlertsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    NgChartsModule,
    FlexLayoutModule,
    ...MATERIAL_COMPONENTS,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
