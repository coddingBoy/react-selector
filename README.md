# react-selector
 it is used for select the item according to the side bar main elements. it can ancho the list that is included by the main element when you touch move the side bar.

# How to use
 install from npm i react-seletor. and import the <SlideSelector> component. and then pass the data prop that required to be an object. for example,


  import React, { Component, PropTypes } from 'react'
  import SlideSelect from './SlideSelect'
  import * as _ from 'lodash'


  class App extends Component {

      getData(addressList) {
          return {
              list: _.groupBy(addressList, "firstCapitial"),
              show: 'city'
          }
      }


      render() {
          return (
              <div>
                  <SlideSelect data={this.getData(addressList)}/>
              </div>
          )
      }
  }


#Note
this is the test version, the stable version will be update to 2.0.0