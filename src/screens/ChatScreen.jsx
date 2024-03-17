import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Image, ScrollView, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-paper';
import SwipeUpDown from 'react-native-swipe-up-down';
import axios from 'axios';
// import BottomNavBar from '../components/BottomNavBar';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);

  const context = "Software security concerns the protection of software from malicious attacks. Memory allocation in computers separates code and data, with the heap growing towards higher addresses and the stack growing downwards from higher addresses. Buffer overflows occur when data is written beyond its allocated space, such as a 10th byte in a 9-byte array. In an exploitable buffer overflow, an attacker's inputs overflow into memory allocated for code, overwriting it with malicious instructions. To exploit this, attackers need to find buffer overflow opportunities that lead to executable code being overwritten and the right code to input. The location of the buffer overflow can affect the extent of the attack, as it determines the memory that is overwritten and the potential impact on the program or system."
  

  const sendChatRequest = async (message, setConversation) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: context },
            { role: 'user', content: message },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ',
          },
        }
      );

      // Add bot's response to the conversation
      setConversation((prevConversation) => [
        ...prevConversation,
        { role: 'bot', content: response.data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error('Error sending chat request:', error);
    }
  };

  const sendChatMessage = async () => {
    // Add user message to the conversation
    setConversation((prevConversation) => [
      ...prevConversation,
      { role: 'user', content: message },
    ]);

    // Send the user message to ChatGPT API and get the response
    await sendChatRequest(message, setConversation);

    // Clear the input field
    setMessage('');
  };

  return (
    <SwipeUpDown
      itemMini={<MiniChatScreen />}
      itemFull={<FullChatScreen conversation={conversation} message={message} setMessage={setMessage} sendChatMessage={sendChatMessage} />}
      style={styles.container}
      itemMiniStyle={styles.miniChatContainer} //
      extraMarginTop={100}
    />

  );
};

const MiniChatScreen = () => (
  <SafeAreaView >
    <View style={styles.miniContainer}>
      <Text style={styles.miniText}>Swipe up to open chat</Text>
    </View>
  </SafeAreaView>
);

const FullChatScreen = ({ conversation, message, setMessage, sendChatMessage }) => (
  <View style={styles.fullContainer}>
    <View style={styles.chatContent}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {conversation.map((msg, index) => (
          <View key={index} style={styles.messageContainer}>
            <Text
              style={[
                styles.message,
                msg.role === 'user' ? styles.userMessage : styles.botMessage,
              ]}
            >
              {msg.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>

    <KeyboardAvoidingView style={styles.inputArea} behavior="height" enabled>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="Type a message..."
        placeholderTextColor="#000"
      />
      <Button mode="contained" onPress={sendChatMessage}>
        Send
      </Button>
    </KeyboardAvoidingView>
  </View>
);

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#120537',
  },
  miniContainer: {

  },
  miniChatContainer: {

    height: 50, // Adjust this value to control the height of the mini chat screen
  },
  miniText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    textAlign: "center",
  },
  fullContainer: {
    display: "flex",
    backgroundColor: '#fff',
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "84%",
  },
  scrollContent: {
    flexGrow: 1,
  },
  chatContent: {
    position: "relative",
    // paddingTop: 400,
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    position: "absolute",
    bottom: 0,
  },
  input: {
    flex: 1,
    marginRight: 16,
    padding: 8,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 14,
    color: 'black',
  },
  messageContainer: {
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  message: {
    padding: 8,
    borderRadius: 8,
    maxWidth: '70%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#120537',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default ChatScreen;