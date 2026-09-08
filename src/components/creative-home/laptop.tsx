'use client';
import {useEffect,useRef,useState} from 'react';

export default function Laptop(){
 const host=useRef<HTMLDivElement>(null);
 const [status,setStatus]=useState('loading');
 useEffect(()=>{
  let cancelled=false;
  let dispose=()=>{};
  async function init(){
   const THREE=await import('three');
   const {RoundedBoxGeometry}=await import('three/addons/geometries/RoundedBoxGeometry.js');
   const {fitLaptopCamera}=await import('./laptop-framing');
   const {createExtraDevices}=await import('./extra-devices');
   const {loadSmileImage,drawSmileCrop}=await import('./smile-screen');
   if(cancelled||!host.current)return;
   const el=host.current;
   const renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'low-power'});
   renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
   renderer.setClearColor(0x101310,0);
   renderer.outputColorSpace=THREE.SRGBColorSpace;
   renderer.toneMapping=THREE.ACESFilmicToneMapping;
   renderer.toneMappingExposure=1.4;
   el.appendChild(renderer.domElement);
   renderer.domElement.setAttribute('aria-hidden','true');
   const scene=new THREE.Scene();
   const camera=new THREE.PerspectiveCamera(34,1,0.1,100);
   camera.position.set(0,3.7,11.8);camera.lookAt(0,1.5,0);
   scene.add(new THREE.HemisphereLight(0xe3f4d1,0x182014,3));
   const keyLight=new THREE.DirectionalLight(0xffffff,5);keyLight.position.set(-3,7,5);scene.add(keyLight);
   const rim=new THREE.DirectionalLight(0xc6ff83,4);rim.position.set(5,3,-3);scene.add(rim);
   const fill=new THREE.DirectionalLight(0x94abc1,2);fill.position.set(-5,1,0);scene.add(fill);
   const laptop=new THREE.Group();laptop.rotation.y=-.16;laptop.rotation.z=-.025;laptop.position.y=-.15;scene.add(laptop);
   const metal=new THREE.MeshStandardMaterial({color:0x596354,metalness:.82,roughness:.3});
   const edgeMetal=new THREE.MeshStandardMaterial({color:0x9ca693,metalness:.8,roughness:.23});
   const black=new THREE.MeshStandardMaterial({color:0x090d09,metalness:.25,roughness:.48});
   function box(w:number,h:number,d:number,r:number,mat:InstanceType<typeof THREE.Material>,x:number,y:number,z:number,parent=laptop){const mesh=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,3,r),mat);mesh.position.set(x,y,z);parent.add(mesh);return mesh;}
   box(6.55,.13,4.2,.065,metal,0,0,.55);
   box(6.51,.045,4.17,.02,edgeMetal,0,.074,.55);
   box(5.7,.025,1.85,.02,black,0,.103,-.14);
   const keyGeo=new RoundedBoxGeometry(.345,.045,.27,2,.027);
   const keyMat=new THREE.MeshStandardMaterial({color:0x141a12,metalness:.15,roughness:.7});
   const keys=new THREE.InstancedMesh(keyGeo,keyMat,70);const matrix=new THREE.Matrix4();
   for(let row=0;row<5;row++)for(let col=0;col<14;col++){matrix.makeTranslation(-2.66+col*.409,.145,-.85+row*.34);keys.setMatrixAt(row*14+col,matrix);}laptop.add(keys);
   box(2.15,.04,.22,.03,keyMat,0,.144,.9);
   box(2.24,.014,1.02,.05,black,0,.107,1.8);
   box(2.20,.016,.98,.045,metal,0,.117,1.8);
   box(.7,.018,.035,.007,black,0,.081,2.65);
   box(.1,.1,.44,.02,black,-3.28,-.01,-.65);
   box(.1,.075,.27,.02,black,-3.28,-.01,.02);
   const hinge=new THREE.Mesh(new THREE.CylinderGeometry(.11,.11,5.8,24),black);hinge.rotation.z=Math.PI/2;hinge.position.set(0,.1,-1.44);laptop.add(hinge);
   const lid=new THREE.Group();lid.position.set(0,.15,-1.45);lid.rotation.x=-.13;laptop.add(lid);
   box(6.55,4.05,.14,.1,metal,0,2.025,0,lid);
   box(6.36,3.89,.035,.07,black,0,2.035,.087,lid);
   const screenCanvas=document.createElement('canvas');screenCanvas.width=1600;screenCanvas.height=960;
   const ctx=screenCanvas.getContext('2d');if(!ctx)throw new Error('Canvas unavailable');
   const texture=new THREE.CanvasTexture(screenCanvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=renderer.capabilities.getMaxAnisotropy();
   const screen=new THREE.Mesh(new THREE.PlaneGeometry(6.1,3.66),new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));screen.position.set(0,2.05,.111);lid.add(screen);
   const cameraDot=new THREE.Mesh(new THREE.CircleGeometry(.018,16),new THREE.MeshBasicMaterial({color:0x536f47}));cameraDot.position.set(0,3.986,.112);lid.add(cameraDot);
   function rect(x:number,y:number,w:number,h:number,color:string,r=0){ctx!.fillStyle=color;ctx!.beginPath();ctx!.roundRect(x,y,w,h,r);ctx!.fill();}
   function text(t:string,x:number,y:number,size:number,color:string,font='monospace'){ctx!.fillStyle=color;ctx!.font=`${size}px ${font}`;ctx!.fillText(t,x,y);}
   function arrow(x:number,y:number,size:number,color:string){ctx!.save();ctx!.strokeStyle=color;ctx!.lineWidth=2;ctx!.beginPath();ctx!.moveTo(x,y+size);ctx!.lineTo(x+size,y);ctx!.moveTo(x,y);ctx!.lineTo(x+size,y);ctx!.lineTo(x+size,y+size);ctx!.stroke();ctx!.restore();}
   let smileImage:HTMLImageElement|null=null;
   let smileFailed=false;
   function drawScreen(blink:boolean){
    rect(0,0,1600,960,'#101710');rect(0,0,1600,55,'#252e23');
    ['#f78c79','#e9ce75','#b9ee87'].forEach((c,i)=>{ctx!.fillStyle=c;ctx!.beginPath();ctx!.arc(25+i*23,27,7,0,Math.PI*2);ctx!.fill();});
    text('waenweb / your-next-website',570,35,19,'#bcc7b3');
    rect(0,55,800,55,'#1d251b');text('⌘  index.tsx',28,90,22,'#c9efaa');text('styles.css',305,90,20,'#798b71');text('CODE',673,89,17,'#829876');
    rect(800,55,800,55,'#e6eadf');arrow(830,76,12,'#4e6540');text('smilegallery.clinic',859,90,19,'#4e6540');rect(1433,69,140,29,'#d1e5bc',7);text('PREVIEW',1453,90,17,'#476d2a');
    const lines:[string,string][]=[['// A new chapter for your business','#6a8c59'],['import { YourNextChapter }','#d7b9fb'],["  from '@waenweb/studio';",'#c5e294'],['',''],['export default function Website() {','#b2c9f8'],['  return (','#d7b9fb'],['    <YourNextChapter','#d8e3cd'],['      design="uniquely-yours"','#c5e294'],['      responsive={true}','#c5e294'],['      seo="ready-to-grow"','#c5e294'],['      craftedWith="care"','#c5e294'],['    >','#d8e3cd'],['      <YourIdeas />','#c5e294'],['      <OurCraft />','#c5e294'],['      <NewPossibilities />','#c5e294'],['    </YourNextChapter>','#d8e3cd'],['  );','#d7b9fb'],['}','#d7b9fb']];
    lines.forEach(([t,c],i)=>{text(String(i+1).padStart(2,' '),22,155+i*36,19,'#4b5b45');text(t,78,155+i*36,23,c);});
    if(blink)rect(96,747,13,27,'#d0f793');
    rect(22,838,752,65,'#1d2c17',7);text('✓  Build successful',48,877,23,'#bded8f');
    rect(0,927,800,33,'#2a4020');text('main*    ◇ 0 errors',23,950,18,'#bdd8a6');text('TypeScript   UTF-8',536,950,18,'#bdd8a6');
        rect(800,110,800,850,'#ffffff');
    if(smileImage)drawSmileCrop(ctx!,smileImage,800,110,800,850);
    else{text('Smile Gallery Clinic',860,330,34,'#233b71','Arial');text(smileFailed?'Preview unavailable':'Loading preview...',860,380,24,'#657089','Arial');}
rect(799,55,2,905,'#536646');texture.needsUpdate=true;
   }
   drawScreen(false);
   loadSmileImage(false).then(image=>{if(cancelled)return;smileImage=image;drawScreen(false);}).catch(()=>{if(!cancelled){smileFailed=true;drawScreen(false);}});
   const extra=createExtraDevices(THREE,metal,black);
   const bounds=new THREE.Box3().setFromObject(extra.group);
   const extraPoints:import('three').Vector3[]=[];
   for(const x of [bounds.min.x,bounds.max.x])for(const y of [bounds.min.y,bounds.max.y])for(const z of [bounds.min.z,bounds.max.z])extraPoints.push(new THREE.Vector3(x,y,z));
   laptop.add(extra.group);
   // Keep atmospheric light in the CSS background, outside the WebGL crop.
   const resize=()=>{const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;renderer.setSize(w,h);fitLaptopCamera(camera,w/h,extraPoints,window.innerWidth<=600);};
   const ro=new ResizeObserver(resize);ro.observe(el);resize();
   let visible=true;const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;});observer.observe(el);
   const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
   let targetY=-.16,targetX=0,drag=false,startX=0,startY=0,baseY=0,baseX=0,frame=0,lastBlink=-1;
   const down=(e:PointerEvent)=>{if(e.button!==0)return;drag=true;startX=e.clientX;startY=e.clientY;baseY=targetY;baseX=targetX;el.setPointerCapture(e.pointerId);};
   const move=(e:PointerEvent)=>{if(!drag)return;targetY=Math.max(-.7,Math.min(.7,baseY+(e.clientX-startX)*.004));targetX=Math.max(-.13,Math.min(.14,baseX+(e.clientY-startY)*.002));};
   const up=()=>{drag=false;};
   const key=(e:KeyboardEvent)=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home'){targetY=-.16;targetX=0;}else if(e.key==='ArrowLeft')targetY=Math.max(-.7,targetY-.1);else if(e.key==='ArrowRight')targetY=Math.min(.7,targetY+.1);else if(e.key==='ArrowUp')targetX=Math.max(-.13,targetX-.05);else targetX=Math.min(.14,targetX+.05);};
   const lost=(e:Event)=>{e.preventDefault();setStatus('error');};
   el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('keydown',key);renderer.domElement.addEventListener('webglcontextlost',lost);
   const animate=(time:number)=>{frame=requestAnimationFrame(animate);if(!visible||document.hidden)return;const idle=reduced.matches?0:Math.sin(time*.00055)*.028;laptop.rotation.y+=(targetY+idle-laptop.rotation.y)*.075;laptop.rotation.x+=(targetX-laptop.rotation.x)*.075;laptop.position.y=-.15+(reduced.matches?0:Math.sin(time*.001)*.04);const blink=reduced.matches?0:Math.floor(time/650)%2;if(blink!==lastBlink){drawScreen(!!blink);lastBlink=blink;}renderer.render(scene,camera);};frame=requestAnimationFrame(animate);setStatus('ready');
   dispose=()=>{cancelAnimationFrame(frame);ro.disconnect();observer.disconnect();el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);el.removeEventListener('keydown',key);renderer.domElement.removeEventListener('webglcontextlost',lost);extra.group.removeFromParent();extra.dispose();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});texture.dispose();renderer.dispose();renderer.domElement.remove();};
  }
  init().catch(()=>{if(!cancelled)setStatus('error');});
  return()=>{cancelled=true;dispose();};
 },[]);
 return <div ref={host} className="laptop-canvas" tabIndex={0} role="group" aria-label="โน้ตบุ๊ก แท็บเล็ต และมือถือ 3 มิติ หน้าจอโน้ตบุ๊กซ้ายแสดงโค้ด ขวาแสดงเว็บไซต์ ลากหรือใช้ปุ่มลูกศรเพื่อหมุน กด Home เพื่อคืนมุมเริ่มต้น">{status!=='ready'&&<div className="laptop-fallback" role="status"><p>{status==='loading'?'กำลังเตรียมโมเดล 3 มิติ…':'อุปกรณ์นี้ไม่สามารถแสดงโมเดล 3 มิติได้ กรุณาลองเบราว์เซอร์ที่รองรับ WebGL'}</p></div>}</div>;
}
