"use strict";(self.webpackChunkreact_practice=self.webpackChunkreact_practice||[]).push([[774],{2774:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var n=r(5043),c=r(3536),s=r(9786),a=r.n(s),l=r(579);const u=["\ud83d\ude00","\ud83d\ude02","\ud83d\ude0d","\ud83d\ude0e","\ud83d\ude2d","\ud83d\ude21","\ud83d\ude1c","\ud83d\ude07","\ud83d\ude31","\ud83d\ude08","\ud83d\udc4d","\ud83d\udc4e","\ud83e\udd7a","\ud83d\ude22","\ud83d\ude33","\ud83d\ude0b","\ud83d\ude2c","\ud83d\ude11","\ud83e\udd73","\ud83d\ude34"],i=e=>{if(e<=0)return[];const t=a().mock({["chats|".concat(e)]:[{avatar:'@image("100x100", "#ffccff", "#000000", "Avatar")',nickname:"@cname",message:()=>(()=>{const e=a().Random.integer(5,10);return Array.from({length:e},(()=>a().Random.pick(u))).join(" ")})()}]});return t.chats instanceof Array?t.chats:[t.chats]},o=i(200),d=()=>{const[e,t]=(0,n.useState)(o),r=(0,n.useRef)([]),s=r.current,u=(0,n.useRef)(),d=(0,n.useRef)(),h=(0,n.useRef)([]),[f,m]=(0,n.useState)(0),[_,x]=(0,n.useState)(0),v=(0,n.useRef)(),g=(0,n.useRef)(0),p=50*e.length,R=null===e||void 0===e?void 0:e.slice(f,_),j=(0,n.useRef)(!0),k=(0,n.useRef)(!0),N=e.length-s.length,[T,A]=(0,n.useState)(!1),S=t=>{if(e.length){const n=e.length,c=n-(g.current+4);j.current||k.current||t?(r.current=e,A(!1),m(c),x(n),u.current.style.transform="translate3d(0, ".concat(50*c,"px, 0)"),v.current.scrollTo({top:p,behavior:"smooth"}),j.current=!1):A(!0)}};(0,n.useEffect)((()=>{v.current.addEventListener("scroll",(0,c.throttle)((()=>{k.current=(()=>{const{scrollHeight:e,scrollTop:t,clientHeight:r}=v.current;return t+r>=e})()}),500))}),[]);const y=(0,c.throttle)((()=>{const{scrollTop:e}=v.current,t=Math.floor(e/50),r=t+g.current+4;t!==f&&(m(t),x(r),u.current.style.transform="translate3d(0, ".concat(50*t,"px, 0)"))}),200);(0,n.useEffect)((()=>{requestAnimationFrame((()=>S()))}),[e]);return(0,n.useEffect)((()=>((()=>{const e=v.current.offsetHeight;g.current=Math.ceil(e/50)})(),setInterval((()=>{(()=>{const e=a().Random.integer(0,1),r=i(e);h.current=[...h.current,...r],d.current||(d.current=setTimeout((()=>{const e=h.current;h.current=[],t((t=>[...t,...e])),clearTimeout(d.current),d.current=null}),1e3))})()}),1e3),()=>{d.current&&clearTimeout(d.current)})),[]),(0,l.jsxs)("div",{className:"index_root__DNVO2",ref:v,onScroll:y,children:[(0,l.jsx)("div",{style:{height:"".concat(p,"px")}}),(0,l.jsx)("div",{className:"index_realList__ELPbZ",ref:u,children:null===R||void 0===R?void 0:R.map(((e,t)=>(0,l.jsxs)("div",{className:"index_chatItem__AxRP1",children:[(0,l.jsx)("img",{src:e.avatar,alt:"avatar"}),(0,l.jsxs)("div",{className:"index_chatContent__jSAWw",children:[(0,l.jsx)("div",{className:"index_nickname__1XPqr",children:e.nickname}),(0,l.jsx)("div",{className:"index_message__dUNFF",children:e.message})]})]},t)))}),T&&!!N&&(0,l.jsxs)("div",{onClick:()=>S(!0),className:"index_newMessage__taTXs",children:[N,"\u6761\u65b0\u6d88\u606f"]})]})}}}]);
//# sourceMappingURL=774.ea5fa245.chunk.js.map