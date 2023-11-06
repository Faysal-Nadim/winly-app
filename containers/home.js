import React, { useEffect } from "react";
import { View, SafeAreaView, Dimensions, Image, StatusBar } from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { useDispatch, useSelector } from "react-redux";
import { getCampaign, getCartItems } from "../redux/actions";
import { Banner } from "../components/Home/Banner";
import { UpcomingCampaigns } from "../components/Home/UpcomingCampaigns";
import { ExploreCampaigns } from "../components/Home/ExploreCampaigns";
import { HeroSldierEx } from "../components/Home/HeroSliderEx";

/**
 * @author
 * @function Home
 **/

const images = [
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-4187.jpg",
  "https://cdn.thewirecutter.com/wp-content/media/2021/02/whitesneakers-2048px-0427.jpg",
  "https://media.cnn.com/api/v1/images/stellar/prod/220328104210-allbirds-nautral-white-sneakers.jpg?c=original",
];

export const Home = (props) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getCampaign());
  // }, []);

  const auth = useSelector((state) => state.auth);
  const campaign = require("../assets/data.json");

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight, flex: 1 }}>
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
          <View>
            <HeroSldierEx data={campaign?.campaigns?.explore} />

            <View style={{ marginVertical: 8 }} />

            <Banner />

            <View style={{ marginVertical: 8 }} />

            <UpcomingCampaigns data={campaign?.campaigns?.explore} />

            <View style={{ marginVertical: 16 }} />

            <ExploreCampaigns data={campaign?.campaigns?.allCampaigns} />
            <View style={{ marginVertical: 36 }} />
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
