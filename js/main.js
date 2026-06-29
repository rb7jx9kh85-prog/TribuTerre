/* ============================================================
   TRIBUTERRE — JS partagé (vanilla, sans dépendance obligatoire)
   ============================================================ */
(function () {
  "use strict";
  var html = document.documentElement;
  html.classList.add("js"); html.classList.remove("no-js");
  var REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------- données cuvées -------------------- */
  var CUVEES = [
    { name:"Terre Blanche", type:"Blanc · Assemblage", famille:"blanc",
      desc:"L'assemblage blanc de la maison. Nez fin et délicat, bouche fraîche, dynamique et équilibrée, à la finale saline et minérale.",
      origin:"Vin de table · MMXXII", format:"75 cl", img:"assets/TerreBlanche.webp" },
    { name:"L'Ardoisière", type:"Blanc · Assemblage", famille:"blanc",
      desc:"Née du terroir ardoisier de Leytron. Un blanc tendu et lumineux, sur la pierre et les agrumes, à la finale précise.",
      origin:"Vin de pays", format:"75 cl", img:"assets/LArdoisiere.webp" },
    { name:"Orange 2.4", type:"Orange · Macération", famille:"orange",
      desc:"Macération pelliculaire longue, fermentation spontanée. Robe ambrée, nez complexe et généreux, bouche ample, texturée, à la finale légèrement tannique. Un vin vivant, nature.",
      origin:"VDT nature", format:"50 cl", img:null },
    { name:"Terre de Rosée", type:"Rosé · Assemblage", famille:"rose",
      desc:"Belle robe saumonée. Nez expressif, ouvert, printanier. Bouche puissante, fruitée et florale, ronde, sur les fruits à noyaux (brugnon, mirabelle). Finale gourmande.",
      origin:"VPD · 2024 · 13 % vol", format:"50 cl", img:"assets/TerreDeRose.webp" },
    { name:"Vieilles Vignes Gamay", type:"Rouge · Gamay", famille:"rouge",
      desc:"Robe rubis, grand nez sur la griotte et la pivoine. Bouche ciselée, précise, sapide et aérienne, aux nuances de violette et de fraise des bois. Finale élégante aux tanins délicats.",
      origin:"AOC Leytron", format:"75 cl", img:"assets/VieillesVignesGamay.webp" },
    { name:"Terre d'Automne", type:"Rouge · Assemblage", famille:"rouge",
      desc:"L'assemblage de saison de la maison. Un rouge généreux, sur le fruit mûr et la rondeur, à partager sans façon.",
      origin:"Vin de table", format:"75 cl", img:"assets/TerreDAutomne.webp" },
    { name:"Terre N° 13", type:"Rouge · Merlot", famille:"rouge",
      desc:"Merlot droit, élevé sans détour. Fruit noir, profondeur et trame sobre, pour un vin franc et de caractère.",
      origin:"Vin de pays · 2023", format:"75 cl", img:"assets/TerreN13.webp" },
    { name:"Terre Rouge", type:"Rouge · Assemblage", famille:"rouge", dark:true,
      desc:"Nez intense et ouvert sur le cacao, le kirsch et la vanille. Bouche souple, caressante, pure, à la concentration certaine. Bel élevage discret, longue finale aux tanins fins et intégrés.",
      origin:"Valais · MMXXII", format:"75 cl", img:"assets/TerreRouge.webp" },
    { name:"Merlot Prestige", type:"Rouge · Merlot", famille:"prestige", dark:true,
      desc:"La cuvée haut de gamme. Un merlot d'élevage patient, dense et raffiné, à la trame serrée et à la longue finale boisée.",
      origin:"Prestige · 2022", format:"75 cl", img:"assets/MerlotPrestige.webp" }
  ];
  window.TT_CUVEES = CUVEES;

  /* -------------------- vins disponibles (petites cartes) -------------------- */
  var DISPO = [
    { name:"Fendant",        info:"AOC · 2025 · 75 cl",          famille:"blanc",  img:null },
    { name:"Terre Blanche",  info:"VDT · MMXXII · 75 cl",        famille:"blanc",  img:"assets/TerreBlanche.webp" },
    { name:"Orange 2.4",     info:"VDT nature · 50 cl",          famille:"orange", img:null },
    { name:"Terre de Rosée", info:"VPD · 2024 · 50 cl",          famille:"rose",   img:"assets/TerreDeRose.webp" },
    { name:"Le Gamay",       info:"AOC Leytron · 2025 · 75 cl",  famille:"rouge",  img:"assets/VieillesVignesGamay.webp" },
    { name:"Terre N° 13",    info:"Merlot · VDP 2023 · 75 cl",   famille:"rouge",  img:"assets/TerreN13.webp" },
    { name:"Terre Rouge",    info:"MMXXII · 75 cl",              famille:"rouge",  img:"assets/TerreRouge.webp" },
    { name:"Merlot Prestige",info:"2022 · 75 cl",                famille:"rouge",  img:"assets/MerlotPrestige.webp" }
  ];

  function accent(f){ return f === "blanc" ? "#0b4a12" : "#7e0a0a"; }
  function phBottle(f, dark){
    var bg = dark ? "#141015" : "#efeadd", col = accent(f);
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 360'><rect width='120' height='360' rx='6' fill='"+bg+"'/><rect x='2' y='2' width='116' height='356' rx='5' fill='none' stroke='"+col+"' stroke-opacity='0.35' stroke-width='1.5'/><text x='60' y='196' font-family='Georgia,serif' font-size='52' font-weight='700' text-anchor='middle' fill='"+col+"'>TT</text></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  function phScene(label){
    var svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 1500' preserveAspectRatio='xMidYMid slice'><defs><linearGradient id='s' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#2a2521'/><stop offset='1' stop-color='#b9b3a6'/></linearGradient></defs><rect width='1200' height='1500' fill='url(#s)'/><path d='M0 620 L240 360 L430 520 L640 300 L860 540 L1060 380 L1200 560 L1200 1500 L0 1500 Z' fill='#b9b3a6'/><path d='M0 900 L1200 820 L1200 1500 L0 1500 Z' fill='#6b5d34' fill-opacity='0.9'/><g stroke='#0a0a0c' stroke-opacity='0.32' stroke-width='4'><line x1='120' y1='980' x2='160' y2='1480'/><line x1='320' y1='960' x2='360' y2='1480'/><line x1='520' y1='950' x2='560' y2='1480'/><line x1='720' y1='945' x2='760' y2='1480'/><line x1='920' y1='950' x2='960' y2='1480'/><line x1='1100' y1='965' x2='1140' y2='1480'/></g><text x='600' y='1440' font-family='Georgia,serif' font-size='34' text-anchor='middle' fill='#f6f3ec' fill-opacity='0.7'>"+(label||"Tributerre")+"</text></svg>";
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  function imgFallbacks(){
    document.querySelectorAll("img[data-fallback]").forEach(function(img){
      function apply(){ if(img.dataset.err) return; img.dataset.err="1";
        var k=img.getAttribute("data-fallback");
        if(k==="hero"||k==="video"){ img.style.display="none"; }
        else if(k==="bottle"){ img.src=phBottle(img.getAttribute("data-famille")||"rouge", img.getAttribute("data-dark")==="true"); }
        else { img.src=phScene(img.getAttribute("data-label")||"Tributerre"); }
      }
      img.addEventListener("error", apply);
      if(img.complete && img.naturalWidth===0) apply();
    });
  }

  /* -------------------- LOADER -------------------- */
  function loader(){
    var el = document.querySelector(".loader");
    if(!el){ startIntro(); return; }
    var bar = el.querySelector(".loader__bar i");
    var pct = el.querySelector(".loader__pct");
    var quick = sessionStorage.getItem("tt_seen") === "1";
    var dur = quick ? 450 : 1300;
    var t0 = performance.now();
    function step(now){
      var p = Math.min(1, (now - t0) / dur);
      var v = Math.round(p * 100);
      if(bar) bar.style.width = v + "%";
      if(pct) pct.textContent = v < 10 ? "00"+v : v < 100 ? "0"+v : "100";
      if(p < 1){ requestAnimationFrame(step); }
      else { sessionStorage.setItem("tt_seen","1"); el.classList.add("is-done"); startIntro(); document.body.classList.remove("is-locked"); }
    }
    document.body.classList.add("is-locked");
    requestAnimationFrame(step);
    // sécurité
    setTimeout(function(){ if(!el.classList.contains("is-done")){ el.classList.add("is-done"); startIntro(); document.body.classList.remove("is-locked"); } }, dur + 1500);
  }
  function startIntro(){
    var hero = document.querySelector(".hero[data-intro]");
    if(!hero) return;
    if(document.getElementById("heroV1")) heroVideos(hero);
    else requestAnimationFrame(function(){ hero.classList.add("intro-in"); });
  }

  /* -------------------- HERO : séquence vidéo 1 -> vidéo 2 -> logo -------------------- */
  function heroVideos(hero){
    var v1 = document.getElementById("heroV1");
    var v2 = document.getElementById("heroV2");
    var cap = document.getElementById("heroCaption");
    function caption(txt){
      if(!cap) return;
      cap.classList.remove("show");
      setTimeout(function(){ var s=cap.querySelector("span"); if(s) s.textContent=txt; cap.classList.add("show"); }, 260);
    }
    function show(v){ if(v) v.classList.add("is-on"); }
    function hide(v){ if(v) v.classList.remove("is-on"); }
    function runClip(v, onDone){
      if(!v){ onDone(); return; }
      var done=false, MAX=6500, played=false;
      function fin(){ if(done) return; done=true; onDone(); }
      v.addEventListener("ended", fin, { once:true });
      v.addEventListener("error", function(){ setTimeout(fin, 250); }, { once:true });
      v.addEventListener("playing", function(){ played=true; }, { once:true });
      var p = v.play && v.play(); if(p && p.catch) p.catch(function(){});
      // injouable (autoplay bloqué / codec absent) -> on avance vite
      setTimeout(function(){ if(!done && !played) fin(); }, 1800);
      // borne haute : l'intro ne traîne jamais, même sur une vidéo longue
      setTimeout(fin, MAX);
    }
    function phase1(){ show(v1); caption("De la terre au raisin"); runClip(v1, phase2); }
    function phase2(){ show(v2); hide(v1); caption("Du raisin au vin"); runClip(v2, phase3); }
    function phase3(){
      if(cap) cap.classList.remove("show");
      if(v2) v2.classList.remove("is-on");
      if(v1) v1.classList.remove("is-on");
      requestAnimationFrame(function(){ hero.classList.add("intro-in"); });
    }
    if(REDUCE){ phase3(); return; }
    phase1();
  }

  /* -------------------- Scroll cinématique : bouteille qui grandit -------------------- */
  function cinematic(){
    var section = document.querySelector(".cinematic-scroll"); if(!section) return;
    var img = section.querySelector(".bottle-image");
    var copy = section.querySelector(".bottle-copy");
    var next = section.querySelector(".next-reveal");
    if(REDUCE){ if(next){ next.style.opacity=1; next.style.filter="none"; next.style.transform="none"; } return; }
    var clamp=function(v,a,b){ return Math.min(Math.max(v,a),b); };
    var lerp=function(a,b,p){ return a+(b-a)*p; };
    var ease=function(p){ return 1-Math.pow(1-p,3); };
    var ticking=false;
    function update(){
      var rect=section.getBoundingClientRect();
      var total=section.offsetHeight - window.innerHeight;
      var prog=clamp(-rect.top/total,0,1);
      var zoom=ease(clamp(prog/0.5,0,1));
      var fade=ease(clamp((prog-0.28)/0.35,0,1));
      var nx=ease(clamp((prog-0.68)/0.32,0,1));
      if(img){
        img.style.transform="translateX("+lerp(20,0,zoom).toFixed(2)+"vw) scale("+lerp(0.72,4.4,zoom).toFixed(3)+") rotate("+lerp(-2,0,zoom).toFixed(2)+"deg)";
        img.style.opacity=lerp(1,0.12,nx).toFixed(3);
        img.style.filter="drop-shadow(0 40px 100px rgba(0,0,0,0.6)) blur("+lerp(0,12,nx).toFixed(1)+"px)";
      }
      if(copy){ copy.style.opacity=lerp(1,0,fade).toFixed(3); copy.style.transform="translateY(-50%) translateX("+lerp(0,-5,fade).toFixed(2)+"vw)"; }
      if(next){ next.style.opacity=nx.toFixed(3); next.style.transform="translateY("+lerp(50,0,nx).toFixed(1)+"px)"; next.style.filter="blur("+lerp(12,0,nx).toFixed(1)+"px)"; }
      ticking=false;
    }
    window.addEventListener("scroll", function(){ if(!ticking){ requestAnimationFrame(update); ticking=true; } }, { passive:true });
    window.addEventListener("resize", update);
    update();
  }

  /* -------------------- HEADER scrolled -------------------- */
  function header(){
    var h = document.querySelector(".site-header"); if(!h) return;
    function on(){ h.classList.toggle("scrolled", window.scrollY > 60); }
    on(); window.addEventListener("scroll", on, { passive:true });
  }
  function mobileNav(){
    var btn = document.querySelector(".nav-toggle"); if(!btn) return;
    btn.addEventListener("click", function(){
      var open = html.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".site-nav a").forEach(function(a){
      a.addEventListener("click", function(){ html.classList.remove("nav-open"); });
    });
  }

  /* -------------------- REVEAL / LINE / WORD -------------------- */
  function reveals(){
    if(REDUCE){ document.querySelectorAll(".reveal,.line-reveal,.word-reveal").forEach(function(e){ e.classList.add("visible"); }); return; }
    // word-reveal : découpe en mots
    document.querySelectorAll(".word-reveal").forEach(function(t){
      if(t.dataset.split) return; t.dataset.split="1";
      var words = t.textContent.trim().split(/\s+/);
      t.innerHTML = words.map(function(w,i){ return "<span style='transition-delay:"+(i*0.05).toFixed(2)+"s'>"+w+"&nbsp;</span>"; }).join("");
    });
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: 0.18 });
    document.querySelectorAll(".reveal, .word-reveal").forEach(function(e){ io.observe(e); });
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("visible"); io2.unobserve(e.target); } });
    }, { threshold: 0.3 });
    document.querySelectorAll(".line-reveal").forEach(function(e){ io2.observe(e); });
  }

  /* -------------------- PARALLAX images -------------------- */
  function parallax(){
    if(REDUCE) return;
    var imgs = [].slice.call(document.querySelectorAll(".parallax-img"));
    if(!imgs.length) return;
    var ticking = false;
    function update(){
      imgs.forEach(function(img){
        var r = img.getBoundingClientRect();
        if(r.bottom < 0 || r.top > window.innerHeight) return;
        var offset = (r.top - window.innerHeight/2) * 0.06;
        img.style.transform = "translateY(" + offset.toFixed(1) + "px) scale(1.14)";
      });
      ticking = false;
    }
    window.addEventListener("scroll", function(){ if(!ticking){ requestAnimationFrame(update); ticking = true; } }, { passive:true });
    update();
  }

  /* -------------------- LIGHT CARD (halo souris) + magnétique -------------------- */
  function lightCards(){
    if(window.matchMedia("(pointer: coarse)").matches) return;
    document.querySelectorAll(".cuvee-card").forEach(function(card){
      card.addEventListener("mousemove", function(e){
        var r = card.getBoundingClientRect();
        card.style.setProperty("--x", ((e.clientX - r.left)/r.width*100) + "%");
        card.style.setProperty("--y", ((e.clientY - r.top)/r.height*100) + "%");
      });
    });
    document.querySelectorAll(".magnetic").forEach(function(btn){
      btn.addEventListener("mousemove", function(e){
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left+r.width/2)) / r.width;
        var dy = (e.clientY - (r.top+r.height/2)) / r.height;
        btn.style.transform = "translate(" + (dx*16).toFixed(1) + "px," + (dy*16-3).toFixed(1) + "px)";
      });
      btn.addEventListener("mouseleave", function(){ btn.style.transform = ""; });
    });
  }

  /* -------------------- CURSEUR -------------------- */
  function cursor(){
    if(REDUCE || window.matchMedia("(pointer: coarse)").matches) return;
    var c = document.querySelector(".cursor"); if(!c) return;
    var mx=0,my=0,cx=0,cy=0;
    document.addEventListener("mousemove", function(e){ mx=e.clientX; my=e.clientY; });
    (function raf(){ cx+=(mx-cx)*0.16; cy+=(my-cy)*0.16; c.style.transform="translate("+cx+"px,"+cy+"px)"; requestAnimationFrame(raf); })();
    document.querySelectorAll("a, button, .cuvee-card, .wine-btn, [data-cursor]").forEach(function(el){
      el.addEventListener("mouseenter", function(){ c.classList.add("hover"); });
      el.addEventListener("mouseleave", function(){ c.classList.remove("hover"); });
    });
  }

  /* -------------------- MARQUEE -------------------- */
  function marquee(){
    var tr = document.querySelector(".marquee__track"); if(!tr || tr.children.length) return;
    var words = ["TRIBUTERRE","LEYTRON","RIDDES · 1908","TROIS GÉNÉRATIONS","SOUS L'ARDEVAZ","VENTE DIRECTE"];
    var unit = ""; words.forEach(function(w){ unit += "<span>"+w+"</span><span class='dot'>—</span>"; });
    tr.innerHTML = unit + unit;
  }

  /* -------------------- CUVÉES (construction) -------------------- */
  function buildCuvees(){
    document.querySelectorAll("[data-cuvees]").forEach(function(host){
      var limit = parseInt(host.getAttribute("data-cuvees"), 10);
      var list = (limit > 0) ? CUVEES.slice(0, limit) : CUVEES;
      var frag = document.createDocumentFragment();
      list.forEach(function(c, i){
        var n = CUVEES.indexOf(c) + 1;
        var card = document.createElement("article");
        card.className = "cuvee-card reveal";
        if(i % 3 === 1) card.className += " reveal-d1"; if(i % 3 === 2) card.className += " reveal-d2";
        card.setAttribute("data-famille", c.famille);
        if(c.dark) card.setAttribute("data-dark","true");
        var num = (n<10?"0":"")+n;
        card.innerHTML =
          '<span class="cuvee-num">Cuvée '+num+'</span>'+
          '<figure class="cuvee-fig"><img loading="lazy" alt="'+c.name+'" src="'+c.img+'" data-fallback="bottle" data-famille="'+c.famille+'" data-dark="'+(c.dark?'true':'false')+'"></figure>'+
          '<div class="cuvee-body">'+
            '<h3>'+c.name+'</h3>'+
            '<p class="cuvee-type">'+c.type+'</p>'+
            '<p class="cuvee-desc">'+c.desc+'</p>'+
            '<div class="cuvee-bottom"><span>'+c.origin+'</span><span>'+c.format+'</span></div>'+
          '</div>';
        frag.appendChild(card);
      });
      host.appendChild(frag);
    });
  }

  function buildDispo(){
    var host = document.querySelector("[data-dispo]"); if(!host) return;
    var frag = document.createDocumentFragment();
    DISPO.forEach(function(d){
      var fam = d.famille === "blanc" ? "blanc" : "rouge";
      var card = document.createElement("article");
      card.className = "dispo-card reveal";
      card.setAttribute("data-famille", d.famille);
      var src = d.img || phBottle(fam, false);
      var fb = d.img ? ' data-fallback="bottle" data-famille="'+fam+'"' : '';
      card.innerHTML = '<img src="'+src+'" alt="'+d.name+'" loading="lazy"'+fb+'>'+
        '<div class="dispo-info"><h4>'+d.name+'</h4><p>'+d.info+'</p></div>';
      frag.appendChild(card);
    });
    host.appendChild(frag);
  }


  /* -------------------- AGE GATE -------------------- */
  function ageGate(){
    var overlay = document.createElement("div");
    overlay.className = "age-gate";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "ag-title");
    overlay.innerHTML =
      '<div class="age-gate__mark"><img src="assets/tt-mark.png" alt="Tributerre" width="96" height="96"></div>'+
      '<h2 class="age-gate__title" id="ag-title">Ce site vend de l\'alcool</h2>'+
      '<p class="age-gate__sub">En accédant à ce site, vous confirmez avoir l\'âge légal requis — <strong>18 ans</strong> — pour l\'achat de vins et spiritueux en Suisse.</p>'+
      '<div class="age-gate__btns">'+
        '<button class="age-gate__yes" type="button">Oui, j\'ai 18 ans ou plus</button>'+
        '<button class="age-gate__no" type="button">Non, je suis mineur·e</button>'+
      '</div>'+
      '<p class="age-gate__legal">Tributerre · Christian Vouillamoz · Riddes · Valais · Suisse</p>';
    document.body.appendChild(overlay);
    document.body.classList.add("is-locked");
    overlay.querySelector(".age-gate__yes").addEventListener("click", function(){
      overlay.style.opacity = "0";
      document.body.classList.remove("is-locked");
      setTimeout(function(){ overlay.remove(); }, 520);
    });
    overlay.querySelector(".age-gate__no").addEventListener("click", function(){
      window.location.href = "https://www.ch.ch/fr/alcool/";
    });
  }

  /* -------------------- FORMULAIRE DE COMMANDE (Web3Forms) -------------------- */
  function contactForm(){
    var form = document.getElementById("orderForm"); if(!form) return;
    var status = document.getElementById("form-status");
    var btn = document.getElementById("submitBtn");

    // qty +/- buttons
    form.querySelectorAll(".qty-btn").forEach(function(b){
      b.addEventListener("click", function(){
        var row = b.closest(".wine-order-row");
        var inp = row.querySelector(".qty-input");
        var v = Math.max(0, Math.min(99, parseInt(inp.value||0) + parseInt(b.dataset.dir)));
        inp.value = v;
        inp.classList.toggle("is-active", v > 0);
      });
    });
    // highlight non-zero on load
    form.querySelectorAll(".qty-input").forEach(function(inp){
      inp.addEventListener("input", function(){ inp.classList.toggle("is-active", parseInt(inp.value||0)>0); });
    });

    form.addEventListener("submit", function(e){
      e.preventDefault();
      if(btn) btn.disabled = true;
      if(status){ status.textContent = "Envoi en cours…"; status.className = "cf-status"; }

      var data = new FormData(form);

      // Build order summary from qty fields
      var lines = [];
      form.querySelectorAll(".qty-input").forEach(function(inp){
        var qty = parseInt(inp.value||0);
        if(qty > 0){
          var label = inp.closest(".wine-order-row").querySelector(".wor-name").textContent.trim();
          var detail = inp.closest(".wine-order-row").querySelector(".wor-detail").textContent.trim();
          lines.push(qty + " × " + label + " (" + detail + ")");
        }
        data.delete(inp.name);
      });
      if(lines.length) data.set("commande", lines.join("\n"));

      fetch("https://api.web3forms.com/submit", { method:"POST", body:data })
        .then(function(r){ return r.json(); })
        .then(function(json){
          if(json.success){
            form.reset();
            form.querySelectorAll(".qty-input").forEach(function(i){ i.value=0; i.classList.remove("is-active"); });
            if(status){ status.textContent = "Commande envoyée — nous vous répondons sous 24 h."; status.className = "cf-status ok"; }
          } else {
            if(status){ status.textContent = "Erreur : " + (json.message||"veuillez réessayer."); status.className = "cf-status err"; }
          }
        })
        .catch(function(){
          if(status){ status.textContent = "Erreur réseau — veuillez réessayer."; status.className = "cf-status err"; }
        })
        .finally(function(){ if(btn) btn.disabled = false; });
    });
  }

  /* -------------------- HERO PARTICLES -------------------- */
  function spawnHeroParticles(){
    var cont = document.getElementById("heroPart"); if(!cont) return;
    var cfg = [
      {left:5,  dur:22, delay:0},  {left:12, dur:28, delay:3},
      {left:18, dur:25, delay:7},  {left:26, dur:31, delay:2},
      {left:35, dur:24, delay:9},  {left:44, dur:33, delay:4},
      {left:53, dur:27, delay:1},  {left:62, dur:35, delay:8},
      {left:71, dur:26, delay:5},  {left:79, dur:32, delay:2},
      {left:87, dur:29, delay:6},  {left:94, dur:36, delay:10}
    ];
    cfg.forEach(function(c){
      var s = document.createElement("span");
      s.style.left = c.left + "%";
      s.style.animationDuration = c.dur + "s";
      s.style.animationDelay   = c.delay + "s";
      cont.appendChild(s);
    });
  }

  /* -------------------- Lenis (optionnel, si chargé) -------------------- */
  function smooth(){
    if(REDUCE || typeof window.Lenis === "undefined") return;
    var lenis = new Lenis({ lerp: 0.09, duration: 1.3 });
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); } requestAnimationFrame(raf);
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener("click", function(e){ var id=a.getAttribute("href"); if(id.length<2) return; var t=document.querySelector(id); if(!t) return; e.preventDefault(); lenis.scrollTo(t); });
    });
  }

  function boot(){
    ageGate();
    var y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
    spawnHeroParticles();
    buildCuvees();
    buildDispo();
    imgFallbacks();
    marquee();
    header();
    mobileNav();
    reveals();
    parallax();
    lightCards();
    cursor();
    cinematic();
    contactForm();
    smooth();
    loader();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
