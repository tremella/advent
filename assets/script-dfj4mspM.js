function p(){const n=document.getElementById("coal"),a=20;class i{constructor(e){this.element=e,this.reset()}reset(){const e=n.offsetWidth/2,m=n.offsetHeight/2,o=Math.random()*2*Math.PI,r=Math.random()*150,h=e+r*Math.cos(o),d=m+r*Math.sin(o);this.element.style.left=`${h}px`,this.element.style.top=`${d}px`,this.element.style.backgroundColor=this.getRandomColor(),this.speed=Math.random()*1+.5}rise(){const e=parseFloat(this.element.style.top);this.element.style.top=`${e-this.speed}px`,e<0&&this.reset()}getRandomColor(){return Math.random()>.5?"black":"#EB5406"}}function c(){const t=Math.random()*1.5+1,e=document.createElement("div");return e.style.position="absolute",e.style.width=`${t}px`,e.style.height=`${t}px`,e.style.borderRadius="50%",n.appendChild(e),new i(e)}const l=Array.from({length:a},c);function s(){l.forEach(t=>t.rise()),requestAnimationFrame(s)}s()}export{p as run};
