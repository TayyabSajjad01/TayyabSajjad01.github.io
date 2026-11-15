import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import './build.mjs';
import {createContactApi} from './contact-api.mjs';
if(fs.existsSync('.env.local'))process.loadEnvFile('.env.local');
const contactApi=createContactApi();
const root = path.resolve('dist');
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.pdf':'application/pdf','.svg':'image/svg+xml','.csv':'text/csv; charset=utf-8','.png':'image/png'};
const server = http.createServer(async(req,res)=>{
  if(await contactApi(req,res))return;
  let url;
  try { url = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400);res.end('Bad request');return; }
  let file = path.resolve(root, '.' + url);
  if(file !== root && !file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
  if(fs.existsSync(file) && fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  const found = fs.existsSync(file) && fs.statSync(file).isFile();
  if(!found)file=path.join(root,'404.html');
  res.writeHead(found?200:404,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});
  fs.createReadStream(file).pipe(res);
});
const port=Number(process.env.PORT||4173),host=process.env.HOST||'127.0.0.1';
server.listen(port,host,()=>console.log(`Local preview: http://${host}:${port}`));
