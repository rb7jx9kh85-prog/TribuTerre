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
      origin:"Vin de table · MMXXII", format:"75 cl", prix:"CHF 19.–", img:"assets/TerreBlanche.webp" },
    { name:"L'Ardoisière", type:"Blanc · Assemblage", famille:"blanc",
      desc:"Née du terroir ardoisier de Leytron. Un blanc tendu et lumineux, sur la pierre et les agrumes, à la finale précise.",
      origin:"Vin de pays", format:"75 cl", prix:"CHF 17.–", img:"assets/LArdoisiere.webp" },
    { name:"Orange 2.4", type:"Orange · Macération", famille:"orange",
      desc:"Macération pelliculaire longue, fermentation spontanée. Robe ambrée, nez complexe et généreux, bouche ample, texturée, à la finale légèrement tannique. Un vin vivant, nature.",
      origin:"VDT nature", format:"50 cl", prix:"CHF 24.–", img:null },
    { name:"Terre de Rosée", type:"Rosé · Assemblage", famille:"rose",
      desc:"Belle robe saumonée. Nez expressif, ouvert, printanier. Bouche puissante, fruitée et florale, ronde, sur les fruits à noyaux (brugnon, mirabelle). Finale gourmande.",
      origin:"VPD · 2024 · 13 % vol", format:"50 cl", prix:"CHF 15.–", img:"assets/TerreDeRose.webp" },
    { name:"Vieilles Vignes Gamay", type:"Rouge · Gamay", famille:"rouge",
      desc:"Robe rubis, grand nez sur la griotte et la pivoine. Bouche ciselée, précise, sapide et aérienne, aux nuances de violette et de fraise des bois. Finale élégante aux tanins délicats.",
      origin:"AOC Leytron", format:"75 cl", prix:"CHF 18.–", img:"assets/VieillesVignesGamay.webp" },
    { name:"Terre d'Automne", type:"Rouge · Assemblage", famille:"rouge",
      desc:"L'assemblage de saison de la maison. Un rouge généreux, sur le fruit mûr et la rondeur, à partager sans façon.",
      origin:"Vin de table", format:"75 cl", prix:"CHF 16.–", img:"assets/TerreDAutomne.webp" },
    { name:"Terre N° 13", type:"Rouge · Merlot", famille:"rouge",
      desc:"Merlot droit, élevé sans détour. Fruit noir, profondeur et trame sobre, pour un vin franc et de caractère.",
      origin:"Vin de pays · 2023", format:"75 cl", prix:"CHF 21.–", img:"assets/TerreN13.webp" },
    { name:"Terre Rouge", type:"Rouge · Assemblage", famille:"rouge", dark:true,
      desc:"Nez intense et ouvert sur le cacao, le kirsch et la vanille. Bouche souple, caressante, pure, à la concentration certaine. Bel élevage discret, longue finale aux tanins fins et intégrés.",
      origin:"Valais · MMXXII", format:"75 cl", prix:"CHF 25.–", img:"assets/TerreRouge.webp" },
    { name:"Merlot Prestige", type:"Rouge · Merlot", famille:"prestige", dark:true,
      desc:"La cuvée haut de gamme. Un merlot d'élevage patient, dense et raffiné, à la trame serrée et à la longue finale boisée.",
      origin:"Prestige · 2022", format:"75 cl", prix:"CHF 32.–", img:"assets/MerlotPrestige.webp" }
  ];
  window.TT_CUVEES = CUVEES;

  /* -------------------- vins disponibles (petites cartes) -------------------- */
  var DISPO = [
    { name:"Fendant",        info:"AOC · 2025 · 75 cl",          prix:"CHF 14.–", famille:"blanc",  img:null },
    { name:"Terre Blanche",  info:"VDT · MMXXII · 75 cl",        prix:"CHF 19.–", famille:"blanc",  img:"assets/TerreBlanche.webp" },
    { name:"Orange 2.4",     info:"VDT nature · 50 cl",          prix:"CHF 24.–", famille:"orange", img:null },
    { name:"Terre de Rosée", info:"VPD · 2024 · 50 cl",          prix:"CHF 15.–", famille:"rose",   img:"assets/TerreDeRose.webp" },
    { name:"Le Gamay",       info:"AOC Leytron · 2025 · 75 cl",  prix:"CHF 18.–", famille:"rouge",  img:"assets/VieillesVignesGamay.webp" },
    { name:"Terre N° 13",    info:"Merlot · VDP 2023 · 75 cl",   prix:"CHF 21.–", famille:"rouge",  img:"assets/TerreN13.webp" },
    { name:"Terre Rouge",    info:"MMXXII · 75 cl",              prix:"CHF 25.–", famille:"rouge",  img:"assets/TerreRouge.webp" },
    { name:"Merlot Prestige",info:"2022 · 75 cl",                prix:"CHF 32.–", famille:"rouge",  img:"assets/MerlotPrestige.webp" }
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

  /* -------------------- HERO : vidéo + proposition de valeur -> logo sur fond noir animé -------------------- */
  function heroVideos(hero){
    var v1 = document.getElementById("heroV1");
    var cap = document.getElementById("heroCaption");
    function captionIn(){
      if(!cap) return;
      // apparition mot à mot, cadence cinématique
      cap.querySelectorAll(".w").forEach(function(w, i){
        w.style.transitionDelay = (0.45 + i * 0.09).toFixed(2) + "s";
      });
      requestAnimationFrame(function(){ cap.classList.add("show"); });
    }
    function runClip(v, onDone){
      if(!v){ onDone(); return; }
      var done=false, MAX=6500, played=false;
      function fin(){ if(done) return; done=true; onDone(); }
      v.addEventListener("ended", fin, { once:true });
      v.addEventListener("error", function(){ setTimeout(fin, 250); }, { once:true });
      v.addEventListener("playing", function(){ played=true; }, { once:true });
      var p = v.play && v.play(); if(p && p.catch) p.catch(function(){});
      // injouable (autoplay bloqué / codec absent) -> on laisse la phrase se révéler sur le fond animé
      setTimeout(function(){ if(!done && !played) fin(); }, 4500);
      // borne haute : l'intro ne traîne jamais, même sur une vidéo longue
      setTimeout(fin, MAX);
    }
    function phase1(){ if(v1) v1.classList.add("is-on"); captionIn(); runClip(v1, phase2); }
    function phase2(){
      if(cap) cap.classList.remove("show");
      if(v1) v1.classList.remove("is-on");
      requestAnimationFrame(function(){ hero.classList.add("intro-in"); });
    }
    if(REDUCE){ phase2(); return; }
    phase1();
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
        var dark = c.dark || c.famille === "rouge" || c.famille === "prestige";
        if(dark) card.setAttribute("data-dark","true");
        var num = (n<10?"0":"")+n;
        card.innerHTML =
          '<span class="cuvee-num">Cuvée '+num+'</span>'+
          '<figure class="cuvee-fig"><img loading="lazy" alt="'+c.name+'" src="'+c.img+'" data-fallback="bottle" data-famille="'+c.famille+'" data-dark="'+(dark?'true':'false')+'"></figure>'+
          '<div class="cuvee-body">'+
            '<h3>'+c.name+'</h3>'+
            '<p class="cuvee-type">'+c.type+'</p>'+
            '<p class="cuvee-desc">'+c.desc+'</p>'+
            (c.prix ? '<p class="cuvee-prix">'+c.prix+'</p>' : '')+
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
        '<div class="dispo-info"><h4>'+d.name+'</h4><p>'+d.info+'</p>'+
        (d.prix ? '<p class="dispo-prix">'+d.prix+'</p>' : '')+'</div>';
      frag.appendChild(card);
    });
    host.appendChild(frag);
  }


  /* -------------------- AGE GATE -------------------- */
  function ageGate(onPassed){
    // mémoire navigateur : ne redemande pas l'âge à chaque visite
    try {
      if(localStorage.getItem("tt_age_ok") === "1"){ if(onPassed) onPassed(); return; }
    } catch(e){}
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
      try { localStorage.setItem("tt_age_ok","1"); } catch(e){}
      overlay.style.opacity = "0";
      document.body.classList.remove("is-locked");
      setTimeout(function(){ overlay.remove(); }, 520);
      if(onPassed) setTimeout(onPassed, 900);
    });
    overlay.querySelector(".age-gate__no").addEventListener("click", function(){
      window.location.href = "https://www.ch.ch/fr/alcool/";
    });
  }

  /* -------------------- POP-UP nouveauté (une seule fois par navigateur) -------------------- */
  // attend la fin de l'intro cinématique avant d'afficher la pop-up
  function newsPopupDeferred(){
    var hero = document.querySelector(".hero[data-intro]");
    if(!hero){ newsPopup(); return; }
    var shown = false;
    function tryShow(){ if(shown) return; shown = true; setTimeout(newsPopup, 1400); }
    var iv = setInterval(function(){
      if(hero.classList.contains("intro-in")){ clearInterval(iv); tryShow(); }
    }, 250);
    setTimeout(function(){ clearInterval(iv); tryShow(); }, 10000);
  }
  function newsPopup(){
    try { if(localStorage.getItem("tt_news_seen") === "1") return; } catch(e){}
    var pop = document.createElement("div");
    pop.className = "news-pop";
    pop.setAttribute("role","dialog");
    pop.setAttribute("aria-modal","true");
    pop.setAttribute("aria-labelledby","np-title");
    pop.innerHTML =
      '<div class="news-pop__card">'+
        '<button class="news-pop__close" type="button" aria-label="Fermer">&#215;</button>'+
        '<img src="assets/tt-mark.png" alt="" aria-hidden="true" class="news-pop__mark">'+
        '<p class="news-pop__kicker">Nouveauté</p>'+
        '<h3 class="news-pop__title" id="np-title">Terre Blanche · Terre Rouge</h3>'+
        '<p class="news-pop__text">Découvrez la nouvelle identité du domaine : Terre Blanche, Terre Rouge, deux expressions du terroir sous l\'Ardevaz.</p>'+
        '<a href="index.html#terres" class="news-pop__cta" data-cursor>Découvrir</a>'+
      '</div>';
    document.body.appendChild(pop);
    try { localStorage.setItem("tt_news_seen","1"); } catch(e){}
    requestAnimationFrame(function(){ pop.classList.add("is-in"); });
    function close(){ pop.classList.remove("is-in"); setTimeout(function(){ pop.remove(); }, 450); }
    pop.querySelector(".news-pop__close").addEventListener("click", close);
    pop.addEventListener("click", function(e){ if(e.target === pop) close(); });
    pop.querySelector(".news-pop__cta").addEventListener("click", function(e){
      var t = document.getElementById("terres");
      if(t){ e.preventDefault(); close(); setTimeout(function(){ t.scrollIntoView({ behavior:"smooth" }); }, 320); }
      else close();
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
    ageGate(newsPopupDeferred);
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
    contactForm();
    smooth();
    loader();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
