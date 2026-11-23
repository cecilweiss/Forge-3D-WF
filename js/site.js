document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
const toggle=document.querySelector(".nav-toggle"),nav=document.querySelector(".nav");
if(toggle&&nav){toggle.addEventListener("click",()=>{const opened=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(opened));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));}
// Todos os vídeos: primeira reprodução automática uma única vez ao entrar na tela;
// mouse sobre o vídeo reinicia; em telas touch, um toque no vídeo reinicia.
document.querySelectorAll("video").forEach(video=>{
 video.loop=false; video.autoplay=false; video.muted=true; video.playsInline=true;
 let firstPlayed=false;
 const playFromStart=()=>{try{video.currentTime=0;const p=video.play();if(p&&p.catch)p.catch(()=>{});}catch(e){}};
 const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting&&!firstPlayed){firstPlayed=true;playFromStart();}})},{threshold:.35});
 observer.observe(video);
 video.addEventListener("mouseenter",()=>{if(firstPlayed)playFromStart();});
 video.addEventListener("touchstart",()=>{if(firstPlayed)playFromStart();},{passive:true});
 const replay=video.parentElement.querySelector(".replay");if(replay)replay.addEventListener("click",playFromStart);
});