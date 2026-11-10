/**
 * Confeti para la apertura y repetición del álbum.
 * Sin dependencias externas. Respeta la configuración de movimiento reducido.
 */
export function initConfetti(canvas) {
  const ctx=canvas?.getContext('2d');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!ctx) return {burst(){},stop(){}};
  let particles=[],frame=0;
  const colors=['#f9a151','#f4d3a2','#f5f5ee','#77a7a1','#e8a962'];
  function resize(){
    const d=Math.min(window.devicePixelRatio||1,2);
    canvas.width=Math.round(innerWidth*d);
    canvas.height=Math.round(innerHeight*d);
    canvas.style.width=innerWidth+'px';
    canvas.style.height=innerHeight+'px';
    ctx.setTransform(d,0,0,d,0,0);
  }
  function stop(){
    cancelAnimationFrame(frame);frame=0;particles=[];
    ctx.clearRect(0,0,innerWidth,innerHeight);
  }
  function tick(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    particles=particles.filter(p=>p.life>0&&p.y<innerHeight+35);
    for(const p of particles){
      p.life--;p.vy+=.10;p.x+=p.vx;p.y+=p.vy;p.rot+=p.spin;
      ctx.save();ctx.globalAlpha=Math.min(1,p.life/43);
      ctx.translate(p.x,p.y);ctx.rotate(p.rot);
      ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
    }
    if(particles.length)frame=requestAnimationFrame(tick);
    else{frame=0;ctx.clearRect(0,0,innerWidth,innerHeight)}
  }
  function burst(){
    if(reduce)return;
    for(let i=0;i<130;i++){
      const a=Math.random()*Math.PI*2,v=2+Math.random()*7;
      particles.push({
        x:innerWidth/2,y:Math.min(innerHeight*.25,210),
        vx:Math.cos(a)*v,vy:Math.sin(a)*v-3.8,
        rot:Math.random()*6.3,spin:(Math.random()-.5)*.17,
        w:3+Math.random()*6,h:4+Math.random()*11,
        life:75+Math.random()*75,color:colors[i%colors.length]
      });
    }
    if(!frame)frame=requestAnimationFrame(tick);
  }
  resize();
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  return {burst,stop};
}
