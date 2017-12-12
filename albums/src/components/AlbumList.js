import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import axios from 'axios';
import AlbumDetails from './AlbumDetails';

/*FUNCTIONAL COMPONENT*/ 
/*Functional digunakan hanya untuk menampilkan saja tanpa get data*/ 
// const AlbumList = () => {
//     return (
//         <View>
//             <Text>AlbumList</Text>
//         </View>
//     ); 
// };

/*CLASS COMPONENT ==> should have at least 1 method*/ 
/*Class digunakan saat dibutuhkan proses pengambilan data untuk ditampilkan*/
class AlbumList extends Component {
    // debugging() {
    //     console.log('hallo');
    //     debugger;
    // }

    state = { albums: [] };   //penampung data sementara untuk http
    componentWillMount() {
        axios.get('https://rallycoding.herokuapp.com/api/music_albums')
            .then(response => this.setState({ albums: response.data })); //isi data state dengan setState
    }

    renderAlbums() {
        return this.state.albums.map(album =>           //map => iteration value of array
        <AlbumDetails key={album.title} album={album} />); //harus ada key dan unique
    }

    render() {
        return (
            <ScrollView>
                { this.renderAlbums() }
            </ScrollView>
        );
    }
}
export default AlbumList;
