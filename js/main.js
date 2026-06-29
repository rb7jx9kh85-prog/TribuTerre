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
    { name:"Terre Rouge", famille:"rouge", cepage:"Blend", format:"75 cl", dark:true,
      desc:"La cuvée phare. Étiquette noire, TT rouge gaufré.", origin:"Vin du Valais", img:"assets/TerreRouge.webp" },
    { name:"Terre N° 13", famille:"rouge", cepage:"Merlot", format:"75 cl",
      desc:"Merlot. Droit, élevé sans détour.", origin:"Vin de pays Suisse", img:"assets/TerreN13.webp" },
    { name:"Vieilles Vignes Gamay", famille:"rouge", cepage:"Gamay", format:"75 cl",
      desc:"Vieilles vignes, petits rendements, beaucoup de fruit.", origin:"Vin de pays Suisse", img:"assets/VieillesVignesGamay.webp" },
    { name:"Terre d'Automne", famille:"rouge", cepage:"Blend rouge", format:"75 cl",
      desc:"L'assemblage de saison de la maison.", origin:"Vin de table", img:"assets/TerreDAutomne.webp" },
    { name:"Merlot Prestige", famille:"prestige", cepage:"Merlot", format:"75 cl", dark:true,
      desc:"La cuvée haut de gamme. Étiquette noire.", origin:"Cuvée prestige", img:"assets/MerlotPrestige.webp" },
    { name:"Terre de Rosée", famille:"rose", cepage:"Blend rosé", format:"50 cl",
      desc:"Bouteille longue, capsule grège. 13 % vol.", origin:"Vin de pays Suisse", img:"assets/TerreDeRose.webp" },
    { name:"Terre Blanche", famille:"blanc", cepage:"Blend blanc", format:"75 cl", dark:true,
      desc:"L'assemblage blanc de la maison. TT vert.", origin:"Vin de pays Suisse", img:"assets/TerreBlanche.webp" },
    { name:"L'Ardoisière", famille:"blanc", cepage:"Blend blanc", format:"75 cl",
      desc:"Né du terroir ardoisier de Leytron. TT vert.", origin:"Vin de pays Suisse", img:"assets/LArdoisiere.webp" }
  ];
  window.TT_CUVEES = CUVEES;

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
    if(hero) requestAnimationFrame(function(){ hero.classList.add("intro-in"); });
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
          '<h3>'+c.name+'</h3>'+
          '<p class="cuvee-cepage">'+c.famille.toUpperCase()+' · '+c.cepage+'</p>'+
          '<p class="cuvee-desc">'+c.desc+'</p>'+
          '<p class="cuvee-meta">'+c.origin+' · '+c.format+'</p>';
        frag.appendChild(card);
      });
      host.appendChild(frag);
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
    var y = document.getElementById("year"); if(y) y.textContent = new Date().getFullYear();
    buildCuvees();
    imgFallbacks();
    marquee();
    header();
    mobileNav();
    reveals();
    parallax();
    lightCards();
    cursor();
    smooth();
    loader();
  }
  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot); else boot();
})();
