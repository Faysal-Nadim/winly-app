import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";

import { SliderComponent } from "./SliderComponent";

export const HeroSldierEx = ({ data }) => {
  const flatlistRef = useRef();
  const screenWidth = Dimensions.get("window").width;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Calculate the next index to scroll to, ensuring it wraps around
        const nextIndex = (prevIndex + 1) % data?.length;

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
