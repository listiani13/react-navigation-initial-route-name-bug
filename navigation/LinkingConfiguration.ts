/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { getPathFromState, LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { Platform } from "react-native";

import { RootStackParamList } from "../types";

type NavigationState = NonNullable<Parameters<typeof getPathFromState>[0]>;
// We need to preserve previous state without modal / actionsheet so we dont render modal as page (that has link)
let prevStateWithoutModalAndActionSheet: NavigationState | undefined;

export function shouldHideScreenFromPath(screenName: string | undefined) {
	return screenName?.includes("Modal") && Platform.OS === "web";
}

const linking: LinkingOptions<RootStackParamList> = {
	prefixes: [Linking.createURL("/")],
	config: {
		initialRouteName: "Root",
		screens: {
			Root: {
				initialRouteName: "TabOne",
				path: "",
				screens: {
					TabOne: {
						screens: {
							TabOneScreen: "one",
						},
					},
					TabTwo: {
						screens: {
							TabTwoScreen: "two",
						},
					},
				},
			},
			Stack: {
				path: "Stack",
				initialRouteName: "A",
				screens: {
					A: "a",
					B: "b",
				},
			},
			Modal: "modal",
			NotFound: "*",
		},
	},
	getPathFromState: (state, options) => {
		const currentIndex = state.index;
		const currentScreenName = currentIndex
			? state.routes?.[currentIndex]?.name
			: undefined;
		if (
			shouldHideScreenFromPath(currentScreenName) &&
			prevStateWithoutModalAndActionSheet
		) {
			// Return previous path when we want the screen to not having its own path (eg Modal)
			return getPathFromState(prevStateWithoutModalAndActionSheet, options);
		}

		// Casting to NavigationState because kept running into mismatching `stale` type
		prevStateWithoutModalAndActionSheet = state as NavigationState;
		return getPathFromState(state, options);
	},
};

export default linking;
