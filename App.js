import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
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
   const filtered = contacts.filter((contact)=>
      contact.firstName.toLowerCase().includes(input_data.toLowerCase())
      );
   setContacts(filtered);

 }

 const handlePress = function(item){
  setSelectedContact(item);
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
     renderItem={({item}) => (
    <TouchableOpacity  style={styles.contactItem}
    onPress={ () => handlePress(item)}
    >
        <Text style={styles.contactName}>{item.firstName}</Text>
     
        <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
      
    </TouchableOpacity>
  )}
/>

<Modal visible={selectedContact !== null} animationType="slide">
        <View style={styles.modalContainer}>
          {selectedContact && (
            <View style={styles.contactModal}>
              <Text style={styles.contactName}>{selectedContact.firstName}</Text>
              {selectedContact.phoneNumbers && (
                <Text style={styles.contactNumber}>
                  {selectedContact.phoneNumbers[0].number}
                </Text>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedContact(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>


   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor:'white',
    fontSize:20
  },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  contactName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  contactNumber: {
    fontSize: 16,
    marginBottom: 20,
    color:'white'

  },
  modalContainer: {
    backgroundColor:'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactModal: {
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
});
