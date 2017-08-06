class FuncPool {

  constructor() {
    this.update = this.update.bind(this);
    this.autoRun = this.autoRun.bind(this);
    this.removeFromAutoRun = this.removeFromAutoRun.bind(this);
  }

  static checkType(func: Function | Array<Function>) {
    if (func === undefined || typeof func === 'function' || Array.isArray(func)) return func;
    throw new TypeError('FuncPool accept a function as a parameter');
  }

  private updatePool: Array<Function> = [];

  clear() {
    this.updatePool = [];
  }

  update(): Promise<object> {
    const result: Array<any> = [];

    try {
      this.updatePool.forEach((func): void => {
        if(typeof func === 'function') result.push(func());
      });
      return Promise.resolve(result);
    } catch (err) {
      return Promise.reject(err);
    }
  }

  removeFromAutoRun(func?: Function | Array<Function>): Array<Function> {
    if (FuncPool.checkType(func)) {
      const index = this.updatePool.findIndex(
        (oldFunc: Function): boolean => oldFunc === func
      );
      if (index > -1) this.updatePool.splice(index, 1);
    }
    return this.updatePool.slice(0);
  }

  autoRun(func?: Function | Array<Function>): Function[] {
    if (FuncPool.checkType(func)) {
      if (Array.isArray(func)) {
        func.forEach(funcInArray => this.autoRun(funcInArray));
      } else {
        if (this.updatePool.includes(func)) this.removeFromAutoRun(func);
        this.updatePool.push(func);
      }
    }
    return this.updatePool.slice(0);
  }

}

export default FuncPool;
