import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';
import { APP_INITIALIZER, importProvidersFrom } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

function getSavedLanguage(): string {
  const saved = localStorage.getItem('language');
  if (saved === 'fr' || saved === 'en') return saved;
  const browserLang = (navigator.language || navigator.languages?.[0] || 'en')
    .split('-')[0]
    .toLowerCase();
  return browserLang === 'fr' ? 'fr' : 'en';
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routeConfig),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        },
        defaultLanguage: 'en'
      })
    ),
    // Load translations BEFORE any component renders so onLangChange
    // never fires after ngAfterViewInit — prevents the typing-vs-slide-in race.
    {
      provide: APP_INITIALIZER,
      useFactory: (translate: TranslateService) => () =>
        translate.use(getSavedLanguage()).toPromise(),
      deps: [TranslateService],
      multi: true
    }
  ]
}).catch(err => console.error(err));
