//改ページに対応できるようにする
//ダウンロード用
import React, { Component } from "react";
import { functionFields } from "./MyFunction";
import './simulation.css';
import logoImage from './../assets/image/base_logo.png';
import PdfReciptShoes from "./PdfReciptShoes";
import parse from 'html-react-parser';
import AddEgement_3 from "./AddElement_3";

//const AddedElement_3 = (data) => 
//  <p>
//    {data.data.pCount}
//    {Object.keys(data.data.pCount)}
//    {data.data.pObj[0].outerHTML}
//  </p>

export default class PDFPreview extends Component{
  constructor(props) {
    super(props);
    this.state = {
      fileName:'',
      data:this.props.data,
    };

  }

  componentDidMount () {
    console.dir(this.props);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
  }



  render(){
    //console.log(this.props);

    var setCount_3 = () => {
      //console.log('セット 3');
      //console.log(this.props.data.data.count_3);
      //console.dir(this.state.boardObj);
      //this.setState({count_3:(this.state.count_3 + 1)});
      this.props.data.count_3Count(this.props.data.data.count_3 + 1);
    }

    //console.dir(this.props.data.data);
    //console.log(this.props.filename);
    //var list_1 = [];
    //for(var i in Object.keys(this.props.data.data.boardObj)){
    //  if(this.props.data.data.boardObj[i].boardPosition==='ceo'){
    //    var boardPosition = '代表取締役'
    //  }else{
    //    var boardPosition = '取締役'
    //  }
//
    //  if(this.props.data.data.boardObj[i].boardSalary===''){
    //    var boardSalary = '0'
    //  }else{
    //    var boardSalary = this.props.data.data.boardObj[i].boardSalary;
    //  }
    //  
    //  var lastStyle= '';
    //  if(Object.keys(this.props.data.data.boardObj).length-1 ===Number(i)){
    //    var lastStyle= 'rowEnd';
    //  }
//
    //}

    console.log('CHECK');
    console.dir(this.props.contentWidth);

    return(
      <>
        <div id="preview-2" className="previewWrap">
          {/*<p className="pdf-date">{this.state.todayString}</p>*/}
          <div className="pdf-preview-title-parent">
            <p className="">総社員の同意書</p>
          </div>
          <div className="pdf-area-flex">
            <div></div>
            <div className="pdf-area-flex-right"></div>
          </div>
        
          <div className="pdf-content-area" >
            <div className="pdf-loop-content-area" id="pdf-loop-content-area" style={{width:String(this.props.contentWidth)+'px'}}>
              { [...Array(this.props.data.data.count_3)].map((_, i_3) => <AddEgement_3 key={i_3} data={this.props} />) }
            </div>
            

          </div>
        
        </div>
        <button id="pdf-content-creator" onClick={() => setCount_3(this.state.count_3 + 1)} className="hidden"></button>

      </>
    );
  };
}
