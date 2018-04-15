import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

class SignUpForm extends Component {
  render() {
    return (
      <View>
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput />
        </View>
        <Button title="Submit" />
      </View>
    );
  }
}

export default SignUpForm;
