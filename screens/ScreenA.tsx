import { Button, StyleSheet, TouchableOpacity } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export default function ScreenA({
	navigation,
}: RootStackScreenProps<"NotFound">) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Screen A</Text>
			<Button
				title="Go To B"
				onPress={() => navigation.navigate("Stack", { screen: "B" })}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		marginTop: 15,
		paddingVertical: 15,
	},
	linkText: {
		fontSize: 14,
		color: "#2e78b7",
	},
});
