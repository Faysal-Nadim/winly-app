import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
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
import HeroSldierEx from "../components/Home/HeroSliderEx";
import { Banner } from "../components/Home/Banner";
import { UpcomingCampaigns } from "../components/Home/UpcomingCampaigns";
import { ExploreCampaigns } from "../components/Home/ExploreCampaigns";

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
