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

  return this.atIndex(row * this.imageData.width + col);
}

PixelMap.prototype.atIndex = function(pixelIndex) {
  if (pixelIndex < 0 || pixelIndex >= this.imageData.width * this.imageData.height) {
    throw new RangeError('Pixel index out of bounds');
  }

  const data = this.imageData.data;
  const dataIndex = pixelIndex * 4;

  return {
    // Red
    get r() {
      return data[dataIndex + 0];
    },
    set r(val) {
      data[dataIndex + 0] = val;
    },

    // Green
    get g() {
      return data[dataIndex + 1];
    },
    set g(val) {
      data[dataIndex + 1] = val;
    },

    // Blue
    get b() {
      return data[dataIndex + 2];
    },
    set b(val) {
      data[dataIndex + 2] = val;
    },

    // Alpha
    get a() {
      return data[dataIndex + 3];
    },
    set a(val) {
      data[dataIndex + 3] = val;
    },
  }
}

export default PixelMap;
