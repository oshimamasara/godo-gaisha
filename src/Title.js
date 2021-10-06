import React, { Component, useState, Fragment } from "react";
import parse from 'html-react-parser';

  export default class Title extends Component{
    state = {
      title:'WEB完結｜合同会社の役員報酬を決議する議事録｜雛形',
      margin:'0'
    }

    componentDidMount () {
      if (navigator.userAgent.match(/Android.+Mobile/)) {
        this.setState({ title:parse('WEB完結｜<br>合同会社の役員報酬を決議する議事録｜雛形') });
        var margin = (window.innerWidth - 350)/2;
        //console.log('Android');
        //console.log(margin);
        this.setState({ margin:String(margin) });
      }else if (navigator.userAgent.match(/iPhone.+Mobile/)) {
        this.setState({ title:parse('WEB完結｜<br>合同会社の役員報酬を決議する議事録｜雛形') });
        var margin = (window.innerWidth - 320)/2;
        //console.log('iPhone');
        //console.log(margin);
        this.setState({ margin:String(margin) });
      }
    }

    render(){ 

      return (
        <h1 style={{"paddingLeft":this.state.margin+"px"}}>
          {this.state.title}
        </h1>
      );
    }
}
