import React, { Component, useState, Fragment } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CalenderOne from './CalenderOne';
import CalenderTwo from './CalenderTwo';
import './simulation.css';
//import PdfReciptShoes from "./PdfReciptShoes";
import { functionFields } from "./MyFunction";
import help_text from './help-text.json';
//import ContentOne from './ContentOne';
//import Content from './Content';
import AddElement from "./AddElement";
import AddElement_2 from "./AddElement_2";
import PDF from "./PDF";



export default class Simulation extends Component{
  constructor(){
    super();
    var todayDate = new Date();
    var todayDateString = todayDate.getFullYear() + '年' + (todayDate.getMonth()+1) + '月' + todayDate.getDate() + '日';
    var whenstartString = todayDate.getFullYear() + '年' + (todayDate.getMonth()+1) + '月';
    this.state={
      today:todayDateString,
      resolutionDate:todayDateString,//決議日
      numberOfShareholders:'',//株主数
      numberOfShares:'',//発行済み株式数
      numberOfShareholdersTotalVotingRights:'',//議決権を行使できる株主総数
      numberOfVotingTotal:'',//議決権を行使できる株主の議決件数
      numberOfShareholdersAttendance:'',//出席株主数
      numberOfVotesAttendingShareholders:'',//出席株主の議決権の数
      whenStart:whenstartString,//何月分の役員報酬とするか

      boardObj:{
        ['0']:{
          boardPosition:'',
          bordName:'',
          bordSalary:'0'
        }
      },

      companyName:'',
      companyObj:{
        ['0']:{
          companyPosition:'',
          memberName:'',
        }
      },


      hoverKey:'',
      hoverVal:'',
      hover:{ 
        key:'',
        val:false,
      },

      t_one:help_text.one,
      t_two:help_text.two,
      t_three:help_text.three,
      t_four:help_text.four,
      t_five:help_text.five,
      t_six:help_text.six,
      t_seven:help_text.seven,
      t_eight:help_text.eight,
      t_nine:help_text.nine,
      t_ten:help_text.ten,
      t_eleven:help_text.eleven,

      count: 0,
      removeDataArray:[],
      count_2: 0,
      count_3: 0,
      previewStatus:false,
      fileName:'',

      //inputNotificationTextNotMachStockHolder:'hidden',
      //inputNotificationTextNotMachGiketuken:'hidden',
      //inputNotificationTextNotHalf:'hidden',//議決権数50%ない
      inputNotificationTextDate_1:'hidden',//日付変更　決議日
      inputNotificationTextDate_2:'hidden',//日付変更　報酬月
      //inputNotificationText_3:'hidden',//株主の人数＜議決権を行使することができる株主の総数
      //inputNotificationText_4:'hidden',//発行済み株式数＜議決権を行使することができる株主の議決権の数

      error_text_1_1:'hidden',//株主の人数変更　出席株主数と比較
      error_text_1_2:'hidden',//出席株主数変更　株主の人数と比較
      error_text_2_1:'hidden',//株主の人数変更　議決権を行使できる株主総数と比較
      error_text_2_2:'hidden',//議決権を行使できる株主総数変更　株主の人数と比較
      error_text_3_1:'hidden',//議決権を行使できる株主総数変更　出席株主の議決権数と比較①
      error_text_3_2:'hidden',//出席株主の議決権数変更　議決権を行使できる株主総数と比較①
      error_text_4_1:'hidden',//議決権を行使できる株主総数変更　出席株主の議決権数と比較②
      error_text_4_2:'hidden',//出席株主の議決権数変更　議決権を行使できる株主総数と比較②
      error_text_5_1:'hidden',//議決権を行使できる株主総数変更　発行数株式数と比較
      error_text_5_2:'hidden',//発行数株式数変更　議決権を行使できる株主総数と比較

      error_text_mobile_1:'',
      error_text_mobile_2:'',
      error_text_mobile_3:'',

      mobile:false,
      targetElement:'',
    }
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  

  componentDidMount () {
    var judgeMobile = functionFields.isSmartPhone();
    if(judgeMobile){
      this.setState({mobile:true});

      //document.getElementById('top-about-text').innerHTML = '<div class="top-mobile-about-box">税理士法人経営サポート<br>プラスアルファとは？<div class="linkArrow linkArrowAbsolute"></div></div>';
      //document.getElementById('top-hiyou-text').innerHTML = '<div class="top-mobile-about-box"><span class="nowrap">顧問税理士の費用は</span><span class="nowrap">いくら？</span><div class="linkArrow linkArrowAbsolute"></div></div>';
      //document.getElementById('unitLabel-2').classList.remove('unitLabel-2');
    }

    //１個追加
    document.getElementById('add-content-first').click();
    document.getElementById('add-content-second').click();

    //
    functionFields.isIE();
  }

    
  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log(this.state);
    //console.log(this.state.boardObj);
    //console.log(this.state.companyObj);

    if(prevState.hoverVal!==this.state.hoverVal){
      const hover = {...this.state.hover, key:this.state.hoverKey, val:this.state.hoverVal};
      this.setState({ hover:hover });
      //console.dir(hover);
      //console.log(this.state.boardObj);
    }

    if(prevState.boardObj!==this.state.boardObj){
      //console.log('boardObj CHANGE');
      
    }

    //if(prevState.boardNo!==this.state.boardNo){
    if(prevState.count!==this.state.count){
      //console.log(this.state.count);
    }

    if(prevState.removeDataArray!==this.state.removeDataArray){
      //console.log('削除配列');
    }

    if(prevState.resolutionDate!==this.state.resolutionDate || 
      prevState.numberOfShareholders!==this.state.numberOfShareholders || 
      prevState.numberOfShares!==this.state.numberOfShares || 
      prevState.numberOfShareholdersTotalVotingRights!==this.state.numberOfShareholdersTotalVotingRights || 
      prevState.numberOfVotingTotal!==this.state.numberOfVotingTotal || 
      prevState.numberOfShareholdersAttendance!==this.state.numberOfShareholdersAttendance || 
      prevState.numberOfVotesAttendingShareholders!==this.state.numberOfVotesAttendingShareholders || 
      prevState.whenStart!==this.state.whenStart || 
      prevState.boardObj!==this.state.boardObj || 
      prevState.companyObj!==this.state.companyObj || 
      prevState.companyName!==this.state.companyName){
        this.setState({previewStatus:false});
        this.setState({count_3:0});

        if(this.state.previewStatus){
          toast.info(<div>PDF リセットしました</div>,{
            position:"top-right",
            autoClose:4000,
            pauseOnHover: false
          });
        }
    }

    if(prevState.companyName!==this.state.companyName){
      this.setState({fileName:this.state.today+'_'+'株主総会議事録（'+ this.state.companyName + '）' });
    }


    if(prevState.numberOfVotesAttendingShareholders!==this.state.numberOfVotesAttendingShareholders || 
      prevState.numberOfVotingTotal!==this.state.numberOfVotingTotal || 
      prevState.numberOfVotesAttendingShareholders!==this.state.numberOfVotesAttendingShareholders){
      if(this.state.error_text_3_1!=='hidden'&&this.state.error_text_4_1!=='hidden'&&this.state.error_text_5_1!=='hidden'){
        this.setState({error_text_mobile_1:'error-text-mobile'});
        this.setState({error_text_mobile_2:''});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1!=='hidden'&&this.state.error_text_4_1!=='hidden'&&this.state.error_text_5_1==='hidden'){
        this.setState({error_text_mobile_1:'error-text-mobile'});
        this.setState({error_text_mobile_2:''});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1!=='hidden'&&this.state.error_text_4_1==='hidden'&&this.state.error_text_5_1==='hidden'){
        this.setState({error_text_mobile_1:'error-text-mobile'});
        this.setState({error_text_mobile_2:''});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1==='hidden'&&this.state.error_text_4_1!=='hidden'&&this.state.error_text_5_1!=='hidden'){
        this.setState({error_text_mobile_1:''});
        this.setState({error_text_mobile_2:'error-text-mobile'});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1==='hidden'&&this.state.error_text_4_1!=='hidden'&&this.state.error_text_5_1==='hidden'){
        this.setState({error_text_mobile_1:''});
        this.setState({error_text_mobile_2:'error-text-mobile'});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1!=='hidden'&&this.state.error_text_4_1==='hidden'&&this.state.error_text_5_1!=='hidden'){
        this.setState({error_text_mobile_1:'error-text-mobile'});
        this.setState({error_text_mobile_2:''});
        this.setState({error_text_mobile_3:''});
      }else if(this.state.error_text_3_1==='hidden'&&this.state.error_text_4_1==='hidden'&&this.state.error_text_5_1!=='hidden'){
        this.setState({error_text_mobile_1:''});
        this.setState({error_text_mobile_2:''});
        this.setState({error_text_mobile_3:'error-text-mobile'});
      }
    }

    //出席取締役の代表必須バリデーション
    if(prevProps.companyObj!==this.state.companyObj){
      var check_3 = false;
      for(var i in Object.keys(this.state.companyObj)){
        if(this.state.companyObj[i].companyPosition==='ceo'){
          var check_3 = true;
        }
      }
      if(check_3){
        for(var i in Object.keys(this.state.companyObj)){
          functionFields.blue('companyPosition__'+String(i));
        }
      }
    }


    //console.log('CHANGE');
  }


