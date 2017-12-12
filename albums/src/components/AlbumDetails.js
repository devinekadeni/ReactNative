import React from 'react';
import { View, Text, Image } from 'react-native';
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const AlbumDetails = ({ album }) => {    //mempermudah dari (props)
    const { thumbnail_image, title, artist, image } = album;   //mempermudah dari props.album.title
    const { thumbnailStyle, containerTextStyle, containerThumbnailStyle, titleStyle, imageStyle } = style;    //memperudah dari style.text 
// const AlbumDetails = (props) => {
    return (
        <Card>
            <CardSection>
                <View style={containerThumbnailStyle}>
                    <Image style={thumbnailStyle} source={{ uri: thumbnail_image }} />
                </View>
                <View style={containerTextStyle} >
                    <Text style={titleStyle}>{title}</Text>
                    <Text>{artist}</Text>
                </View>
            </CardSection>
            <CardSection>
                <Image
                    style={imageStyle}
                    source={{ uri: image }}
                />
            </CardSection>
            <CardSection>
                <Button onPressBtn={() => console.log('pressed!')}/>
            </CardSection>
        </Card>
    );
};

const style = {
    thumbnailStyle: {
        width: 50,
        height: 50
    },
    containerTextStyle: {
        justifyContent: 'space-around',
        flexDirection: 'column'
    },
    containerThumbnailStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    titleStyle: {
        fontSize: 18
    },
    imageStyle: {
        flex: 1,        //supaya width nya sepanjang device
        width: null,    //supaya width nya sepanjang device
        height: 300
    }
};

export default AlbumDetails;
