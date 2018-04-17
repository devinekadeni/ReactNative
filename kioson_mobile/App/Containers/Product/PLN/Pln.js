import React, { Component } from 'react'
import {
  View,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Colors } from '../../../Themes/index'
import Tabs from '../../../Components/Tabs'
import PlnPrePaid from './PlnPrePaid'
import PlnPostPaid from './PlnPostPaid'
import CashBalance from '../../../Components/CashBalance'
import I18n from '../../../I18n'

// Styles
import styles from '../../Styles/PlnStyle'

class Pln extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' backgroundColor={Colors.squash} />
        <CashBalance navigation={navigation} />
        <Tabs>
          <PlnPrePaid title={I18n.t('t_token_listrik')} navigation={navigation} />
          <PlnPostPaid title={I18n.t('t_tagihan_listrik')} navigation={navigation} />
        </Tabs>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pln)
