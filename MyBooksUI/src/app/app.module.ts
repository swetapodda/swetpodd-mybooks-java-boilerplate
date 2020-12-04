import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule, MatExpansionModule, MatCardModule, MatDialogModule } from '@angular/material';
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { MatInputModule } from '@angular/material';
import { RegisterComponent } from './register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterService } from './services/router.service';
import { MappingControllerService } from './services/mapping-controller.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BookManagerService } from './services/book-manager.service';
import { BookService } from './services/book.service';
import { FavouriteComponent } from './favourite/favourite.component';
import { BookViewComponent } from './book-view/book-view.component';
import { ErrorComponent } from './error/error.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    LoginComponent,
    SearchComponent,
    RecommendedComponent,
    RegisterComponent,
    FavouriteComponent,
    BookViewComponent,
    ErrorComponent,
    FooterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule, MatDialogModule,
    NgbModule.forRoot()
  ],
  providers: [ RouterService,MappingControllerService,AuthService,BookManagerService,BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
