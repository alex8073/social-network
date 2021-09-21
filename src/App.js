import React, { Component, Suspense } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import AboutUs from "./components/AboutUs/AboutUs";
import Login from "./components/Login/Login";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
); // Lazy-loaded
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
); // Lazy-loaded

class App extends Component {
  catchAllUnhandledErrors = (reason) => {
    alert("Произошла ошибка.");
    console.log(reason);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }

    return (
      <div>
        <HeaderContainer />
        <Suspense fallback={<Preloader />}>
          <Switch>
            <Route path="/aboutus" component={AboutUs} />
            <Route
              path="/profile/:userId?"
              render={() => <ProfileContainer />}
            />
            <Route path="/dialogs" render={() => <DialogsContainer />} />
            <Route
              path="/users"
              render={() => <UsersContainer pageTitle={"Самураи"} />}
            />
            <Route path="/login" render={() => <Login />} />
            <Route exact path="/" component={Welcome} />
            <Route path="*" render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);

const SamuraiJSApp = (props) => {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </HashRouter>
  );
};

export default SamuraiJSApp;
