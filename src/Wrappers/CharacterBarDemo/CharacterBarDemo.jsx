import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Contacts from "./Contacts.json";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import CharacterBar from "../../Components/CharacterBar";
import { FlashList } from "@shopify/flash-list";

const ITEM_HEIGHT = 50;
const GAP = 0;

const Contact = memo(({ name, phone }) => {
  return (
    <View style={styles.contact}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
});

export default function CharacterBarDemo() {
  const [search, setSearch] = useState("");
  const list = useRef();
  const Filtered = useMemo(
    () =>
      Contacts.filter((contact) =>
        contact.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );
  const INDICES = useMemo(
    () =>
      Characters.map((character) => ({
        character,
        index: Filtered.findIndex((c) => c.name.startsWith(character)),
      })),
    [search]
  );
  const getItemLayout = useCallback(
    (_, index) => ({
      offset: index * ITEM_HEIGHT + index * GAP,
      length: ITEM_HEIGHT,
      index,
    }),
    []
  );
  const handleChangeCharacter = (character) => {
    const index = INDICES.find((c) => c.character === character).index;
    if (index >= 0) list.current.scrollToIndex({ animated: false, index });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          value={search}
          onChangeText={setSearch}
          placeholder="Search Contacts..."
          placeholderTextColor={"#505050"}
        />
      </View>
      <FlatList
        ref={list}
        data={Filtered}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={getItemLayout}
        estimatedItemSize={ITEM_HEIGHT}
        renderItem={({ item }) => (
          <Contact name={item.name} phone={item.phone} />
        )}
      />
      <CharacterBar
        onChangeCharacter={handleChangeCharacter}
        characters={Characters}
        containerStyle={styles.characterBar}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  contentContainer: {
    padding: 10,
    paddingTop: 0,
  },
  contact: {
    flexDirection: "row",
    height: ITEM_HEIGHT,
    alignItems: "center",
    paddingLeft: 10,
    width: "90%",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  characterBar: {
    position: "absolute",
    right: 10,
    top: 150,
    borderRadius: 15,
  },
  name: {
    fontSize: 14,
    color: "#101010",
    fontWeight: "bold",
  },
  phone: {
    fontSize: 12,
    color: "#303030",
  },
  searchBar: {
    color: "#000",
    backgroundColor: "#EEE",
    borderRadius: 25,
    fontSize: 14,
    padding: 10,
    paddingHorizontal: 15,
  },
  searchBarContainer: {
    padding: 10,
  },
});

const Characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
