import { StyleSheet } from "react-native";

import { theme } from "@/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray_200,
  },
  header: {
    width: "100%",
    height: 132,
    backgroundColor: theme.colors.blue,
    justifyContent: "flex-end",
    paddingHorizontal: 24,
    zIndex: 1,
  },
  input: {
    marginBottom: -27,
  },
  section: {
    backgroundColor: theme.colors.blue,
    width: 34,
    height: 34,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: theme.fontFamily.bold,
    color: theme.colors.white,
  },
  contentList: {
    padding: 24,
    gap: 12,
    paddingTop: 64,
  },
  separator: {
    width: "100%",
    height: 8,
  },
  bottomSheet: {
    backgroundColor: "transparent",
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: theme.colors.gray_100,
    borderTopStartRadius: 32,
    borderTopEndRadius: 32,
    paddingTop: 64,
    padding: 32,
    alignItems: "center",
  },
  image: {
    marginBottom: -50,
    zIndex: 1,
    alignSelf: "center",
  },
  contactName: {
    fontSize: 32,
    fontFamily: theme.fontFamily.bold,
  },
  phoneNumber: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 32,
    marginTop: 12,
  },
  phone: {
    fontSize: 18,
    fontFamily: theme.fontFamily.medium,
    color: theme.colors.gray_400,
  },
});
