class Random {
  constructor(num) {
    this.x = num;
    this._x = num;
  }

  getNext() {
    const m = 15;
    const a = 8;
    const c = 8;
    const newX = (a * this._x + c) % m;
    this._x = newX;
    return newX;
  }

  reset() {
    this._x = this.x;
  }
}
  
export default Random;