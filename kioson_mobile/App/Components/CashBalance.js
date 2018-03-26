import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/CashBalanceStyle'
import accounting from 'accounting'
import { Images } from '../Themes/index'
import I18n from '../I18n'
import { ratioWidth, ratioHeight } from '../Transforms/Resize'
import { connect } from 'react-redux'
import profileActions from '../Redux/ProfileRedux'

class CashBalance extends Component {
  constructor (props) {
    super(props)
    this.submiting = {
      balance: false
    }
    this.state = {
      loading: true
    }
  }

    // this is this is unnecessary

  // componentDidMount () {
  //   const {balance} = this.state
  //   if (balance.status) {
  //   } else {
  //     AsyncStorage.getItem('token').then((value) => {
  //       if (value === null || value === undefined || value === '') {
  //       } else {
  //         this.props.getBalance(value)
  //       }
  //     })
  //   }
  // }

  // componentWillReceiveProps (nextProps) {
  //   const { balance } = nextProps

  //   if (balance !== null) {
  //     if (balance.code === 200 && balance.status) {
  //       if (balance.data.length !== 0) {
  //         this.setState({
  //           balance: balance.data,
  //           loading: false
  //         })
  //       }
  //     } else if (!balance.status && balance.code !== 0) {
  //       ToastAndroid.show(balance.message, ToastAndroid.SHORT)
  //       this.setState({
  //         loading: false
  //       })
  //       balance.code = 0
  //     }
  //   }
  // }

  render () {
    const { navigation, balance } = this.props
    var tempBalance = balance.payload ? balance.payload.data.total_sales : 0
    var options = {
      symbol: 'Rp ',
      decimal: ',',
      thousand: '.',
      precision: 0,
      format: '%s%v'
    }
    var maskedMoney = accounting.formatMoney(tempBalance, options)
    return (
      <View style={styles.flexRow}>
        <Image source={Images.ic_saldo} style={styles.icon} />
        <View style={{flexDirection: 'row', flex: 1}}>
          <Text style={styles.textBoldMedium}>
            {I18n.t('l_balance')}
          </Text>
          <Text style={styles.textRegularMedium}>
            {maskedMoney}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('BalanceTopUp')}>
          <View style={styles.btnIsiSaldo}>
            <Image style={{ width: ratioWidth(10), height: ratioHeight(10) }} source={Images.ic_plus} resizeMode={'stretch'} />
            <Text style={styles.textIsiSaldo}>
              SALDO
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    balance: state.profile.getBalance
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getBalance: (token) => dispatch(profileActions.getBalanceRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CashBalance)
