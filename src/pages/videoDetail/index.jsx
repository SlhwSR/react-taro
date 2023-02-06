import { CoverImage, Video } from "@tarojs/components";
import Taro, { useRouter } from "@tarojs/taro";
import React, { memo, useEffect, useState } from "react";
import { AtCard } from "taro-ui";

const VideoDetail = memo(() => {
  const router = useRouter();
  const [videoList, setVideoList] = useState([]);
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
  useEffect(() => {
    Taro.request({
      url: `http://localhost:3000/api/video/${router.params.id}`,
      method: "GET",
      header: {
        authorization: "Bearer " + token,
      },
    }).then((res) => {
      console.log(res.data);
      setVideoList(res.data.data);
    });
  }, []);
  return (
    <div>
      {(videoList.videos || []).map((item, index) => (
        <AtCard
          title={"所属分类:" + videoList.name}
          style={{ marginTop: "20px" }}
        >
          <Video
            id="video"
            src={item.url}
            poster={item.poster}
            initialTime={0}
            controls={true}
            autoplay={false}
            loop={false}
            muted={false}
          />
        </AtCard>
      ))}
    </div>
  );
});

export default VideoDetail;
