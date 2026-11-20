import {S3Client,PutObjectCommand,GetObjectCommand,DeleteObjectCommand}from '@aws-sdk/client-s3';
import {getSignedUrl}from '@aws-sdk/s3-request-presigner';
import {mkdir,writeFile,readFile,rm}from 'node:fs/promises';
import path from 'node:path';
import {local,objectPath}from './db';
function client(){return new S3Client({forcePathStyle:true,region:process.env.AWS_REGION||'ap-southeast-1',endpoint:process.env.AWS_ENDPOINT_URL_S3,credentials:{accessKeyId:process.env.AWS_ACCESS_KEY_ID!,secretAccessKey:process.env.AWS_SECRET_ACCESS_KEY!}});}
export async function put(key:string,body:Buffer){if(local()){await mkdir(path.dirname(objectPath(key)),{recursive:true});await writeFile(objectPath(key),body);return;}await client().send(new PutObjectCommand({Bucket:'productshots',Key:key,Body:body,ContentType:'image/jpeg'}));}
export async function get(key:string){if(local())return readFile(objectPath(key));return getSignedUrl(client(),new GetObjectCommand({Bucket:'productshots',Key:key}),{expiresIn:60});}
export async function remove(key:string){if(local()){await rm(objectPath(key),{force:true});return;}await client().send(new DeleteObjectCommand({Bucket:'productshots',Key:key}));}
