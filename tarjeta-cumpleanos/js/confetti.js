/**
 * Confeti para la apertura y repetición del álbum.
 * Sin dependencias externas. Respeta la configuración de movimiento reducido.
 */
export function initConfetti(canvas) {
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ctx=null,particles=[],frame=0,sized=false;
  function setup(){
    if(!canvas)return false;
    if(!ctx)ctx=canvas.getContext('2d',{alpha:true});
    return !!ctx;
  }
  const colors=['#f9a151','#f4d3a2','#f5f5ee','#77a7a1','#e8a962'];
  function resize(){
    if(!ctx)return;
    const d=Math.min(window.devicePixelRatio||1,1.25);
    canvas.width=Math.round(innerWidth*d);
    canvas.height=Math.round(innerHeight*d);
    canvas.style.width=innerWidth+'px';
    canvas.style.height=innerHeight+'px';
    ctx.setTransform(d,0,0,d,0,0);
    sized=true;
  }
  function stop(){
    cancelAnimationFrame(frame);frame=0;particles=[];
    if(ctx)ctx.clearRect(0,0,innerWidth,innerHeight);
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
  function burst({x=innerWidth/2,y=Math.min(innerHeight*.25,210),count}={}){
    if(reduce||!setup())return;
    if(!sized)resize();
    const limit=count??(innerWidth<600?40:65);
    for(let i=0;i<Math.min(80,limit);i++){
      const a=Math.random()*Math.PI*2,v=2+Math.random()*7;
      particles.push({
        x,y,
        vx:Math.cos(a)*v,vy:Math.sin(a)*v-3.8,
        rot:Math.random()*6.3,spin:(Math.random()-.5)*.17,
        w:3+Math.random()*5,h:4+Math.random()*8,
        life:44+Math.random()*35,color:colors[i%colors.length]
      });
    }
    if(!frame)frame=requestAnimationFrame(tick);
  }
  // No se reserva un canvas grande hasta que realmente haga falta.
  addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  return {burst,stop};
}
