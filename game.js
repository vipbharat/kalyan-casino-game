function preloadAllCards() {
    let p_suits = ['spades', 'hearts', 'diamonds', 'clubs'];
    let p_vals = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    p_suits.forEach(suit => {
        p_vals.forEach(val => {
            let img = new window.Image();
            img.src = `${val}_of_${suit}.png`;
        });
    });
}
preloadAllCards();

const $=i=>document.getElementById(i);if(!firebase.apps.length)firebase.initializeApp({apiKey:"AIzaSyCy2zsDDJeVTQEbHCenkLIlz3lWWyo-Pqo",databaseURL:"https://kalyan-casino-default-rtdb.firebaseio.com",projectId:"kalyan-casino"});const db=firebase.database(),ph=localStorage.getItem('userPhone')||localStorage.getItem('phone');
let iBO=0,cC=1000,cCc='radial-gradient(circle, #e57373, #d32f2f)',tB=0,dB=0,wB=0,bB=0,mB={dragon:0,tiger:0,tie:0};
let sPl={dragon:0,tiger:0,tie:0},bPl={dragon:0,tiger:0,tie:0};
let bI,iAI=0,iD=0,bL=[], canBet=false; 

function sT(m){let t=$('tst');if(!t){t=document.createElement('div');t.id='tst';t.className='tst';document.body.appendChild(t)}t.innerText=m;t.classList.add('sh');pS('bS',0.5);setTimeout(()=>t.classList.remove('sh'),2500)}

function uA(){if(!iAI){['bgM','bS','cS','dS','snd-dragon','snd-tiger','snd-coins'].forEach(i=>{let e=$(i);if(e){e.play().then(()=>{if(i!=='bgM'){e.pause();e.currentTime=0}}).catch(e=>{})}});let m=$('bgM');if(m)m.volume=.2;iAI=1}}
function pS(i,v){try{let s=$(i);if(s){s.currentTime=0;s.volume=v;s.play().catch(e=>{})}}catch(e){}}
setInterval(()=>{$('oc').innerText=Math.floor(Math.random()*50)+1200},4000);

if(ph){db.ref('users/'+ph).on('value',s=>{let d=s.val()||{};dB=parseFloat(d.balance||0);wB=parseFloat(d.winning_balance||0);bB=parseFloat(d.bonus_balance||0);tB=Math.max(0,dB+wB+bB);$('bal').innerText=tB.toFixed(2)});db.ref(`Game/DragonTiger/Bets/${ph}`).once('value',s=>{let v=s.val();if(v)setTimeout(()=>{['dragon','tiger','tie'].forEach(sd=>{let val=v[sd];if(val>0){mB[sd]=val;let mt=$('mb-'+(sd=='tie'?'ti':sd.charAt(0)));if(mt){mt.innerText="MY BET: ₹"+val.toLocaleString();mt.style.display='block'}let bx=$('bx-'+(sd=='tie'?'ti':sd.charAt(0)));if(bx){let r=document.createElement('div');r.className='rc';r.innerText=val>=1000?(val/1000)+'K':val;bx.appendChild(r)}}})},500)})}

db.ref('Game/DragonTiger/History').on('value',s=>{let h=s.val();if(h&&Array.isArray(h)){let m='';
    [...h].reverse().slice(0,20).forEach(w=>{
        let c=w==='dragon'?'D':(w==='tiger'?'T':'Tie');
        m+=`<div class="hbd b${c}">${c}</div>`
    });
    $('hr').innerHTML=m;
}});

function gB(){bL=[];for(let i=0;i<5;i++)bL.push({id:Math.floor(Math.random()*8999)+1000,b:Math.floor(Math.random()*100000)+50000});rB()}setInterval(()=>{let n=Math.floor(Math.random()*2)+1;for(let i=0;i<n;i++)bL[Math.floor(Math.random()*bL.length)]={id:Math.floor(Math.random()*8999)+1000,b:Math.floor(Math.random()*100000)+50000};bL.forEach(b=>{b.b+=(Math.random()>.5?2500:-1500);if(b.b>150000)b.b=140000;if(b.b<10000)b.b=60000});rB()},3500);
function rB(){let h="";bL.forEach(b=>{let d=b.b>=100000?(b.b/100000).toFixed(2)+"L":(b.b/1000).toFixed(1)+"K";h+=`<div class="p"><div class="p-a">👑</div><div style="font-size:9px;color:#fff;font-weight:700;margin-top:2px">VIP_${b.id}</div><div style="font-size:10px;color:var(--g);font-weight:900">₹${d}</div></div>`});$('pr').innerHTML=h}gB();
function uP(){$('md').innerText="₹"+(sPl.dragon+bPl.dragon).toLocaleString();$('mt').innerText="₹"+(sPl.tiger+bPl.tiger).toLocaleString();$('mti').innerText="₹"+(sPl.tie+bPl.tie).toLocaleString()}

