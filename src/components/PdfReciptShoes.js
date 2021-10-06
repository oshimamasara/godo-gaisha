//https://stackoverflow.com/questions/19272933/jspdf-multi-page-pdf-with-html-renderer
import React from 'react';
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import './simulation.css';

const PdfReciptShoes = ({text, rootElementId , downloadFileName, data, pCount}) => {

    const downloadPdfDocument = () => {
        
        //STYLE

        //const input = document.getElementById(rootElementId);
        var quotes = document.getElementById(rootElementId);

        //html2canvas(quotes).then(function(canvas) {
        //    document.body.appendChild(canvas);
        //});
        html2canvas(quotes, { scale: '2' })
            .then((canvas) => {
              //console.log(canvas.width);
              //console.log(canvas.height);
              //console.log(quotes.clientWidth);
              //console.log(quotes.clientHeight);
              var imgData = canvas.toDataURL('image/png', 0.3);
              var imgWidth = 210; 
              var pageHeight = 297;  
              var imgHeight = canvas.height * imgWidth / canvas.width;
              var heightLeft = imgHeight;
              var pdf = new jsPDF('p', 'mm');
              var position = 0;
              pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined,'FAST');
              heightLeft -= pageHeight;

              //console.log(pCount);
        
              while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                ////console.dir(data);
                if(pCount>11){
                  //console.log('ページ追加');
                  pdf.addPage();
                  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined,'FAST');
                  heightLeft -= pageHeight;
                }else{
                  //console.log('ページ追加なし');
                  break;
                }
              }

              if (navigator.userAgent.match(/iPhone|Android|iPad.+Mobile/)) {
                var blob = pdf.output('blob');
                const newBlob = new Blob([blob],{type:'application/octet-stream'});
                let link = document.createElement('a');
                link.download = `${downloadFileName}.pdf`;
                link.href = URL.createObjectURL(newBlob);
                link.click();
                URL.revokeObjectURL(link.href);
              }else{
                //console.log('PDF PC');
                pdf.save(`${downloadFileName}.pdf`);
              }

              //pdf.save( downloadFileName+'.pdf');


            })
            .catch((error)=>{
                //console.dir(error);

            })
    }

    return <button onClick={downloadPdfDocument} id="exportPdf">{text}</button>;

}

export default PdfReciptShoes;
