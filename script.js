/* ===== GXM BOUTIQUE — script commun à toutes les pages ===== */
tailwind.config={theme:{extend:{colors:{gxm:{cream:'#FAF8F5',sand:'#EFE7D8',champagne:'#E5D6BE',gold:'#A67C46',goldLight:'#C5A368',espresso:'#2C1E16',taupe:'#6B5A4E'}},fontFamily:{serif:['"Cormorant Garamond"','Georgia','serif'],sans:['Montserrat','sans-serif']}}}};

/* ===== Envoi des emails de réservation (EmailJS) — configuré avec vos identifiants ===== */
const EMAILJS={publicKey:'',serviceId:'service_gl2tleh',templateId:'template_7o4nler'};

/* Photo manquante : affiche un cadre "?" (le nom vient de l'attribut alt).
   Pour ajouter vos photos : placez-les dans le dossier images/ avec le nom indiqué dans src. */
function gxmPh(img){
  img.onerror=null;
  const l=img.dataset.l,w=l?800:600,h=l?500:800,t=(img.alt||'Photo').replace(/[<>&]/g,'');
  img.src='data:image/svg+xml;utf8,'+encodeURIComponent(
   `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><rect width='100%' height='100%' fill='#F4EFE6'/><rect x='20' y='20' width='${w-40}' height='${h-40}' fill='none' stroke='#C5A368' stroke-width='1.5' stroke-dasharray='8 6'/><text x='50%' y='${h/2}' font-family='Georgia,serif' font-size='${h/5}' fill='#A67C46' text-anchor='middle'>?</text><text x='50%' y='${h/2+44}' font-family='Arial,sans-serif' font-size='14' letter-spacing='2' fill='#6B5A4E' text-anchor='middle'>${t.toUpperCase()}</text></svg>`);
}

/* Pièces de la collection (photos : images/nom.jpg) */
const PIECES=[
 {cat:'femme',tag:'Pièce unique • Femme',mat:'Soie champagne & fils d’or',name:'Robe « Soleil de Pampelonne »',sub:'Confection sur mannequin • Atelier français',img:'images/robe-1.jpg',desc:'Robe de soirée en soie champagne rehaussée de fils d’or, créée par un atelier français indépendant. Pièce unique.'},
 {cat:'homme',tag:'Sur commande • Homme',mat:'Lin & soie beige doré',name:'Costume croisé « Riviera Or »',sub:'Coupe tailleur sur mesure',img:'images/costume-1.jpg',desc:'Costume croisé en lin et soie beige doré, ajusté par notre tailleur dédié avec retouches express.'},
 {cat:'homme',tag:'Édition limitée • Homme',mat:'Laine vierge & brun caramel',name:'Ensemble « Saint-Tropez Sable »',sub:'Veste structurée & pantalon fluide',img:'images/costume-2.jpg',desc:'Veste structurée et pantalon fluide en laine vierge brun caramel, en série très limitée.'},
 {cat:'femme',tag:'Sur invitation • Femme',mat:'Satin beige doré & dentelle',name:'Robe drapée « Éclat Doré »',sub:'Broderies artisanales • Pièce numérotée',img:'images/robe-2.jpg',desc:'Robe drapée en satin beige doré et dentelle, avec broderies artisanales. Pièce numérotée.'},
 {cat:'accessoires',tag:'Accessoires • Bijoux',mat:'Or jaune 18 carats & diamants',name:'Parure « L’Or du Port »',sub:'Création artisanale française',img:'images/bijoux.jpg',desc:'Parure en or jaune 18 carats et diamants, façonnée par un créateur français.'},
 {cat:'accessoires',tag:'Accessoires • Homme',mat:'Lin naturel & or',name:'Pochette & boutons « Lin Doré »',sub:'Pour compléter votre tenue',img:'images/accessoires.jpg',desc:'Pochette en lin naturel et boutons de manchette dorés, pour finaliser une tenue de cérémonie.'}
];

const NAV=[['index.html','Accueil'],['collection.html','Collection Capsule'],['actualites.html','Actualités &amp; Club'],['reservations.html','Réservations'],['contact.html','Contact']];

