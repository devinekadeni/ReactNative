import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
    container: {
        alignItems: 'center'
    },
    wrapper: {
        // flex: 1,
        flexDirection: 'row',
        paddingTop: 14,
        alignItems: 'center',
    },
    icon: {
        width: 21,
        marginRight: 12
    },
    reverseText: {
        fontSize: 14,
        paddingVertical: 12,
        color: '$white',
    }
});
