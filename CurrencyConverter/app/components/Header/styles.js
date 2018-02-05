import EStylesheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

export default EStylesheet.create({
    container: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        '@media ios': {
            paddingTop: 20,
        },
        '@media android': {
            paddingTop: StatusBar.currentHeight,
        }
    },
    button: {
        alignSelf: 'flex-end',
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    icon: {
        width: 20,
        
    }
});