function filterCollection(cat,btn){
  document.querySelectorAll('.filter-btn').forEach(b=>{b.classList.remove('bg-gxm-gold','text-white','border-gxm-gold');b.classList.add('bg-gxm-cream','text-gxm-espresso','border-gxm-champagne')});
  btn.classList.remove('bg-gxm-cream','text-gxm-espresso','border-gxm-champagne');btn.classList.add('bg-gxm-gold','text-white','border-gxm-gold');
  document.querySelectorAll('.collection-item').forEach(i=>{i.style.display=(cat==='all'||i.dataset.category===cat)?'block':'none'});
}

function openPieceModal(i){
  const p=PIECES[i],m=document.getElementById('modal');
  m.innerHTML=`<div class="absolute inset-0 bg-gxm-espresso/70" onclick="closeModal()"></div>
  <div class="relative bg-gxm-cream max-w-3xl w-full max-h-[90vh] overflow-auto grid sm:grid-cols-2 border border-gxm-gold/50 rounded-sm" role="dialog" aria-modal="true">
   <button onclick="closeModal()" aria-label="Fermer" class="absolute top-2 right-3 text-2xl text-gxm-espresso z-10">&times;</button>
   <div class="aspect-[3/4] bg-[#F4EFE6]"><img src="${p.img}" alt="${p.name}" onerror="gxmPh(this)" class="w-full h-full object-cover"></div>
   <div class="p-8 flex flex-col justify-center space-y-3">
    <p class="text-[10px] uppercase tracking-[0.2em] text-gxm-gold">${p.mat}</p>
    <h3 class="font-editorial text-3xl">${p.name}</h3>
    <p class="text-xs font-light text-gxm-taupe leading-relaxed">${p.desc}</p>
    <p class="text-xs text-gxm-taupe">${p.sub}</p>
    <a href="reservations.html?piece=${encodeURIComponent(p.name)}" class="mt-3 text-center py-3.5 bg-gxm-espresso text-gxm-cream text-xs uppercase tracking-[0.2em] hover:bg-gxm-gold transition-colors rounded-sm">Réserver un essayage privé</a>
   </div></div>`;
  m.classList.remove('hidden');m.classList.add('flex');document.body.style.overflow='hidden';
}
function closeModal(){const m=document.getElementById('modal');m.classList.add('hidden');m.classList.remove('flex');document.body.style.overflow=''}