window.pB=function(s){
    if(!iBO || !canBet) return; 
    if(!ph) return sT("Login Error!");
    if(tB<cC) return sT("INSUFFICIENT BALANCE!");
    let nD=dB,nW=wB,rm=cC;if(nD>=rm)nD-=rm;else{rm-=nD;nD=0;nW-=rm}db.ref('users/'+ph).update({balance:Math.max(0,nD),winning_balance:Math.max(0,nW)});db.ref(`Game/DragonTiger/Bets/${ph}/${s}`).set(firebase.database.ServerValue.increment(cC));mB[s]+=cC;let mt=$('mb-'+(s=='tie'?'ti':s.charAt(0)));if(mt){mt.innerText="MY BET: ₹"+mB[s].toLocaleString();mt.style.display='block'}spC(s,cC,cCc);pS('bS',1)
};

function spC(s,a,c){let sid=(s=='tie'?'ti':s.charAt(0));let b=$('ch-'+sid);if(!b)return;let p=document.createElement('div');p.className='cp';p.innerText=a>=1000?(a/1000)+'K':a;p.style.background=c;p.style.color=(a===10000||a===10)?'#000':'#fff';p.style.top="150%";p.style.left=s==='dragon'?"-100px":"150px";p.style.opacity="0";b.appendChild(p);setTimeout(()=>{p.style.left=(Math.random()*60+20)+"%";p.style.top=(Math.random()*60+20)+"%";p.style.opacity="1"},50);if(b.children.length>55)b.firstChild.remove()}
function gBC(a){return a===10?'radial-gradient(circle, #fff, #ccc)':a===100?'radial-gradient(circle, #4fc3f7, #0288d1)':a===500?'radial-gradient(circle, #81c784, #388e3c)':a===1000?'radial-gradient(circle, #e57373, #d32f2f)':a===5000?'radial-gradient(circle, #ba68c8, #7b1fa2)':'radial-gradient(circle, #ffd54f, #f57f17)'}

function bBA(){
    if(!iBO || !canBet) return; 
    let bb=0;['dragon','tiger'].forEach(s=>{let a=[10,100,500,1000,5000][Math.floor(Math.random()*5)],rb=bL[Math.floor(Math.random()*bL.length)];if(rb.b>=a){rb.b-=a;spC(s,a,gBC(a));bPl[s]+=a;bb=1}});if(Math.random()>.7){let ta=[10,100][Math.floor(Math.random()*2)];spC('tie',ta,gBC(ta));bPl.tie+=ta;bb=1}if(bb){uP();pS('bS',.05)}
}

function playBanner(type) {
    let el = $('anim-' + type);
    if(!el) return;
    el.style.display = 'block';
    el.style.animation = 'none'; 
    void el.offsetWidth; 
    el.style.animation = 'slideInOut 2.5s forwards'; 
    setTimeout(() => { el.style.display = 'none'; }, 2600); 
}

db.ref('Game/DragonTiger/Status').on('value',s=>{
    let st=s.val();if(!st)return;let te=$('tmr');
    
    if(st.state==='waiting'){
        te.innerText = "WAITING...";
    }
    else if(st.state==='betting'){
        if(iD === 1 || !iBO){ 
            iBO=1; iD=0; canBet=false; 
            rUI(); 
            
            playBanner('start'); 
            
            setTimeout(() => {
                canBet = true; 
                clearInterval(bI); bI=setInterval(bBA,700);
            }, 2500); 
        }
        te.innerText=st.timer+"s";
        if(st.timer<=5){te.style.color="#f33";te.style.textShadow="0 0 20px #f33"}
        else{te.style.color="var(--g)";te.style.textShadow="0 0 15px var(--g)"}
    }
    else if(st.state==='result'){
        if(iBO || !iD){ 
            iBO=0; iD=1; canBet=false; clearInterval(bI); 
            te.innerText="STOP!"; te.style.color="#fff"; te.style.textShadow="0 0 15px #fff";
            
            playBanner('stop'); 
            
            setTimeout(() => {
                playBanner('wait'); 
            }, 2500);

            setTimeout(() => {
                if(st.winner) sR(st.winner); 
                else sR(['dragon', 'tiger', 'tie'][Math.floor(Math.random() * 3)]);
            }, 5000); 
        }
    }
});

db.ref('Game/DragonTiger/Bets').on('value',s=>{let a=s.val()||{};sPl={dragon:0,tiger:0,tie:0};for(let u in a){if(!u.includes('bot')){sPl.dragon+=(a[u].dragon||0);sPl.tiger+=(a[u].tiger||0);sPl.tie+=(a[u].tie||0)}}uP()});

function cCD(v, s) {
    if (v === 'J' || v === 'Q' || v === 'K') {
        let y=s==='S'?'♠':s==='H'?'♥':s==='D'?'♦':'♣', c=(s==='H'||s==='D')?'red-suit':'black-suit';
        return `<div class="text-card ${c}"><div style="font-size:14px;font-weight:900;line-height:1">${v}<br><span style="font-size:14px">${y}</span></div><div style="font-size:32px;text-align:center;margin-top:-5px">${y}</div><div style="font-size:14px;font-weight:900;line-height:1;text-align:left;transform:rotate(180deg);margin-top:-5px">${v}<br><span style="font-size:14px">${y}</span></div></div>`;
    } else {
        let suitMap = {'S': 'spades', 'H': 'hearts', 'D': 'diamonds', 'C': 'clubs'};
        let valMap = {'A': 'ace', '10': '10', '0': '10'};
        let suitName = suitMap[s]; let valName = valMap[v] || v; 
        let fileName = `${valName}_of_${suitName}.png`.toLowerCase();
        return `<img src="${fileName}" style="width: 100%; height: 100%; border-radius: 4px; box-shadow: inherit;">`;
    }
}

