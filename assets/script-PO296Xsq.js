function C(){if(document.getElementById("postcard-message"))return;const h=17,d=["/advent/images/star_major.png","/advent/images/star_minor.png"];let u=new Audio("/advent/sounds/starsound.mp3");class p{constructor(e){this.element=e,this.setFeatures()}setFeatures(){this.element.style.left=`${Math.random()*95}%`,this.element.style.top=`${Math.random()*30}%`,this.element.style.opacity=.3+Math.random()*.4,this.element.src=d[Math.floor(Math.random()*d.length)],this.element.classList.add("star");const e=Math.random()*2;this.element.style.animationDelay=`-${e}s`,this.element.addEventListener("mouseenter",()=>{this.element.classList.add("star--hover");let o=new Audio(u.src);o.volume=.9,o.play()}),this.element.addEventListener("mouseleave",()=>{this.element.classList.remove("star--hover")})}}const s=document.getElementById("starry_night");function y(){for(let n=0;n<h;n++){const e=document.createElement("img");s.appendChild(e),new p(e)}}const f=3;let v=new Audio("/advent/sounds/doorbell.mp3"),a=[{left:"12%",top:"72%",width:"2em",height:"2em"},{left:"72%",top:"76%",width:"3.5em",height:"2.5em"},{left:"85%",top:"75%",width:"2em",height:"2.5em"}],r=[{left:"14%",top:"76%"},{left:"76%",top:"81%"},{left:"87.5%",top:"81%"}];function g(){for(let n=0;n<f;n++){const e=document.createElement("div");e.style.left=a[n].left,e.style.top=a[n].top,e.style.width=a[n].width,e.style.height=a[n].height,e.classList.add("door");const o=document.createElement("img"),w=Math.random()*2;o.classList.add("door-glow"),o.style.left=r[n].left,o.style.top=r[n].top,o.style.animationDelay=`-${w}s`,s.appendChild(o),s.appendChild(e),e.addEventListener("click",function(){let c=new Audio(v.src);c.volume=.2,c.play()})}}let t=document.createElement("div");t.id="advice-overlay",t.style.opacity="1",t.style.transition="opacity 2s";let m=document.createElement("p");m.innerHTML="try clicking or hovering on things!",t.appendChild(m),s.appendChild(t),setTimeout(function(){t.style.opacity="0",setTimeout(function(){s.contains(t)&&s.removeChild(t)},2e3)},2500),t.addEventListener("click",function(){t.style.opacity="0",setTimeout(function(){s.contains(t)&&s.removeChild(t)},2e3)});let l=document.createElement("div");l.id="postcard-message-container";let i=document.createElement("h1");i.id="postcard-message",i.innerHTML="Merry Christmas",s.appendChild(l),l.appendChild(i);let E=new Audio("/advent/sounds/music-box.mp3");i.addEventListener("click",function(){E.play()}),y(),g()}export{C as run};