document.addEventListener('DOMContentLoaded',()=>{
  const cur=document.body.dataset.page;
  const links=c=>NAV.map(([h,t])=>`<a href="${h}" class="${c}${h===cur?' active-page':''}">${t}</a>`).join('');
  document.getElementById('site-header').innerHTML=`<header class="sticky top-0 z-40 bg-gxm-cream/95 backdrop-blur-md border-b border-gxm-champagne">
   <div class="max-w-7xl mx-auto px-6 flex justify-between items-center h-20">
    <a href="index.html" class="flex flex-col items-start"><span class="font-editorial text-2xl sm:text-3xl tracking-[0.24em] font-semibold">GXM BOUTIQUE</span><span class="text-[9px] tracking-[0.42em] uppercase text-gxm-gold -mt-1">Saint-Tropez</span></a>
    <nav class="hidden md:flex items-center space-x-7 text-[11px] font-medium uppercase">${links('nav-item py-1')}</nav>
    <button id="menu-btn" class="md:hidden p-2" aria-label="Menu" aria-expanded="false"><svg width="24" height="24" fill="none" stroke="#2C1E16" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg></button>
   </div>
   <nav id="mobile-nav" class="hidden md:hidden flex-col px-6 pb-4 text-xs uppercase tracking-[0.18em] border-t border-gxm-champagne">${links('block py-3 border-b border-gxm-champagne/60')}</nav></header>`;
  const mb=document.getElementById('menu-btn'),mn=document.getElementById('mobile-nav');
  mb.onclick=()=>{const o=mn.classList.toggle('hidden');mn.classList.toggle('flex',!o);mb.setAttribute('aria-expanded',String(!o))};

  document.getElementById('site-footer').innerHTML=`<footer class="border-t border-gxm-champagne py-10 px-6 text-center">
   <span class="font-editorial text-2xl tracking-[0.28em] font-semibold block">GXM BOUTIQUE</span>
   <p class="text-[10px] uppercase tracking-[0.3em] text-gxm-gold mt-1">Saint-Tropez • « Votre élégance, votre moment »</p>
   <p class="text-[10px] text-gxm-taupe mt-3">Instagram &amp; Pinterest : @GXMBOUTIQUE</p>
   <p class="text-[10px] text-gxm-taupe/70 pt-2">© 2026 GXM Boutique Saint-Tropez</p></footer>`;

  const grid=document.getElementById('collection-grid');
  if(grid){
    grid.innerHTML=PIECES.map((p,i)=>`<article data-category="${p.cat}" onclick="openPieceModal(${i})" class="collection-item garment-card group cursor-pointer bg-white p-4 border border-gxm-champagne rounded-sm hover:border-gxm-gold transition-all">
     <div class="relative overflow-hidden aspect-[3/4] bg-[#F4EFE6] mb-4 border border-gxm-champagne/60"><img src="${p.img}" alt="${p.name}" onerror="gxmPh(this)" class="w-full h-full object-cover garment-img">
      <span class="absolute top-3 left-3 bg-gxm-cream/95 text-[9px] uppercase tracking-[0.2em] px-3 py-1 border border-gxm-champagne">${p.tag}</span></div>
     <p class="text-[10px] uppercase tracking-[0.2em] text-gxm-gold">${p.mat}</p>
     <h3 class="font-editorial text-2xl mt-1 group-hover:text-gxm-gold transition-colors">${p.name}</h3>
     <p class="text-xs font-light text-gxm-taupe mt-1">${p.sub}</p></article>`).join('');
    document.getElementById('count-all').textContent=PIECES.length;
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
  }

  const notice=(form,cls,msg)=>{form.querySelector('.notice')?.remove();const d=document.createElement('p');d.className='notice '+cls;d.textContent=msg;form.appendChild(d)};
  const bf=document.getElementById('booking-form');
  if(bf){
    const pc=new URLSearchParams(location.search).get('piece');
    if(pc)document.getElementById('booking-notes').value='Pièce souhaitée : '+pc;
    bf.addEventListener('submit',async e=>{
      e.preventDefault();
      const btn=bf.querySelector('button[type=submit]'),label=btn.textContent,v=id=>document.getElementById(id).value.trim();
      const params={to_name:v('client-name'),to_email:v('client-email'),phone:v('client-phone')||'—',category:v('booking-category'),location:v('booking-location'),date:v('booking-date'),time:v('booking-time'),notes:v('booking-notes')||'—'};
      btn.disabled=true;btn.textContent='Envoi en cours…';
      try{
        if(!EMAILJS.publicKey)throw new Error('config');
        await emailjs.send(EMAILJS.serviceId,EMAILJS.templateId,params,{publicKey:EMAILJS.publicKey});
        notice(bf,'mt-4 p-4 bg-gxm-espresso text-gxm-cream text-xs rounded-sm border border-gxm-gold','Merci '+params.to_name+'. Un email de confirmation vient d’être envoyé à '+params.to_email+'.');
        bf.reset();
      }catch(err){
        notice(bf,'mt-4 p-4 bg-red-50 text-red-800 text-xs rounded-sm border border-red-300',err.message==='config'?'L’envoi des emails n’est pas encore configuré sur ce site.':'L’email n’a pas pu être envoyé. Vérifiez l’adresse et réessayez.');
      }finally{btn.disabled=false;btn.textContent=label}
    });
  }
  const vf=document.getElementById('vip-form');
  if(vf)vf.addEventListener('submit',e=>{e.preventDefault();notice(vf,'mt-3 p-3 bg-gxm-gold text-white text-xs rounded-sm','Votre demande d’invitation au Club Privé GXM a bien été enregistrée.');vf.reset()});
});
