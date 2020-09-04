// tslint:disable-next-line: no-namespace
export namespace AppActions {
  
  export class SetName {
    static readonly type = '[App] SetName';
    constructor(public name: string) { }
  }
}
