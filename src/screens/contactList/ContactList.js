import React, { Component } from 'react';

import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from './ContactList.styles';

import axios from 'axios';
import { baseUrl } from '../../constants';
import FAB from 'react-native-fab';

export default class ContactList extends Component {
    static navigationOptions = {
        title : 'Contacs',
    }
    constructor(props) {
        super(props);
        this.state = {
            contactsList: [
                {
                    id: 'abc',
                    firstname: 'Luke',
                    lastName: 'Skywalker',
                    photo: 'http://assets1.ignimgs.com/2018/02/21/lukeskywalker-1519252298974_1280w.jpg'
                },
            ]
        }
    }

    componentDidMount() {
        this._getContacts();
    }

    _getContacts = () => {
        const contactsUrl = `${baseUrl}/contact`;
        axios.get(contactsUrl)
            .then(response =>{
                const contacts = response.data.data;
                this.setState({
                    contactsList: contacts
                })
            }) .catch( error => console.log(error) );
    };

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => (
        <TouchableOpacity style={styles.list}>
            <Image 
                source={{ uri: item.photo}}
                style={styles.image}
            />
            <Text style={styles.listText}>
                {`${item.firstName} ${item.lastName}`}
            </Text>
        </TouchableOpacity>
    );

    _openDetailContact = () => {
        this.props.navigation.navigate('detail');
    };

    _openDetailForm = () => {
        this.props.navigation.navigate('form');
    };
    render () {
        return (
            <View style={styles.container}>
                {/* <TouchableOpacity onPress={this._openDetailContact}>
                    <Text>Go To Detail</Text>
                </TouchableOpacity> */}
                <FlatList
                    data={this.state.contactsList}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
                <FAB 
                    visible={true}
                    buttonColor={'#64b5f6'}
                    onClickAction={this._openDetailForm}
                />
            </View>
        );
    }
}
