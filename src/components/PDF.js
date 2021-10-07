import React, { Component } from "react";
import ReactDOM from 'react-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PdfReciptShoes from "./PdfReciptShoes";
import PDFPreview from "./PDFPreview";
import { functionFields } from "./MyFunction";
import './simulation.css';
import logoImage from './../assets/image/base_logo.png';
import inkanImage from './../assets/image/inkan.png';
import parse from 'html-react-parser';

export default class PDF extends Component{
  state={
    data:this.props,
    previewClass:'hidden',
    previewButtonStatus:'',
    toastInfo:false,
    mobileJudge:false,
    pCount:0,
    pObj:{},
    ceoName:'',
    text_length:0,
    text_length_paramerter:1,
  }

  

  componentDidMount () {
    const mobileJudge = functionFields.isSmartPhone();
    if(mobileJudge){
      this.setState({mobileJudge:true});
    }
    //console..dir(this.props);
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.data.boardObj!==prevProps.data.boardObj){
      var ceo = this.props.data.boardObj;
      //console..log(Object.keys(ceo));
      Object.keys(ceo).forEach(element => {
        //console..log(ceo[element].boardPosition);
        if(ceo[element].boardPosition==='ceo'){
          this.setState({ceoName:ceo[element].boardName});
        }
      });

    }

