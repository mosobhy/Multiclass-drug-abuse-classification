import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceStorage = {
  async saveItem(key, value) {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
  async getItem(key) {
    let value;
    try {
      value = await AsyncStorage.getItem(key);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    } finally {
      console.log(value);
    }
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
};
export default DeviceStorage;
