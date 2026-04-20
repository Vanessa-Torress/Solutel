const { Jimp, intToRGBA } = require('jimp');

async function fixLogo() {
  try {
    const image = await Jimp.read('public/logo.jpg');
    console.log('Image read successfully. Size:', image.bitmap.width, 'x', image.bitmap.height);
    
    // In jimp v1, the color management might be different. Let's just scan through the pixels.
    const w = image.bitmap.width;
    const h = image.bitmap.height;
    
    const bgPixelIndex = 0;
    const bgR = image.bitmap.data[bgPixelIndex + 0];
    const bgG = image.bitmap.data[bgPixelIndex + 1];
    const bgB = image.bitmap.data[bgPixelIndex + 2];
    
    console.log('Top left pixel is R:', bgR, 'G:', bgG, 'B:', bgB);
    
    const tolerance = 30; // tolerance for color matching
    
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const idx = (w * y + x) << 2;
        const r = image.bitmap.data[idx + 0];
        const g = image.bitmap.data[idx + 1];
        const b = image.bitmap.data[idx + 2];
        const a = image.bitmap.data[idx + 3];
        
        if (
          Math.abs(r - bgR) < tolerance &&
          Math.abs(g - bgG) < tolerance &&
          Math.abs(b - bgB) < tolerance
        ) {
          // Set alpha to 0 for background
          image.bitmap.data[idx + 3] = 0;
        }
      }
    }
    
    await image.write('public/logo.png');
    console.log('Successfully saved to public/logo.png');
  } catch (error) {
    console.error('Error:', error);
  }
}

fixLogo();
