import * as React from "react";

export default class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <div className="content">
          <div className="form">
            <h1>登录</h1>
            <div className="form-item">
              <input className="input" placeholder="邮箱" />
              <input className="input" placeholder="密码" />
              <button className="button">登录</button>
            </div>
          </div>
        </div>
        <div className="bg" />
      </div>
    );
  }
}
