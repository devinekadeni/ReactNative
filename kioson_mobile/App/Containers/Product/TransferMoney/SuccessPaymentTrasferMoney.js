import React, { Component } from 'react'
import { View, Image, Text, StatusBar } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { NavigationActions } from 'react-navigation'
import ThousandFormat from '../../../Services/ThousandFormat'
import styles from '../../Styles/SuccessTrasferMoneyStyle'
import { Images, Colors } from '../../../Themes/'
import ButtonFooter from '../../../Components/ButtonFooter'
import HeaderSuccessPayment from '../../../Components/HeaderSuccessPayment'
import StatusPayment from '../../../Components/StatusPayment'
import I18n from '../../../I18n'

class SuccessPaymentTrasferMoney extends Component {
  constructor (props) {
    super(props)
    const { params } = this.props.navigation.state
    this.state = {
      status: 0,
      transferAmount: params.transferAmount,
      senderName: params.senderName,
      senderMobileNumber: params.senderMobileNumber,
      bankChoose: params.bankChoose,
      destinationNumber: params.destinationNumber,
      destinationName: params.destinationName,
      totalPrice: params.totalPrice
    }
  }

  componentDidMount () {
    setTimeout(() => { this.setState({status: 2}) }, 4000)
  }

  renderStatus (status) {
    if (status === 0) {
      return (
        <View style={styles.statusBox} >
          <View style={[styles.rowCenter]}>
            <Text style={[styles.robotoRegularMedSquas, { flex: 1, flexWrap: 'nowrap' }]}>{I18n.t('l_procces')}</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, {flex: 2}]}>Menunggu konfirmasi dari operator.</Text>
          </View>
        </View>
      )
    }

    if (status === 1) {
      return (
        <View style={styles.statusBox} >
          <View style={styles.rowCenter}>
            <Text style={[styles.robotoRegularMedSquas, { flex: 1, flexWrap: 'nowrap' }]}>{I18n.t('l_balanceFail')}</Text>
            <View style={styles.sparator} />
            <Text style={[styles.robotoRegularMedLeft, { flex: 2 }]}>{I18n.t('l_paymentFail')}</Text>
          </View>
        </View>
      )
    }

    if (status === 2) {
      return (
        <View style={[styles.statusBox, {backgroundColor: Colors.squash}]} >
          <Text style={styles.robotoRegularMedCenter}>{I18n.t('l_succes')}</Text>
        </View>
      )
    }
  }

  goToHome () {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'BottomNav' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    const {navigation} = this.props
    let isDisable = true
    if (this.state.status === 2 || this.state.status === 0) {
      isDisable = false
    }
    var amountTransfer = ThousandFormat(+this.state.transferAmount)
    var totalPrice = ThousandFormat(+this.state.totalPrice)
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor='#f7981d' />
        <HeaderSuccessPayment loan navigates={'Help'} navigation={navigation} />
        <StatusPayment status={this.state.status} isDisable={isDisable} />
        <View style={styles.flexBigColumn} >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.maskedLogo} >
              <Image source={Images.ic_transfer} style={styles.iconSquareMedium} resizeMode='contain' />
            </View>
            <Text style={styles.robotoMediumBlue}>#433WSJCX</Text>
            <Text style={styles.robotoRegularSmallGrey}>{I18n.t('l_transfermoney')} {amountTransfer}</Text>
            <Text style={styles.robotoBoldSmallGrey}>{this.state.bankChoose} {this.state.destinationNumber}</Text>
            <Text style={[styles.robotoRegularSmallGrey]}>Rp {totalPrice}</Text>
          </View>
          <ButtonFooter
            onPressHome={() => this.goToHome()}
            onPressHistory={() => this.props.navigation.navigate('History')} />
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SuccessPaymentTrasferMoney)
