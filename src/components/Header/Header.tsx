import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Layout, Menu, Row } from "antd";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/auth-reducer";
import { selectIsAuth, selectCurrentUserLogin } from "../../redux/auth-selectors";

type HeaderPropsType = {};

export const Header: React.FC<HeaderPropsType> = () => {
    const { Header } = Layout;

    const isAuth = useSelector(selectIsAuth);
    const login = useSelector(selectCurrentUserLogin);

    const dispatch = useDispatch();

    const handleLogOut = useCallback(() => dispatch(logout()), []);

    return (
        <Header className="header">
            <Row align="middle" justify="space-between">
                <Col span={6}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} inlineCollapsed={false}>
                        <Menu.Item key="1">
                            <Link to="/developers">Developers</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col>
                    {isAuth ? (
                        <>
                            <Avatar style={{ backgroundColor: "#87d068" }} icon={<UserOutlined />} />
                            <span style={{ color: "#fff", margin: "0 8px 0" }}>{login}</span>
                            <Button type="primary" onClick={handleLogOut}>
                                Log out
                            </Button>
                        </>
                    ) : (
                        <Button type="primary">
                            <Link to={"/login"}>Login</Link>
                        </Button>
                    )}
                </Col>
            </Row>
        </Header>
    );
};
