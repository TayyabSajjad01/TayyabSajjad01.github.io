// Optional server-side delivery. No credentials or provider requests enter the static build.
// Provider contract: https://resend.com/docs/api-reference/emails/send-email
const attempts=new Map();
const reply=(res,status,body)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(JSON.stringify(body));};
export function createContactApi({env=process.env,fetchImpl=globalThis.fetch}={}){
 const enabled=()=>Boolean(env.RESEND_API_KEY&&env.CONTACT_FROM_EMAIL&&env.CONTACT_TO_EMAIL);
 return async(req,res)=>{
  const pathname=new URL(req.url,'http://localhost').pathname;
  if(pathname==='/api/contact-config'){
   if(req.method!=='GET'){reply(res,405,{error:'Method not allowed.'});return true;}
   reply(res,200,{deliveryEnabled:enabled()});return true;
  }
  if(pathname!=='/api/enquiry')return false;
  if(req.method!=='POST'){reply(res,405,{error:'Method not allowed.'});return true;}
  const expectedOrigin=env.PUBLIC_ORIGIN||`http://${req.headers.host}`;
  if(req.headers.origin!==expectedOrigin){reply(res,403,{error:'Please use the enquiry form on this website.'});return true;}
  if(!enabled()){reply(res,503,{error:'Email sending is not connected. Please use the direct email link.'});return true;}
  if(!req.headers['content-type']?.startsWith('application/json')){reply(res,415,{error:'Expected a JSON enquiry.'});return true;}
  const ip=req.socket.remoteAddress||'unknown',now=Date.now();
  for(const [key,value] of attempts)if(value.until<now)attempts.delete(key);
  const count=attempts.get(ip)||{count:0,until:now+600000};
  if(count.count>=5||attempts.size>10000){reply(res,429,{error:'Too many requests. Please try again later or email directly.'});return true;}
  count.count++;attempts.set(ip,count);
  try{
   let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>12000){reply(res,413,{error:'Please keep the enquiry short.'});return true;}}
   let input;try{input=JSON.parse(raw);}catch{reply(res,400,{error:'Please check your enquiry and try again.'});return true;}
   const fields={};for(const [key,max] of Object.entries({name:100,email:160,company:160,type:60,role:200,message:1800})){
    if(typeof input[key]!=='string'||!input[key].trim()||input[key].length>max){reply(res,400,{error:'Please complete all fields within the stated limits.'});return true;}fields[key]=input[key].trim();
   }
   if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)||/[\r\n]/.test(fields.email)||!['Employment / recruitment','Practice support / contract enquiry'].includes(fields.type)){reply(res,400,{error:'Please check your email and enquiry type.'});return true;}
   const clean=s=>s.replace(/[\r\n]/g,' ');
   const response=await fetchImpl('https://api.resend.com/emails',{
    method:'POST',signal:AbortSignal.timeout(12000),headers:{'Authorization':`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},
    body:JSON.stringify({from:env.CONTACT_FROM_EMAIL,to:[env.CONTACT_TO_EMAIL],reply_to:fields.email,subject:`Portfolio enquiry — ${clean(fields.type)}: ${clean(fields.role)}`,text:`Name: ${fields.name}\nEmail: ${fields.email}\nCompany: ${fields.company}\nType: ${fields.type}\nRole or work: ${fields.role}\n\n${fields.message}`})
   });
   if(!response.ok){reply(res,502,{error:'Your enquiry could not be sent. Please try the direct email link.'});return true;}
   const result=await response.json();if(!result.id){reply(res,502,{error:'Email sending was not confirmed. Please use the direct email link.'});return true;}
   reply(res,200,{accepted:true});return true;
  }catch{reply(res,502,{error:'Your enquiry could not be sent. Please use the direct email link.'});return true;}
 };
}
