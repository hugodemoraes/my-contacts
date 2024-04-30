import { useEffect, useId, useRef, useState } from "react";
import { Alert, SectionList, Text, TouchableOpacity, View } from "react-native";
import * as Contacts from "expo-contacts";
import { Feather } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";

import { theme } from "@/theme";
import { Input } from "@/components/input";
import { Contact, ContactProps } from "@/components/contact";
import { Avatar } from "@/components/avatar";

import { styles } from "./styles";
import { Button } from "@/components/button";

type SectionListDataProps = {
  title: string;
  data: ContactProps[];
};

export function Home() {
  const [contacts, setContacts] = useState<SectionListDataProps[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState<Contacts.Contact>();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const fetchContacts = async () => {
    try {
      const { status } = await Contacts.requestPermissionsAsync();

      if (status === Contacts.PermissionStatus.GRANTED) {
        const { data } = await Contacts.getContactsAsync({
          name: name === "" ? undefined : name,
          sort: "firstName",
        });
        const list = data
          .map((contact) => ({
            id: contact.id ?? useId(),
            name: contact.name,
            image: contact.image,
          }))
          .reduce<SectionListDataProps[]>((acc: any, item) => {
            const firstLetter = item.name.charAt(0).toUpperCase();
            const existingEntry = acc.find(
              (entry: SectionListDataProps) => entry.title === firstLetter
            );

            if (existingEntry) {
              existingEntry.data.push(item);
            } else {
              acc.push({ title: firstLetter, data: [item] });
            }

            return acc;
          }, []);

        setContacts(list);
      }
    } catch (error) {
      console.log("[LOG]: ", error);
      Alert.alert("Contatos", "Não foi possível carregar os contatos.");
    }
  };

  const handleBottomSheetOpen = () => bottomSheetRef.current?.expand();

  const handleBottomSheetClose = () => bottomSheetRef.current?.snapToIndex(0);

  async function handleOpenDetails(id: string) {
    const response = await Contacts.getContactByIdAsync(id);
    setContact(response);
    handleBottomSheetOpen();
  }

  useEffect(() => {
    fetchContacts();
  }, [name]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Input style={styles.input}>
          <Feather name="search" size={16} color={theme.colors.gray_300} />
          <Input.Field
            placeholder="Pesquisar pelo nome"
            onChangeText={setName}
            value={name}
          />
          <TouchableOpacity onPress={() => setName("")}>
            <Feather name="x" size={16} color={theme.colors.gray_300} />
          </TouchableOpacity>
        </Input>
      </View>

      <SectionList
        sections={contacts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentList}
        renderSectionHeader={({ section }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <Contact contact={item} onPress={() => handleOpenDetails(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {contact && (
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={[0.01, 284]}
          handleComponent={() => null}
          backgroundStyle={styles.bottomSheet}
        >
          <Avatar
            name={contact.name}
            image={contact.image}
            variant="large"
            containerStyle={styles.image}
          />
          <View style={styles.bottomSheetContent}>
            <Text style={styles.contactName}>{contact.name}</Text>

            {contact.phoneNumbers && (
              <View style={styles.phoneNumber}>
                <Feather name="phone" size={18} color={theme.colors.gray_400} />
                <Text style={styles.phone}>
                  {contact.phoneNumbers[0].number}
                </Text>
              </View>
            )}

            <Button title="Fechar" onPress={handleBottomSheetClose} />
          </View>
        </BottomSheet>
      )}
    </View>
  );
}