  onChanegeDayOne(newDayOne){
    //console.log(newDayOne);
    var result = functionFields.DateJudge(newDayOne, this.state.whenStart);
    this.setState({resolutionDate:newDayOne});
    if(!result){
      this.setState({inputNotificationTextDate_1:'inputNotificationText'});
      functionFields.redCalender('resolutionDate');
    }else{
      this.setState({inputNotificationTextDate_1:'hidden'});
      functionFields.blueCalender('resolutionDate');
    }
  }
  onChanegeDayTow(newDayTwo){
    //console.log(newDayTwo);
    var result = functionFields.DateJudge(this.state.resolutionDate, newDayTwo);
    this.setState({whenStart:newDayTwo});
    if(!result){
      this.setState({inputNotificationTextDate_2:'inputNotificationText'});
      functionFields.redCalender('whenStart');
    }else{
      this.setState({inputNotificationTextDate_2:'hidden'});
      functionFields.blueCalender('whenStart');
    }
  }
  changeboardObj(obj){    //削除された場合
    //console.dir(obj.key);
    //console.log(obj.target);
    //console.dir(this.state[obj.target]);
    delete this.state[obj.target][obj.key]
    //console.dir(this.state[obj.target]);
    this.setState({[obj.target]:this.state[obj.target]});
    if(obj.target==='boardObj'){
      //console.log('削除 1');
      this.setState({count:this.state.count-1});
    }else if(obj.target==='companyObj'){
      //console.log('削除 2');
      this.setState({count_2:this.state.count_2-1});
    }
    
    var c = 0;
    var newObj = {};
    var removeDataArray = [];
    Object.keys(this.state[obj.target]).forEach(element => {
      //console.log(element);
      //console.log(c);
      if(Number(element)!==c){
        //console.log('順番変わってる');
        //console.log(element);
        //console.log(c);    
        if(obj.target==='boardObj'){
          this.setState({count:this.state.count-1});
        }else if(obj.target==='companyObj'){
          this.setState({count_2:this.state.count_2-1});
        }
        //削除後 Obj再生成される、 input のデータ反映必要
        //console.log(this.state[obj.target][element].boardPosition);
        if(obj.target==='boardObj'){
          //console.log('push Array');
          removeDataArray.push({
            No:String(c), 
            boardPosition:this.state.boardObj[element].boardPosition,
            boardName:this.state.boardObj[element].boardName,
            boardSalary:this.state.boardObj[element].boardSalary
          });
        }else if(obj.target==='companyObj'){
          //console.log('push Array 2');
          removeDataArray.push({
            No:String(c), 
            companyPosition:this.state.companyObj[element].companyPosition,
            memberName:this.state.companyObj[element].memberName
          });
        }
      }
      if(obj.target==='boardObj'){
        newObj[String(c)] = {
          boardPosition:this.state.boardObj[element].boardPosition, 
          boardName:this.state.boardObj[element].boardName, 
          boardSalary:this.state.boardObj[element].boardSalary
        }
      }else if(obj.target==='companyObj'){
        newObj[String(c)] = {
          companyPosition:this.state.companyObj[element].companyPosition, 
          memberName:this.state.companyObj[element].memberName
        }
      }
      //console.dir(newObj);
      //console.log(removeDataArray);
      c+=1;
    });
    //console.dir(newObj);
    //console.log(removeDataArray);
    if(obj.target==='boardObj'){
      this.setState({boardObj:newObj});
    }else if(obj.target==='companyObj'){
      this.setState({companyObj:newObj});
    }
    
    this.setState({removeDataArray:removeDataArray});
  }
  changeDataObjFunction(obj){
    //console.dir(obj);
    const thisObjKey = Object.keys(obj.obj)[0];
    //console.log(thisObjKey);
    this.setState({...this.state, [obj.key]:{
      ...this.state[obj.key], [thisObjKey]:Object.values(obj.obj)[0]
    }});
  }
  changeDataRemoveArray(newData){
    this.setState({removeDataArray:newData});
  }
  changeCountFunction(newData){
    //console.log(this.state.count);
    //console.log(newData);
    this.setState({count:newData});
  }
  changeCountFunction_2(newData){
    //console.log(this.state.count_2);
    //console.log(newData);
    this.setState({count_2:newData});
  }
  changePreviewStatus(status){
    //console.log(status);
    this.setState({previewStatus:status});
  }
  count_3Count(val){
    //console.log(val);
    this.setState({count_3:val});
  }
  changeBoardObjVal(key, val){
    this.setState({...this.state, boardObj:{
      ...this.state.boardObj, [key]:{boardPosition:this.state.boardObj[key].boardPosition, boardName:val, boardSalary:this.state.boardObj[key].boardSalary }
    }});
  }
  //changeBoardObjSelect(key, val){
  //  this.setState({...this.state, boardObj:{
  //    ...this.state.boardObj, [key]:{boardPosition:val, boardName:this.state.boardObj[key].boardName, boardSalary:this.state.boardObj[key].boardSalary }
  //  }});
  //}
  changeCompanyObjVal(key, val){
    this.setState({...this.state, companyObj:{
      ...this.state.companyObj, [key]:{companyPosition:this.state.companyObj[key].companyPosition, memberName:val }
    }});
  }

