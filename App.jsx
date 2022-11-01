import { StyleSheet, Text, View } from "react-native";
import EventCalenderComponent from "./src/components/molecules/eventCalendar.component";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

// screens & components
import HomeScreen from "./src/screens/home.screen";
import Example from "./src/components/atoms/dateTime";
import HomeTabNavigator from "./src/navigator/homeTabNavigator";
import FilterComponent from "./src/screens/searchFilter.screen";
import { SearchFilterContextProvider } from "./src/contexts/filterContext";
import QueryScreen from "./src/screens/query.screen";
import People from "./src/screens/people";
import PostQueryScreen from "./src/screens/PostQuery.screen";
import { PostQueryContextProvider } from "./src/contexts/discussionContext";

// contexts

const Stack = createStackNavigator();

export default function App() {
  return (
    
    <NavigationContainer>
      {/* this context provider provides filter state */}
      <SearchFilterContextProvider> 
        <PostQueryContextProvider>
          <Stack.Navigator screenOptions={{ header: () => null }}>
            <Stack.Screen name="HomeTab" component={HomeTabNavigator} />
            <Stack.Screen name="FilterScreen" component={FilterComponent} />
            <Stack.Screen name="QueryScreen" component={QueryScreen} />
            <Stack.Screen name="DateTimePicker" component={Example} />
            <Stack.Screen name="PeopleScreen" component={People} />
            <Stack.Screen name="PostQueryScreen" component={PostQueryScreen} />
            
          </Stack.Navigator>
        </PostQueryContextProvider>
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
