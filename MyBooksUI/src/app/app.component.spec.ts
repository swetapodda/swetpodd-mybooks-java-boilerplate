import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatFormFieldModule, MatInputModule, MatCardModule, MatDialogModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookViewComponent } from './book-view/book-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { AuthService } from './services/auth.service';
import { BookManagerService } from './services/book-manager.service';
import { BookService } from './services/book.service';
import { MappingControllerService } from './services/mapping-controller.service';
import { RouterService } from './services/router.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule, MatDialogModule,
        NgbModule.forRoot()
        
      ],
      providers: [ RouterService,MappingControllerService,AuthService,BookManagerService,BookService],
      schemas: [NO_ERRORS_SCHEMA]

      // imports: [
      //   RouterTestingModule
      // ],
      // declarations: [
      //   AppComponent
      // ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'MyBooks'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MyBooks');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   console.log(compiled.querySelector('h1').textContent);
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to MyBooks!');
  // });
});
