// 参考記事　https://cpoint-lab.co.jp/article/202001/13526/
import React, { Component, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker/dist/es"
import "react-datepicker/dist/react-datepicker.css";
import ja from 'date-fns/locale/ja';
import { functionFields } from "./MyFunction";
import './simulation.css';
import getMonth from 'date-fns/getMonth'
import getYear from 'date-fns/getYear'
import _ from 'lodash'



export default class CalenderTwo extends Component{
  state={
    calenderPosition:'',
  }
  
  componentDidMount () {
    if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
      this.setState({calenderPosition:'top-end'});
    } else {
      this.setState({calenderPosition:'bottom-end'});
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  
  constructor(props) {
    //var year = String(new Date().getFullYear());
    //var calenderFixMonth = new Date(year, "11");
    var todayDate = new Date();
    var calenderFixMonth = new Date(
          String(todayDate.getFullYear()), 
          String(todayDate.getMonth()), 
          String(todayDate.getDate()) 
        );

    super(props);
    this.state = {
      day: calenderFixMonth,
    }
    this.getFormatDate = this.getFormatDate.bind(this);
  }
  getFormatDate(date) {
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.day!==this.state.day){
      const dateText = this.state.day.getFullYear() + "年" + (this.state.day.getMonth() + 1) + "月" ;
      this.setState({whenStart:dateText});
    }
    if(prevState.whenStart!==this.state.whenStart){
      this.props.changeDayTwoFunction(this.state.whenStart);
    }
  }
  
  
  render(){
    registerLocale('ja', ja);
    const years = _.range(2015, getYear(new Date()) + 2, 1)
    const months = Array.from(Array(12).keys())

    var handleChangeDateReset = (event) => {
      var todayDate = new Date();
      var calenderFixMonth = new Date(
        String(todayDate.getFullYear()), 
        String(todayDate.getMonth()), 
        String(todayDate.getDate()) 
      );
      this.setState({day: calenderFixMonth});
    }

      
    return(
      <>
        {/* <button onClick={this.onChanegeMonthChild.bind(this)}>CHANGE</button> */}
        <div className="" id="whenStart">
          <DatePicker
            locale="ja"
            dateFormat="yyyy.MM"
            showMonthYearPicker
            popperPlacement={this.state.calenderPosition}
            selected={this.state.day}
            className="date-picker-button"
            onChange={(date) => this.setState({day: date})}
            customInput={<button>{this.getFormatDate(this.state.day)}</button>} 
          />
          {/*<div className="clearButton" onClick={event => handleChangeDateReset(event)}></div>*/}
          {/*<div class="calenderAreaChild"></div>*/}
        </div>
      </>
    );
  };
}
  