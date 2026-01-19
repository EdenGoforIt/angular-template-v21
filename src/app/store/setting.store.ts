import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';
import type { IConfiguration } from '@app/shared/models';

interface SettingState {
  apiUrls: IConfiguration | null;
  loading: boolean;
}

const initialState: SettingState = {
  apiUrls: null,
  loading: false,
};

export const SettingStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    hasApiUrls: computed(() => store.apiUrls() !== null),
  })),
  withMethods((store) => ({
    // Set API URLs configuration
    setApiUrls(config: IConfiguration) {
      return { apiUrls: config };
    },

    // Clear API URLs
    clearApiUrls() {
      return { apiUrls: null };
    },

    // Set loading state
    setLoading(loading: boolean) {
      return { loading };
    },

    // Get API URLs
    getApiUrls(): IConfiguration | null {
      return store.apiUrls();
    },
  }))
);
