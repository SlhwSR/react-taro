import { RichText } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import React, { memo } from "react";
import { useState } from "react";
import { useEffect } from "react";

const ArticleDetail = memo(() => {
  const router = useRouter();
  const [html, setHtml] = useState("");
  useEffect(() => {
    // console.log(JSON.parse(router.params.content));
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
    const content = router.params.id;
    Taro.request({
      url: `http://localhost:3000/api/article/${content}`,
      method: "GET",
      header: {
        authorization: "Bearer " + token,
      },
    }).then((res) => {
      const realContent = res.data.content.replace(/\\/g, "/");
      setHtml(realContent);
    });
    // console.log(content);
    // setHtml(content);
  }, []);
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
});

export default ArticleDetail;
