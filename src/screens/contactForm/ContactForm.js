import React, { Component } from 'react';

import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import FormInput from '../../components/forminput/forminput.component';
// import styles from '../contactList/ContactList.styles';
import styles from './ContactForm.styles';
import axios from 'axios';
import { StackActions, NavigationActions } from 'react-navigation';
import { baseUrl } from '../../constants';

// import axios from 'axios';
// import { baseUrl } from '../../constants';
// import FAB from 'react-native-fab';

export default class ContactForm extends Component {
    static navigationOptions = {
        title : 'Insert Contacs',
    };
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            age: 0,
            photo: ''
        };
    }

    _setState = (formName) => (value) => {
          this.setState({ [formName]: value }); 
      }

    _insertContact = () => {
        const postUrl = `${baseUrl}/contact`;
        const { firstName, lastName, age, photo} = this.state;
    
        const contact = {
            firstName,
            lastName,
            age: parseInt( age, 10),
            photo
        };

        // alert(JSON.stringify(contact));
        axios.post(postUrl, contact)
            .then(response => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'list' })]
                })
                this.props.navigation.dispatch(resetAction);
            })
            .catch(e => {
                alert(e);
            })
    };

    _renderForm = () => {
        const {firstName, lastName, age, photo} = this.state;

        return ( 
            <View style={styles.formContainer}>
                <FormInput 
                    formName={'firstName'}
                    setFormStateCallback={this._setState}
                    label={'First Name'}
                    value={firstName}
                />
                <FormInput 
                    formName={'lastName'}
                    setFormStateCallback={this._setState}
                    label={'lastName'}
                    value={lastName}
                />
                <FormInput 
                    formName={'age'}
                    setFormStateCallback={this._setState}
                    label={'age'}
                    value={age}
                />
                <FormInput 
                    formName={'photo'}
                    setFormStateCallback={this._setState}
                    label={'photo'}
                    value={photo}
                />
            </View>
        ) ;
    };

    render () {
        return (
            <View style={{ flex: 1 }}>
                {this._renderForm()}
                <View style={{ margin: 16 }}>
                    <TouchableOpacity
                        onPress={this._insertContact}
                        style={styles.submitButton}
                    >
                        <Text style={styles.submitText}>
                            SUBMIT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
