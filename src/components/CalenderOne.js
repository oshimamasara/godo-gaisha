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



export default class CalenderOne extends Component{
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
    return date.getFullYear() + "年" + (date.getMonth() + 1) + "月" +  date.getDate() + "日";
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.day!==this.state.day){
      const dateText = this.state.day.getFullYear() + "年" + (this.state.day.getMonth() + 1) + "月" + this.state.day.getDate() + "日" ;
      this.setState({resolutionDate:dateText});
    }
    if(prevState.resolutionDate!==this.state.resolutionDate){
      this.props.changeDayOneFunction(this.state.resolutionDate);
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
        <div className="" id="resolutionDate">
          <DatePicker
            locale="ja"
            dateFormat="yyyy.MM"
            //showMonthYearPicker
            
            popperPlacement={this.state.calenderPosition}
            selected={this.state.day}
            className="date-picker-button"
            onChange={(date) => this.setState({day: date})}
            customInput={<div className="input-date" id="client_date">{this.getFormatDate(this.state.day)}</div>}

            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled
            }) => (
              <div>
                <button
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  前月
                </button>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}年
                    </option>
                  ))}
                </select>
                <select
                  value={getMonth(date)}
                  onChange={({ target: { value } }) => changeMonth(value)}
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option + 1}月
                    </option>
                  ))}
                </select>
                <button
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  次月
                </button>
              </div>
            )}
          />
          {/*<div className="clearButton" onClick={event => handleChangeDateReset(event)}></div>*/}
          {/*<div class="calenderAreaChild"></div>*/}
        </div>
      </>
    );
  };
}
  