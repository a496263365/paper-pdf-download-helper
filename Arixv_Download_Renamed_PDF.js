// ==UserScript==
// @name         Arixv Download Renamed PDF
// @namespace    http://tampermonkey.net/
// @version      2025-03-12
// @description  try to take over the world!
// @author       Li Xutian
// @match        *://arxiv.org/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the paper title and remove blank white characters
    const title_element = document.getElementsByTagName("h1");
    // const num = title_element.length;
    let title_text = title_element[1].innerText;
    title_text = title_text.replace(/\s/g, "_");

    // Get the url of the paper
    const paper_url = document.getElementsByClassName("abs-button download-pdf")[0].href;
    // console.log(paper_url);
    // const bibtex_url = paper_url.replace('pdf', 'bibtex');
    // console.log(bibtex_url);

    // Add a download button and set its style
    // Can I add an icon to this button?
    // Make a beautiful button.
    let download_button = document.createElement('a');
    download_button.id = 'download_button';
    download_button.textContent = 'Download Renamed PDF';
    download_button.style.cursor = "pointer";
    let warpped_button = document.createElement('li');
    warpped_button.append(download_button);
    // Append the button to the page
    document.querySelector("#abs-outer > div.extra-services > div.full-text > ul").append(warpped_button);

    // Download the paper when click "Download" button
    download_button.addEventListener('click', () => {
        // alert('Downloading pdf file for you');
        // alert(title_text);
        // alert(`There are ${num} paragraph in #h1`);
        // console.log(title_text);

        // This method does not work!
        // let view_pdf = document.getElementsByClassName("abs-button download-pdf")[0];
        // view_pdf.download = title_text + ".pdf";
        // view_pdf = document.getElementsByClassName("abs-button download-pdf")[0];
        // console.log(view_pdf.download);
        // view_pdf.click();

        // Create a link element to trigger the download
        let download_link = document.createElement('a');
        document.body.appendChild(download_link);

        // Fetch paper
        fetch(paper_url)
            .then(response => response.blob())
            .then(blob => {
            // Create a blob URL for the pdf data
            var url = window.URL.createObjectURL(blob);

            // Set the download link attributes
            download_link.href = url;
            download_link.download = title_text + ".pdf";
            // download_link.style.display = 'none';

            // Click download link programmly
            download_link.click();

            // Clean up by revoking the blob URL and removing the link element
            window.URL.revokeObjectURL(url);

        })
            .catch(error => {
            console.error("Failed to download the PDF file: ", error);
        });

//        // Fetch bibtex
//        fetch(bibtex_url)
//            .then(response => response.blob())
//            .then(blob => {
//            // Create a blob URL for the pdf data
//            var url = window.URL.createObjectURL(blob);
//
//            // Change the download link attributes
//            download_link.href = url;
//            download_link.download = title_text + ".bib";
//            download_link.style.display = 'none';
//
//            // Click download link programmly
//            download_link.click();
//
//            // Clean up by revoking the blob URL and removing the link element
//            window.URL.revokeObjectURL(url);
//
//        })
//            .catch(error => {
//            console.error("Failed to download the PDF file: ", error);
//        });

        document.body.removeChild(download_link);

    });

})();
