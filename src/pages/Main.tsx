import * as React from "react";
import { observer, inject } from "mobx-react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { OverallMobx } from "../store";
//组件
import Home from "./Home";
import Login from "./Login";
//props
interface MainProps {
  overall?: OverallMobx;
}
@inject("overall")
@observer
export default class Main extends React.Component<MainProps, any> {
  render() {
    //登录拦截
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          this.props.overall.isLogin ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login"
              }}
            />
          )
        }
      />
    );

    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Redirect path="/" exact to={{ pathname: "/login" }} />
        </Switch>
      </Router>
    );
  }
}
