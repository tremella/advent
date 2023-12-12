import{j as r,r as u,R as A}from"./vendor_react-LyAL01QZ.js";import{c as I}from"./vendor_react-dom-PI2-9rqX.js";import{M as b}from"./vendor_react-modal-pDicdDC9.js";import"./vendor_exenv-rXw0U8dN.js";import"./vendor_scheduler-iwWdm5Ml.js";import"./vendor_prop-types-g0p8o0B7.js";import"./vendor_warning-jcvjbohg.js";import"./vendor_react-lifecycles-compat-hxlqr8B5.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&c(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerPolicy&&(i.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?i.credentials="include":e.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(e){if(e.ep)return;e.ep=!0;const i=n(e);fetch(e.href,i)}})();const P=({data:o})=>{const s=o.details.url,n=o.details.comment;return r.jsx("div",{className:"youtube",children:r.jsx("iframe",{width:"560",height:"315",src:s,title:n,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",allowFullScreen:!0})})},x="modulepreload",T=function(o){return"/advent/"+o},j={},t=function(s,n,c){let e=Promise.resolve();if(n&&n.length>0){const i=document.getElementsByTagName("link");e=Promise.all(n.map(a=>{if(a=T(a),a in j)return;j[a]=!0;const p=a.endsWith(".css"),y=p?'[rel="stylesheet"]':"";if(!!c)for(let m=i.length-1;m>=0;m--){const f=i[m];if(f.href===a&&(!p||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${y}`))return;const _=document.createElement("link");if(_.rel=p?"stylesheet":x,p||(_.as="script",_.crossOrigin=""),_.href=a,document.head.appendChild(_),p)return new Promise((m,f)=>{_.addEventListener("load",m),_.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${a}`)))})}))}return e.then(()=>s()).catch(i=>{const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i})},v=(o,s)=>{const n=o[s];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((c,e)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(e.bind(null,new Error("Unknown variable dynamic import: "+s)))})},V=({data:o})=>{const s=u.useRef(null);let n=u.useRef(!1);return u.useEffect(()=>{if(o.folder_location&&!n.current){let c=document.getElementById(o.target_div||"defaultId");c||(c=document.createElement("div"),c.id=o.target_div||"defaultId",s.current.appendChild(c)),v(Object.assign({"../../data/christmas_cracker/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([0])),"../../data/coal/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([1])),"../../data/countdown/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([2])),"../../data/emoji_game/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([3])),"../../data/hot_chocolate_recipe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([4])),"../../data/mini_wordle/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([5])),"../../data/mulled_wine_recipe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([6])),"../../data/naughty_or_nice/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([7])),"../../data/snowflake/style.css":()=>t(()=>import("./style-w40geAFS.js"),__vite__mapDeps([])),"../../data/snowglobe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([8]))}),`../../data/${o.folder_location}/style.css`).then(()=>v(Object.assign({"../../data/christmas_cracker/script.js":()=>t(()=>import("./script-grUNRgN9.js"),__vite__mapDeps([])),"../../data/coal/script.js":()=>t(()=>import("./script-RSGy-Kr1.js"),__vite__mapDeps([])),"../../data/countdown/script.js":()=>t(()=>import("./script-vSJwmqb4.js"),__vite__mapDeps([])),"../../data/emoji_game/script.js":()=>t(()=>import("./script-Q4VayjIz.js"),__vite__mapDeps([9,10])),"../../data/mini_wordle/script.js":()=>t(()=>import("./script-n2ANpay7.js"),__vite__mapDeps([])),"../../data/naughty_or_nice/script.js":()=>t(()=>import("./script-vf7iZUp1.js"),__vite__mapDeps([])),"../../data/snowflake/script.js":()=>t(()=>import("./script-0qbdXXx5.js"),__vite__mapDeps([11,12,13,14])),"../../data/snowglobe/script.js":()=>t(()=>import("./script-lGMoupqw.js"),__vite__mapDeps([]))}),`../../data/${o.folder_location}/script.js`)).then(e=>{e.run({details:o.details||null}),n.current=!0}).catch(e=>console.error("Error loading resources:",e))}return()=>{if(s.current){const c=s.current.querySelector("script");c&&s.current.removeChild(c)}}},[o,o.folder_location]),r.jsx("div",{className:"javascript-animation-container",ref:s})},S=({data:o})=>{const[s,n]=u.useState([]);u.useEffect(()=>{o&&v(Object.assign({"../../data/christmas_cracker/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([0])),"../../data/coal/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([1])),"../../data/countdown/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([2])),"../../data/emoji_game/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([3])),"../../data/hot_chocolate_recipe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([4])),"../../data/mini_wordle/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([5])),"../../data/mulled_wine_recipe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([6])),"../../data/naughty_or_nice/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([7])),"../../data/snowflake/style.css":()=>t(()=>import("./style-w40geAFS.js"),__vite__mapDeps([])),"../../data/snowglobe/style.css":()=>t(()=>Promise.resolve({}),__vite__mapDeps([8]))}),`../../data/${o.folder_location}/style.css`).then(()=>v(Object.assign({"../../data/hot_chocolate_recipe/index.json":()=>t(()=>import("./index-Y8T_ihDV.js"),__vite__mapDeps([])),"../../data/mulled_wine_recipe/index.json":()=>t(()=>import("./index-me3c2_gU.js"),__vite__mapDeps([]))}),`../../data/${o.folder_location}/index.json`).then(e=>{n(e.default.content)}).catch(e=>{console.error("Error loading content:",e)}))},[o]);const c=s.join("");return r.jsxs("div",{id:o.target_div,children:[r.jsx("h2",{className:"styled-text-title",children:o.title}),r.jsx("div",{className:"styled-text-content",dangerouslySetInnerHTML:{__html:c}})]})};b.setAppElement("#root");const k=({contentData:o})=>{const[s,n]=u.useState(null),[c,e]=u.useState(!1),[i,a]=u.useState(Date.now()),p=d=>{const l=new Date;return d<l.getDate()&&l.getMonth()==11||l.getFullYear()>2023?"past":d==l.getDate()&&l.getMonth()==11&&l.getFullYear()==2023?"current":"future"},y=()=>{e(!0),a(Date.now())},E=(d,l)=>{const h=o[d];if(n(d),(l==="past"||l==="current")&&h){y();const g=JSON.parse(localStorage.getItem("viewedDays"))||{};g[d]=!0,localStorage.setItem("viewedDays",JSON.stringify(g))}},_=({day:d})=>{const[l,h]=u.useState(!1),D=(JSON.parse(localStorage.getItem("viewedDays"))||{})[d],w=p(d),L=d%24,O=()=>{h(!0),setTimeout(()=>{E(d,w)},400)},R=D?"viewed":null;return r.jsxs("div",{role:"button",tabIndex:"0",className:`calendar-day ${R} ${l?"active":""} ${w}`,onClick:O,"data-pattern":L,children:[r.jsx("img",{className:"present",src:"/advent/present.png",alt:""}),r.jsx("div",{className:"day-number",children:d})]})},m=()=>{e(!1)},f=d=>{const l=o[d];if(!l)return null;switch(l.type){case"youtube":return r.jsx(P,{data:l},i);case"javascript":return r.jsx(V,{data:o[s]},i);case"text":return r.jsx(S,{data:l},i);default:return null}};return r.jsx("div",{className:"calendar-container",style:{maxWidth:"800px",margin:"0 auto"},children:r.jsxs("div",{className:"calendar",children:[Array.from({length:24},(d,l)=>r.jsx(_,{day:l+1},`day-${l+1}`)),s!==null&&o[s]&&r.jsx(b,{isOpen:c,onRequestClose:m,style:{overlay:{backgroundColor:"rgba(0, 0, 0, 0.5)"},content:{backgroundColor:"transparent",overflow:"visible",border:"none",width:"max-content",maxWidth:"800px",height:"auto",marginLeft:"auto",marginRight:"auto",marginTop:"10%",padding:"0"}},contentLabel:"Advent Content Modal",children:r.jsxs("div",{className:"modal-content",children:[s!==null&&f(s),r.jsx("button",{className:"modal-close",onClick:m})]})})]})})},C={1:{folder_location:"snowglobe",type:"javascript",target_div:"snowglobe"},2:{folder_location:null,type:"youtube",details:{comment:"ReindeerCam Live Stream",url:"https://www.youtube.com/embed/UhQV5_JmXvU?si=CFcIJuS-xavuVEEE&modestbranding=1&rel=0&showinfo=0&controls=0&mute=1&autoplay=1"}},3:{folder_location:"mini_wordle",type:"javascript",target_div:"mini_wordle",details:{target_word:"yule",title:"Mini Wordle"}},4:{folder_location:"mulled_wine_recipe",type:"text",title:"A recipe for mulled wine",backgroundImage:"image.png",target_div:"mw"},5:{folder_location:null,type:"youtube",details:{comment:"Wham! - Last Christmas",url:"https://www.youtube.com/embed/E8gmARGvPlI?si=vR5inL4buJLCTwPu&modestbranding=1&rel=0&showinfo=0&controls=0&autoplay=1"}},6:{folder_location:"coal",type:"javascript",target_div:"coal"},7:{folder_location:"christmas_cracker",type:"javascript",details:{setup:"How do snowmen travel around?",punchline:"by icicle 🥁 ☃️"},target_div:"scene"},8:{folder_location:"countdown",type:"javascript",target_div:"countdown"},9:{folder_location:null,type:"youtube",details:{comment:"The Muppets - Ringing of the Bells",url:"https://www.youtube.com/embed/ysIzPF3BfpQ?si=Lyac4mdUtE-llW6D&modestbranding=1&rel=0&showinfo=0&controls=0&autoplay=1"}},10:{folder_location:"hot_chocolate_recipe",type:"text",title:"A recipe for seasonal hot chocolate",target_div:"hc"},11:{folder_location:"christmas_cracker",type:"javascript",details:{setup:"What happens to elves when they're naughty? ",punchline:"Santa gives them the sack 🎅🥁 "},target_div:"scene"},12:{folder_location:"mini_wordle",type:"javascript",target_div:"mini_wordle",details:{target_word:"noel",title:"Mini Wordle Part 2"}},13:{folder_location:"naughty_or_nice",type:"javascript",target_div:"naughty"},14:{folder_location:null,type:"youtube",details:{comment:"Fireplace",url:"https://www.youtube.com/embed/lnk0SffeGOg?si=5LtQk8AZAir-1ji2&modestbranding=1&rel=0&showinfo=0&controls=0&mute=0&autoplay=1"}},15:{folder_location:"emoji_game",type:"javascript",target_div:"emoji-game"},20:{folder_location:"snowflake",type:"javascript",target_div:"snowflake"}};function N(){return r.jsxs("div",{className:"App",children:[r.jsx("header",{className:"App-header",children:r.jsx("h1",{className:"main-header",children:"Advent Calendar"})}),r.jsx("main",{children:r.jsx(k,{contentData:C})})]})}I.createRoot(document.getElementById("root")).render(r.jsx(A.StrictMode,{children:r.jsx(N,{})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/style-Mp5JqCwh.css","assets/style-G4t4C_rV.css","assets/style-vu9h4zwS.css","assets/style-ULoROv_6.css","assets/style-co4oD3Gy.css","assets/style-39c3B48b.css","assets/style-IPyORGpZ.css","assets/style-HIE4wvch.css","assets/style-_ryvUvkw.css","assets/script-Q4VayjIz.js","assets/vendor_fuse.js-aCsZfKX4.js","assets/script-0qbdXXx5.js","assets/vendor_p5js-wrapper-Hbg_u1xl.js","assets/vendor_p5-hFoC1Msr.js","assets/vendor_exenv-rXw0U8dN.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}