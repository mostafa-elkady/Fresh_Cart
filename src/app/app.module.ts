import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CarouselModule } from "ngx-owl-carousel-o";
import { CommonModule } from "@angular/common";
import { ToastrModule } from "ngx-toastr";
import { LoadingInterceptor } from "./interceptors/loading.interceptor";
import { LoadingComponent } from "./components/loading/loading.component";
import { NgxPaginationModule } from "ngx-pagination";
import { HeadersInterceptor } from "./interceptors/headers.interceptor";

@NgModule({
  declarations: [AppComponent, LoadingComponent],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    CarouselModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  // providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],  To use Hash in url
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
