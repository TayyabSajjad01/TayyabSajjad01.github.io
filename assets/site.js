const enquiryForm=document.querySelector('#enquiry-form');
let deliveryEnabled=false;
if(enquiryForm){
 const params=new URLSearchParams(window.location.search);
 if(params.get('type')==='contract')enquiryForm.querySelector('input[value="Practice support / contract enquiry"]').checked=true;
 const service=params.get('service');
 if(service)enquiryForm.elements.namedItem('role').value=service.slice(0,200);
 if(params.get('call')==='15'){
  document.querySelector('h1').textContent='Request a free 15-minute call.';
  enquiryForm.elements.namedItem('role').value=('Free 15-minute call'+(service?': '+service:'')).slice(0,200);
  enquiryForm.elements.namedItem('message').value='Hello Tayyab,\n\nI would like to discuss:\n\nMy preferred times and time zone are:\n\nPlease let me know a suitable time for a free 15-minute introductory call.';
 }
 fetch('/api/contact-config').then(r=>r.ok?r.json():null).then(config=>{
  if(!config?.deliveryEnabled)return;
  deliveryEnabled=true;
  enquiryForm.querySelector('[data-delivery-notice]').textContent='Send your enquiry directly to Tayyab. A call time is only confirmed after you receive a reply agreeing it.';
  enquiryForm.querySelector('button[type="submit"]').textContent='Send Enquiry ↗';
 }).catch(()=>{});
 enquiryForm.addEventListener('submit',async e=>{
  e.preventDefault();const data=new FormData(enquiryForm);
  const subject=`${data.get('type')}: ${data.get('role')}`;
  const body=`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nCompany: ${data.get('company')}\nEnquiry: ${data.get('type')}\nRole or work: ${data.get('role')}\n\n${data.get('message')}`;
  const status=document.querySelector('#form-status');
  if(!deliveryEnabled){
   const destination=document.querySelector('.email-address').getAttribute('href');
   window.location.href=`${destination}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
   status.textContent='An email draft was requested. Nothing has been sent by this website. If your email app opened, review the draft and send it there; otherwise use the email address alongside.';
   return;
  }
  const button=enquiryForm.querySelector('button[type="submit"]');button.disabled=true;status.textContent='Sending your enquiry…';
  try{
   const response=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(data))});
   const result=await response.json();
   if(!response.ok||result.accepted!==true)throw new Error(result.error||'Your enquiry could not be sent. Please use the direct email link.');
   status.textContent='Your enquiry was accepted for email delivery. Tayyab will reply to discuss the next step. A call time is not booked until it is agreed with you.';
  }catch(error){status.textContent=error.message||'Your enquiry could not be sent. Please use the direct email link.';}
  finally{button.disabled=false;}
 });
}
const bookingService=document.querySelector('.booking-service');
if(bookingService){
 const service=new URLSearchParams(window.location.search).get('service');
 if(service){
  bookingService.textContent='To discuss: '+service.slice(0,200);bookingService.hidden=false;
  const formLink=document.querySelector('#booking-actions a[href^="/contact/"]');
  if(formLink)formLink.href='/contact/?type=contract&call=15&service='+encodeURIComponent(service.slice(0,200));
  const emailLink=document.querySelector('#booking-actions a[href^="mailto:"]');
  if(emailLink){const url=new URL(emailLink.href);url.searchParams.set('subject','Free 15-minute call: '+service.slice(0,200));emailLink.href=url.href;}
 }
}
