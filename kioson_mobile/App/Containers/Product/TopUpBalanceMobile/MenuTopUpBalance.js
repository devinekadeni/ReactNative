import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Tabs from '../../../Components/Tabs'
import FormPulsa from './FormPulsa'
import FormPaketData from './FormPaketData'
import CashBalance from '../../../Components/CashBalance'
import I18n from '../../../I18n'

import styles from '../../Styles/MenuTopUpBalanceStyle'

class MenuTopUpBalance extends Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <CashBalance navigation={navigation} />
        <Tabs>
          <FormPulsa title={I18n.t('l_mobileRecharge')} navigation={navigation} />
          <FormPaketData title={I18n.t('l_mobileDataRecharge')} navigation={navigation} />
        </Tabs>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    presetMobile: state.rechargeMobile.getRechargeMobile.payload,
    confirmationMobile: state.rechargeMobile.getConfirmationRechargeMobile.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTopUpBalance)
