let balance=parseInt(localStorage.getItem('balance')||'10000000');
let history=JSON.parse(localStorage.getItem('history')||'[]');
let used=JSON.parse(localStorage.getItem('used')||'{}');
function save(){localStorage.setItem('balance',balance);localStorage.setItem('history',JSON.stringify(history));localStorage.setItem('used',JSON.stringify(used));}
function render(){document.getElementById('balance').innerText='Balance: '+balance;document.getElementById('history').innerHTML=history.map(h=>'<li>'+h+'</li>').join('');}
render();
function spin(){const s=['🍒','⭐','💎'];const r=[s[Math.random()*3|0],s[Math.random()*3|0],s[Math.random()*3|0]];document.getElementById('slots').innerText=r.join(' ');let win=r[0]==r[1]&&r[1]==r[2]?5000:0;balance+=win-1000;history.push('Spin '+r.join(' ')+' | '+(win?('Win '+win):'Lose 1000'));save();render();}
async function applyPromo(){let code=prompt('Promo code:');if(!code)return;const p=await fetch('promos.json').then(r=>r.json());if(p[code]&&!used[code]){balance+=p[code];used[code]=true;history.push('Promo '+code+' +'+p[code]);save();render();alert('Applied!');}else alert('Invalid or used');}
