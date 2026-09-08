import {Euler,PerspectiveCamera,Vector3} from 'three';

export const laptopFramingPoints:Vector3[]=[];
// Bound the thin chassis and tilted lid separately, avoiding empty space
// above the trackpad that would unnecessarily shrink the entire model.
for(const x of [-3.4,3.4])for(const y of [-.12,.22])for(const z of [-1.6,2.8]){
 laptopFramingPoints.push(new Vector3(x,y,z));
}
for(const x of [-3.3,3.3])for(const y of [0,4.1])for(const z of [-.09,.14]){
 laptopFramingPoints.push(new Vector3(x,y,z).applyEuler(new Euler(-.13,0,0)).add(new Vector3(0,.15,-1.45)));
}
// Include the entire lid, chassis, ports and idle float at every allowed pose.
export function fitLaptopCamera(camera:PerspectiveCamera,aspect:number,extraPoints:Vector3[]=[],mobile=false){
 const target=new Vector3(extraPoints.length ? .65 : 0,1.6,0);
 const towardCamera=new Vector3(0,.2,1).normalize();
 const right=new Vector3(1,0,0);
 const up=new Vector3().crossVectors(towardCamera,right);
 const tanVertical=Math.tan(camera.fov*Math.PI/360)*.97;
 const tanHorizontal=tanVertical*aspect;
 let distance=0;
 for(let yaw=-.7;yaw<=.701;yaw+=.175){
  for(const pitch of [-.13,0,.14]){
   const pose=new Euler(pitch,yaw,-.025);
   for(const corner of [...laptopFramingPoints,...extraPoints]){
    const point=corner.clone().applyEuler(pose);
    point.y-=.11;point.sub(target);
    distance=Math.max(distance,point.dot(towardCamera)+Math.max(Math.abs(point.dot(right))/tanHorizontal,Math.abs(point.dot(up))/tanVertical));
   }
  }
 }
 camera.aspect=aspect;
 camera.zoom=mobile ? .98 : 1.4;
 camera.position.copy(target).addScaledVector(towardCamera,distance);
 camera.lookAt(target);
 camera.updateProjectionMatrix();
 camera.updateMatrixWorld();
}
