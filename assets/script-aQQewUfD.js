function d({details:s}){if(document.getElementById("big_blue_label"))return;function o(){const r=document.getElementsByClassName("ReactModal__Overlay")[0],c=50;for(let i=0;i<c;i++){let e=document.createElement("div");e.innerHTML="❄️",e.className="emoji",r.appendChild(e),e.style.left=Math.random()*100+"vw",e.style.animationDelay=Math.random()*2+"s",e.style.zIndex=999,e.addEventListener("animationend",function(){e.remove()})}}let t=0,l=["Click Me!","woah!","pretty snowflakes!","Click me again!!","And again!","WOW! What a rush!","You're really going for it!","More clicks!","MORE CLICKS!","LET IT SNOW!!","❄️❄️❄️","❄️❄️❄️❄️❄️","❄️❄️❄️ ❄️❄️❄️❄️ ❄️❄️❄️"];const a=document.getElementById("big_blue"),n=document.createElement("label");n.id="big_blue_label",n.innerText="Click!",a.appendChild(n),a.addEventListener("click",function(){t<l.length-1&&(t++,n.innerText=l[t]),o()})}export{d as run};
