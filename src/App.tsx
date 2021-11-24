import React, { Component, Suspense } from "react";
import "./App.css";
import Welcome from "./components/Welcome/Welcome";
import { LoginPage } from "./components/Login/Login";
import { HashRouter, Route, Switch, withRouter } from "react-router-dom";
import { UsersPage } from "./components/Users/UsersPage";
import HeaderContainer from "./components/Header/HeaderContainer";
import { connect, Provider } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store, { AppStateType } from "./redux/redux-store";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer")); // Lazy-loaded
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer")); // Lazy-loaded

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

class App extends Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert("Произошла ошибка.");
        console.log(e);
    };

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
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
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        <Route path="/dialogs" render={() => <DialogsContainer />} />
                        <Route path="/users" render={() => <UsersPage pageTitle={"Самураи"} />} />
                        <Route path="/login" render={() => <LoginPage />} />
                        <Route exact path="/" component={Welcome} />
                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp: React.FC = () => {
    return (
        <HashRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </HashRouter>
    );
};

export default SamuraiJSApp;
