import React, { useCallback, useEffect } from "react";
import { View, Text, Button, Image, Navigator } from "@tarojs/components";
import {
  useEnv,
  useNavigationBar,
  useModal,
  useToast,
  useTabBar,
} from "taro-hooks";
import logo from "./hook.png";

import "./index.less";
import Taro, { useRouter, useLaunch } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../store/modules/user";
const Index = () => {
  const env = useEnv();
  const dispatch = useDispatch();
  const tarbar = useTabBar();
  useEffect(() => {
    console.log("--------------------------");
    try {
      var token = Taro.getStorageSync("token");
      if (token) {
        console.log(token);
      }
      // console.log(token);
    } catch (error) {
      Taro.redirectTo({
        url: "/pages/login/index",
      });
    }

    Taro.request({
      url: "http://localhost:3000/api/auth/all",
      method: "GET",
      header: {
        authorization: "Bearer " + token,
      },
    }).then((res) => {
      dispatch(save(res.data));
    });
    console.log(tarbar);
  }, []);
  const [_, { setTitle }] = useNavigationBar({ title: "首页" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const router = useRouter();
  const [showToast] = useToast({ mask: true });
  const handleModal = useCallback(() => {
    show({
      content: "不如给一个star⭐️!",
      showCancel: true,
      title: "自定义",
    }).then((res) => {
      console.log(res);
      if (res.cancel === true) {
        showToast({ title: "点击了取消!" });
      } else if (res.confirm === true) {
        showToast({ title: "点击了确定!" });
      }
    });
  }, [show, showToast]);
  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">为Taro而设计的Hooks Library</Text>
      <Text className="desc">
        目前覆盖70%官方API. 抹平部分API在H5端短板. 提供近40+Hooks!
        并结合ahook适配Taro!
      </Text>
      <View className="list">
        <Text className="label">运行环境</Text>
        <Text className="note">{env}</Text>
      </View>
      <Button
        className="button"
        onClick={() =>
          Taro.redirectTo({
            url: "/pages/login/index",
          })
        }
      >
        设置标题
      </Button>
      <Button className="button" onClick={handleModal}>
        使用Modal
      </Button>
    </View>
  );
};

export default Index;
