const PixelMap = require('pixel-map');
const testImage = require('file!test/test_image.png');

describe('PixelMap', function() {

  it('gets correct pixels by row and column', function(done) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixMap = new PixelMap(imageData);

      const tl = pixMap.at(0, 0);
      expect([tl.r, tl.g, tl.b, tl.a]).to.eql([255, 0, 0, 255]);

      const tr = pixMap.at(0, pixMap.width - 1);
      expect([tr.r, tr.g, tr.b, tr.a]).to.eql([0, 255, 0, 255]);

      const bl = pixMap.at(pixMap.height - 1, 0);
      expect([bl.r, bl.g, bl.b, bl.a]).to.eql([0, 0, 255, 255]);

      const br = pixMap.at(pixMap.height - 1, pixMap.width - 1);
      expect([br.r, br.g, br.b, br.a]).to.eql([255, 255, 0, 255]);

      done();
    };

    img.src = testImage;
  });

  it('gets correct pixels by index', function(done) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.onload = () => {
      canvas.height = img.height;
      canvas.width = img.width;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const pixMap = new PixelMap(imageData);

      const tl = pixMap.atIndex(0);
      expect([tl.r, tl.g, tl.b, tl.a]).to.eql([255, 0, 0, 255]);

      const tr = pixMap.atIndex(2);
      expect([tr.r, tr.g, tr.b, tr.a]).to.eql([0, 255, 0, 255]);

      const bl = pixMap.atIndex(8);
      expect([bl.r, bl.g, bl.b, bl.a]).to.eql([0, 0, 255, 255]);

      const br = pixMap.atIndex(10);
      expect([br.r, br.g, br.b, br.a]).to.eql([255, 255, 0, 255]);

      done();
    };

    img.src = testImage;
  });

  it('sets correct pixels by row and column', function() {
    const imageData = new ImageData(2, 2);
    const pixMap = new PixelMap(imageData);

    // Top left
    pixMap.at(0, 0).r = 255;
    pixMap.at(0, 0).g = 0;
    pixMap.at(0, 0).b = 0;
    pixMap.at(0, 0).a = 255;

    // Top right
    pixMap.at(0, 1).r = 0;
    pixMap.at(0, 1).g = 255;
    pixMap.at(0, 1).b = 0;
    pixMap.at(0, 1).a = 255;

    // Bottom left
    pixMap.at(1, 0).r = 0;
    pixMap.at(1, 0).g = 0;
    pixMap.at(1, 0).b = 255;
    pixMap.at(1, 0).a = 255;

    // Bottom right
    pixMap.at(1, 1).r = 255;
    pixMap.at(1, 1).g = 255;
    pixMap.at(1, 1).b = 255;
    pixMap.at(1, 1).a = 255;

    expect(Array.prototype.slice.call(imageData.data)).to.eql([
      255, 0, 0, 255, // Top left
      0, 255, 0, 255, // Top right
      0, 0, 255, 255, // Bottom left
      255, 255, 255, 255 // Bottom right
    ]);
  });

  it('sets correct pixels by index', function() {
    const imageData = new ImageData(2, 2);
    const pixMap = new PixelMap(imageData);

    // Top left
    pixMap.atIndex(0).r = 255;
    pixMap.atIndex(0).g = 0;
    pixMap.atIndex(0).b = 0;
    pixMap.atIndex(0).a = 255;

    // Top right
    pixMap.atIndex(1).r = 0;
    pixMap.atIndex(1).g = 255;
    pixMap.atIndex(1).b = 0;
    pixMap.atIndex(1).a = 255;

    // Bottom left
    pixMap.atIndex(2).r = 0;
    pixMap.atIndex(2).g = 0;
    pixMap.atIndex(2).b = 255;
    pixMap.atIndex(2).a = 255;

    // Bottom right
    pixMap.atIndex(3).r = 255;
    pixMap.atIndex(3).g = 255;
    pixMap.atIndex(3).b = 255;
    pixMap.atIndex(3).a = 255;

    expect(Array.prototype.slice.call(imageData.data)).to.eql([
      255, 0, 0, 255, // Top left
      0, 255, 0, 255, // Top right
      0, 0, 255, 255, // Bottom left
      255, 255, 255, 255 // Bottom right
    ]);
  });

  it('checks bounds for accesses by row and column', function() {
    const imageData = new ImageData(2, 2);
    const pixMap = new PixelMap(imageData);

    expect(pixMap.at.bind(pixMap, -1, 0)).to.throw(RangeError, /Pixel index out of bounds/);
    expect(pixMap.at.bind(pixMap, 0, -1)).to.throw(RangeError, /Pixel index out of bounds/);
    expect(pixMap.at.bind(pixMap, 0, 3)).to.throw(RangeError, /Pixel index out of bounds/);
    expect(pixMap.at.bind(pixMap, 3, 0)).to.throw(RangeError, /Pixel index out of bounds/);
  });

  it('checks bounds for accesses by index', function() {
    const imageData = new ImageData(2, 2);
    const pixMap = new PixelMap(imageData);

    expect(pixMap.atIndex.bind(pixMap, -1)).to.throw(RangeError, /Pixel index out of bounds/);
    expect(pixMap.atIndex.bind(pixMap, 4)).to.throw(RangeError, /Pixel index out of bounds/);
  });
});
