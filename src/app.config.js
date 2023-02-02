export default {
  pages: ["pages/index/index", "pages/introduce/index","pages/personal/index","pages/login/index","pages/articleDetail/index"],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#000",
    selectedColor: "#56abe4",
    backgroundColor: "#fff",
    borderStyle: "white",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/introduce/index",
        text: "介绍页",
      },
      {
        pagePath: "pages/personal/index",
        text: "个人首页",
      },
    ],
    //custom:true
  },
};