  inputValidation(key){//PDF.js プレビューボタンでバリデーション
    console.log('チェック');
    console.log(key);
    document.getElementById(key).style['border-color'] = 'red';
  }


render(){
  var handleChangeInputText = (event) => {
    const inputType = event.target.name;
    var convertVal = event.target.value;//1,000
    this.setState({[event.target.name]:convertVal});

    if(inputType==='companyName'){
      if(convertVal!==''){
        functionFields.blue(inputType);
      }else{
        functionFields.red(inputType);
      }
    }

    event.preventDefault();
  }
  var handleChangeInputNumber = (event) => {
    const inputType = event.target.name;
    var convertVal = event.target.value;//1,000
    var convertVal = Number(convertVal.replace(/,/g , ''));
    //console.log('確認');
    //console.log(inputType);
    //console.log(convertVal);
    if(!isNaN(convertVal)){
      var convertValString = convertVal.toLocaleString();
      this.setState({[event.target.name]:convertValString});
    }else{
      //console.log('全角');
      document.getElementById('notify').click();
    }

    if(!isNaN(convertVal)){
      //Validation
      //株主数
      var convertNumberOfShareholders = Number(this.state.numberOfShareholders.replace(/,/g , ''));
      //発行済み株式数
      var convertNumberOfShares = Number(this.state.numberOfShares.replace(/,/g , ''));
      //議決権を行使できる株主総数
      var convertNumberOfShareholdersTotalVotingRights = Number(this.state.numberOfShareholdersTotalVotingRights.replace(/,/g , ''));
      //議決権を行使できる株主の議決件数
      var convertNumberOfVotingTotal = Number(this.state.numberOfVotingTotal.replace(/,/g , ''));
      //出席株主数
      var convertNumberOfShareholdersAttendance = Number(this.state.numberOfShareholdersAttendance.replace(/,/g , ''));
      //出席株主の議決権の数
      var convertNumberOfVotesAttendingShareholders = Number(this.state.numberOfVotesAttendingShareholders.replace(/,/g , ''));

      //　株主人数
      if(inputType==='numberOfShareholders'){
        //① 出席株主数
        if(convertVal<convertNumberOfShareholdersAttendance){
          this.setState({error_text_1_1:'inputNotificationText'});
          functionFields.red('numberOfShareholdersAttendance');
        }else{
          this.setState({error_text_1_1:'hidden'});
          this.setState({error_text_1_2:'hidden'});
          functionFields.blue('numberOfShareholdersAttendance');
        }

        //②議決権を行使できる株主総数
        if(convertVal<convertNumberOfShareholdersTotalVotingRights){
          this.setState({error_text_2_1:'inputNotificationText'});
          functionFields.red('numberOfShareholdersTotalVotingRights');
        }else{
          this.setState({error_text_2_1:'hidden'});
          this.setState({error_text_2_2:'hidden'});
          functionFields.blue('numberOfShareholdersTotalVotingRights');
        }

        if(convertVal<convertNumberOfShareholdersAttendance || convertVal<convertNumberOfShareholdersTotalVotingRights){
          functionFields.red(inputType);
        }else{
          functionFields.blue(inputType);
        }
      }

      //議決権を行使できる株主の議決権数
      if(inputType==='numberOfVotingTotal'){
        //③出席株主の議決権数
        //console.log(this.state.numberOfVotesAttendingShareholders);
        if(this.state.numberOfVotesAttendingShareholders!==''){//出席株主の議決権数入力されていたらの処理
          if(convertVal<convertNumberOfVotesAttendingShareholders){
            this.setState({error_text_3_1:'inputNotificationText'});
          }else{
            this.setState({error_text_3_1:'hidden'});
            this.setState({error_text_2_1:'hidden'});
            this.setState({error_text_3_2:'hidden'});
            this.setState({error_text_2_2:'hidden'});
          }

          //④出席株主の議決権数 ➗2
          //console.log(convertVal/2);
          //console.log(convertNumberOfVotesAttendingShareholders);
          if((convertVal/2)<convertNumberOfVotesAttendingShareholders && convertVal>=convertNumberOfVotesAttendingShareholders){
            //console.log('確認１');
            this.setState({error_text_4_1:'hidden'});
            this.setState({error_text_4_2:'hidden'});
          }else{
            //console.log('確認2');
            this.setState({error_text_4_1:'inputNotificationText'});
          }
        

          //⑤発行済み株式数
          if(convertVal>convertNumberOfShares){
            //console.log('確認3');
            this.setState({error_text_5_1:'inputNotificationText'});
            functionFields.red('numberOfShares');
          }else{
            //console.log('確認4');
            this.setState({error_text_5_1:'hidden'});
            this.setState({error_text_5_2:'hidden'});
            functionFields.blue('numberOfShares');
          }

          if(convertVal<convertNumberOfVotesAttendingShareholders || convertVal>convertNumberOfShares){
            functionFields.red(inputType);
          }else if((convertVal/2)>=convertNumberOfVotesAttendingShareholders){
            functionFields.red(inputType);
          }else{
            functionFields.blue(inputType);
          }

          //if(convertVal>convertNumberOfShares){
          //  functionFields.red('numberOfShareholdersAttendance');
          //}else{
          //  functionFields.blue('numberOfShareholdersAttendance');
          //}
          if(convertVal<convertNumberOfVotesAttendingShareholders){
            functionFields.red('numberOfVotesAttendingShareholders');
          }else if((convertVal/2)>=convertNumberOfVotesAttendingShareholders){
            functionFields.red('numberOfVotesAttendingShareholders');
          }else{
            functionFields.blue('numberOfVotesAttendingShareholders');
          }
        }else if(this.state.numberOfVotesAttendingShareholders===''){//出席株主の議決権数入力されていなかったらの処理
          //⑤発行済み株式数
          if(convertVal>convertNumberOfShares){
            //console.log('確認3');
            this.setState({error_text_5_1:'inputNotificationText'});
            functionFields.red('numberOfShares');
            functionFields.red(inputType);
          }else{
            //console.log('確認4');
            this.setState({error_text_5_1:'hidden'});
            this.setState({error_text_5_2:'hidden'});
            functionFields.blue('numberOfShares');
            functionFields.blue(inputType);
          }
        }
      }

      //出席株主数
      if(inputType==='numberOfShareholdersAttendance'){
        if(convertVal>convertNumberOfShareholders){
          this.setState({error_text_1_2:'inputNotificationText'});
          functionFields.red(inputType);
          functionFields.red('numberOfShareholders');
        }else{
          this.setState({error_text_1_2:'hidden'});
          this.setState({error_text_1_1:'hidden'});
          functionFields.blue(inputType);
          functionFields.blue('numberOfShareholders');
        }
      }

      //議決権を行使できる株主数
      if(inputType==='numberOfShareholdersTotalVotingRights'){
        if(convertVal>convertNumberOfShareholders){
          this.setState({error_text_2_2:'inputNotificationText'});
          functionFields.red(inputType);
          functionFields.red('numberOfShareholders');
        }else{
          this.setState({error_text_2_2:'hidden'});
          this.setState({error_text_2_1:'hidden'});
          functionFields.blue(inputType);
          functionFields.blue('numberOfShareholders');
        }
      }

      //出席株主の議決権の数 2条件
      if(inputType==='numberOfVotesAttendingShareholders'){
        if(convertVal>convertNumberOfVotingTotal){
          this.setState({error_text_3_2:'inputNotificationText'});
        }else{
          this.setState({error_text_3_2:'hidden'});
          this.setState({error_text_3_1:'hidden'});
        }
        //２つ目　➗2
        if(convertVal<=(convertNumberOfVotingTotal/2)){
          //console.log('3');
          this.setState({error_text_4_2:'inputNotificationText'});
        }else{
          //console.log('4');
          this.setState({error_text_4_2:'hidden'});
          this.setState({error_text_4_1:'hidden'});
        }

        if(convertVal>convertNumberOfVotingTotal || convertVal<=(convertNumberOfVotingTotal/2)){
          functionFields.red(inputType);
          functionFields.red('numberOfVotingTotal');
        }else{
          functionFields.blue(inputType);
          functionFields.blue('numberOfVotingTotal');
        }

      }

      //発行数株式数
      if(inputType==='numberOfShares'){
        if(convertVal<convertNumberOfVotingTotal){
          this.setState({error_text_5_2:'inputNotificationText'});
          functionFields.red(inputType);
          functionFields.red('numberOfVotingTotal');
        }else{
          this.setState({error_text_5_1:'hidden'});
          this.setState({error_text_5_2:'hidden'});
          functionFields.blue(inputType);
          functionFields.blue('numberOfVotingTotal');
        }
      }

      //色の調整



      //PDF作成でエラーで多分の復活
      //if(inputType==='numberOfShares'){
      //  if(convertVal!==0){
      //    functionFields.blue(inputType);
      //  }else{
      //    functionFields.red(inputType);
      //  }
      //}

      //event.preventDefault();
    }
  }

  var helpMouseOver = (event) => {
    //console.dir(event.target);
    //console.dir(event.target.dataset.help);
    this.setState({hoverKey:event.target.dataset.help});
    this.setState({hoverVal:true});
    event.preventDefault();
  }
  var helpMouseOut = (event) => {
    this.setState({hoverKey:event.target.dataset.help});
    this.setState({hoverVal:false});
    event.preventDefault();
  }
  var helpClick = (event) => {
    this.setState({hoverKey:event.target.dataset.help});
    this.setState({hoverVal:true});
    event.preventDefault();
  }
  var handleChangeDelete = (event) => {
    var targetInputId = event.target.id;
    //console.log(targetInputId);
    var targetInputElement = document.getElementById(targetInputId) ;
    try{
      var inputType = targetInputElement.previousElementSibling.name;
    }catch(error){
      //console.log(error);//変更ない場合はエラーなる
    }

    var targetClearId = targetInputId.replace('clear_', '');
    functionFields.blue(targetClearId);

    // 0 を代入したら handlechangeイベント起きるか？
    if(inputType==='numberOfShareholders' || 
      inputType==='numberOfShares' || 
      inputType==='numberOfShareholdersTotalVotingRights' || 
      inputType==='numberOfVotingTotal' || 
      inputType==='numberOfShareholdersAttendance' || 
      inputType==='numberOfVotesAttendingShareholders' || 
      inputType==='whenStart:whenstartString' ){
      this.setState({[inputType]:'0'});
      var elem = document.getElementById(inputType);
      elem.value = '0';
      elem._valueTracker.setValue('')
      elem.dispatchEvent(new Event('input', { bubbles: true }));
    }else{
      const val = '';
      this.setState({[inputType]:val});
    }

    //if(targetClearId==='numberOfShareholdersAttendance'){
    //  this.setState({inputNotificationTextNotMachStockHolder:'hidden'});
    //}else if(targetClearId==='numberOfVotesAttendingShareholders'){
    //  this.setState({inputNotificationTextNotMachGiketuken:'hidden'});
    //  this.setState({inputNotificationTextNotHalf:'hidden'});
    //}else if(targetClearId==='numberOfShareholdersTotalVotingRights'){
    //  this.setState({inputNotificationText_3:'hidden'});
    //}else if(targetClearId==='numberOfVotingTotal'){
    //  this.setState({inputNotificationText_4:'hidden'});
    //}

    event.preventDefault();
  }
  const notify = () => {
    toast.error(<div>数字は、半角数字で<br/>お願いします</div>,{
      position:'top-center',
      autoClose:3000,
      theme:'colored',
      pauseOnHover: false
    });
  }

  var setCount = () => {
    //console.log('セット');
    //console.log(this.state.count);
    //console.dir(this.state.boardObj);
    if(this.state.count!==0){
      this.setState({...this.state, boardObj:{
        ...this.state.boardObj, [String(this.state.count)]:{boardPosition:'', boardName:'', boardSalary:'0' }
      }});
    }
    this.setState({count:(this.state.count + 1)});
  }

  var setCount_2 = () => {
    //console.log('セット 2');
    //console.log(this.state.count_2);
    //console.dir(this.state.boardObj);
    if(this.state.count_2!==0){
      this.setState({...this.state, companyObj:{
        ...this.state.companyObj, [String(this.state.count_2)]:{companyPosition:'', memberName:'' }
      }});
    }
    this.setState({count_2:(this.state.count_2 + 1)});
  }


  //スマホの場合の議決権数エラーマージン
  // error_text_mobile_1:'', error_text_mobile_2:'', error_text_mobile_3:'',
  // error_text_3_1, error_text_4_1, error_text_5_1
  if(this.state.mobile){

  }



  return(
    <>
      <div className="table-top-notification-mark-area">
        <span className="input-require table-top-notification-mark"></span>
        は必須入力項目です。
      </div>
      <div className="simulation-form-upper">

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">決議日
              <div 
                className="help-icon " 
                data-help="resolutionDate" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='resolutionDate'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_one}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <CalenderOne changeDayOneFunction={this.onChanegeDayOne.bind(this)} />
          </div>
        </div>
        <div className={this.state.inputNotificationTextDate_1}>
          株主総会 決議日は、役員報酬の変更月と同じか前に限ります.
        </div>


        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">何月分の役員報酬とするか
              <div 
                className="help-icon " 
                data-help="whenStart" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='whenStart'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_eight}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2">
            <CalenderTwo changeDayTwoFunction={this.onChanegeDayTow.bind(this)} />
          </div>
        </div>
        <div className={this.state.inputNotificationTextDate_2}>
          役員報酬の変更月は、株主総会を開催した月以降の月を<br/>選択してください。
        </div>
        
