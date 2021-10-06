import React, { Component, useState, Fragment } from "react";
import trashImg from './../assets/image/trash.svg';
import { functionFields } from "./MyFunction";
//function AddElement() {
  export default class AddEgement_2 extends Component{
    constructor(props) {
      super(props);
      this.state = {
        count_2: 0,
        data:this.props.data,
      };

      for(let i=0; i<this.props.data.count_2; i++){
        this["companyPosition__"+String(i)] = React.createRef();
        this["memberName__"+String(i)] = React.createRef();
        this["title_label__"+String(i)] = React.createRef();
        this["trash_icon__"+String(i)] = React.createRef();
      } 
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      //console.log(this.props.data.count_2);
      //console.log(this.state.data.count_2);
      if(prevState.data.companyObj!==this.state.data.companyObj){
        //console.dir(this.state.data.companyObj);
        this.props.changeDataObjFunction({key:'companyObj',obj:this.state.data.companyObj});
      }


      if(this.state.data.count_2===1){
        if(this["title_label__"+String(this.state.data.count_2-1)].current){
          this["title_label__"+String(this.state.data.count_2-1)].current.innerText = "出席社員 "+ String(this.state.data.count_2);
          this["title_label__"+String(this.state.data.count_2-1)].current.style.borderBottom = '1px solid';
          //this["trash_icon__"+String(this.state.data.count_2-1)].current.style.display = 'initial';
        }
      }
      if(this.props.data.count_2===1&&this.state.data.count_2===1){
        this["title_label__"+String(this.state.data.count_2-1)].current.innerText = "出席社員";
        this["title_label__"+String(this.state.data.count_2-1)].current.style.borderBottom = '0px solid';
        //this["trash_icon__"+String(this.state.data.count_2-1)].current.style.display = 'none';
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
            var replaceVal_1 = element.companyPosition;
            var replaceVal_2 = element.memberName;
            //console.log('companyPosition__'+replaceKey);
            //console.log(replaceVal_1);
            //console.log(replaceVal_2);
            //document.getElementById('companyPosition__'+replaceKey).value = replaceVal;
            //console.log(this["companyPosition__"+replaceKey]);
            try{
              this["companyPosition__"+replaceKey].current.value=replaceVal_1;
              this["memberName__"+replaceKey].current.value=replaceVal_2;
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
      //console.log(this.props.data.count_2);
      //console.log(this.state.data.count_2);
      //console.log(this["title_label__"+String(this.state.data.count_2-1)]);
      if(this.state.data.count_2!==1){
        for(let i=0; i<this.props.data.count_2; i++){
          if(this["title_label__"+String(i)].current){
            //console.log(this["title_label__"+String(i)]);
            this["title_label__"+String(i)].current.innerText = "出席社員 "+ String(this.state.data.count_2);
            this["title_label__"+String(i)].current.style.borderBottom = '1px solid';
            this["trash_icon__"+String(i)].current.style.display = 'initial';
          }
        } 
      }

      this["companyPosition__"+String(this.state.data.count_2-1)].current.value='';
    }




    render(){ 
      //console.dir(this);
      //console.log(this["companyPosition__1"]);
      var handleChangeSelect = (event) => {
        const inputType = event.target.id;
        const convertVal = event.target.value;//1,000
        const thisObjKey = inputType.replace('companyPosition__','');
        functionFields.blue(inputType);
        //console.log(thisObjKey);
        //console.log(convertVal);
        //console.dir(this.props.data.companyObj);
        this.setState({...this.state, data:{
          ...this.state.data, companyObj:{
            [thisObjKey]:{companyPosition:convertVal, memberName:this.props.data.companyObj[thisObjKey].memberName}
          }
        }});
        event.preventDefault();
      }

      var handleChangeInputText = (event) =>{
        //console.dir(this.state.data.companyObj);
        const inputType = event.target.name;
        var convertVal = event.target.value;//1,000
        functionFields.blue(inputType);

        if(inputType.indexOf('memberName') !== -1){
          var thisObjKey = inputType.replace('memberName__','');
          //console.log(thisObjKey);
          //console.log(this.props.data.companyObj[thisObjKey].memberName);
          //this.setState({...this.state, data:{
          //  ...this.state.data, companyObj:{
          //    [thisObjKey]:{companyPosition:this.props.data.companyObj[thisObjKey].companyPosition, memberName:convertVal }
          //  }
          //}});
          this.props.changeCompanyObjVal(thisObjKey, convertVal);
        }
        event.preventDefault();
      }

      var handleChangeDelete = (event) => {
        if(event.target.id.indexOf('clear_companyPosition__') !== -1){
          const thisObjKey = event.target.id.replace('clear_companyPosition__','');
          //console.log(thisObjKey);
          this["companyPosition__"+thisObjKey].current.value = '';
          this.setState({...this.state, data:{
            ...this.state.data, companyObj:{
              [thisObjKey]:{companyPosition:'', memberName:this.props.data.companyObj[thisObjKey].memberName }
            }
          }});
        }else if(event.target.id.indexOf('clear_memberName__') !== -1){
          const thisObjKey = event.target.id.replace('clear_memberName__','');
          //console.log(thisObjKey);
          this["memberName__"+thisObjKey].current.value = '';
          this.setState({...this.state, data:{
            ...this.state.data, companyObj:{
              [thisObjKey]:{companyPosition:this.state.data.companyObj[thisObjKey].companyPosition, memberName:'' }
            }
          }});
        }
        event.preventDefault();
      }

      var handleChangeDeleteContent_2 = (event) => {
        var targetId = event.target.id;
        //console.log(targetId);
        var thisObjKey = targetId.replace('trash__','');
        if(thisObjKey!=='0'){
          this.props.changeboardObj({key:thisObjKey, target:'companyObj'});
        }
        event.preventDefault();
      }


      return (
        <>
          <div className="input-box-3">
            <div className="input-box-c-1">
              <div htmlFor="client" >
                <span ref={this["title_label__"+String(this.state.data.count_2-1)]}>出席社員</span>
              </div>
            </div>
            <div className="input-box-c-1-2 ">
              <div htmlFor="client" className="input-require">役職</div>
            </div>
            <div className="inputFrame input-box-c-2 ">
              <select 
                className={`
                  select-first 
                  ${this.props.data.companyObj[String(this.state.data.count_2-1)].companyPosition==='ceo' ? 'one' : 'two' } 
                  ${this.props.data.companyObj[String(this.state.data.count_2-1)].companyPosition==='' ? 'zero' : '' }
                  ${typeof this.props.data.companyObj[String(this.state.data.count_2-1)].companyPosition==='undifined' ? 'zero' : '' }  
                `}  
                id={"companyPosition__"+String(this.state.data.count_2-1)}
                ref={this["companyPosition__"+String(this.state.data.count_2-1)]}
                onChange={handleChangeSelect}
                value={this.props.data.companyObj[String(this.state.data.count_2-1)].companyPosition ? this.props.data.companyObj[String(this.state.data.count_2-1)].companyPosition : ''}
              >
                <option disabled value="">選択</option>
                <option value="ceo">代表社員</option>
                <option value="director">社員</option>
              </select>
              <div className="clearButton" id={"clear_companyPosition__"+String(this.state.data.count_2-1)} onClick={event => handleChangeDelete(event)}></div>
            </div>
{/* ２段目　名前 */}
            <div className="input-box-c-1 input-box-c-4">
            </div>
            <div className="help-icon-content-position input-box-c-5 ">
              <div htmlFor="client" className="input-require">名前</div>
            </div>
            <div className="inputFrame input-box-c-2 input-box-c-6 ">
              <input 
                type="text" 
                placeholder='' 
                name={"memberName__"+String(this.state.data.count_2-1)}
                id={"memberName__"+String(this.state.data.count_2-1)}
                ref={this["memberName__"+String(this.state.data.count_2-1)]}
                value={this.props.data.companyObj[String(this.state.data.count_2-1)].memberName ? this.props.data.companyObj[String(this.state.data.count_2-1)].memberName : ''}
                onChange={event => handleChangeInputText(event)}
              />
              <div className="clearButton" id={"clear_memberName__"+String(this.state.data.count_2-1)} onClick={event => handleChangeDelete(event)}></div>
            </div>
{/* ゴミ箱 */}
            <span style={{display:'none'}} ref={this["trash_icon__"+String(this.state.data.count_2-1)]}>
              <img 
                id={"trash__"+String(this.state.data.count_2-1)} 
                name={"trash__"+String(this.state.data.count_2-1)} 
                onClick={event => handleChangeDeleteContent_2(event)}
                src={trashImg} 
                className="content-trash-icon-2" 
              />
            </span>
          </div>
          
        </>
      );
    }
}
