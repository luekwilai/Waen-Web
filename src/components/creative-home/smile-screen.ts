const images = new Map<boolean, Promise<HTMLImageElement>>();

export function loadSmileImage(mobile: boolean): Promise<HTMLImageElement> {
  let image = images.get(mobile);
  if (!image) {
    image = new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image();
      element.onload = () => resolve(element);
      element.onerror = () => { images.delete(mobile); reject(new Error('Smile Gallery preview unavailable')); };
      element.src = mobile ? '/creative-home/images/smile-mobile.jpg' : '/creative-home/images/smile-desktop.jpg';
    });
    images.set(mobile, image);
  }
  return image;
}

export function drawSmileCrop(ctx: CanvasRenderingContext2D, image: HTMLImageElement, x: number, y: number, width: number, height: number) {
  const sourceTop = image.src.includes('smile-mobile.jpg') ? Math.round(image.naturalWidth * .09) : 0;
  const sourceHeight = Math.min(image.naturalHeight-sourceTop, image.naturalWidth * height / width);
  const sourceWidth = Math.min(image.naturalWidth, sourceHeight * width / height);
  ctx.drawImage(image, 0, sourceTop, sourceWidth, sourceHeight, x, y, width, height);
}
