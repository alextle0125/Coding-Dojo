import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InitMapComponent } from './init-map/init-map.component';
import { CrimeComponent } from './crime/crime.component';
import { HealthComponent } from './health/health.component';
import { PopulationComponent } from './population/population.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TeenBirthComponent } from './teen-birth/teen-birth.component';
import { DrugMortalityComponent } from './drug-mortality/drug-mortality.component';
import { LaborComponent } from './labor/labor.component';

const routes: Routes = [
	{ path: '', pathMatch: 'full', component: InitMapComponent },
	{ path: 'crimes', pathMatch: 'full', component: CrimeComponent },
	{ path: 'health', pathMatch: 'full', component: HealthComponent },
	{ path: 'population', pathMatch: 'full', component: PopulationComponent },
	{ path: 'temperature', pathMatch: 'full', component: TemperatureComponent },
	{ path: 'teen-birth', pathMatch: 'full', component: TeenBirthComponent },
	{ path: 'drug-mortality', pathMatch: 'full', component: DrugMortalityComponent },
	{ path: 'unemployment', pathMatch: 'full', component: LaborComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
