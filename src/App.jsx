import { StyleSheet, Text, View } from "react-native";
import EventCalenderComponent from "./components/molecules/eventCalendar.component";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

// screens & components
import HomeScreen from "./screens/home.screen";
import Example from "./components/atoms/dateTime";
import HomeTabNavigator from "./navigator/homeTabNavigator";
import FilterComponent from "./screens/searchFilter.screen";
import { SearchFilterContextProvider } from "./contexts/filterContext";

// contexts

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      {/* this context provider provides filter state */}
      <SearchFilterContextProvider>  
        <Stack.Navigator screenOptions={{ header: () => null }}>
          <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
          <Stack.Screen name="FilterScreen" component={FilterComponent} />
          <Stack.Screen name="DateTimePicker" component={Example} />
        </Stack.Navigator>
      </SearchFilterContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
