import {identity,failure,creationLimit,sameOrigin}from '@/lib/auth';
import {configured,local}from '@/lib/db';
export async function GET(){return Response.json({ready:configured(),preview:local(),payments:!!process.env.RAZORPAY_KEY_ID&&process.env.COMMERCE_ENABLED==='1'},{headers:{'Cache-Control':'no-store'}});}
export async function POST(req:Request){try{if(!sameOrigin(req))return Response.json({error:'Invalid origin'},{status:403});await creationLimit();const user=await identity(true);return Response.json({credits:user.credits});}catch(e){return failure(e);}}
