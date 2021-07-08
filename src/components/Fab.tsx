import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
  iconName: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
}

export const Fab = ({ iconName, onPress, style }: Props) => {
  return (
    <View style={{ ...(style as any) }}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.fabButton}
      >
        <Icon name={iconName} color="white" size={32} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  fabButton: {
    zIndex: 100,
    height: 50,
    width: 50,
    backgroundColor: "black",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      height: 3,
      width: 0,
    },
    elevation: 6,
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
});
