/* Model: effective annual rates, end-of-month contributions, final portfolio tax. */
(function(root){
function calculate(s,variant='base'){
 const {budget:B,monthly:D,months:n,tax:p,categories:cats}=s;
 if(!Number.isFinite(B)||B<0||!Number.isFinite(D)||D<0||B+n*D<=0||!Number.isInteger(n)||n<1||n>600||!Number.isFinite(p)||p<0||p>100)throw Error('Sprawdź budżet, dopłaty, okres i podatek.');
 if(cats.length<1||cats.length>10)throw Error('Wprowadź od 1 do 10 kategorii.');
 const names=new Set();let units=0;
 cats.forEach(c=>{if(!c.name.trim()||c.name.length>60||names.has(c.name.trim().toLocaleLowerCase()))throw Error('Nazwy kategorii muszą być unikalne i mieć 1–60 znaków.');names.add(c.name.trim().toLocaleLowerCase());if(!Number.isFinite(c.share)||c.share<0||c.share>100||Math.abs(c.share*100-Math.round(c.share*100))>1e-7)throw Error('Udziały: 0–100%, do dwóch miejsc po przecinku.');units+=Math.round(c.share*100);if(!Number.isFinite(c.fee)||c.fee<0||c.fee>100)throw Error('Koszt roczny: 0–100%.');for(const k of ['base','low','high'])if(!Number.isFinite(c[k])||c[k]<-100||c[k]>1000)throw Error('Roczne stopy: od −100% do 1000%.');});
 if(units!==10000)throw Error(units<10000?`Pozostało do przydzielenia: ${(10000-units)/100}%`:`Przekroczono budżet o ${(units-10000)/100}%.`);
 const rows=cats.map(c=>({...c,value:B*c.share/100,paid:(B+n*D)*c.share/100,cost:0,a:Math.pow(1+c[variant]/100,1/12),f:Math.pow(1-c.fee/100,1/12)}));
 const schedule=[{month:0,deposit:0,paid:B,growth:0,cost:0,value:B}];let growth=0,cost=0;
 for(let t=1;t<=n;t++){let g=0,f=0,v=0;rows.forEach(r=>{const gain=r.value*(r.a-1),fee=r.value*r.a*(1-r.f);r.value=r.value*r.a*r.f+D*r.share/100;r.cost+=fee;g+=gain;f+=fee;v+=r.value;});if(!Number.isFinite(v))throw Error('Wynik przekracza zakres obliczeń.');growth+=g;cost+=f;schedule.push({month:t,deposit:D,paid:B+t*D,growth:g,cost:f,value:v});}
 const paid=B+n*D,value=rows.reduce((a,r)=>a+r.value,0),profit=value-paid,tax=Math.max(profit,0)*p/100,net=value-tax;
 rows.forEach(r=>{r.profit=r.value-r.paid;r.roi=r.paid?r.profit/r.paid*100:null;r.contribution=r.profit/paid*100;r.finalShare=value?r.value/value*100:null;});
 return {paid,value,profit,tax,net,gain:net-paid,roi:(net-paid)/paid*100,balanceGrowth:B?(net-B)/B*100:null,growth,cost,rows,schedule};
}
if(typeof module!=='undefined')module.exports={calculate};else root.Investment={calculate};
})(typeof globalThis!=='undefined'?globalThis:this);
