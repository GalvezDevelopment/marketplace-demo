import { InjectionToken } from "@angular/core";
import { MatFormFieldDefaultOptions } from "@angular/material/form-field";

export const MARKETPLACE_MAT_FORM_FIELD_OPTIONS: InjectionToken<MatFormFieldDefaultOptions> =
  new InjectionToken<MatFormFieldDefaultOptions>('MAT_FORM_FIELD_DEFAULT_OPTIONS', {
    providedIn: 'root',
    factory: () => ({ floatLabel: 'always', hideRequiredMarker: true })
  });
