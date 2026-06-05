/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'access_tokens.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['access_tokens.store']['types'],
  },
  'schedules.store_schedule': {
    methods: ["POST"],
    pattern: '/api/v1/schedules',
    tokens: [{"old":"/api/v1/schedules","type":0,"val":"api","end":""},{"old":"/api/v1/schedules","type":0,"val":"v1","end":""},{"old":"/api/v1/schedules","type":0,"val":"schedules","end":""}],
    types: placeholder as Registry['schedules.store_schedule']['types'],
  },
  'schedules.index': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/schedules',
    tokens: [{"old":"/api/v1/schedules","type":0,"val":"api","end":""},{"old":"/api/v1/schedules","type":0,"val":"v1","end":""},{"old":"/api/v1/schedules","type":0,"val":"schedules","end":""}],
    types: placeholder as Registry['schedules.index']['types'],
  },
  'schedules.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/schedules/:id',
    tokens: [{"old":"/api/v1/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['schedules.show']['types'],
  },
  'schedules.update': {
    methods: ["PUT"],
    pattern: '/api/v1/schedules/:id',
    tokens: [{"old":"/api/v1/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['schedules.update']['types'],
  },
  'schedules.destroy': {
    methods: ["DELETE"],
    pattern: '/api/v1/schedules/:id',
    tokens: [{"old":"/api/v1/schedules/:id","type":0,"val":"api","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/schedules/:id","type":0,"val":"schedules","end":""},{"old":"/api/v1/schedules/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['schedules.destroy']['types'],
  },
  'profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.show']['types'],
  },
  'access_tokens.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/account/logout',
    tokens: [{"old":"/api/v1/account/logout","type":0,"val":"api","end":""},{"old":"/api/v1/account/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/account/logout","type":0,"val":"account","end":""},{"old":"/api/v1/account/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['access_tokens.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
