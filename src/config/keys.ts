import dev from './dev';
import prod from './prod';
export interface keys {
  googleClientId: string;
  googleSecret: string;
}
export let keys: keys;
if (process.env.NODE_ENV === 'production') {
  keys = { ...prod };
} else {
  keys = dev;
}
