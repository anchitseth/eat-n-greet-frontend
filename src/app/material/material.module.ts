import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material';
import {MatStepperModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

const materialmod = [MatFormFieldModule, MatInputModule, MatChipsModule, MatIconModule, MatProgressSpinnerModule,
  MatCardModule, MatButtonModule, MatStepperModule, MatSelectModule, MatNativeDateModule, MatTableModule, MatTabsModule,
    MatToolbarModule, MatCheckboxModule, MatExpansionModule, MatSidenavModule, MatListModule, MatRadioModule, MatDatepickerModule];




@NgModule({
  declarations: [],
  imports: [
   materialmod,
  ],
  exports: [
   materialmod,
  ]
})
export class MaterialModule { }
