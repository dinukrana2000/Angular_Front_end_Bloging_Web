/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '@angular/common/locales/global/en';
import '@angular/common/locales/global/si';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
