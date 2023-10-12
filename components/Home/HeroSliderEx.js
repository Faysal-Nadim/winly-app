import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { DetailsModal } from "../Modal/DetailsModal";
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
  const [isModalVisible, setModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  return (
    <View style={{}}>
      <Modal
        isVisible={isModalVisible}
        animationIn={"slideInUp"}
        animationInTiming={500}
        animationOut={"slideOutDown"}
        animationOutTiming={800}
        // backdropTransitionOutTiming={1000}
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <View>
          <DetailsModal
            setModalVisible={setModalVisible}
            detailsData={clickedItem}
          />
        </View>
      </Modal>
      <FlatList
        data={data}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={({ item }) => (
          <SliderComponent
            item={item}
            setClickedItem={setClickedItem}
            setModalVisible={setModalVisible}
          />
        )}
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
