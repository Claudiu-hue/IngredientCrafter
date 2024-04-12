import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoginService } from './login/login.service';
import { RegisterService } from './register/register.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes/recipes.component';
import { AuthInterceptorService } from './shared/auth-interceptor.service';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LoadingSpinnerComponent,
    IngredientsComponent,
    HeaderComponent,
    RecipesComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    LoginService,
    RegisterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
