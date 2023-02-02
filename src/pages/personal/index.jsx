import Taro, { useReady } from "@tarojs/taro";
import React, { memo } from "react";
import { useEffect } from "react";
import { View, Image, Text } from "@tarojs/components";
import { useState } from "react";
import {
  AtAvatar,
  AtDivider,
  AtGrid,
  AtList,
  AtListItem,
  AtTabs,
  AtTabsPane,
} from "taro-ui";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
const Personal = memo(() => {
  const [open, setOpen] = useState(true);
  const userinfo = useSelector((state) => state.userInfo.userInfo);
  const [currentTab, setCurrentTab] = useState(0); //tab切换
  const [categoryList, setCategoryList] = useState([]);
  const [articleList, setArticleList] = useState([]);
  const [total, setTotal] = useState(0);
  const handleClose = () => {
    console.log("--------");
    setOpen(false);
  };
  const contentChoose = (e) => {
    console.log(e);
  };
  const hanleTabs = (e) => {
    // if(e===0){}
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
    setTotal(0);
    switch (e) {
      case 0:
        Taro.request({
          url: `http://localhost:3000/api/user/detail/${userinfo.id}`,
          method: "GET",
        }).then((res) => {
          console.log(res.data);
          setCategoryList(res.data.category);
        });
        break;
      case 1:
        Taro.request({
          url: `http://localhost:3000/api/article`,
          method: "GET",
          data: {
            current: 1,
            pageSize: 10,
          },
          header: {
            authorization: "Bearer " + token,
          },
        }).then((res) => {
          console.log(res.data);
          setArticleList(res.data.data);
          setTotal(res.data.total);
          // setCategoryList(res.data.category);
        });
      default:
        break;
    }
  };
  useEffect(() => {
    Taro.request({
      url: `http://localhost:3000/api/user/detail/${userinfo.id}`,
      method: "GET",
    }).then((res) => {
      console.log(res.data);
      setCategoryList(res.data.category);
    });
  }, []);
  return (
    <div>
      <View style={{ marginLeft: "42%" }}>
        <AtAvatar
          image={userinfo?.avatar?.replace("\\", "/")}
          size="large"
          circle
          text={userinfo?.avatar ? "" : "游客"}
          style={{ marginLeft: "75%" }}
        ></AtAvatar>
      </View>
      <View style={{ marginLeft: "36%", marginTop: "15px" }}>
        <Text>{userinfo?.email}</Text>
      </View>
      <AtDivider content="你的内容区" />
      <AtGrid
        mode="rect"
        onClick={(e) => contentChoose(e)}
        data={[
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
            value: "领取中心",
          },
          {
            image:
              "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
            value: "找折扣",
          },
          {
            image:
              "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
            value: "领会员",
          },
          {
            image:
              "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
            value: "新品首发",
          },
          {
            image:
              "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
            value: "领京豆",
          },
          {
            image:
              "https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png",
            value: "手机馆",
          },
        ]}
      ></AtGrid>
      <AtTabs
        tabList={[
          {
            title: "我的分类",
          },
          {
            title: "我的文章",
          },
          {
            title: "我的点赞",
          },
          {
            title: "我的收藏",
          },
        ]}
        onClick={(e) => {
          setCurrentTab(e);
          hanleTabs(e);
        }}
        current={currentTab}
      >
        <AtTabsPane current={currentTab} index={0}>
          {/* <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;"> */}
          <AtList>
            {(categoryList || []).map((item, index) => (
              <AtListItem
                title={item.name}
                thumb={item.cover.replace(/\\/g, "/")}
                extraText="详细信息"
                arrow="right"
              ></AtListItem>
            ))}
          </AtList>
          {/* </View> */}
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={1}>
          <AtList>
            {(articleList || []).map((item, index) => (
              <AtListItem
                title={item.title}
                onClick={() => {
                  Taro.navigateTo({
                    url:
                      "/pages/articleDetail/index?id=" +
                      item.id,
                  });
                }}
                // thumb={item.cover.replace(/\\/g, "/")}
                note={
                  "时间:" + dayjs(item.createdAt).format("YYYY-MM-DD:hh:mm:ss")
                }
                extraText={"所属分类" + item.category.name}
                arrow="right"
              ></AtListItem>
            ))}
          </AtList>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={2}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页三的内容
          </View>
        </AtTabsPane>
        <AtTabsPane current={currentTab} index={3}>
          <View style="padding: 100px 50px;background-color: #FAFBFC;text-align: center;">
            标签页三的内容
          </View>
        </AtTabsPane>
      </AtTabs>
    </div>
  );
});

export default Personal;
