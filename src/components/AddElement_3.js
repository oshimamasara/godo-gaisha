import React, { Component, useState, Fragment } from "react";
import parse from 'html-react-parser';
import trashImg from './../assets/image/trash.svg';

//function AddElement() {
  export default class AddEgement_3 extends Component{
    constructor(props) {
      super(props);
      this.state = {
        data:this.props.data,
        resetFunction:false
      };

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      if(prevState.resetFunction!==this.state.resetFunction){
        //console.log('変わってる?');
        this.props.resetCount('リセット');
      }
      
    }


    componentDidMount () {

    }




    render(){ 
      //console.dir(this.props);
      
      var c = 0;
      var list = [];
      for(var i in this.props.data.pObj){
        //list.push( <p key={i}>{parse(this.props.data.pObj[i].innerHTML)}</p> );
        try{
          //console.log(parse('<div key=loop_'+i+'>'+this.props.data.pObj[i].outerHTML.toString() + '</div>'));
          list.push( parse('<div key=loop_'+i+'>'+this.props.data.pObj[i].outerHTML.toString()+ '</div>'));
          //console.log(i);
          //console.log(this.props.data.pCount);
          //console.log(this.props.data.pObj[i].className);
          if((this.props.data.pCount>21&&(this.props.data.pObj[i].className.indexOf('boardObjList')!==-1)) ||
          (this.props.data.pCount>21&&(this.props.data.pObj[i].className===''))
          ){
            if(i==='17'){
              //console.log('p追加1');
              list.push( <p key={'loopContent_'+i} className="pdf-page-break-margin"></p> );
            }
          }else if(this.props.data.pCount<15){
            if(i==='15'){
              //console.log('p追加2');
              list.push( <p key={'loopContent_'+i} className="pdf-page-break-margin"></p> );
            }
          }
          //条件分岐の数字は、フォントサイズ、マージンと相関してくる
          c++;
        }catch(error){
          //console.log(error);
        }
        
        //console.log(Object.keys(this.props.data.pObj).length);
        //console.log(c);
        //console.log(this.state.resetFunction);
        if( (Object.keys(this.props.data.pObj).length) === c ){
          if(!this.state.resetFunction){
            //console.log('ループEND');
            //this.props.resetCount('リセット');
            //this.setState({resetFunction:true});
            //var resetFunction = true;
          }
        }
      }
      //this.props.resetCount('リセット');

      return (
        <>
          {list}
        </>
      );
    }
}
