import React, { Component } from 'react';
import { connect } from 'react-redux';

class LibraryList extends Component {
    render() {
        console.log(this.props);
        return;
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

