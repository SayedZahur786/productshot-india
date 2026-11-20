export const presets = {amazon: {name:'Amazon square',size:2000},meesho:{name:'Meesho square',size:1080}} as const;
export const scenes = {white:'Pure white',warm:'Warm studio',mint:'Mint shelf'} as const;
export type Preset = keyof typeof presets;
export type Scene = keyof typeof scenes;
export const MAX_BYTES=10*1024*1024;
export const PACK_PRICE=19900;
export const PACK_IMAGES=20;
