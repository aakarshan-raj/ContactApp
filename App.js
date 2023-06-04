import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useEffect,useState } from 'react';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

   useEffect(()=>{
    fetchContacts();},
    []);



  const fetchContacts = async function(){
    const {permissionStatus} = await Contacts.getPermissionsAsync();
      if(permissionStatus === "granted"){
         const {data} = await Contacts.getContainersAsync({
         fields:[Contacts.Fields.FirstName,Contacts.Fields.LastName,Contacts.Fields.PhoneNumbers],});
         
         if(data.length > 0){
              setContacts(data);
            }
        
       }
 }

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
      />
   </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
