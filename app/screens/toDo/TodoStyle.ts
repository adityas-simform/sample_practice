import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  txtInput: {
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    width: 200,
  },
  addBtnStyle: {
    backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginTop: 30,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  cross: {
    marginLeft: 20,
    fontSize: 20,
  },
  flatlist: {
    marginTop: 20,
  },
  add: {
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