        {/*
        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">株主の人数
              <div 
                className="help-icon " 
                data-help="numberOfShareholders" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfShareholders'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_two}
                </div>
              </div>
            </div>
          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfShareholders" 
              name="numberOfShareholders" 
              pattern="[0-9]*" 
              value={this.state.numberOfShareholders} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfShareholders" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={` ${this.state.error_text_1_1} margin-bottom-initial `}>
          出席株主数（{this.state.numberOfShareholdersAttendance}）より多くして下さい.
        </div>
        <div className={` ${this.state.error_text_2_1} `}>
          議決権を行使できる株主総数（{this.state.numberOfShareholdersTotalVotingRights}）より多くして下さい.
        </div>

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">発行済み株式数
              <div 
                className="help-icon " 
                data-help="numberOfShares" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfShares'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_three}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfShares" 
              name="numberOfShares" 
              pattern="[0-9]*" 
              value={this.state.numberOfShares} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfShares" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={this.state.error_text_5_2}>
          議決権を行使できる株主の議決権数（{this.state.numberOfVotingTotal}）より多くして下さい.
        </div>

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">議決権を行使することができる株主の総数
              <div 
                className="help-icon " 
                data-help="numberOfShareholdersTotalVotingRights" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfShareholdersTotalVotingRights'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_four}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfShareholdersTotalVotingRights" 
              name="numberOfShareholdersTotalVotingRights" 
              pattern="[0-9]*" 
              value={this.state.numberOfShareholdersTotalVotingRights} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfShareholdersTotalVotingRights" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={this.state.error_text_2_2}>
          株主の人数（{this.state.numberOfShareholders}）以下にして下さい.
        </div>

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">議決権を行使することができる株主の議決権の数
              <div 
                className="help-icon " 
                data-help="numberOfVotingTotal" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfVotingTotal'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_five}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfVotingTotal" 
              name="numberOfVotingTotal" 
              className=""
              pattern="[0-9]*" 
              value={this.state.numberOfVotingTotal} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfVotingTotal" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={` ${this.state.error_text_3_1} margin-bottom-initial ${this.state.error_text_mobile_1} `}>
          出席株主の議決権数（{this.state.numberOfVotesAttendingShareholders}）以上にして下さい.
        </div>
        <div className={` ${this.state.error_text_4_1} margin-bottom-initial ${this.state.error_text_mobile_2} `}>
          出席株主の議決権数（{this.state.numberOfVotesAttendingShareholders}）が条件を満たしていません.
        </div>
        <div className={` ${this.state.error_text_5_1} ${this.state.error_text_mobile_3} `}>
          発行済み株式数（{this.state.numberOfShares}）以下にして下さい.
        </div>

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">出席株主の数
              <div 
                className="help-icon " 
                data-help="numberOfShareholdersAttendance" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfShareholdersAttendance'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_six}
                </div>
              </div>
            </div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfShareholdersAttendance" 
              name="numberOfShareholdersAttendance" 
              className=""
              pattern="[0-9]*" 
              value={this.state.numberOfShareholdersAttendance} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfShareholdersAttendance" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={this.state.error_text_1_2}>
          株主の人数（{this.state.numberOfShareholders}）以下にしてください。
        </div>

        <div className="input-box">
          <div className="input-box-c-1">
            <div className="input-require">出席株主の議決権の数
              <div 
                className="help-icon "  
                data-help="numberOfVotesAttendingShareholders" 
                onMouseOver={event=>helpMouseOver(event)}
                onMouseOut={event=>helpMouseOut(event)}
                onClick={event=>helpClick(event)}
              >
                <div 
                  className={this.state.hover.key==='numberOfVotesAttendingShareholders'&&this.state.hover.val ? 'help-icon-child top1' : 'hidden'}
                >
                  {this.state.t_seven}
                </div>
              </div>
            </div>
          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="numberOfVotesAttendingShareholders" 
              name="numberOfVotesAttendingShareholders" 
              className=""
              pattern="[0-9]*" 
              value={this.state.numberOfVotesAttendingShareholders} 
              onChange={event => handleChangeInputNumber(event)}
            />
            <div className="clearButton" id="clear_numberOfVotesAttendingShareholders" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>
        <div className={` ${this.state.error_text_3_2} margin-bottom-initial `}>
          議決権を行使できる株主の議決権数（{this.state.numberOfVotingTotal}）以下にして下さい.
        </div>
        <div className={` ${this.state.error_text_4_2} `}>
          総議決権数（{this.state.numberOfVotingTotal}）の50%以下となっています.
        </div>
        */}

{/* 役員報酬額コンポーネント */}
        { [...Array(this.state.count)].map((_, i) => 
          <AddElement 
            key={i} 
            data={this.state} 
            changeboardObj = {this.changeboardObj.bind(this)}
            changeDataObjFunction = {this.changeDataObjFunction.bind(this)}
            //changeCountFunction = {this.changeCountFunction.bind(this)}
            changeDataRemoveArrayFunction = {this.changeDataRemoveArray.bind(this)}
            //helpMouseOver = {this.helpMouseOverFunction.bind(this)}
            //helpMouseOut = {this.helpMouseOutFunction.bind(this)}
            //helpMouseClick = {this.helpMouseClickFunction.bind(this)}
            changeBoardObjVal = {this.changeBoardObjVal.bind(this)}
            //changeBoardObjSelect = {this.changeBoardObjSelect.bind(this)}
          />) }
        <div className="add-content-first-box">
          <button onClick={()=>setCount()} id="add-content-first">役員報酬額欄に1名追加する</button>
        </div>

