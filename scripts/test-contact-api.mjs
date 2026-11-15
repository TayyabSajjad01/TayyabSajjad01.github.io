import assert from 'node:assert/strict';
import {Readable} from 'node:stream';
import {createContactApi} from './contact-api.mjs';
const input={name:'Test User',email:'review@example.org',company:'Fictional Practice',type:'Practice support / contract enquiry',role:'Free 15-minute call',message:'A test only; no real email is sent.'};
async function request(api,{method='POST',url='/api/enquiry',origin='http://localhost:4173',body=input}={}){
 const req=Readable.from([JSON.stringify(body)]);Object.assign(req,{method,url,headers:{host:'localhost:4173',origin,'content-type':'application/json'},socket:{remoteAddress:'test'}});
 let status,result;const res={writeHead(s){status=s;},end(value){result=JSON.parse(value);}};
 await api(req,res);return {status,result};
}
const disabled=createContactApi({env:{}});
assert.deepEqual((await request(disabled,{method:'GET',url:'/api/contact-config'})).result,{deliveryEnabled:false});
assert.equal((await request(disabled)).status,503);
assert.equal((await request(disabled,{origin:'https://unrelated.example'})).status,403);
const env={RESEND_API_KEY:'test-key-not-a-real-credential',CONTACT_FROM_EMAIL:'sender@example.org',CONTACT_TO_EMAIL:'owner@example.org'};
let payload;
const active=createContactApi({env,fetchImpl:async(url,options)=>{assert.equal(url,'https://api.resend.com/emails');payload=JSON.parse(options.body);return {ok:true,json:async()=>({id:'mock-only'})};}});
assert.equal((await request(active,{body:{...input,email:'bad-address'}})).status,400);
assert.equal((await request(active)).status,200);assert.equal(payload.reply_to,input.email);assert.deepEqual(payload.to,[env.CONTACT_TO_EMAIL]);
assert.equal((await request(createContactApi({env,fetchImpl:async()=>({ok:false})}))).status,502);
assert.equal((await request(createContactApi({env,fetchImpl:async()=>({ok:true,json:async()=>({})})}))).status,502);
assert.equal((await request(createContactApi({env,fetchImpl:async()=>{throw Error('mock network failure')}}))).status,502);
assert.equal((await request(active)).status,429);
console.log('Contact API: configuration, origin, validation, provider acceptance/failure, missing confirmation and throttling passed. Provider calls mocked; no emails sent.');
