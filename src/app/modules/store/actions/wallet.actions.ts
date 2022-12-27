import {createAction, props} from '@ngrx/store';

export const loadWallet = createAction('[Wallet] Loading Wallet Balance');
export const initializeWallet = createAction('[Wallet] Initialize Wallet', props<{ amount: number }>())
export const chargeWallet = createAction('[Wallet] Charge Wallet', props<{ amount: number }>());
