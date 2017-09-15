/**
 * hydrate-store-wrapper.js - HOC helper to synchronise and hydrate data before the app will start
 * react-native-web-storage
 *
 * Created by Peter Kowalczyk on 07/01/17.
 * Copyright © 2017 Aurity. All rights reserved.
 *
 */
import React, { Component } from 'react'
import { View } from 'react-native'
import hydrateStore from './hydrate-store'

class HydrateStore extends Component {
  static defaultProps = {
    loading: (<View />)
  }
  constructor(props) {
    super(props)
    this.state = {
      hydratingFinished: false,
    }
  }

  componentDidMount() {
    hydrateStore()
      .then(this.startApp)
      .catch(this.startApp)
  }

  startApp = () => {
    this.setState({hydratingFinished: true})
  }

  render() {
    const Loading = this.props.loading
    const { hydratingFinished } = this.state
    if (hydratingFinished) {
      return React.Children.only(this.props.children)
    }else {
      return (<Loading />)
    }
  }
}

export default HydrateStore
