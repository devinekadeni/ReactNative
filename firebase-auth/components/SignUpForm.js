import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { FormInput, FormLabel, Button } from 'react-native-elements';

const ROOT_URL = 'https://us-central1-one-time-password-7a29b.cloudfunctions.net';

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      phone: '',
    };
  }

  // state = { phone: '' } //ES6

  handleSubmit = () => {  //ES6
    axios.post(`${ROOT_URL}/createUser`, { phone: this.state.phone })
      .then(() => {
        axios.post(`${ROOT_URL}/requestOneTimePassword`, { phone: this.state.phone })
      })
  }

  handleSubmit() {

  }

  render() {
    return (
      <View>
        <View>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
        </View>
        <Button
          title="Submit" 
          // onPress={this.handleSubmit.bind(this)}
          {onPress}={this.handleSubmit} //ES6
        />
      </View>
    );
  }
}

export default SignUpForm;
