"use client"
import React, { useState } from "react";
import { RiArrowLeftLine, RiArrowRightLine } from "react-icons/ri";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function PDFViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => Math.min(prevPageNumber + 1, numPages));
  };

  return (
    <div className="relative flex-col vhcenter group bg-[#F5F5F5] dark:bg-lightdark p-6 rounded-md">
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <div className="page-controls flex items-center absolute bottom-[5%] left-1/2 bg-white opacity-0 group-hover:opacity-100 transform -translate-x-1/2 transition-opacity rounded z-[2]">
        <button className="relative vhcenter" onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          <RiArrowLeftLine />
        </button>
        <span>
          {pageNumber} of {numPages}
        </span>
        <button className="relative vhcenter" onClick={goToNextPage} disabled={pageNumber >= numPages}>
        <RiArrowRightLine />
        </button>
      </div>
    </div>
  );
}

export default PDFViewer;
