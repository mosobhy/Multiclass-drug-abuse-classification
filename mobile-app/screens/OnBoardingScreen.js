import React, { useState, useRef } from "react";
import { View, StyleSheet, FlatList, useWindowDimensions } from "react-native";
import OnboardingItem from "../components/OnboardingItem";
import { useNavigation } from "@react-navigation/native";
import data from "../data/onboardingSlidesData";
import NextButton from "../components/NextButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";

const OnBoardingScreen = () => {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  // get the current index of whatever item on the boarding screen
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const scrollTo = async () => {
    if (currentIndex < data.length - 1) {
      const nextSlideIndex = currentIndex + 1;
      const offset = nextSlideIndex * width;
      slidesRef?.current?.scrollToOffset({ offset });
      setCurrentIndex(currentIndex + 1);
    }
    // if we done viewing the onboarding screen => set the viewOnBoarding : true
    else {
      try {
        await AsyncStorage.setItem("@viewOnBoarding", "true");
      } catch (err) {
        console.log("Error @setItem: ", err);
      }
      navigation.navigate("Login");
    }
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(currentIndex);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ flex: 3 }}>
        <FlatList
          ref={slidesRef}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={data}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
        />
      </View>

      <View style={styles.dots}>
        {data.map((item, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex == index && {
                backgroundColor: Colors.primary,
                width: 25,
              },
            ]}
          ></View>
        ))}
      </View>

      <View />
      <NextButton
        scrollTo={scrollTo}
        percentage={(currentIndex + 1) * (100 / data.length)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.accent,
    marginHorizontal: 8,
    width: 10,
  },
  dots: {
    flexDirection: "row",
  },
});
export default OnBoardingScreen;
