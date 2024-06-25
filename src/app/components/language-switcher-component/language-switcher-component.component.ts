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
    const browserLang = translate.getBrowserLang() || 'en';
    translate.use(browserLang.match(/en|si/) ? browserLang : 'en');
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
  }

}
