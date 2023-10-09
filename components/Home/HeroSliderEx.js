import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  LogBox,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SliderComponent } from "./SliderComponent";

let data = [
  {
    img: {
      prize: "https://i.ibb.co/tHgVcC5/IPHONE-14-SOLD-OUT-1.png",
      product:
        "https://i.ibb.co/rdDbrTy/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: "WL-612927-Y",
      userName: "Dessarie  Nacario",
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b53825c687549c1514cd57",
    title: "An iPhone 14 Pro",
    productTitle: "Spend AED 35 for a chance to win.",
    validity: 1694714400000,
    ticketQty: 1,
    price: 35,
    stockQty: 500,
    orderCount: 86,
    drawDate: "Fri Sep 15 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Hero",
        _id: "6509a2c32908f5a31b3cddb4",
      },
    ],
    createdAt: "2023-07-17T12:46:29.418Z",
    updatedAt: "2023-09-19T13:31:47.849Z",
    __v: 0,
    description: "An iPhone 14 Pro Max",
    ticketQtyGen: 1,
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
  },
  {
    img: {
      prize: "https://i.ibb.co/RvXz0Kp/10-K-SOLD-OUT.png",
      product:
        "https://i.ibb.co/rdDbrTy/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: "WL-907103-Y",
      userName: "Shaikha  Al falasi ",
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b540b59d036f91b3e5e17c",
    title: "AED 10,000 Cash",
    productTitle: "Spend AED 35 for a chance to win.",
    validity: 1694714400000,
    ticketQty: 1,
    price: 35,
    stockQty: 800,
    orderCount: 81,
    drawDate: "Fri Sep 15 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Hero",
        _id: "650a792ba81ee293e5bfe6f1",
      },
    ],
    createdAt: "2023-07-17T13:23:01.370Z",
    updatedAt: "2023-09-20T04:46:35.652Z",
    __v: 0,
    description: "AED 10,000 Cash",
    ticketQtyGen: 1,
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
  },
  {
    img: {
      prize: "https://i.ibb.co/Z22fJ55/1-MILLION-COMING-SOON-1.png",
      product:
        "https://i.ibb.co/zQfP1gx/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: null,
      userName: null,
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b57b69d277b4a804792b3c",
    title: "AED 1,000,000",
    productTitle: "Get a chance to win",
    validity: 1703872800000,
    ticketQty: 0,
    price: 0,
    stockQty: 3000,
    orderCount: 0,
    drawDate: "Fri Dec 29 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Upcoming",
        _id: "64f2076e1c1768734e022f52",
      },
    ],
    description: "Coming Soon",
    ticketQtyGen: 1,
    createdAt: "2023-07-17T17:33:29.252Z",
    updatedAt: "2023-09-01T15:46:54.712Z",
    __v: 0,
    prizeDiscription: null,
  },
  {
    img: {
      prize: "https://i.ibb.co/pyY7HYx/75K-1.png",
      product:
        "https://i.ibb.co/zQfP1gx/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: null,
      userName: null,
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b57dd83ad58c2c034146a8",
    title: "AED 100,000",
    productTitle: "Get a chance to win",
    validity: 1703872800000,
    ticketQty: 1,
    price: 0,
    stockQty: 3000,
    orderCount: 0,
    drawDate: "Thu Dec 28 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Upcoming",
        _id: "64f207861c1768734e022f69",
      },
    ],
    description: "Coming Soon",
    ticketQtyGen: 1,
    createdAt: "2023-07-17T17:43:52.690Z",
    updatedAt: "2023-09-01T15:47:18.049Z",
    __v: 0,
    prizeDiscription: null,
  },
  {
    img: {
      prize: "https://i.ibb.co/vz88549/shutterstock-2127128198.jpg",
      product:
        "https://i.ibb.co/rdDbrTy/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: null,
      userName: null,
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b57e8dd277b4a804792b5a",
    title: "AED 35,000 Cash",
    productTitle: "Spend AED 25 for a chance to win.",
    validity: 1697306400000,
    ticketQty: 2,
    price: 25,
    stockQty: 2500,
    orderCount: 479,
    drawDate: "Sun Oct 15 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Hero",
        _id: "651fcd1ed9b668bbeeac9d07",
      },
      {
        status: "Explore",
        _id: "651fcd1ed9b668bbeeac9d08",
      },
    ],
    description: "AED 35,000 Cash",
    ticketQtyGen: 1,
    createdAt: "2023-07-17T17:46:53.862Z",
    updatedAt: "2023-10-08T11:21:17.697Z",
    __v: 0,
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
  },
  {
    img: {
      prize: "https://i.ibb.co/C63xMYW/shutterstock-185525042-1.jpg",
      product:
        "https://i.ibb.co/zQfP1gx/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      nationality: null,
      ticketNumber: null,
      userName: null,
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64b82833d88befeb9a124a6d",
    title: "AED 75,000 Cash",
    productTitle: "Spend AED 150 for a chance to win",
    validity: 1703872800000,
    ticketQty: 2,
    price: 150,
    stockQty: 750,
    orderCount: 5,
    drawDate: "Fri Dec 29 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Selling Fast",
        _id: "651fcd3ad9b668bbeeac9d17",
      },
      {
        status: "Explore",
        _id: "651fcd3ad9b668bbeeac9d18",
      },
    ],
    description: "AED 75,000 Cash",
    ticketQtyGen: 1,
    createdAt: "2023-07-19T18:15:15.031Z",
    updatedAt: "2023-10-06T09:02:50.168Z",
    __v: 0,
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
  },
  {
    img: {
      prize: "https://i.ibb.co/RjbQ35Q/shutterstock-2127128198-1.jpg",
      product:
        "https://i.ibb.co/TmxbK8R/Whats-App-Image-2023-08-09-at-14-53-41.jpg",
    },
    winner: {
      ticketNumber: null,
      userName: null,
      nationality: null,
    },
    offer: {
      validity: 0,
      percentage: 0,
      minAmount: 0,
    },
    _id: "64fdf70774a1c77e08b01f3d",
    title: "AED 5,000 Cash",
    productTitle: "Spend AED 20 for a chance to win",
    validity: 1703872800000,
    ticketQty: 2,
    price: 20,
    stockQty: 500,
    orderCount: 18,
    drawDate: "Fri Dec 29 2023",
    status: "Published",
    displayStatus: [
      {
        status: "Selling Fast",
        _id: "651fcdc6d9b668bbeeac9d53",
      },
      {
        status: "Explore",
        _id: "651fcdc6d9b668bbeeac9d54",
      },
    ],
    description: "AED 5,000 Cash",
    prizeDiscription: "Winly Rubber Band </br> Color - Red",
    ticketQtyGen: 1,
    createdAt: "2023-09-10T17:04:07.875Z",
    updatedAt: "2023-10-06T21:56:51.617Z",
    __v: 0,
  },
];

const HeroSldierEx = () => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Calculate the next index to scroll to, ensuring it wraps around
        const nextIndex = (prevIndex + 1) % data.length;

        flatlistRef.current.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index,
  });

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.floor(scrollPosition / screenWidth);

    setActiveIndex(index);
  };

  return (
    <View style={{}}>
      <FlatList
        data={data}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={SliderComponent}
        keyExtractor={(item) => item._id}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={activeIndex}
      />
    </View>
  );
};

export default HeroSldierEx;

const styles = StyleSheet.create({});
