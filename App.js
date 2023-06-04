import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useEffect,useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

   useEffect(()=>{
    fetchContacts();},
    []);


const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  };

 const inputSearch = function(input_data){
   setSearchText(input_data);
   const filtered = contacts.filter((contact)=>{
      contact.firstName.toLowerCase().includes(input_data.toLowerCase())
   })
   setContacts(filtered);

 }

  return (
   <View style={styles.container}>
      <TextInput
        placeholder='Search Contacts'
        onChangeText={inputSearch}
        value={searchText}
        style={styles.input}
      />
    <FlatList
  data={contacts}
  renderItem={(contact ) => (
    <TouchableOpacity>
      <Text>{contact.firstName}</Text>
     
        <Text>{contact.item.phoneNumbers[0].number}</Text>
      
    </TouchableOpacity>
  )}
/>
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
