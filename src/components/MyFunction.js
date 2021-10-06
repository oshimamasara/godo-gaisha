import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import parse from 'html-react-parser';

class FunctionFields {

    red(key){
      document.getElementById(key).style['border-color'] = 'red';
      //console.log(key);
    }
    blue(key){
      document.getElementById(key).style['border-color'] = 'rgba(0,0,255,.4196078431372549)';
      //console.log(key);
    }
    redCalender(key){
      //console.dir(document.getElementById(key).children[0].children[0].children[0]);
      document.getElementById(key).children[0].children[0].children[0].style['border-color'] = 'red';
    }
    blueCalender(key){
      //console.dir(document.getElementById(key).children[0].children[0].children[0]);
      document.getElementById(key).children[0].children[0].children[0].style['border-color'] = 'rgba(0,0,255,.4196078431372549)';
    }

    inputValidation(text, time, status){
      toast.error(<div>{parse(text)}</div>,{
        position:'top-right',
        autoClose:time,
        theme:'colored',
        pauseOnHover: false,
        hideProgressBar:status
      });
    }
    
    inputValidationLive(text, time, status){
      toast.error(<div>{parse(text)}</div>,{
        position:'top-right',
        autoClose:time,
        theme:'colored',
        pauseOnHover: false,
        hideProgressBar:status
      });
      
    }

    isSmartPhone() {
      //console.dir(navigator.userAgent);
      if (navigator.userAgent.match(/iPhone|Android+Mobile/)) {
        return true;
      } else {
        return false;
      }
    }

    DateJudge(day1, day2){
      //console..log(day1);
      //console..log(day2);
      var Day_1_year_index = day1.indexOf('年');
      var Day_1_year = day1.substring(0, Day_1_year_index);
      var Day_2_year_index = day2.indexOf('年');
      var Day_2_year = day2.substring(0, Day_2_year_index);

      var Day_1_month_index = day1.indexOf('年');
      var Day_1_month = day1.slice(Day_1_month_index+1);
      var Day_1_month_index = Day_1_month.indexOf('月');
      var Day_1_month = Day_1_month.substring(0, Day_1_month_index);

      var Day_2_month_index = day2.indexOf('年');
      var Day_2_month = day2.slice(Day_2_month_index+1);
      var Day_2_month_index = Day_2_month.indexOf('月');
      var Day_2_month = Day_2_month.substring(0, Day_2_month_index);

      //console..log(Day_1_year);
      //console..log(Day_2_year);
      //console..log(Day_1_month);
      //console..log(Day_2_month);

      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        var text = '役員報酬の変更月は、株主総会を開催した月以降の月を選択してください。';
      }
      else{
        var text = '役員報酬の変更月は、<br>株主総会を開催した月以降の月を選択してください。';
      }
      
