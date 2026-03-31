import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';
import { importProvidersFrom } from '@angular/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';

// Factory function for TranslateHttpLoader - now properly receives HttpClient
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Detect browser language and return supported language code
function getBrowserLanguage(): string {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en';
  // Normalize e.g. 'fr-FR' -> 'fr', 'en-US' -> 'en'
  const lang = browserLang.split('-')[0].toLowerCase();
  // Only support 'en' and 'fr', default to 'en'
  return lang === 'fr' ? 'fr' : 'en';
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
        defaultLanguage: getBrowserLanguage()
      })
    )
  ]
}).then(appRef => {
  // Also set the current language to match the browser language
  const translate = appRef.injector.get(TranslateService);
  translate.use(getBrowserLanguage());
}).catch(err => console.error(err));