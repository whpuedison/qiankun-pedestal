"use strict";(self.webpackChunkreact_practice=self.webpackChunkreact_practice||[]).push([[236],{236:(e,t,n)=>{n.r(t),n.d(t,{default:()=>l});var r=n(5043),c=n(3536),s=n(9786),o=n.n(s),i=n(579);const l=()=>{const[e,t]=(0,r.useState)([]),n=(0,r.useRef)([]),[s,l]=(0,r.useState)([]),[a,u]=(0,r.useState)(0),[d,h]=(0,r.useState)(0),[f,m]=(0,r.useState)(0),[v,g]=(0,r.useState)(0),[_,x]=(0,r.useState)(0),[p,R]=(0,r.useState)([]),b=(0,r.useRef)(),N=(0,r.useRef)(),S=(0,r.useRef)([]),j=(0,r.useRef)(null),k=(0,r.useRef)(null),H=(0,r.useRef)(!0),M=(0,r.useMemo)((()=>H.current?0:e.length-n.current.length),[e,H.current]),E=()=>{const e=(e=>{if(e<=0)return[];const t=o().mock({["chats|".concat(e)]:[{"id|+1":0,avatar:function(){return o().Random.image("100x100",o().Random.color(),"#000000","Avatar")},nickname:"@cname",message:()=>o().mock("@csentence(1, 20)")}]});return t.chats instanceof Array?t.chats:[t.chats]})(o().Random.integer(0,1));S.current=[...S.current,...e],j.current||(j.current=setTimeout((()=>{const e=S.current;S.current=[],t((t=>[...t,...e].map(((e,t)=>({...e,id:t}))))),clearTimeout(j.current),j.current=null}),1e3))};(0,r.useEffect)((()=>(k.current=setInterval((()=>{E()}),1e3),()=>{clearInterval(k.current)})),[]);const C=function(){let{forceScroll:t}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(H.current||t)&&(n.current=e,b.current.scrollTo({top:t?48*e.length*4:a,behavior:"smooth"}))};(0,r.useEffect)((()=>{C()}),[a]);(0,r.useEffect)((()=>{(()=>{const t=[];for(let n=0;n<e.length;n++)t.push({index:n,height:48,top:48*n,bottom:48*(n+1),dHeight:0});R(t)})()}),[e]);const T=()=>{var e,t;const n=null===(e=N.current)||void 0===e?void 0:e.childNodes;if(!n.length)return;n.forEach((e=>{if(!e)return;const t=e.getBoundingClientRect(),n=+e.id,r=p[n].height,c=t.height,s=r-c;s&&(p[n]={...p[n],height:c,bottom:p[n].bottom-s,dHeight:s})}));const r=+n[0].id,c=p.length;let s=p[r].dHeight;p[r].dHeight=0;for(let i=r+1;i<c;i++){var o;const e=p[i];p[i]={...p[i],top:null===(o=p[i-1])||void 0===o?void 0:o.bottom,bottom:p[i].bottom-s},e.dHeight&&(s+=e.dHeight,p[i].dHeight=0)}u(null===(t=p.at(-1))||void 0===t?void 0:t.bottom)};(0,r.useEffect)((()=>{N.current&&T()}),[N.current]),(0,r.useEffect)((()=>{var t,n;if(!H.current)return;const r=null===(t=b.current)||void 0===t?void 0:t.offsetHeight,c=Math.ceil(r/48),s=null===(n=p.at(-1))||void 0===n?void 0:n.bottom,o=e.length,i=Math.max(0,o-(d+0));h(c),m(i),g(o),l(e.slice(i,o)),u(s)}),[b.current,e]);const A=(0,c.throttle)((()=>{const e=(()=>{const{scrollTop:e}=b.current;let t=0,n=p.length-1,r=null;for(;t<=n;){const c=Math.floor((t+n)/2),s=p[c].bottom;if(s===e)return c+1;s<e?t=c+1:s>e&&((null===r||r>c)&&(r=c),n-=1)}return r})(),t=e+d+0;m(e),g(t),x(e>0?p[e-1].bottom:0);const{scrollHeight:n,clientHeight:r,scrollTop:c}=b.current;H.current=n-r-c<=0}),100);return(0,r.useEffect)((()=>{l(e.slice(f,v)),N.current&&T()}),[f]),(0,i.jsx)("div",{className:"index_root__nVKdf",children:(0,i.jsxs)("div",{className:"index_chatList__M3SqR",ref:b,onScroll:A,children:[(0,i.jsx)("div",{style:{height:"".concat(a,"px")}}),(0,i.jsx)("div",{style:{transform:"translate3d(0, ".concat(_,"px, 0)")},className:"index_renderList__NORW9",ref:N,children:null===s||void 0===s?void 0:s.map(((e,t)=>(0,i.jsxs)("div",{id:e.id,className:"index_chatItem__oAB-A",children:[(0,i.jsx)("img",{src:e.avatar,alt:"avatar"}),(0,i.jsxs)("div",{className:"index_chatContent__YhNMK",children:[(0,i.jsx)("div",{className:"index_nickname__clMz+",children:e.nickname}),(0,i.jsx)("div",{className:"index_message__MlQBf",children:e.message})]})]},t)))}),!!M&&(0,i.jsxs)("div",{onClick:()=>C({forceScroll:!0}),className:"index_unReadInfo__J6M8N",children:[M,"\u6761\u65b0\u6d88\u606f"]})]})})}}}]);
//# sourceMappingURL=236.2b6d616c.chunk.js.map