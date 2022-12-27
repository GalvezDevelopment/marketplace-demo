import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

declare global {
  interface Window {
    marketplaceAPI: any;
  }
}

@Injectable()
export class ElectronService {
  private electronAPI: any;

  constructor() {
    this.electronAPI = window.marketplaceAPI || {};
  }

  public getWallet(): Observable<number | null> {
    return this.getValue<number>(this.electronAPI.getWallet);
  }

  private getValue<T>(intendedPromise: () => Promise<T>): Observable<T | null> {
    if (!intendedPromise) {
      return of(null);
    }
    return new Observable<T>(observer => {
      intendedPromise().then(value => observer.next(value));
    });
  }
}
