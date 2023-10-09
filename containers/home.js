import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCampaign, getCartItems } from "../redux/actions";
import HeroSldier from "../components/Home/HeroSlider";

/**
 * @author
 * @function Home
 **/

const images = [
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-4187.jpg",
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-0427.jpg",
  "https://media.cnn.com/api/v1/images/stellar/prod/220328104210-allbirds-nautral-white-sneakers.jpg?c=original",
];

const Width = Dimensions.get("window").width;
const Height = Dimensions.get("window").height;

export const Home = (props) => {
  const { container } = styles;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCampaign());
  }, []);

  const [activeImg, setActiveImg] = useState(0);

  const auth = useSelector((state) => state.auth);
  const campaign = useSelector((state) => state.campaign);
  const explore = useSelector((state) => state.campaign.campaigns?.explore);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    setTimeout(() => {
      if (activeImg === 2) {
        setActiveImg(0);
      } else {
        setActiveImg(activeImg + 1);
      }
    }, 3000);
  }, [activeImg]);

  return (
    <SafeAreaView style={container}>
      {campaign?.loading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#f3f3f3",
            opacity: 0.5,
          }}
        >
          <Image
            source={require("../assets/loading.gif")}
            style={{ height: 40, width: 40 }}
          />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.slider}>
            {campaign?.campaigns.explore !== undefined && (
              <ScrollView
                // onScroll={({ nativeEvent }) => onchange(nativeEvent)}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                style={styles.wrap}
              >
                <Image
                  resizeMode="stretch"
                  source={{
                    uri: campaign?.campaigns?.explore[activeImg]?.img?.prize,
                  }}
                  style={styles.wrapIamge}
                />
              </ScrollView>
            )}
          </View>
          <View style={styles.wrapDot}>
            {images.map((e, index) => (
              <Text
                key={e}
                style={activeImg == index ? styles.activeDot : styles.dot}
              >
                -
              </Text>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    // justifyContent: "center",
    // alignItems: "center",
  },
  slider: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    paddingBottom: 5,
  },
  wrap: {
    height: Height * 0.3,
    width: Width - 20,
  },
  wrapIamge: {
    flex: 1,
    alignItems: "center",
    height: Height * 0.3,
    width: Width - 20,
    borderRadius: 15,
    alignSelf: "flex-end",
  },
  wrapDot: {
    marginTop: 5,
    bottom: 0,
    flexDirection: "row",
    alignSelf: "center",
  },
  activeDot: {
    margin: 3,
    height: 3,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  dot: {
    margin: 3,
    height: 3,
    width: 5,
    borderRadius: 2,
    backgroundColor: "black",
  },
});
