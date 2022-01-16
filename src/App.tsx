import { LaptopOutlined, NotificationOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { Component, Suspense, useState } from "react";
import { connect, Provider } from "react-redux";
import { HashRouter, Link, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";
import "./App.css";
import Preloader from "./components/common/Preloader/Preloader";
import { Header } from "./components/Header/Header";
import { LoginPage } from "./components/Login/Login";
import { Form } from "./components/Form";
import { UsersPage } from "./components/Users/UsersPage";
import Welcome from "./components/Welcome/Welcome";
import { initializeApp } from "./redux/app-reducer";
import store, { AppStateType } from "./redux/redux-store";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/Themes";
import { ThemeProvider } from "styled-components";
import { Toggle } from "./components/Toggler";
import { useThemeMode } from "./components/useDarkMode";

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer")); // Lazy-loaded
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer")); // Lazy-loaded
const ChatPage = React.lazy(() => import("./views/chat/chat")); // Lazy-loaded

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
            <>
                <Header />
                <Layout>
                    <Content style={{ padding: "0 50px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Layout className="site-layout-background" style={{ padding: "24px 0" }}>
                            <Sider className="site-layout-background" width={200}>
                                <Menu mode="inline" defaultSelectedKeys={["5"]} style={{ height: "100%" }}>
                                    <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                                        <Menu.Item key="1">
                                            <Link to="/profile">Профиль</Link>
                                        </Menu.Item>
                                        <Menu.Item key="2">
                                            <Link to="/dialogs">Dialogs</Link>
                                        </Menu.Item>
                                        <Menu.Item key="3">
                                            <Link to="/form">Форма</Link>
                                        </Menu.Item>
                                        <Menu.Item key="4">option4</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub2" icon={<LaptopOutlined />} title="Developers">
                                        <Menu.Item key="5">
                                            <Link to="/developers">Developers</Link>
                                        </Menu.Item>
                                        <Menu.Item key="6">option6</Menu.Item>
                                        <Menu.Item key="7">option7</Menu.Item>
                                        <Menu.Item key="8">option8</Menu.Item>
                                    </SubMenu>
                                    <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                                        <Menu.Item key="9">
                                            <Link to="/chat">Chat</Link>
                                        </Menu.Item>
                                        <Menu.Item key="10">option10</Menu.Item>
                                        <Menu.Item key="11">option11</Menu.Item>
                                        <Menu.Item key="12">option12</Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </Sider>
                            <Content style={{ padding: "0 24px", minHeight: 280 }}>
                                <Suspense fallback={<Preloader />}>
                                    <Switch>
                                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                                        <Route path="/dialogs" render={() => <DialogsContainer />} />
                                        <Route
                                            path="/developers"
                                            render={() => <UsersPage pageTitle={"Developers"} />}
                                        />
                                        <Route path="/form" render={() => <Form />} />
                                        <Route path="/login" render={() => <LoginPage />} />
                                        <Route path="/chat" render={() => <ChatPage />} />
                                        <Route exact path="/" component={Welcome} />
                                        <Route path="*" render={() => <div>404 NOT FOUND</div>} />
                                    </Switch>
                                </Suspense>
                            </Content>
                        </Layout>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>Pet Social Network 2021</Footer>
                </Layout>
                ,
            </>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);

const SamuraiJSApp: React.FC = () => {
    const [theme, themeToggler, mountedComponent] = useThemeMode();
    const themeMode = theme === "light" ? lightTheme : darkTheme;

    if (!mountedComponent) return <div />;

    return (
        <ThemeProvider theme={themeMode}>
            <GlobalStyles />
            <Toggle toggleTheme={themeToggler as () => void} />
            <HashRouter>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </HashRouter>
        </ThemeProvider>
    );
};

export default SamuraiJSApp;
