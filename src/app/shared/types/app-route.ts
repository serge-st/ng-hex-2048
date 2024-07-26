const APP_ROUTE = {
  GAME: 'game',
  GAME_SETUP: 'game-setup',
  NOT_FOUND: '**',
} as const;

export type AppRoute = ObjectValues<typeof APP_ROUTE>;
