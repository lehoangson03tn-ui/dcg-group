
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';

const base='https://dcg-growmatch.vercel.app/';
const out='public/assets/guide';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const routes=[
  {id:'home',hash:'#home',expected:'',title:'Trang chủ'},
  {id:'jobs',hash:'#jobs',expected:'Tìm cơ hội phù hợp với bạn',title:'Khám phá việc làm'},
  {id:'register',hash:'#register',expected:'Tạo tài khoản',title:'Đăng ký'},
  {id:'login',hash:'#login',expected:'Chào mừng trở lại',title:'Đăng nhập'},
  {id:'employer',hash:'#employer',expected:'Hiểu rõ ứng viên',title:'Dành cho doanh nghiệp'},
  {id:'develop',hash:'#develop',expected:'Phát triển có mục tiêu',title:'Giới thiệu phát triển nhân sự'}
];
const result=[];
try {
 for(const route of routes){
  const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1,reducedMotion:'reduce',locale:'vi-VN'});
  try{
   const response=await page.goto(base+route.hash,{waitUntil:'domcontentloaded',timeout:45000});
   if(!response || response.status()!==200)throw Error('Public site response '+response?.status());
   try {await page.waitForSelector('main h1',{state:'visible',timeout:13000});}
   catch(error){
     const debug=await page.evaluate(()=>({title:document.title,href:location.href,text:document.body?.innerText.slice(0,1700),main:!!document.querySelector('main'),html:document.documentElement.outerHTML.slice(0,1600)}));
     console.error('PUBLIC PRODUCT DIAGNOSTIC '+route.id,JSON.stringify(debug));
     await page.screenshot({path:out+'/diagnostic-'+route.id+'.jpg',type:'jpeg',quality:75,fullPage:false});
     throw error;
   }
   await page.waitForFunction(expected=>!expected || (document.querySelector('main')?.innerText||'').includes(expected),route.expected,{timeout:25000});
   await page.evaluate(async()=>{
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('main img')].filter(img=>img.getBoundingClientRect().top<innerHeight+100).map(img=>img.decode().catch(()=>{})));
   });
   await page.waitForTimeout(950);
   const state=await page.evaluate(()=>({
    h1:document.querySelector('main h1')?.innerText.trim()||'',
    hasLoginForm:!!document.querySelector('#loginForm'),
    hasRegisterForm:!!document.querySelector('.auth-register-card'),
    url:location.href,
    hasPrivateAccount:!!document.querySelector('#logoutBtn'),
    error:!!document.querySelector('main .access-state-card h2')
   }));
   if(state.hasPrivateAccount || state.error)throw Error('Unexpected private or error view on '+route.hash);
   const path=out+'/growmatch-'+route.id+'-public-20261030.jpg';
   await page.screenshot({path,type:'jpeg',quality:83,fullPage:false,animations:'disabled'});
   result.push({...route,...state,path});
   console.log('CAPTURED',route.id,state.h1,path);
  } finally {await page.close()}
 }
 await writeFile(out+'/capture-manifest.json',JSON.stringify({source:base,method:'Playwright public unauthenticated screenshots',date:'2026-10-30',result},null,2));
} finally {await browser.close()}
