//改ページに対応できるようにする
//ダウンロード用
import React, { Component } from "react";
import { functionFields } from "./MyFunction";
import './simulation.css';
import logoImage from './../assets/image/base_logo.png';
import PdfReciptShoes from "./PdfReciptShoes";
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
    //console.dir(this.props.data.data.count_3);
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



    return(
      <>
        <div id="preview-2" className="previewWrap">
          {/*<p className="pdf-date">{this.state.todayString}</p>*/}
          <div className="pdf-preview-title-parent">
            <p className="">臨時株主総会議事録</p>
          </div>
          <div className="pdf-area-flex">
            <div></div>
            <div className="pdf-area-flex-right"></div>
          </div>
        
          <div className="pdf-content-area" >
            <p>{this.props.data.data.resolutionDate} 午前10時より、当会社本店において臨時株主総会を開催した。</p>
            <ul>
              <li>
                <div className="li-grid">
                  <div>株主の総数</div>
                  <div>{this.props.data.data.numberOfShareholders} 名</div>
                </div>
              </li>
              <li>
                <div className="li-grid">
                  <div>発行済株式の総数</div>
                  <div>{this.props.data.data.numberOfShares} 株</div>
                </div>
              </li>
              <li>
                <div className="li-grid">
                  <div>議決権を行使することができる株主の総数</div>
                  <div>{this.props.data.data.numberOfShareholdersTotalVotingRights} 名</div>
                </div>
              </li>
              <li>
                <div className="li-grid">
                  <div>議決権を行使することができる株主の議決権の数</div>
                  <div>{this.props.data.data.numberOfVotingTotal} 個</div>
                </div>
              </li>
              <li>
                <div className="li-grid">
                  <div>出席株主の数</div>
                  <div>{this.props.data.data.numberOfShareholdersAttendance} 名</div>
                </div>
              </li>
              <li>
                <div className="li-grid">
                  <div>出席株主の議決権の数</div>
                  <div>{this.props.data.data.numberOfVotesAttendingShareholders} 個</div>
                </div>
              </li>
            </ul>
            <p>以上の通り株主の出席があり、本総会は適法に成立したので、代表取締役 {this.props.ceoName}は定款の規定により議長となり、開会を宣言し直ちに議事に入った。</p>
            <p className="pdf-gian">議　案 　取締役の報酬額の件</p>
            <p>議長は、{this.props.data.data.whenStart}分より、役員報酬を下記の通りにしたい旨を述べ、慎重に協議した結果、全員一致をもってこれを可決決定した。</p>
            <p className="pdf-gian">記</p>
{/* 改ページ */}
            <div className="pdf-loop-content-area" id="pdf-loop-content-area">
              { [...Array(this.props.data.data.count_3)].map((_, i_3) => <AddEgement_3 key={i_3} data={this.props} />) }
            </div>
            

          </div>
        
        </div>


        <button id="pdf-content-creator" onClick={() => setCount_3(this.state.count_3 + 1)} className="hidden"></button>
        
        {/*
        <div >
          <PdfReciptShoes 
            downloadFileName={this.state.fileName} 
            rootElementId="preview-2" 
            text="PDF保存"
            data = {this.props}
          />
        </div>
        */}

      </>
    );
  };
}
