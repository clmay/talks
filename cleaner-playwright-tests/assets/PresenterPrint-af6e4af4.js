import{d as _,u as d,a as h,c as m,b as p,r as u,o,e as n,f as t,t as a,g as l,F as f,h as g,n as v,i as y,j as x,k as b,l as k,m as N,_ as P}from"./index-b36a290f.js";import{N as w}from"./NoteDisplay-9e402685.js";const V={class:"m-4"},L={class:"mb-10"},S={class:"text-4xl font-bold mt-2"},T={class:"opacity-50"},j={class:"text-lg"},B={class:"font-bold flex gap-2"},D={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),z={key:0,class:"border-gray-400/50 mb-8"},C=_({__name:"PresenterPrint",setup(F){d(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),h({title:`Notes - ${m.title}`});const c=p(()=>u.map(s=>{var r;return(r=s.meta)==null?void 0:r.slide}).filter(s=>s!==void 0&&s.noteHTML!==""));return(s,r)=>(o(),n("div",{id:"page-root",style:v(l(y))},[t("div",V,[t("div",L,[t("h1",S,a(l(m).title),1),t("div",T,a(new Date().toLocaleString()),1)]),(o(!0),n(f,null,g(c.value,(e,i)=>(o(),n("div",{key:i,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",j,[t("div",B,[t("div",D,a(e==null?void 0:e.no)+"/"+a(l(x)),1),b(" "+a(e==null?void 0:e.title)+" ",1),H])]),k(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),i<c.value.length-1?(o(),n("hr",z)):N("v-if",!0)]))),128))])],4))}}),E=P(C,[["__file","/Users/chase.may/Projects/talks/src/cleaner-playwright-tests/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{E as default};
