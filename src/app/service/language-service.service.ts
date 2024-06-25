import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  constructor() { }

  private currentLanguage = 'en';

  setLanguage(language: string) {
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    window.location.reload(); // Reload the app to apply the new locale
  }

  getLanguage(): string {
    return localStorage.getItem('language') || this.currentLanguage;
  }
}
