import React, { Component } from "react";
import { Button, Form, Input } from "antd";
import "./login.css";
import { signin } from "../../server/auth/authRequest";
import { getToken, setLocalStorage } from "../../utilits";
import { Redirect } from "react-router-dom";
import Home from "../home/home";
import Header from "../header/header";
import App from "../../App";

export default class Login extends Component {
  state = {
    isUser: false,
    loading: false,
  };

  onLoading = () => {
    this.setState({
      loading: true,
    });
  };

  render() {
    const onFinish = (values) => {
      this.onLoading();
      // signin(values)
      //   .then((res) => {
      //     if (res && res.data && res.data.token) {
      //       setLocalStorage("token", res.data.token);
      //       this.setState({
      //         isUser: true,
      //         loading: false,
      //       });
      //       window.location.reload();
      //     }
      //   })
      //   .catch((err) => {
      //     alert(err);
      //     this.setState({
      //       loading: false,
      //     });
      //   });
      if (values) {
        setLocalStorage("token", "Bearer 123456789");
        this.setState({
          isUser: true,
          loading: false,
        });
        window.location.reload();
      } else {
        alert("Xato!");
        this.setState({
          loading: false,
        });
      }
    };

    return (
      <div className="container-fuild h-100vh">
        {getToken() ? (
          <div>
            <Redirect to="" />
            <App />
          </div>
        ) : (
          <Form
            name="basic"
            initialValues={{ remember: true }}
            className="registerForm"
            onFinish={onFinish}
          >
            <h2>Tizimga kirish</h2>
            <Form.Item
              label="Login"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Parol"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                loading={this.state.loading}
                type="primary"
                htmlType="submit"
              >
                Yuborish
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    );
  }
}
