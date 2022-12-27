import { createReducer, on } from '@ngrx/store';
import { WalletState } from "../../core/models/wallet.state";
import { chargeWallet, initializeWallet, loadWallet } from "../actions/wallet.actions";

const initialState: WalletState = { amount: 100, error: false };

export const walletReducers = createReducer(initialState,
  on(loadWallet, (state) => state),
  on(initializeWallet, (state, { amount }) => {
    return { ...state, amount };
  }),
  on(chargeWallet, (state, { amount }) => {
    const { amount: currentAmount } = state;
    if (amount <= currentAmount) {
      return { ...state, amount: currentAmount - amount };
    }
    return { ...state, error: true };
  })
);
