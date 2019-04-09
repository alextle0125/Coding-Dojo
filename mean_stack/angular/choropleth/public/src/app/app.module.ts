import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InitMapComponent } from './init-map/init-map.component';
import { CrimeComponent } from './crime/crime.component';
import { HealthComponent } from './health/health.component';
import { PopulationComponent } from './population/population.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TeenBirthComponent } from './teen-birth/teen-birth.component';
import { DrugMortalityComponent } from './drug-mortality/drug-mortality.component';
import { LaborComponent } from './labor/labor.component';

@NgModule({
  declarations: [
    AppComponent,
    CrimeComponent,
    InitMapComponent,
    HealthComponent,
    PopulationComponent,
    TemperatureComponent,
    TeenBirthComponent,
    DrugMortalityComponent,
    LaborComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
