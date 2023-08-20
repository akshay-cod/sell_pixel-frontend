


      
        
       

 import React from 'react';
 import { useEffect } from 'react';
import { useState } from 'react';
 //import { PDFReader,MobilePDFReader } from 'react-read-pdf';
 import { pdfjs, Document, Page } from 'react-pdf';
 import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
 import 'react-pdf/dist/esm/Page/TextLayer.css';
 import {isMobile} from 'react-device-detect';
//import MobilePdfViewer from './MobilePdfViewer';
 pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
 // Core viewer
//import { Worker, Viewer } from '@react-pdf-viewer/core';

// Plugins


// Import styles
//import '@react-pdf-viewer/core/lib/styles/index.css';
const PdfViewer = ({url}) => {
    // pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    //     'pdfjs-dist/build/pdf.worker.min.js',
    //     import.meta.url,
    //   ).toString();
   //pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [pdfContent, setPdfContent] = useState("")
    const options = {
        cMapUrl: '/cmaps/',
        standardFontDataUrl: '/standard_fonts/',
      };
     // const defaultLayoutPluginInstance = defaultLayoutPlugin();

    function onDocumentLoadSuccess({ numPages }){
      setNumPages(numPages);
    }

    useEffect(()=>{
      // fetch(url).then((r)=>{r.blob().then(d=>{
      //   var url = window.URL.createObjectURL(d);
      //   setPdfContent(url) 
      // })})
     blobAnUrl(url)
    },[])

    const blobAnUrl = async(url) => {
      try{
        let res = await fetch(url) ;
        //  console.log(res.json())
          res = await res.blob()
          const blobUrl = await window.URL.createObjectURL(res)
          //console.log(res,blobUrl)
          setPdfContent(blobUrl)
      }
      catch(err){
        console.log(err)
      }
       
    }

    return (
        <>
         {url && pdfContent &&
         <div>
         <Document file={pdfContent} onLoadSuccess={onDocumentLoadSuccess} page={1}
          loading={<div 
          style={{background:"black", width:"99%", height:"1200px"}}
          >loading</div> }
         >
                {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={isMobile ? 0.5 : 1}/>
               ))}  
         </Document>
        
       </div>
         }
        </>
       
    )
}

export default PdfViewer;

{/* <div>
                 <Document file={url} onLoadSuccess={onDocumentLoadSuccess} options={options}>
                        {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                    ))}
                 </Document>
               </div> */}

{/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
           <div
    style={{position:"absolute",top:0,zIndex:102,background:"black", width:"100%",display:"flex",justifyContent:"center"}}
> <Viewer
            fileUrl={url} */}
        // /> </div>  </Worker>  

        // <div style={{overflow:'scroll',height:600,zIndex:999}}>
        //  {/* <PDFReader style={{zIndex:999}} url={url}/> */}
        //  <MobilePDFReader url={url}/>
        // </div>



        // import React from "react";
        // import { Document, pdfjs, Page } from "react-pdf";
        // import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
        // import 'react-pdf/dist/esm/Page/TextLayer.css';
        // pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
//         class PdfViewer extends React.Component {
//           state = {};
        
//           onDocumentComplete = (pages) => {
//             this.setState({ page: 1, pages });
//           };
        
//           handlePrevious = () => {
//             this.setState({ page: this.state.page - 1 });
//           };
        
//           handleNext = () => {
//             this.setState({ page: this.state.page + 1 });
//           };
        
//           renderPagination = (page, pages) => {
//             let previousButton = (
//               <li className="previous" onClick={this.handlePrevious}>
//                 <a href="#">
//                   <i className="fa fa-arrow-left" /> Previous
//                 </a>
//               </li>
//             );
//             if (page === 1) {
//               previousButton = (
//                 <li className="previous disabled">
//                   <a href="#">
//                     <i className="fa fa-arrow-left" /> Previous
//                   </a>
//                 </li>
//               );
//             }
//             let nextButton = (
//               <li className="next" onClick={this.handleNext}>
//                 <a href="#">
//                   Next <i className="fa fa-arrow-right" />
//                 </a>
//               </li>
//             );
//             if (page === pages) {
//               nextButton = (
//                 <li className="next disabled">
//                   <a href="#">
//                     Next <i className="fa fa-arrow-right" />
//                   </a>
//                 </li>
//               );
//             }
//             return (
//               <nav>
//                 <ul className="pager">
//                   {previousButton}
//                   {nextButton}
//                 </ul>
//               </nav>
//             );
//           };
        
//           render() {
//             let pagination = null;
//             if (this.state.pages) {
//               pagination = this.renderPagination(this.state.page, this.state.pages);
//             }
//             return (
//               <div>
//                 <Document
//                   file='/check.pdf'
//                   onDocumentComplete={this.onDocumentComplete}
//                   onLoadError={() => {
//                     console.log("CALLED");
//                   }}
//                   onLoadProgress={() => {
//                     console.log("PRGREOSS");
//                   }}
//                   page={this.state.page}
//                 >
//                   {/* This is what fixes the issue. Try removing the Page component and it would not display PDF */}
        
//                   {Array.from(new Array(numPages), (el, index) => (
//                     <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//                     ))}
//                 </Document>
//                 {pagination}
//               </div>
//             );
//           }
//         }

// export default PdfViewer;