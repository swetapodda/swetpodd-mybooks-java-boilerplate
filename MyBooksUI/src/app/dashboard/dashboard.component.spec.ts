import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { BookViewComponent } from '../book-view/book-view.component';
import { ErrorComponent } from '../error/error.component';
import { FavouriteComponent } from '../favourite/favourite.component';
import { HeaderComponent } from '../header/header.component';

import { LoginComponent } from '../login/login.component';
import { RecommendedComponent } from '../recommended/recommended.component';
import { RegisterComponent } from '../register/register.component';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service';
import { BookManagerService } from '../services/book-manager.service';
import { BookService } from '../services/book.service';
import { MappingControllerService } from '../services/mapping-controller.service';
import { RouterService } from '../services/router.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
     // declarations: [ DashboardComponent ]
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
      ErrorComponent
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
    schemas: [NO_ERRORS_SCHEMA]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
