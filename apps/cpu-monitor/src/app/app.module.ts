import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { CpuAlertsComponent } from './cpu-alerts/cpu-alerts.component';
import { CpuCurrentComponent } from './cpu-current/cpu-current.component';
import { CpuHistoryComponent } from './cpu-history/cpu-history.component';
/**
 * Angular Material Components used
 */
const MATERIAL_COMPONENTS = [
  MatToolbarModule,
  MatCardModule,
  MatIconModule,
  MatBadgeModule,
  MatTooltipModule,
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
