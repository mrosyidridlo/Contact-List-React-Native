import { createStackNavigator, createAppContainer } from "react-navigation";

import ContactList from './screens/contactList/ContactList';
import ContactDetail from './screens/contactDetail/ContactDetail';
import ContactForm from './screens/contactForm/ContactForm';

const stackConfig = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#64b5f6'
        },
        headerTintColor: '#fff',
        headerTitStyle: {
            fontWeight: 'bold',
        },
    }
};

const stackNavigator = createStackNavigator({
    list: ContactList,
    detail: ContactDetail,
    form: ContactForm
}, stackConfig);

const root = createAppContainer(stackNavigator);

export default root;