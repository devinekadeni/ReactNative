import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
    container: {
        alignItems: 'center'
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
    },
    iconTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '$white',
        letterSpacing: -0.5,
        marginTop: 20
    },
    imageStyle: {
        width: imageWidth,
        height: imageWidth
    },
    image: {
        width: imageWidth / 2,
        // height: imageWidth / 2
    }
});
