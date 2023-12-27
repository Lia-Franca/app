import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { appConfig } from './app/app.config';



registerLocaleData(ptBr);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
