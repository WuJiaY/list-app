import { observable, action } from "mobx";

class OverallMobx {
  @observable isLogin: boolean = false;

  //是否登录
  @action
  setIsLogin(val: boolean) {
    this.isLogin = val;
  }
}
export default OverallMobx;
