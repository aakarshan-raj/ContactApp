import { StyleSheet, Text, View,useState,useEffect } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

   useEffect(
    []);



    const fetchContacts = async function(){

    }

  return (
    <Text></Text>
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