      var result = true;
      if(Number(Day_2_year)<Number(Day_1_year)){
        //toast.error(<div>{parse(text)}</div>,{
        //  position:"top-right",
        //  autoClose:false,
        //  theme:'colored',
        //  pauseOnHover: false
        //});
        var result = false;
      }else if( Number(Day_2_year)>=Number(Day_1_year) && Number(Day_2_month)<Number(Day_1_month) ){
        //toast.error(<div>{parse(text)}</div>,{
        //  position:"top-right",
        //  autoClose:false,
        //  theme:'colored',
        //  pauseOnHover: false
        //});
        var result = false;
      }
      return result;
    }


    DateJudgeSubmit(day1, day2){
      //console..log(day1);
      //console..log(day2);
      var Day_1_year_index = day1.indexOf('年');
      var Day_1_year = day1.substring(0, Day_1_year_index);
      var Day_2_year_index = day2.indexOf('年');
      var Day_2_year = day2.substring(0, Day_2_year_index);

      var Day_1_month_index = day1.indexOf('年');
      var Day_1_month = day1.slice(Day_1_month_index+1);
      var Day_1_month_index = Day_1_month.indexOf('月');
      var Day_1_month = Day_1_month.substring(0, Day_1_month_index);

      var Day_2_month_index = day2.indexOf('年');
      var Day_2_month = day2.slice(Day_2_month_index+1);
      var Day_2_month_index = Day_2_month.indexOf('月');
      var Day_2_month = Day_2_month.substring(0, Day_2_month_index);

      //console..log(Day_1_year);
      //console..log(Day_2_year);
      //console..log(Day_1_month);
      //console..log(Day_2_month);

      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) {
        var text = '役員報酬の変更月は、株主総会を開催した月以降の月を選択してください。';
      }
      else{
        var text = '役員報酬の変更月は、<br>株主総会を開催した月以降の月を選択してください。';
      }
      
      var result = true;
      if(Number(Day_2_year)<Number(Day_1_year)){
        //toast.error(<div>{parse(text)}</div>,{
        //  position:"top-right",
        //  autoClose:false,
        //  theme:'colored',
        //  pauseOnHover: false
        //});
        var result = false;
      }else if( Number(Day_2_year)>=Number(Day_1_year) && Number(Day_2_month)<Number(Day_1_month) ){
        //toast.error(<div>{parse(text)}</div>,{
        //  position:"top-right",
        //  autoClose:false,
        //  theme:'colored',
        //  pauseOnHover: false
        //});
        var result = false;
      }
      return result;
    }


    isIE(){
      //console.log(navigator.userAgent);
      if(navigator.userAgent.indexOf('Trident')!==-1){
        const $style = document.createElement("style");
        document.head.appendChild($style);
        $style.innerHTML = `
        /*CSS HELLO*/
        .goudou-info-box-child{
          display: -ms-grid;
          -ms-grid-columns: 1fr 1fr;
          -ms-grid-rows:auto auto;
        }
        .top-text-content-grid-c-1{
            grid-column: 1 ;
            grid-row: 1;
            -ms-grid-column: 1;
            -ms-grid-row: 1;
        }
        .top-text-content-grid-c-2{
            grid-column: 2 ;
            grid-row: 1;
            -ms-grid-column: 2;
            -ms-grid-row: 1;
        }
        .input-box{
            display: grid;
            grid-template-columns: 5fr 280px;
            margin: 1rem 0;
            display: -ms-grid;
            -ms-grid-columns: 500px 1fr;
            -ms-grid-rows:auto auto;
        }
        .input-box-c-1{
            grid-column: 1 ;
            grid-row: 1;
            -ms-grid-column: 1;
            -ms-grid-row: 1;
            white-space:nowrap;
            
        }
        .input-box-c-2{
            grid-column: 2 ;
            grid-row: 1;
            -ms-grid-column: 2;
            -ms-grid-row: 1;
        }
        .input-box-3{
            display: grid;
            grid-template-columns: 1fr 1fr 280px;
            margin: 1rem 0;
            display: -ms-grid;
            -ms-grid-columns: 300px 200px 1fr;
            -ms-grid-rows:auto auto auto;
        }
        .input-box-c-1{
            grid-column: 1 ;
            grid-row: 1;
            -ms-grid-column: 1;
            -ms-grid-row: 1;
        }
        .input-box-c-1-2{
            grid-column: 2 ;
            grid-row: 1;
            -ms-grid-column: 2;
            -ms-grid-row: 1;
        }
        .input-box-c-2{
            grid-column: 3 ;
            grid-row: 1;
            -ms-grid-column: 3;
            -ms-grid-row: 1;
        }
        .input-box-c-4{
            grid-column: 1 ;
            grid-row: 2;
            -ms-grid-column: 1;
            -ms-grid-row: 2;
        }
        .input-box-c-5{
            grid-column: 2 ;
            grid-row: 2;
            -ms-grid-column: 2;
            -ms-grid-row: 2;
        }
        .input-box-c-6{
            grid-column: 3 ;
            grid-row: 2;
            -ms-grid-column: 3;
            -ms-grid-row: 2;
        }
        .input-box-c-7{
            grid-column: 1 ;
            grid-row: 3;
            -ms-grid-column: 1;
            -ms-grid-row: 3;
        }
        .input-box-c-8{
          grid-column: 2 ;
          grid-row: 3;
          -ms-grid-column: 2;
          -ms-grid-row: 3;
        }
        .input-box-c-9{
          grid-column: 3 ;
          grid-row: 3;
          -ms-grid-column: 3;
          -ms-grid-row: 3;
        }
        /* input-box-3 終わり */
        .boardObjList-label-1 {
          display: grid;
          grid-template-columns: 1fr 3fr 1fr;
          display: -ms-grid;
          -ms-grid-columns: 1fr 3fr 1fr;
          -ms-grid-rows:auto auto;
        }
        .boardObjList-label-1 > div:nth-child(1){
          grid-column: 1 ;
          grid-row: 1;
          -ms-grid-column: 1;
          -ms-grid-row: 1;
        }
        .boardObjList-label-1 > div:nth-child(2){
          grid-column: 2 ;
          grid-row: 1;
          -ms-grid-column: 2;
          -ms-grid-row: 1;
        }
        .boardObjList-label-1 > div:nth-child(3){
          grid-column: 3 ;
          grid-row: 1;
          -ms-grid-column: 3;
          -ms-grid-row: 1;
        }
        `;


        return true
      }else{
        return false;
      }
    }
  
  
}

const functionFields = new FunctionFields();

export { functionFields };