function animateWinningChips(wId) {
    let boardRect = document.querySelector('.btbl').getBoundingClientRect();
    let onlineRect = document.getElementById('online-badge').getBoundingClientRect();
    let winBoxId = wId === 'dragon' ? 'bx-d' : (wId === 'tiger' ? 'bx-t' : 'bx-ti');
    let winTarget = document.getElementById(winBoxId).getBoundingClientRect();

    let targets = [];
    for(let i=0; i<15; i++) { if (Math.random() > 0.4) targets.push(winTarget); else targets.push(onlineRect); }
    pS('snd-coins', 0.8); 

    targets.forEach((target, i) => {
        setTimeout(() => {
            let chip = document.createElement('div');
            chip.className = 'placed-chip win-anim-chip';
            chip.style.background = '#ffd700'; chip.style.border = '2px solid #fff'; chip.style.boxShadow = '0 0 10px #ffd700';
            chip.style.left = (boardRect.left + boardRect.width/2) + 'px'; chip.style.top = (boardRect.top + boardRect.height/2) + 'px';
            document.body.appendChild(chip);
            setTimeout(() => {
                chip.style.left = (target.left + target.width/2 + (Math.random()*40 - 20)) + 'px';
                chip.style.top = (target.top + target.height/2 + (Math.random()*40 - 20)) + 'px';
                chip.style.opacity = '0'; chip.style.transform = 'scale(0.5)';
            }, 50);
            setTimeout(() => chip.remove(), 700);
        }, i * 40); 
    });
}

function sR(w){
    pS('cS',1);
    $('b-d').style.display='none';$('b-t').style.display='none';
    let cd=$('c-d'),ct=$('c-t');cd.style.transform="scale(1.2)";ct.style.transform="scale(1.2)";
    const vs=["A","2","3","4","5","6","7","8","9","10","J","Q","K"],ss=["S","D","C","H"];
    let di,ti;
    if(w==='dragon'){di=Math.floor(Math.random()*12)+1;ti=Math.floor(Math.random()*di)}
    else if(w==='tiger'){ti=Math.floor(Math.random()*12)+1;di=Math.floor(Math.random()*ti)}
    else{di=Math.floor(Math.random()*13);ti=di}
    let ds=ss[Math.floor(Math.random()*4)],ts=ss[Math.floor(Math.random()*4)];
    $('d-v').innerHTML=cCD(vs[di],ds);$('t-v').innerHTML=cCD(vs[ti],ts);
    
    setTimeout(()=>{
        cd.style.transform="scale(1)";ct.style.transform="scale(1)";
        if(w==='dragon'){ pS('snd-dragon', 1); let vd = $('vid-dragon'); if(vd) vd.play(); $('bx-d').classList.add('gw'); }
        else if(w==='tiger'){ pS('snd-tiger', 1); let vt = $('vid-tiger'); if(vt) vt.play(); $('bx-t').classList.add('gw'); }
        else { $('bx-ti').classList.add('gw'); }
        
        animateWinningChips(w);
        let wa=0;if(w==='dragon')wa=mB.dragon*2;else if(w==='tiger')wa=mB.tiger*2;else if(w==='tie')wa=mB.tie*9;
        if(wa>0&&ph)db.ref('users/'+ph+'/winning_balance').set(wB+wa)
    },800)
}

function rUI(){
    ['bx-d','bx-t','bx-ti'].forEach(i=>$(i).classList.remove('gw'));
    ['d','t','ti'].forEach(s=>{let mt=$('mb-'+s);if(mt){mt.style.display='none';mt.innerText="MY BET: ₹0"}});
    $('d-v').innerHTML='';$('t-v').innerHTML='';
    $('b-d').style.display='block';$('b-t').style.display='block';
    let vd = $('vid-dragon'); if(vd){ vd.pause(); vd.currentTime = 0; }
    let vt = $('vid-tiger'); if(vt){ vt.pause(); vt.currentTime = 0; }
    document.querySelectorAll('.cp,.rc').forEach(c=>{c.style.transition = 'all 0.5s ease'; c.style.opacity = '0'; c.style.transform = 'scale(0) translateY(-50px)'; setTimeout(() => c.remove(), 500);});
    sPl={dragon:0,tiger:0,tie:0};bPl={dragon:0,tiger:0,tie:0};mB={dragon:0,tiger:0,tie:0};uP();
    document.querySelectorAll('.pa').forEach(s => s.innerText = '₹0');
}
window.sC=function(v,e){cC=v;cCc=window.getComputedStyle(e).backgroundImage;document.querySelectorAll('.cb').forEach(b=>b.classList.remove('sel'));e.classList.add('sel');pS('bS',.5)}
