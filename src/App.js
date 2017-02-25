import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line} from 'recharts'
import {Select, Button} from 'antd'
import 'antd/dist/antd.css'
const Option = Select.Option
import tween from './tween'
import _ from 'underscore'
import $ from './jquery'

const keys = _.keys(tween)

var nodes = keys.map(function (name) {
    return (
        <Option value={name} key={name}>{name}</Option>
    )
})
console.log(nodes)
var App = React.createClass({
    getInitialState(){
        return {
            value: 'linear',
            data:[]
        }
    },
    render() {
        return (
            <div className="App">

                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>

                <LineChart width={600} height={300} data={this.state.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="x"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="y" stroke="#82ca9d"/>
                </LineChart>
                <Select style={{width: 200}} value={this.state.value} onChange={(value) => this.change(value)}>
                    {nodes}
                </Select>

                <div id="box"></div>
            </div>
        );
    },
    change(value){
        this.setState({value})
        var fn = tween[value]
        var data = []
        for(var i=0;i<1.1;i+=0.1){
            data.push({x:i,y:fn(i,0,1,1)})
        }

        this.setState({
            value:value,
            data:data
        })
    },
    componentDidMount(){
        console.log($.easing)
        $("#box").animate({width:200},2000,'elasticIn')
    }
})

export default App;
