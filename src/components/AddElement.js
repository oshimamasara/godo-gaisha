import React, { Component, useState, Fragment } from "react";
import trashImg from './../assets/image/trash.svg';
import parse from 'html-react-parser';
import { functionFields } from "./MyFunction";

//function AddElement() {
  export default class AddEgement extends Component{
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
        data:this.props.data,
        monthlyText:'月額（単位：円）',
      };

      for(let i=0; i<this.props.data.count; i++){
        this["boardPosition__"+String(i)] = React.createRef();
        this["boardName__"+String(i)] = React.createRef();
        this["boardSalary__"+String(i)] = React.createRef();
        this["title_label__"+String(i)] = React.createRef();
        this["trash_icon__"+String(i)] = React.createRef();
        this["position_label__"+String(i)] = React.createRef();
        this["position_personal_name__"+String(i)] = React.createRef();
        this["position_salary__"+String(i)] = React.createRef();
      } 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      //console.log(this.props.data);
      //console.log(this.state.data);
      if(prevState.data.boardObj!==this.state.data.boardObj){
        //console.dir(this.state.data.boardObj);
        this.props.changeDataObjFunction({key:'boardObj',obj:this.state.data.boardObj});
      }

      if(this.state.data.count===1){
        if(this["title_label__"+String(this.state.data.count-1)].current){
          this["title_label__"+String(this.state.data.count-1)].current.innerText = "役員報酬額 "+ String(this.state.data.count);
          this["title_label__"+String(this.state.data.count-1)].current.style.borderBottom = '1px solid';
          //this["trash_icon__"+String(this.state.data.count-1)].current.style.display = 'initial';
        }
      }
      if(this.props.data.count===1&&this.state.data.count===1){
        this["title_label__"+String(this.state.data.count-1)].current.innerText = "役員報酬額";
        this["title_label__"+String(this.state.data.count-1)].current.style.borderBottom = '0px solid';
        //this["trash_icon__"+String(this.state.data.count-1)].current.style.display = 'none';
      }

      if(prevProps.data.removeDataArray.length!==this.props.data.removeDataArray.length){
        //console.dir(prevProps.data);
        //console.dir(this.props.data);
        //console.log('リスト再作成?');
        //console.log(this.props.data.removeDataArray);
        //console.log(this.state.data.removeDataArray);
        //console.log(this.props.data.removeDataArray.length);
        //if(this.state.data.removeDataArray.length!==0){//lengthチェックを入れると代入処理がうまくいかない
          this.props.data.removeDataArray.forEach(element => {
            //console.dir(element);
            var replaceKey = element.No;
            var replaceVal_1 = element.boardPosition;
            var replaceVal_2 = element.boardName;
            var replaceVal_3 = element.boardSalary;
            //console.log('boardPosition__'+replaceKey);
            //console.log(replaceVal_1);
            //console.log(replaceVal_2);
            //console.log(replaceVal_3);
            //document.getElementById('boardPosition__'+replaceKey).value = replaceVal;
            //console.log(this["boardPosition__"+replaceKey]);
            try{
              this["boardPosition__"+replaceKey].current.value=replaceVal_1;
              this["boardName__"+replaceKey].current.value=replaceVal_2;
              this["boardSalary__"+replaceKey].current.value=replaceVal_3;
              //console.log('どう？');
            }catch(error){
              //console.log(error);
            }
          });
          if(this.props.data.removeDataArray.length!==0){
            this.props.changeDataRemoveArrayFunction([]);
          }
        //}
      }


      
    }


    componentDidMount () {
      //console.dir(this);
      //console.dir(this.props.data.boardObj);
      //console.log(this.props.data.count);
      //console.log(this.state.data.count);
      //console.log(this["title_label__"+String(this.state.data.count-1)]);
      if(this.state.data.count!==1){
        for(let i=0; i<this.props.data.count; i++){
          if(this["title_label__"+String(i)].current){
            //console.log(this["title_label__"+String(i)]);
            this["title_label__"+String(i)].current.innerText = "役員報酬額 "+ String(this.state.data.count);
            this["title_label__"+String(i)].current.style.borderBottom = '1px solid';
            this["trash_icon__"+String(i)].current.style.display = 'initial';
          }
        } 
      }

      this["boardPosition__"+String(this.state.data.count-1)].current.value='';

      if (navigator.userAgent.match(/iPhone|Android|iPad.+Mobile/)) {
        this.setState({ monthlyText:parse('月額<br><span>(単位：円)</span>') });
      }
    }




    render(){ 
      //console.dir(this);
      //console.log(this["boardPosition__1"]);
      var handleChangeSelect = (event) => {
        const inputType = event.target.id;
        const convertVal = event.target.value;//1,000
        const thisObjKey = inputType.replace('boardPosition__','');
        //console.log(inputType);
        //console.log(thisObjKey);
        //console.log(convertVal);
        //console.dir(this.props.data.boardObj);
        functionFields.blue(inputType);
        this.setState({...this.state, data:{
          ...this.state.data, boardObj:{
            [thisObjKey]:{boardPosition:convertVal, boardName:this.props.data.boardObj[thisObjKey].boardName, boardSalary:this.props.data.boardObj[thisObjKey].boardSalary }
          }
        }});
        //this.props.changeBoardObjSelect(thisObjKey, convertVal);
        event.preventDefault();
      }

      var handleChangeInputText = (event) =>{
        //console.dir(this.state.data.boardObj);
        const inputType = event.target.name;
        functionFields.blue(inputType);
        var convertVal = event.target.value;//1,000

        if(inputType.indexOf('boardName') !== -1){
          var thisObjKey = inputType.replace('boardName__','');
          //console.log(thisObjKey);
          //console.log(convertVal);
          //console.log(this.props.data.boardObj[thisObjKey].boardName);
          this.props.changeBoardObjVal(thisObjKey, convertVal);
          //this.setState({...this.state, data:{
          //  ...this.state.data, boardObj:{
          //    [thisObjKey]:{boardPosition:this.props.data.boardObj[thisObjKey].boardPosition, boardName:convertVal, boardSalary:this.props.data.boardObj[thisObjKey].boardSalary }
          //  }
          //}});
        }
        event.preventDefault();
      }

      var handleChangeInputNumber = (event) => {
        const inputType = event.target.name;
        var convertVal = event.target.value;//1,000
        //console.log(inputType);
        //console.dir(convertVal);
        var convertVal = Number(convertVal.replace(/,/g , ''));
        if(!isNaN(convertVal)){
          var convertVal = convertVal.toLocaleString();
          if(inputType.indexOf('boardSalary') !== -1){
            var thisObjKey = inputType.replace('boardSalary__','');
            //console.log(thisObjKey);
            //console.log(convertVal);
            //console.log(this.state.data.boardObj[thisObjKey].boardSalary);
            this.setState({...this.state, data:{
              ...this.state.data, boardObj:{
                [thisObjKey]:{boardPosition:this.props.data.boardObj[thisObjKey].boardPosition, boardName:this.props.data.boardObj[thisObjKey].boardName, boardSalary:convertVal }
              }
            }});
          }
        }else{
          //console.log('全角');
          document.getElementById('notify').click();
        }
        event.preventDefault();
      }


      var handleChangeDelete = (event) => {
        //console.log(event.target.id);
        if(event.target.id.indexOf('clear_boardPosition__') !== -1){
          const thisObjKey = event.target.id.replace('clear_boardPosition__','');
          //console.log(thisObjKey);
          this["boardPosition__"+thisObjKey].current.value = '';
          this.setState({...this.state, data:{
            ...this.state.data, boardObj:{
              [thisObjKey]:{boardPosition:'', boardName:this.props.data.boardObj[thisObjKey].boardName, boardSalary:this.props.data.boardObj[thisObjKey].boardSalary }
            }
          }});
        }else if(event.target.id.indexOf('clear_boardName__') !== -1){
          const thisObjKey = event.target.id.replace('clear_boardName__','');
          //console.log(thisObjKey);
          this["boardName__"+thisObjKey].current.value = '';
          this.setState({...this.state, data:{
            ...this.state.data, boardObj:{
              [thisObjKey]:{boardPosition:this.state.data.boardObj[thisObjKey].boardPosition, boardName:'', boardSalary:this.state.data.boardObj[thisObjKey].boardSalary }
            }
          }});
        }else if(event.target.id.indexOf('clear_boardSalary__') !== -1){
          const thisObjKey = event.target.id.replace('clear_boardSalary__','');
          //console.log(thisObjKey);
          this["boardSalary__"+thisObjKey].current.value = '';
          this.setState({...this.state, data:{
            ...this.state.data, boardObj:{
              [thisObjKey]:{boardPosition:this.state.data.boardObj[thisObjKey].boardPosition, boardName:this.state.data.boardObj[thisObjKey].boardName, boardSalary:'' }
            }
          }});
        }
        event.preventDefault();
      }

      var handleChangeDeleteContent_1 = (event) => {
        var targetId = event.target.id;
        //console.log(targetId);
        var thisObjKey = targetId.replace('trash__','');
        if(thisObjKey!=='0'){
          this.props.changeboardObj({key:thisObjKey, target:'boardObj'});
        }
        event.preventDefault();
      }

      var helpMouseOver = (event) => {
        //console.log('ホバー');
        //console.dir(event.target);
        //console.dir(event.target.dataset.help);
        //this.props.helpMouseOver(event);
        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_label__','');
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_personal_name__','');
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_salary__','');
          }else{
            var hoverKey = '0';
          }
        }catch(error){
          //console.log(error);
        }

        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            this['position_label__'+hoverKey].current.className = 'help-icon-child top1';
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            this['position_personal_name__'+hoverKey].current.className = 'help-icon-child top1';
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            this['position_salary__'+hoverKey].current.className = 'help-icon-child top1';
          }
        }catch(error){
          //console.log(error);
        }
        event.preventDefault();
      }
      var helpMouseOut = (event) => {
        //console.log('アウト');
        //this.props.helpMouseOut(event);
        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_label__','');
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_personal_name__','');
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_salary__','');
          }else{
            var hoverKey = '0';
          }
        }catch(error){
          //console.log(error);
        }
        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            this['position_label__'+hoverKey].current.className = 'hidden';
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            this['position_personal_name__'+hoverKey].current.className = 'hidden';
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            this['position_salary__'+hoverKey].current.className = 'hidden';
          }
        }catch(error){
          //console.log(error);
        }
        event.preventDefault();
      }
      var helpClick = (event) => {
        //this.props.helpMouseClick(event);
        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_label__','');
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_personal_name__','');
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            var hoverKey = event.target.dataset.help.replace('position_salary__','');
          }else{
            var hoverKey = '0';
          }
        }catch(error){
          //console.log(error);
        }
        try{
          if(event.target.dataset.help.indexOf('position_label__') !== -1){
            this['position_label__'+hoverKey].current.className = 'help-icon-child top1';
          }else if(event.target.dataset.help.indexOf('position_personal_name__') !== -1){
            this['position_personal_name__'+hoverKey].current.className = 'help-icon-child top1';
          }else if(event.target.dataset.help.indexOf('position_salary__') !== -1){
            this['position_salary__'+hoverKey].current.className = 'help-icon-child top1';
          }
        }catch(error){
          //console.log(error);
        }
        event.preventDefault();
      }


      return (
        <>
          <div className="input-box-3">
            <div className="input-box-c-1">
              <div htmlFor="client" >
                <span ref={this["title_label__"+String(this.state.data.count-1)]}>役員報酬額</span>
              </div>
            </div>
            <div className="input-box-c-1-2">
              <div className="input-box-3-helpicon input-require">役職
                <p 
                  className="help-icon " 
                  data-help={"position_label__"+String(this.state.data.count-1) }
                  onMouseOver={event=>helpMouseOver(event)}
                  onMouseOut={event=>helpMouseOut(event)}
                  onClick={event=>helpClick(event)}
                >
                  <span 
                    ref={this["position_label__"+String(this.state.data.count-1)]}
                    className='hidden'
                  >
                    {this.state.data.t_nine}
                  </span>
                </p>
              </div>

            </div>
            <div className="inputFrame input-box-c-2 ">
              <select 
                className={`
                  select-first 
                  ${this.props.data.boardObj[String(this.state.data.count-1)].boardPosition==='ceo' ? 'one' : 'two' } 
                  ${this.props.data.boardObj[String(this.state.data.count-1)].boardPosition==='' ? 'zero' : '' }
                  ${typeof this.props.data.boardObj[String(this.state.data.count-1)].boardPosition==='undifined' ? 'zero' : '' }
                `} 
                id={"boardPosition__"+String(this.state.data.count-1)}
                ref={this["boardPosition__"+String(this.state.data.count-1)]}
                onChange={handleChangeSelect}
                value={this.props.data.boardObj[String(this.state.data.count-1)].boardPosition ? this.props.data.boardObj[String(this.state.data.count-1)].boardPosition : ''}
              >
                <option disabled value="">選択</option>
                <option value="ceo">代表社員</option>
                <option value="director">社員</option>
              </select>
              <div className="clearButton" id={"clear_boardPosition__"+String(this.state.data.count-1)} onClick={event => handleChangeDelete(event)}></div>
            </div>
{/* ２段目　名前 */}
            <div className="input-box-c-1 input-box-c-4">
            </div>
            <div className="help-icon-content-position input-box-c-5">
              <div className="input-box-3-helpicon input-require">名前
                <p 
                  className="help-icon " 
                  data-help={"position_personal_name__"+String(this.state.data.count-1) }
                  onMouseOver={event=>helpMouseOver(event)}
                  onMouseOut={event=>helpMouseOut(event)}
                  onClick={event=>helpClick(event)}
                >
                  <span 
                    ref={this["position_personal_name__"+String(this.state.data.count-1)]}
                    className='hidden'
                  >
                    {this.state.data.t_ten}
                  </span>
                </p>
              </div>

            </div>
            <div className="inputFrame input-box-c-2 input-box-c-6 ">
              <input 
                type="text" 
                placeholder='' 
                name={"boardName__"+String(this.state.data.count-1)}
                id={"boardName__"+String(this.state.data.count-1)}
                ref={this["boardName__"+String(this.state.data.count-1)]}
                value={this.props.data.boardObj[String(this.state.data.count-1)].boardName ? this.props.data.boardObj[String(this.state.data.count-1)].boardName : ''}
                onChange={event => handleChangeInputText(event)}
              />
              <div className="clearButton" id={"clear_boardName__"+String(this.state.data.count-1)} onClick={event => handleChangeDelete(event)}></div>
            </div>
{/* 3段目　月額 */}
            <div className="input-box-c-1 input-box-c-7">
            </div>
            <div className="help-icon-content-position input-box-c-8">
              <div className="input-box-3-helpicon input-require input-require-3danme">
                {this.state.monthlyText}
                <p 
                  className="help-icon " 
                  data-help={"position_salary__"+String(this.state.data.count-1) }
                  onMouseOver={event=>helpMouseOver(event)}
                  onMouseOut={event=>helpMouseOut(event)}
                  onClick={event=>helpClick(event)}
                >
                  <span 
                    ref={this["position_salary__"+String(this.state.data.count-1)]}
                    className='hidden'
                  >
                    {this.state.data.t_eleven}
                  </span>
                </p>
              </div>

            </div>
            <div className="inputFrame input-box-c-2 input-box-c-9 ">
              <input 
                type="text" 
                placeholder='' 
                pattern="[0-9]*" 
                name={"boardSalary__"+String(this.state.data.count-1)}
                id={"boardSalary__"+String(this.state.data.count-1)}
                ref={this["boardSalary__"+String(this.state.data.count-1)]}
                value={this.props.data.boardObj[String(this.state.data.count-1)].boardSalary ? this.props.data.boardObj[String(this.state.data.count-1)].boardSalary : '0' }
                onChange={event => handleChangeInputNumber(event)}
              />
              <div className="clearButton" id={"clear_boardSalary__"+String(this.state.data.count-1)} onClick={event => handleChangeDelete(event)}></div>
            </div>
{/* ゴミ箱 */}
            <span style={{display:'none'}} ref={this["trash_icon__"+String(this.state.data.count-1)]}>
              <img 
                id={"trash__"+String(this.state.data.count-1)} 
                name={"trash__"+String(this.state.data.count-1)} 
                onClick={event => handleChangeDeleteContent_1(event)}
                src={trashImg} 
                className="content-trash-icon" 
              />
            </span>
          </div>
          
        </>
      );
    }
}

