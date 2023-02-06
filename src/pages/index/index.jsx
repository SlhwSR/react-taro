import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Image,
  Navigator,
  Swiper,
  SwiperItem,
  CoverImage,
} from "@tarojs/components";
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
      } else {
        Taro.redirectTo({
          url: "/pages/login/index",
        });
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
      <Swiper
        className="test-h"
        indicatorColor="#999"
        indicatorActiveColor="#333"
        circular
        indicatorDots
        autoplay
      >
        <SwiperItem>
          <View className="demo-text-1">
            <CoverImage src="https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180"></CoverImage>
          </View>
        </SwiperItem>
        <SwiperItem>
          <CoverImage src="https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180"></CoverImage>
        </SwiperItem>
        <SwiperItem>
          <CoverImage src="https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180"></CoverImage>
        </SwiperItem>
      </Swiper>
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
