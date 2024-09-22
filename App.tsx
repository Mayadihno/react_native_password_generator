import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
//form validation
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be a min of 4 characters')
    .max(16, 'Should be a max of 16 chatacters')
    .required('This is a required field'),
});
const App = () => {
  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
