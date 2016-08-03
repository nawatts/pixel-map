function PixelMap(imageData) {
  this.imageData = imageData;
}

Object.defineProperty(PixelMap.prototype, 'width', {
  get: function() {
    return this.imageData.width;
  }
});

Object.defineProperty(PixelMap.prototype, 'height', {
  get: function() {
    return this.imageData.height;
  }
});

PixelMap.prototype.at = function(row, col) {
  if (row < 0 || row >= this.imageData.height ||
      col < 0 || col >= this.imageData.width)
  {
    throw new RangeError('Pixel index out of bounds');
  }

  const data = this.imageData.data;
  const index = (row * this.imageData.width + col) * 4;

  return {
    // Red
    get r() {
      return data[index + 0];
    },
    set r(val) {
      data[index + 0] = val;
    },

    // Green
    get g() {
      return data[index + 1];
    },
    set g(val) {
      data[index + 1] = val;
    },

    // Blue
    get b() {
      return data[index + 2];
    },
    set b(val) {
      data[index + 2] = val;
    },

    // Alpha
    get a() {
      return data[index + 3];
    },
    set a(val) {
      data[index + 3] = val;
    },
  }
}

export default PixelMap;