    if(this.props.data.boardObj!==prevProps.data.boardObj ||
      this.props.data.companyObj!==prevProps.data.companyObj ){
        const pdfContentArea = document.getElementById('re-html-area-1');
        //console.dir(pdfContentArea);
        //console..dir(pdfContentArea.childElementCount);
        this.setState({pCount:pdfContentArea.childElementCount});
        this.setState({pObj:pdfContentArea.children});
      }
  }


  render(){
    const showPreview = (event) => {
      //PDF幅
      var name_length = 0;
      var salary_length = 0;
      for(var i in Object.keys(this.props.data.boardObj)){
        console.log('チェック　' + this.props.data.boardObj[i].boardName);
        if(typeof this.props.data.boardObj[i].boardName !== 'undefined'){
          var this_name_length = this.props.data.boardObj[i].boardName.length;
          if(name_length<this_name_length){
            name_length = this_name_length;
          }
        }
        console.log('チェック中  ' + this.props.data.boardObj[i].boardSalary);
        if(typeof this.props.data.boardObj[i].boardSalary!=='undefined'){
          var this_salary_length = this.props.data.boardObj[i].boardSalary.length;
          if(salary_length<this_salary_length){
            salary_length = this_salary_length;
          }
        }
      }
      var text_length = (name_length+20)*12 + (salary_length*1.5)*18;//width
      console.log((name_length+19)*6 );
      console.log((salary_length*1.5)*6);
      this.setState({text_length:text_length})
      //if(text_length<=12){
      //  var text_length_paramerter = 4.2;
      //}else if(text_length<15){
      //  var text_length_paramerter = 3;
      //}else if(text_length>=15){
      //  var text_length_paramerter = 2.8;
      //}
      ////if(text_length_paramerter){
////
      ////}
      //this.setState({text_length_paramerter:text_length_paramerter})


      var stepJudge_0 = true;//役員報酬　役職
      var stepJudge_00 = true;//出席社員　役職
      var stepJudge_1 = true;//役員報酬　名前
      var stepJudge_2 = true;//出席社員　名前
      var stepJudge_salary = true;//金額
      var inputValidation = true;
      for(var i in Object.keys(this.props.data.boardObj)){
        //console.log(i);
        //console.dir(this.props.data.boardObj[i]);
        var check_1 = true;
        var check_2 = true;
        if(this.props.data.boardObj[i].boardName==='' ){
          var check_1 = false;
        }else if(typeof this.props.data.boardObj[i].boardName=='undefined'){
          var check_1 = false;
        }
        if(this.props.data.boardObj[i].boardPosition==='' ){
          var check_2 = false;
        }
        if(!check_2){
          functionFields.red('boardPosition__'+String(i));
          var inputValidation = false;
          //var stepJudge_0 = false;//モーダル用
          functionFields.inputValidation('「役員報酬額　'+String(Number(i)+1)+'」<br/>役職を選択願いします.', 8000, true);
        }
        if(!check_1){
          functionFields.red('boardName__'+String(i));
          var inputValidation = false;
          //var stepJudge_1 = false;//モーダル用
          functionFields.inputValidation('「役員報酬額　'+String(Number(i)+1)+'」<br/>名前を入力願いします.', 8000, true);
        }
      }


      var check_3 = false;
      for(var i in Object.keys(this.props.data.companyObj)){
        //console.dir(this.props.data.companyObj[i]);
        var check_1 = true;
        var check_2 = true;
        if(this.props.data.companyObj[i].memberName==='' ){
          var check_1 = false;
        }else if(typeof this.props.data.companyObj[i].memberName=='undefined'){
          var check_1 = false;
        }
        if(this.props.data.companyObj[i].companyPosition==='' ){
          var check_2 = false;
        }else if(this.props.data.companyObj[i].companyPosition==='ceo'){
          var check_3 = true;
        }
        //console.log(stepJudge_2);//check_1 名前
        //console.log(stepJudge_00);//check_2 役職
        if(!check_2){
          functionFields.red('companyPosition__'+String(i));
          var inputValidation = false;
          //var stepJudge_00 = false;
          functionFields.inputValidation('「出席社員　'+String(Number(i)+1)+'」<br/>役職を選択願いします.', 8000, true);
        }else{
          functionFields.blue('companyPosition__'+String(i));
        }
        if(!check_1){
          functionFields.red('memberName__'+String(i));
          var inputValidation = false;
          //var stepJudge_2 = false;
          functionFields.inputValidation('「出席社員　'+String(Number(i)+1)+'」<br/>名前を入力願いします.', 8000, true);
        }else{
          functionFields.blue('memberName__'+String(i));
        }
      }

      //0チェック
      var convertNumberOfShareholders = Number(this.props.data.numberOfShareholders.replace(/,/g , ''));
      var convertNumberOfShares = Number(this.props.data.numberOfShares.replace(/,/g , ''));
      var convertNumberOfShareholdersTotalVotingRights = Number(this.props.data.numberOfShareholdersTotalVotingRights.replace(/,/g , ''));
      var convertNumberOfVotingTotal = Number(this.props.data.numberOfVotingTotal.replace(/,/g , ''));
      var convertNumberOfShareholdersAttendance = Number(this.props.data.numberOfShareholdersAttendance.replace(/,/g , ''));
      var convertNumberOfVotesAttendingShareholders = Number(this.props.data.numberOfVotesAttendingShareholders.replace(/,/g , ''));

      
      //if(convertNumberOfShareholders===0){
      //  functionFields.inputValidation('「株主の人数」<br>を入力してください.', 6000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfShareholders');
      //}
      //if(convertNumberOfShares===0){
      //  functionFields.inputValidation('「発行済み株式数」<br>を入力してください.', 6000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfShares');
      //}
      //if(convertNumberOfShareholdersTotalVotingRights===0){
      //  functionFields.inputValidation('「議決権を行使することができる株主の総数」<br>を入力してください.', 7000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfShareholdersTotalVotingRights');
      //}
      //if(convertNumberOfVotingTotal===0){
      //  functionFields.inputValidation('「議決権を行使することができる株主の議決権の数」<br>を入力してください.', 8000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfVotingTotal');
      //}
      //if(convertNumberOfShareholdersAttendance===0){
      //  functionFields.inputValidation('「出席株主の数」<br>を入力してください.', 6000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfShareholdersAttendance');
      //}
      //if(convertNumberOfVotesAttendingShareholders===0){
      //  functionFields.inputValidation('「出席株主 議決権 数」<br>を入力してください.', 6000, true);
      //  var inputValidation = false;
      //  this.props.inputValidation('numberOfVotesAttendingShareholders');
      //}
      if(this.props.data.companyName===''){
        functionFields.inputValidation('「会社名」<br>を入力してください.', 6000, true);
        var inputValidation = false;
        this.props.inputValidation('companyName');
      }
      if(!check_3){
        functionFields.inputValidation('「出席社員」<br>代表社員を入力してください.', 6000, true);
        var inputValidation = false;
        for(var i in Object.keys(this.props.data.companyObj)){
          functionFields.red('companyPosition__'+String(i));
        }

      }

      //出席株主の数
      //var stepJudge_3 = true;
      //if(convertNumberOfShareholders!==0){
      //  if(convertNumberOfShareholders < convertNumberOfShareholdersAttendance){
      //    var stepJudge_3 = false;
      //    var inputValidation = false;
      //  }
      //}
      //議決権
      var stepJudge_4 = true;
      //console.dir(this.props.data);
      //console.log(convertNumberOfVotesAttendingShareholders);
      //console.log(convertNumberOfVotingTotal);
      //if(convertNumberOfVotesAttendingShareholders!==0){
      //  if(convertNumberOfVotingTotal < convertNumberOfVotesAttendingShareholders){
      //    var stepJudge_4 = false;
      //    var inputValidation = false;
      //  }
      //}
      //議決権2
      //var stepJudge_5 = true;
      //if(convertNumberOfVotesAttendingShareholders!==0){
      //  if((convertNumberOfVotingTotal/2) >= convertNumberOfVotesAttendingShareholders){
      //    var stepJudge_5 = false;
      //    var inputValidation = false;
      //  }
      //}

      //議決権３
      //var stepJudge_6 = true;
      //if(convertNumberOfShareholdersTotalVotingRights){
      //  if(convertNumberOfShareholders<convertNumberOfShareholdersTotalVotingRights){
      //    var inputValidation = false;
      //    var stepJudge_6 = false;
      //  }
      //}

      //議決権4
      //var stepJudge_7 = true;
      //if(convertNumberOfVotingTotal){
      //  if(convertNumberOfShares<convertNumberOfVotingTotal){
      //    var inputValidation = false;
      //    var stepJudge_7 = false;
      //  }
      //}


      //日付
      var stepJudge_8 = true;
      var dateCheckResponse = functionFields.DateJudgeSubmit(this.props.data.resolutionDate, this.props.data.whenStart);
      if(!dateCheckResponse){
        var inputValidation = false;
        var stepJudge_8 = false;
      }

      if(inputValidation&&stepJudge_0&&stepJudge_00&&stepJudge_1&&stepJudge_2){
        document.getElementById('pdf-content-creator').click();//役員リスト等の入力数に応じてPDFマージン作成
        //console.dir(this.props.data.boardObj);
        this.props.changePreviewStatus(true);
        const resetLoopContent = document.getElementById('pdf-loop-content-area');
        document.getElementById("jumpPoint").scrollIntoView({behavior: 'smooth'});
      }
      //if(!stepJudge_3){
      //  functionFields.inputValidation('「出席株主の数」<br/>株主の人数以下にしてください.', 30000, true);
      //}
      //if(!stepJudge_4){
      //  functionFields.inputValidation('「出席株主 議決権 数」<br/>議決権を行使することができる株主の議決権の数以下にしてください.', 30000,  true);
      //}
      //if(!stepJudge_5){
      //  functionFields.inputValidation('「出席株主 議決権 数」<br/>出席株主の議決権数をご確認願います.', 30000, true);
      //}
      //if(!stepJudge_6){
      //  functionFields.inputValidation('議決権を行使することができる株主の総数を、株主の人数以下にしてください.', 30000, true);
      //}
      //if(!stepJudge_7){
      //  functionFields.inputValidation('議決権を行使することができる株主の議決権数を、発行済み株式数以下にしてください.', 30000, true);
      //}
      if(!stepJudge_8){
        functionFields.inputValidation('役員報酬の変更月は、株主総会を開催した月以降の月を選択してください。', 30000, true);
      }
      //if(!stepJudge_0){
      //  functionFields.inputValidation('「役員報酬額」<br/>役職の選択をお願いします.', 8000, true);
      //}
      //if(!stepJudge_1){
      //  functionFields.inputValidation('「役員報酬額」<br/>無記名は削除お願いします.', 8000, true);
      //}
      //if(!stepJudge_2){
      //  functionFields.inputValidation('「出席社員」<br/>無記名は削除お願いします.', 8000, true);
      //}
      //if(!stepJudge_00){
      //  functionFields.inputValidation('「出席社員」<br/>役職の選択をお願いします.', 8000, true);
      //}
      if(!inputValidation){
        functionFields.inputValidation('入力値にエラーあります<br>入力欄をご確認願います。', 3000, false);
      }

    }

    //console..dir(this.props.data);
    //console.log(this.props.filename);
    //代表を一番上にくるようオブジェクトの番号をメモ
    var list_0 = [];
    const reBoardObj = this.props.data.boardObj;
    for(var i in Object.keys(reBoardObj)){
      if(reBoardObj[i].boardPosition==='ceo'){
        list_0.unshift(i);
      }else{
        list_0.push(i);
      }
    }
    //console.dir(list_0);

    //var c = 0;
    //list_0.forEach(element => {
    //  
    //});


    var c = 0;
    var list_1 = [];
    
    //for(var i in Object.keys(this.props.data.boardObj)){
    list_0.forEach(i => {
      if(this.props.data.boardObj[i].boardPosition==='ceo'){
        var boardPosition = '代表社員'
      }else{
        var boardPosition = '社員'
      }

      if(this.props.data.boardObj[i].boardSalary===''){
        var boardSalary = '0'
      }else if(typeof this.props.data.boardObj[i].boardSalary==='undefined'){
        var boardSalary = '0'
      }else{
        var boardSalary = this.props.data.boardObj[i].boardSalary;
      }
      
      var lastStyle= '';
      //var lastRowText = '';
      if(Object.keys(this.props.data.boardObj).length-1 ===Number(c)){
        var lastStyle= 'rowEnd';
        //var lastRowText = parse('<p>'+ this.props.data.whenStart +'分から適用する</p>');
      }
      
      list_1.push(<div className={`boardObjList-label-1 ${lastStyle}`} key={i} >
          <div>
            {boardPosition}　
          </div>
          <div>
            {this.props.data.boardObj[i].boardName} の役員報酬を月額 {boardSalary}円とすること。
          </div>
        </div>);

      c++;
    })
    //console.dir(list_1);
    //代表がリストトップに来るようにソート
//    var re_list_1 = []
//    list_1.forEach(function(element, i){
//      console.log(i);
//      console.log(list_1.length);
//      console.log(element.props.children[0].props.children);
//      if(element.props.children[0].props.children==='代表取締役'){
//        re_list_1.unshift(element);
//      }else{
//        re_list_1.push(element);
//      }
//    });
//
//    var last_element = re_list_1.slice(-1)[0];
//    console.log(last_element);
//    console.log(re_list_1.slice(-1)[0].props.className);
//    //re_list_1.slice(-1)[0].props.className = 'boardObjList rowEnd';
//    var rere_list_1 = []
//    re_list_1.forEach(function(element, i){
//      if(i===re_list_1.length-1){
//        console.log('変更');
//        console.dir(element);
//        //element.props.className = 'boardObjList rowEnd';
//      }
//      rere_list_1.push(element);
//    })
//
//    console.log(re_list_1.slice(-1)[0].props.className);


    


    var list_2 = [];
    for(var i in Object.keys(this.props.data.companyObj)){
      if(this.props.data.companyObj[i].companyPosition==='ceo'){
        var companyPosition = '代表社員'
      }else{
        var companyPosition = '社員'
      }

      list_2.push(<div className={`commpayObjList `} key={i}>
        <div>{companyPosition}</div>　
        <div>{this.props.data.companyObj[i].memberName}</div>
        <div>{/*<img src={inkanImage} />*/}</div>
        </div>);
    }
    var re_list_2 = []
    list_2.forEach(function(element){
      //console.log(element.props.children[0].props.children);
      if(element.props.children[0].props.children==='代表社員'){
        re_list_2.unshift(element);
      }else{
        re_list_2.push(element);
      }
    });

    //console..log(this.props.data.previewStatus);

    return(
      <>
        <div className="pdfArea">
          <div className="pdf-button-area">
            {/*}
            <PdfReciptShoes 
              downloadFileName={this.state.filename} 
              rootElementId="PDF" 
              text="作成する"
            />
            */}
            <span id="jumpPoint"></span>
            <button className={`createPreviewButton ${this.state.previewButtonStatus}`} onClick={event => showPreview(event)}>作成する</button>

          </div>
        </div>
          
        {/*<div className={`pdf-preview ${this.props.previewClass}`} id="preview">*/}
        <div className={`pdf-preview previewWrap ${this.props.data.previewStatus ? '' : 'hidden'}`}>
          <div id="preview-1" >
            <div className="preview-label">プレビュー</div>
            {/*<p className="pdf-date">{this.state.todayString}</p>*/}
            <div className="pdf-preview-title-parent">
              <p className="">総社員の同意書</p>
            </div>
            <div className="pdf-area-flex">
              <div></div>
              <div className="pdf-area-flex-right"></div>
            </div>
            
            <div className="pdf-content-area" >
              <div id="re-html-area-1" style={{width:String(this.state.text_length)+'px'}}>
                {list_1}
                <p className="nangatubun">{this.props.data.whenStart}分から適用する。</p>
                <p>以上同意する。</p>
                <p className="pdf-footer-date">{this.props.data.resolutionDate}</p>
                <p>{this.props.data.companyName}</p>
                {re_list_2}
              </div>
            </div>
            
            {/*
            <div className="bottom-label">
              <img src={logoImage} />税理士法人経営サポートプラスアルファ
            </div>
            */}
          </div>
        </div>
        
        <div className="hiddenPreview">
        {/*<div className="">*/}
          <PDFPreview 
            data={this.props} 
            calcData={this.state.calcData} 
            previewClass={this.state.previewClass} 
            pCount={this.state.pCount} 
            ceoName={this.state.ceoName} 
            pObj={this.state.pObj}
            contentWidth={this.state.text_length}
          />
        </div>

        {this.props.data.previewStatus&&(
          <>
            <div className="pdf-button-area pdf-save-button-area ">
              <PdfReciptShoes 
                downloadFileName={this.props.data.fileName} 
                rootElementId="preview-2" 
                text="PDF保存"
                pCount={this.state.pCount} 
                data = {this.props}
              />
            </div>
          </>
        )}

        
      </>
    );
  };
}
