import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, Animated } from "react-native";
import OnboardingItem from "../components/OnboardingItem";
// import OnBoarding Data
import data from "../data/onboardingSlidesData";
import Paginator from "../components/Paginator";
import NextButton from "../components/NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OnBoardingScreen = () => {
  // get the current index of whatever item on the boarding screen
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewAbleItemsChanged = useRef(({ viewAbleItems }) => {
    // set the current index to whatever displayed on the screen
    setCurrentIndex(viewAbleItems[0].index);
  }).current;

  // the screen at least shows 50% of it before it changes
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const scrollTo = async () => {
    if (currentIndex < data.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    }
    // if we done viewing the onboarding screen => set the viewOnBoarding : true
    else {
      try {
        await AsyncStorage.setItem("@viewOnBoarding", "true");
      } catch (err) {
        console.log("Error @setItem: ", err);
      }
    }
  };
  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flex: 3 }}>
        <FlatList
          data={data}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewAbleItemsChanged={viewAbleItemsChanged}
          viewabilityConfig={viewConfigRef.current}
          ref={slidesRef}
        />
      </View>
      <Paginator data={data} scrollX={scrollX} />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / data.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({});
export default OnBoardingScreen;
