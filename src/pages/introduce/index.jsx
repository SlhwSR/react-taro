import { Text, View } from "@tarojs/components";
import { useLaunch, useReady } from "@tarojs/taro";
import React, { memo, useEffect } from "react";
import { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
const Introduce = memo(() => {
  const medicalGoods = useSelector((state) => state.medicalgoods.goodlist);
  useReady(() => {
    console.log("我是ready");
  });
  useEffect(() => {
    console.log(medicalGoods);
  }, []);
  return (
    <>
      <Text>Introduce Info</Text>
      {/* <View className='at-icon at-icon-settings'></View> */}
      {(medicalGoods || []).map((item) => (
        <span key={item.name}>{item.name}</span>
      ))}
    </>
  );
});

export default Introduce;
