import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

// Import your components and services

@NgModule({
    imports: [CommonModule, BrowserModule],
    declarations: [AppComponent, MyComponent],
    bootstrap: [AppComponent],
})
export class AppModule { }
