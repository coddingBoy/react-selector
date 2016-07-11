/**
 * Created by lx on 30/6/2016.
 */

import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
//import { connect } from 'react-redux'
import { hashHistory } from 'react-router'
//import TitleBar from "../../product/components/TitleBar"
import ReactIScroll from "iscroll-react"
import iScroll from "iscroll"
import * as _ from 'lodash'
//import {utils} from "../../../root/libs/utils"
//import {setInsuredInfo, queryProCityAreaList, checkDistrictInsuranceState} from "../actions/index"

export default class SlideSelect extends Component {
    static defaultProps = {
        options: {
            mouseWheel: true,
            scrollbars: true
        }
    }
    static PropTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props)
        this.handleTouchMove = this.handleTouchMove.bind(this)
        this.handleTouchTap = this.handleTouchTap.bind(this)
        this.state = {
        }
    }
    renderList() {
        let firstCaptiialRowStyle = {
            width: '100%',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            background: '#eee',
            padding: '10px 0',
            margin: '5px 0'
        }
        let array = [],
            keyIndex = 0,
            letterList = []
        _.forEach(this.props.data.list, (values, key) => {
            letterList.push(<li key={keyIndex++} className="letterBarItems" style={{height: '4%'}}>{key}</li>)
        array.push(<dt key={keyIndex++} className="firstCapitialRow" style={firstCaptiialRowStyle}>{key}</dt>)
        _.forEach(values, (value) => {
            array.push(<dd className="selectItems" key={keyIndex++} style={{padding: '5px 10px'}}>{value[this.props.data.show]}</dd>)
    })
    })
        return {
            letterList: letterList,
            addressList: array
        }
    }
    componentDidUpdate() {
        this.renderList()
    }

    //slide sidebar to local the element that equal to the sidebar element
    handleTouchMove(e) {
        e.preventDefault()
        let titles = document.getElementsByClassName('firstCapitialRow'),
            letterBarItem = document.getElementsByClassName('letterBarItems')[0],
            letterBar = document.getElementsByClassName('letterBar')[0],
            nodeNum = titles.length,
            y = e.targetTouches[0].clientY,
            targetOffsetTop = parseFloat(getComputedStyle(letterBar).top),
            nodeHeight = parseFloat(getComputedStyle(letterBarItem).height),
            curNode = (parseInt(y) - targetOffsetTop) / nodeHeight
        //console.log(y)
        if (curNode >= 0 && curNode < nodeNum) {
            //window.scrollTo(0, titles[Math.floor(curNode)].offsetTop)
            new iScroll('#wrapper').scrollTo(0, -(titles[Math.floor(curNode)].offsetTop))
        }

    }

    handleTouchTap(e) {
        e.preventDefault()
        let tar = e.target
        if (tar.className === 'selectItems') {
            console.log(tar.innerHTML)
            //hashHistory.push(`/invest/confirmInsured/${tar.innerHTML}/address/holder`)
        }
    }

    render() {
        let letterBar = {
            listStyle: 'none',
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: '10px'
        }
        return (
            <div>
            <ReactIScroll iScroll={iScroll} onScrollStart={this.onScrollStart}>
    <dl
        onTouchTap={this.handleTouchTap}>
        {this.renderList().addressList}
    </dl>
        </ReactIScroll>
        <ul id="wrapper"
        className="letterBar"
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchMove}
        style={letterBar}>
            {this.renderList().letterList}
    </ul>
        </div>
    )
    }
}