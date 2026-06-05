/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  newAccount: {
    store: typeof routes['new_account.store']
  }
  accessTokens: {
    store: typeof routes['access_tokens.store']
    destroy: typeof routes['access_tokens.destroy']
  }
  schedules: {
    storeSchedule: typeof routes['schedules.store_schedule']
    index: typeof routes['schedules.index']
    show: typeof routes['schedules.show']
    update: typeof routes['schedules.update']
    destroy: typeof routes['schedules.destroy']
  }
  profile: {
    show: typeof routes['profile.show']
  }
}
