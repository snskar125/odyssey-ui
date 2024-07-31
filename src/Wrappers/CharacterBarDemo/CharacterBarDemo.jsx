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

const ITEM_HEIGHT = 50;
const GAP = 10;

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
          placeholderTextColor={"#808080"}
        />
      </View>
      <FlatList
        ref={list}
        data={Filtered}
        contentContainerStyle={styles.contentContainer}
        getItemLayout={getItemLayout}
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
    backgroundColor: "#101010",
  },
  contentContainer: {
    padding: 10,
    paddingTop: 0,
    gap: GAP,
  },
  contact: {
    flexDirection: "row",
    height: ITEM_HEIGHT,
    alignItems: "center",
    paddingLeft: 10,
    borderLeftColor: "#3B81F6",
    borderLeftWidth: 2,
    backgroundColor: "#202020",
  },
  characterBar: {
    position: "absolute",
    right: 0,
    top: 150,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: "#101010",
  },
  name: {
    fontSize: 14,
    color: "#F2F5F7",
    fontWeight: "bold",
  },
  phone: {
    fontSize: 12,
    color: "#F2F5F7",
  },
  searchBar: {
    color: "#F2F5F7",
    backgroundColor: "#202020",
    borderRadius: 3,
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
