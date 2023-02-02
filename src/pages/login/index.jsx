import { Button, Form, Input, Text, View, Image } from "@tarojs/components";
import React, { memo, useState } from "react";
import { AtButton, AtInput, message, AtMessage } from "taro-ui";
import logo from "./hook.png";
import Taro from "@tarojs/taro";
const Login = memo(() => {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [value1, updateValue1] = useState("");
  const change = (value, event) => {
    updateValue1(value);
  };
  const dealForm = (e) => {
    console.log(e);
  };
  const resetForm = () => {
    console.log("reset");
  };
  const handleChange = (val) => {
    console.log(val);
    setAccount(val);
  };
  const register = () => {
    if (account.length > 0 && password.length > 0) {
      Taro.request({
        url: "http://localhost:3000/api/auth/register",
        method: "POST",
        data: {
          email: account,
          password: password,
        },
      })
        .then((res) => {
          if (res.statusCode !== 201) {
            Taro.atMessage({
              message: res?.data?.message,
              type: "error",
            });
            return;
          }
          Taro.atMessage({
            message: "注册成功请登录！",
            type: "success",
          });
        })
        .catch((err) => {});
    } else {
      Taro.atMessage({
        message: "账号或密码必填！",
        type: "error",
      });
    }
    // console.log("hhhhhhhhh");
  };
  const login = () => {
    if (account.length > 0 && password.length > 0) {
      Taro.request({
        url: "http://localhost:3000/api/auth/login",
        method: "POST",
        data: {
          email: account,
          password: password,
        },
      }).then((res) => {
        if (res.statusCode !== 201) {
          Taro.atMessage({
            message: res.data?.message,
            type: "error",
          });
          return;
        }
        Taro.setStorage({
          key: "token",
          data: res.data.token.split('"').join(""),
        });
        Taro.redirectTo({
          url: "/pages/index/index",
        });
      });
    } else {
      Taro.atMessage({
        message: "账号密码不能为空",
        type: "error",
      });
    }
  };
  return (
    <div>
      {/* <Form onSubmit={dealForm} onReset={resetForm}> */}
      <AtMessage></AtMessage>
      <Image
        src={logo}
        style={{ width: "122px", height: "122px", marginLeft: "35%" }}
      />
      <View>
        <Input style={{ display: "none" }}></Input>
        <AtInput
          title="账号"
          placeholder="请输入账号"
          required={true}
          value={account}
          onChange={(val) => {
            setAccount(val);
          }}
        ></AtInput>
      </View>
      <View>
        <AtInput
          type="password"
          title="密码"
          value={password}
          placeholder="请输入密码"
          onChange={(val) => {
            setPassword(val);
          }}
          required={true}
        ></AtInput>
      </View>
      <AtButton
        type="primary"
        style={{ marginTop: "35px" }}
        onClick={() => register()}
      >
        注册
      </AtButton>
      <AtButton
        type="secondary"
        style={{ marginTop: "38px" }}
        onClick={() => login()}
      >
        登录
      </AtButton>
    </div>
  );
});

export default Login;
