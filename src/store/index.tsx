import OverallMobx from "./overall";

//mobx状态管理
class Store {
  overall: OverallMobx;
  constructor() {
    this.overall = new OverallMobx();
  }
}
export default new Store();
export { OverallMobx };
