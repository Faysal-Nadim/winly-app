import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../redux/actions";
import HeroSldierEx from "../components/Home/HeroSliderEx";
import { Banner } from "../components/Home/Banner";
import { UpcomingCampaigns } from "../components/Home/UpcomingCampaigns";
import { ExploreCampaigns } from "../components/Home/ExploreCampaigns";

/**
 * @author
 * @function Home
 **/
export const Home = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  return (
    <SafeAreaView style={{ marginTop: 42, flex: 1 }}>
      <ScrollView>
        <HeroSldierEx />
        <View style={{ marginVertical: 8 }} />
        <Banner />
        <View style={{ marginVertical: 16 }} />
        <UpcomingCampaigns />
        <View style={{ marginVertical: 16 }} />
        <ExploreCampaigns />
        <View style={{ marginVertical: 36 }} />
      </ScrollView>
    </SafeAreaView>
  );
};
