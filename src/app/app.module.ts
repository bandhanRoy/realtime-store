import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';
import { MaterialComponentModule } from './material-component.module';
import { MenuSideNavComponent } from './shared/menu-side-nav/menu-side-nav.component';
import { FormSideNavComponent } from './shared/form-side-nav/form-side-nav.component';
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './shared/header/header.component';
import { SideNavService } from './common/sidenav.service';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

@NgModule({
  declarations: [
    AppComponent,
    MenuSideNavComponent,
    FormSideNavComponent,
    MapComponent,
    ListComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    }),
    AppRoutingModule,
    MaterialComponentModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AgmSnazzyInfoWindowModule
  ],
  providers: [SideNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
