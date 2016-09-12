# pixel-map

Easy access to individual pixels in [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData).

```JavaScript
import PixelMap from 'pixel-map';

const imageData = new ImageData(100, 100);
const pix = new PixelMap(imageData);

// Access by row and column
pix.at(0, 0).r = 255;
pix.at(0, 0).g = 0;
pix.at(0, 0).b = 0;
pix.at(0, 0).a = 255;

// Access by index
pix.atIndex(0).r = 255;
pix.atIndex(0).g = 0;
pix.atIndex(0).b = 0;
pix.atIndex(0).a = 255;
```
