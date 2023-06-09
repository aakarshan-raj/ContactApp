import { StyleSheet, Text, View, TextInput, FlatList, TouchableOpacity, Modal } from 'react-native';
import { useEffect,useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [searchText, setSearchText] = useState('');
  const [showContacts, showSetContacts] = useState([]);
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);

   useEffect(()=>{
    fetchContacts();},
    []);


const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.FirstName,Contacts.Fields.LastName ,Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const updatedContacts = data.map(contact => {
          if (contact.lastName) {
            return {
              ...contact,
              firstName: `${contact.firstName} ${contact.lastName}`,
            };
          }
          return contact;
        });
  
        setContacts(updatedContacts);
        showSetContacts(updatedContacts);
      }
    }
  };

 const inputSearch = function(input_data){
   setSearchText(input_data);
   const filtered = contacts.filter((contact)=>
      contact.firstName.toLowerCase().includes(input_data.toLowerCase())
      );
   showSetContacts(filtered);

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
     data={showContacts}
     renderItem={({item}) => (
    <TouchableOpacity  style={styles.contactItem}
    onPress={ () => handlePress(item)}
    >
        <Text style={styles.contactName}>{item.firstName}</Text>
        {item.phoneNumbers && (
        <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
        )}
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
                <Text style={styles.closeButtonText}>Close   X</Text>
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
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor:'#101210'
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
    backgroundColor:'#101210',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactModal: {
    width:'50%',
    height:'30%',
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: 'center',
  },
  closeButton: {
    marginTop:20,
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});
