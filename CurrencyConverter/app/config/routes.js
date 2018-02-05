import { StackNavigator } from 'react-navigation';
import { StatusBar } from 'react-native';
import Home from '../screens/Home';
import CurrencyList from '../screens/CurrencyList';
import Options from '../screens/Options';
import Themes from '../screens/Themes';

export default StackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                header: () => null,
            },
        },
        CurrencyList: {
            screen: CurrencyList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
            })
        },
        Options: {
            screen: Options,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
            })
        },
        Themes: {
            screen: Themes,
            navigationOptions: ({ navigation }) => ({
                headerTitle: navigation.state.params.title,
            })
        }
    }, {
        mode: 'modal', //ganti halamannya slide dari bawah, default kanan-kiri
        cardStyle: { paddingTop: StatusBar.currentHeight },
    },
);
