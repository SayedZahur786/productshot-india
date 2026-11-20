import {createHmac,timingSafeEqual}from 'node:crypto';
export function verifyWebhook(raw:string,signature:string,secret:string){if(!/^[a-f0-9]{64}$/.test(signature))return false;return timingSafeEqual(Buffer.from(signature,'hex'),createHmac('sha256',secret).update(raw).digest());}
