import { Dispatch as ReduxDispatch, Store as ReduxStore, Action } from 'redux';
import { AllState } from '../types/_all.type';

export type GetState = () => AllState;
export type Dispatch = ReduxDispatch<Action<string>>;

export type Store = ReduxStore<AllState, Action<string>>;
