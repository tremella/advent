function E(){const m=["😊","🌟","🎁","👼"],h=["🎉","🎈","🎁","🎊"],p=["😈","🍪","🙊","💩"];if(document.getElementById("naughtyContainer"))return;var y=document.getElementById("naughty"),i=document.createElement("div");i.id="naughtyContainer";var l=document.createElement("h2");l.innerText="Naughty or Nice?";var r=document.createElement("input");r.type="text",r.id="nameInput",r.placeholder="Enter your name",r.addEventListener("keypress",function(n){n.key==="Enter"&&(n.preventDefault(),s())});var o=document.createElement("button");o.innerText="Check",o.onclick=s;var c=document.createElement("div");c.id="result",i.appendChild(l),i.appendChild(r),i.appendChild(o),i.appendChild(c),y.appendChild(i);function v(n){for(var e=0,t=0;t<n.length;t++){var d=n.charCodeAt(t);e=(e<<5)-e+d,e=e&e}return e}function s(){if(document.getElementById("nameInput").value){var n=document.getElementById("nameInput").value.toLowerCase(),e=v(n),t=e%2===0?"Nice":"Naughty";n==="neena daswani"&&(t="Happy Birthday!!"),f(t)}}function g(n){var e;n==="Naughty"?e=p:n.includes("Happy Birthday")?e=h:e=m;const t=document.getElementsByClassName("ReactModal__Overlay")[0];document.getElementById("naughty");const d=50;for(let u=0;u<d;u++){let a=document.createElement("div");a.innerText=e[Math.floor(Math.random()*e.length)],a.className="emoji",t.appendChild(a),a.style.left=Math.random()*100+"vw",a.style.animationDelay=Math.random()*2+"s",a.style.zIndex=999,a.addEventListener("animationend",function(){a.remove()})}}function f(n){var e=document.getElementById("result"),t;n==="Nice"?(t="Nice",e.innerHTML="<span class='"+t+"'>&lt;"+n+"&gt;</span>"):n.includes("Happy")?(t="Nice",e.innerHTML="<span class='"+t+"'>&lt;Happy&gt;</span></br><span class='"+t+"'>&lt;Birthday!!&gt;</span>"):(t="Naughty",e.innerHTML="<span class='"+t+"'>&lt;"+n+"&gt;</span>"),g(n)}r.focus()}export{E as run};