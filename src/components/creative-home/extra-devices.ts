import type * as Three from 'three';
import { loadSmileImage, drawSmileCrop } from './smile-screen';

type DeviceMaterial = Three.MeshStandardMaterial;

export function createExtraDevices(
  THREE: typeof import('three'),
  metal: DeviceMaterial,
  black: DeviceMaterial,
): { group: Three.Group; dispose: () => void } {
  const group = new THREE.Group();
  const geometries: Three.BufferGeometry[] = [];
  const materials: Three.Material[] = [];
  const textures: Three.Texture[] = [];
  let disposed = false;

  const rounded = (width: number, height: number, depth: number, radius: number) => {
    const r=Math.min(radius,width/2,height/2), outline=new THREE.Shape();
    outline.absarc(width/2-r,height/2-r,r,0,Math.PI/2,false);
    outline.absarc(-width/2+r,height/2-r,r,Math.PI/2,Math.PI,false);
    outline.absarc(-width/2+r,-height/2+r,r,Math.PI,Math.PI*1.5,false);
    outline.absarc(width/2-r,-height/2+r,r,Math.PI*1.5,Math.PI*2,false);
    outline.closePath();
    const geometry = new THREE.ExtrudeGeometry(outline,{depth,bevelEnabled:false,curveSegments:10});
    geometry.translate(0,0,-depth/2);
    geometries.push(geometry);
    return geometry;
  };

  const addLabel = (context: CanvasRenderingContext2D, value: string, y: number, size: number, color: string, canvasWidth: number) => {
    const scale = canvasWidth / 560;
    context.fillStyle = color;
    context.font = `600 ${size * scale}px Arial, sans-serif`;
    context.textAlign = 'center';
    context.fillText(value, canvasWidth / 2, y * scale);
    context.textAlign = 'start';
  };

  const drawLoadingScreen = (canvas: HTMLCanvasElement, mobile: boolean, message: string) => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const width = canvas.width;
    const height = canvas.height;
    const scale = width / (mobile ? 420 : 560);
    context.clearRect(0, 0, width, height);
    context.save();
    context.beginPath();
    context.roundRect(0, 0, width, height, (mobile ? 40 : 34) * scale);
    context.clip();
    context.fillStyle = '#f7f4ef';
    context.fillRect(0, 0, width, height);
    context.fillStyle = '#24342d';
    context.fillRect(0, 0, width, 58 * scale);
    addLabel(context, 'Smile Gallery Clinic', 36, mobile ? 14 : 16, '#f6eee2', width);
    context.fillStyle = '#d8b98e';
    context.beginPath();
    context.arc(width / 2, height * 0.43, 24 * scale, 0, Math.PI * 2);
    context.fill();
    addLabel(context, message, height / scale * 0.52, mobile ? 13 : 15, '#53635b', width);
    context.restore();
  };

  const drawPhoneChrome = (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (!context) return;
    const scale = canvas.width / 420;
    context.save();
    context.beginPath();
    context.roundRect(0, 0, canvas.width, canvas.height, 40 * scale);
    context.clip();
    context.fillStyle = '#111315';
    context.beginPath();
    context.roundRect(canvas.width * 0.29, 15 * scale, canvas.width * 0.42, 28 * scale, 15 * scale);
    context.fill();
    context.fillStyle = '#111315';
    context.beginPath();
    context.roundRect(canvas.width * 0.32, canvas.height - 28 * scale, canvas.width * 0.36, 5 * scale, 3 * scale);
    context.fill();
    context.restore();
  };

  const addDevice = (width: number, height: number, x: number, y: number, z: number, rotationY: number, rotationZ: number, mobile: boolean) => {
    const device = new THREE.Group();
    device.position.set(x, y, z);
    device.rotation.set(0, rotationY, rotationZ);
    group.add(device);

    const bodyMaterial = metal.clone();
    bodyMaterial.color.set(mobile ? 0x64656a : 0xc3c7cd);
    bodyMaterial.roughness = 0.28;
    const bezelMaterial = black.clone();
    materials.push(bodyMaterial, bezelMaterial);

    device.add(new THREE.Mesh(rounded(width, height, 0.13, 0.12), bodyMaterial));
    const bezel = new THREE.Mesh(rounded(width - 0.13, height - 0.13, 0.045, 0.08), bezelMaterial);
    bezel.position.z = 0.078;
    device.add(bezel);

    const canvas = document.createElement('canvas');
    canvas.width = mobile ? 840 : 1120;
    canvas.height = mobile ? 1722 : 1680;
    drawLoadingScreen(canvas, mobile, 'Loading Smile Gallery Clinic…');
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    textures.push(texture);
    const screenMaterial = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false, transparent:true });
    materials.push(screenMaterial);
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(width - 0.18, height - 0.18), screenMaterial);
    geometries.push(screen.geometry);
    screen.position.z = 0.108;
    device.add(screen);
    const button=new THREE.Mesh(rounded(.035,.28,.06,.015),bodyMaterial);
    button.position.set(width/2+.012,height*.18,0);device.add(button);

    if (!mobile) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.018, 12, 8), bezelMaterial);
      dot.position.set(0, height / 2 - 0.045, 0.11);
      device.add(dot);
      geometries.push(dot.geometry);
    }

    void loadSmileImage(mobile).then((image) => {
      if (disposed) return;
      const context = canvas.getContext('2d');
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.save();
      context.beginPath();
      context.roundRect(0, 0, canvas.width, canvas.height, (mobile ? 40 : 34) * (canvas.width / (mobile ? 420 : 560)));
      context.clip();
      context.fillStyle='#ffffff';context.fillRect(0,0,canvas.width,canvas.height);
      const safeArea = mobile ? 58 * (canvas.width / 420) : 0;
      drawSmileCrop(context, image, 0, safeArea, canvas.width, canvas.height - safeArea);
      context.restore();
      if (mobile) drawPhoneChrome(canvas);
      texture.needsUpdate = true;
    }).catch(() => {
      if (disposed) return;
      drawLoadingScreen(canvas, mobile, 'Smile Gallery Clinic unavailable');
      if (mobile) drawPhoneChrome(canvas);
      texture.needsUpdate = true;
    });
  };

  addDevice(2.1, 2.9, 3.25, 1.8, 0.8, -0.22, -0.06, false);
  addDevice(1, 2.05, 4.15, 0.8, 2, -0.2, 0.05, true);

  return {
    group,
    dispose: () => {
      disposed = true;
      group.removeFromParent();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      textures.forEach((texture) => texture.dispose());
    },
  };
}

export default createExtraDevices;
