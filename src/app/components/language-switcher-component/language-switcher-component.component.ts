import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-language-switcher-component',
  templateUrl: './language-switcher-component.component.html',
  styleUrls: ['./language-switcher-component.component.css']
})
export class LanguageSwitcherComponentComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'si']);
    translate.setDefaultLang('en');
        const savedLang = localStorage.getItem('language');

        const browserLang = translate.getBrowserLang()||'en';
        if (savedLang) {
          translate.use(savedLang);
        } else {
          translate.use(browserLang.match(/en|si/) ? browserLang : 'en');
        }  }

        changeLanguage(lang: string) {
          this.translate.use(lang);
          localStorage.setItem('language', lang);
        }
}
