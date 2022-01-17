import React, { Component } from "react";
import { Button, Menu } from "antd";
import { Link, Route } from "react-router-dom";
import {
  LogoutOutlined,
  FileTextOutlined,
  BarChartOutlined,
  HomeOutlined,
  SettingOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import "./header.css";
import { authMe, signOut } from "../../server/auth/authRequest";

class Header extends Component {
  state = {
    current: "btn",
    nameUser: "",
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  nameUser = () => {
    authMe().then((value) => {
      value.data.username &&
        this.setState({
          nameUser: value.data.username,
        });
    });
  };

  componentDidMount() {
    this.nameUser();
  }

  render() {
    const { current } = this.state;

    return (
      <div className="container-fuild">
        <Menu
          className="container"
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item icon={<HomeOutlined />} key="/">
            <Link to="/">
              <b>Home</b>
            </Link>
          </Menu.Item>
          <Menu.Item key="contracts" icon={<FileTextOutlined />}>
            <Link to="/contracts">Contracts</Link>
          </Menu.Item>
          <Menu.Item key="process" icon={<BarChartOutlined />}>
            <Link to="/process">Processes</Link>
          </Menu.Item>
          <Menu.Item icon={<SettingOutlined />} key="params">
            <Link to="/params">Parametrs</Link>
          </Menu.Item>
          <Menu.Item icon={<ScheduleOutlined />} key="Schedulers">
            <Link to="/schedulers">Schedulers</Link>
          </Menu.Item>
          <Menu.Item key="logout">
            <Button
              onClick={signOut}
              type={"primary"}
              icon={<LogoutOutlined />}
            >
              Chiqish
            </Button>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default Header;
