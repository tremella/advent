function x(p){const E=document.getElementById("mini_wordle"),l=p.details.target_word,f=6;let i=l.length,c=0;function h(){const e=document.createElement("div"),d=document.createElement("h2"),t=document.createElement("p");if(d.textContent=p.details.title,t.textContent="Guess the 4-letter word!",e.appendChild(d),e.appendChild(t),document.getElementById("grid"))return;const n=document.createElement("div");n.id="grid",e.appendChild(n);for(let r=0;r<f;r++)for(let u=0;u<i;u++){let m=document.createElement("div");m.id=`cell-${r}-${u}`,m.classList.add("cell"),n.appendChild(m)}const a=document.createElement("div");a.id="inputContainer",e.appendChild(a);const o=document.createElement("input");o.type="text",o.id="guessInput",o.maxLength=i,o.addEventListener("keypress",function(r){r.key==="Enter"&&document.getElementById("guessButton").click()}),a.appendChild(o);const C=document.createElement("div");e.appendChild(C);const s=document.createElement("button");s.id="guessButton",s.textContent="Guess",s.addEventListener("click",v),C.appendChild(s),E.appendChild(e)}function v(){let e=document.getElementById("guessInput").value.toLowerCase();if(e.length!==i){alert("Enter a 4-letter word");return}if(!g.includes(e)){alert("Not a valid word");return}if(w(e),e===l){alert("Congratulations! You've guessed the word!");return}c++,c===f&&alert("Game over! The word was "+l),document.getElementById("guessInput").value=""}function w(e){let d={};for(let t=0;t<i;t++){const n=l[t];d[n]=(d[n]||0)+1}for(let t=0;t<i;t++){let n=document.getElementById(`cell-${c}-${t}`);n.textContent=e[t],l[t]===e[t]&&(n.classList.add("correct"),d[e[t]]-=1)}for(let t=0;t<i;t++){let n=document.getElementById(`cell-${c}-${t}`);n.classList.contains("correct")||(l.includes(e[t])&&d[e[t]]>0?(n.classList.add("present"),d[e[t]]-=1):n.classList.add("absent"))}}let g=[];fetch("/advent/four_letter_words.txt").then(e=>e.text()).then(e=>{g=e.split(`
`).map(d=>d.trim()),h()})}export{x as run};
