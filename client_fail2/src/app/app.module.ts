// import { NgModule } from '@angular/core';
// import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';

// @NgModule({
//   declarations: [
//     AppComponent
//   ],
//   imports: [
//     BrowserModule,
//     AppRoutingModule
//   ],
//   providers: [
//     provideClientHydration()
//   ],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }


import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { platformBrowser } from '@angular/platform-browser';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'musify-app' }),
    AppRoutingModule,
    CommonModule,
    AppComponent
  ],
  providers: [
    provideClientHydration(),
  ],
})
export class AppModule {
  ngDoBootstrap(app: any) {
    app.bootstrapApplication(AppComponent);
  }
}

// Bootstrap the application on the server
platformBrowser().bootstrapModule(AppModule);
