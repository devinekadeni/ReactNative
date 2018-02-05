import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
    $largeContainerSize: imageWidth * 3 / 4,
    $largeImageSize: imageWidth / 2,
    $smallContainerSize: imageWidth / 2,
    $smallImageSize: imageWidth * 1 / 3,
    container: {
        alignItems: 'center'
    },
    containerImage: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        // top: 0
    },
    iconTitle: {
        fontSize: 28,
        fontWeight: '600',
        color: '$white',
        letterSpacing: -0.5,
        marginTop: 20
    },
    imageStyle: {
        width: '$largeContainerSize',
        height: '$largeContainerSize' 
    },
    image: {
        width: '$largeImageSize',
        // height: imageWidth / 2
    }
});
