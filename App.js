import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
//importar o PhonicSoundButton aqui
import PhonicSoundButton from './components/PhonicSoundButton';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'purple'}
            centerComponent={{
              text: 'Fonemas!',
              style: {
                color: 'white',
                fontSize: 30,
                 fontFamily: 'Montserrat',
              },
            }}
          />

          <Image
            style={styles.imageIcon}
            source={{
              uri: 'https://cdn.icon-icons.com/icons2/2076/PNG/512/chat_communication_message_talk_icon_127217.png',
            }}
          />



          <TextInput
            style={styles.inputBox}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.goButton}
            
            onPress={() => {

            var word = this.state.text.toLowerCase().trim();
              console.log(word);
              db[word]
                ? (this.setState({ chunks: db[word].chunks }),
                  this.setState({ phonicSounds: db[word].phones }))
                : alert('a palavra não existe');

            }}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableOpacity>






          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundButton
                  wordChunk={this.state.chunks[(item, index)]}
                  soundChunk={this.state.phonicSounds[(item, index)]}
                  buttonIndex={index}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    borderColor: 'purple',
    outline: 'none',
    borderRadius: 20,
    color: 'purple',
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
  },
  goButton: {
    backgroundColor: 'yellow',
    width: '20%',
    borderRadius: 15,
    height: 65,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },

  buttonText: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 30,
    color: 'purple',
  },
  imageIcon: {
    width: 200,
    height: 200,
    marginLeft: 70,
    marginTop: 95,

  },
});
