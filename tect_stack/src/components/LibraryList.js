import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import ListItem from './ListItem';

class LibraryList extends Component {
    componentWillMount() { //lifecycle method before render
        /*copy paste-able di documentation (konfigurasi awal listview)*/
        const ds = new ListView.DataSource({   //konfigurasi awal, banyak method di dalem DataSource
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(this.props.libraries); //masukin datasource ke var untuk dirender
        /*copy paste-able*/
    }

    /*method bawaan*/
    renderRow(library) { //arg library = element in the listview yg bakal dirender (this.datasource)
        return <ListItem library={library} />;
    }

    render() {
        // console.log(this.props);
        return (
            <ListView
                dataSource={this.dataSource}    //list of item
                renderRow={this.renderRow}      //to tell listview how to render list of item
            />
        );
    }
}

const mapStateToProps = state => { //state sebagai penampung variable state global yg ada di store
    return { libraries: state.libraries2 };  //dengan mereturn object di sini, maka hasilnya akan jadi props di component LibraryList (render())
    // console.log(state);
};
//variable state itu dilempar di connect() supaya bisa terbaca
export default connect(mapStateToProps)(LibraryList); 
//connect called -> return function -> which is LibraryList function (2steps function)
//connect adalah helper yg digunakan untuk merequest data dari provider