        <div className="input-box margin-h">
          <div className="input-box-c-1">
            <div className="input-require">会社名</div>

          </div>
          <div className="inputFrame input-box-c-2 ">
            <input 
              type="text" 
              placeholder="" 
              id="companyName" 
              name="companyName" 
              value={this.state.companyName} 
              onChange={event => handleChangeInputText(event)}
            />
            <div className="clearButton" id="clear_companyName" onClick={event => handleChangeDelete(event)}></div>
          </div>
        </div>



{/* 出席取締役コンポーネント */}
        { [...Array(this.state.count_2)].map((_, i_2) => 
          <AddElement_2 
            key={i_2} 
            data={this.state} 
            changeboardObj = {this.changeboardObj.bind(this)}
            changeDataObjFunction = {this.changeDataObjFunction.bind(this)}
            //changeCountFunction = {this.changeCountFunction.bind(this)}
            changeDataRemoveArrayFunction = {this.changeDataRemoveArray.bind(this)}
            //helpMouseOver = {this.helpMouseOverFunction.bind(this)}
            //helpMouseOut = {this.helpMouseOutFunction.bind(this)}
            //helpMouseClick = {this.helpMouseClickFunction.bind(this)}
            changeCompanyObjVal = {this.changeCompanyObjVal.bind(this)}
          />) }
        <div className="add-content-first-box">
          <button onClick={()=>setCount_2()} id="add-content-second">出席社員を1名追加する</button>
        </div>

{/* PDF */}
        <PDF
          data={this.state} 
          changePreviewStatus={this.changePreviewStatus.bind(this)}
          count_3Count = {this.count_3Count.bind(this)}
          inputValidation = {this.inputValidation.bind(this)}
        />

      </div>


      <button className="hidden" id="notify" onClick={notify}></button>
      <button className="hidden" id="notifyContentOne" onClick={notify}></button>
      <ToastContainer />
    </>
    
  )}
}