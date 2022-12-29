import React from "react";

const Result = ({ pageid, snippet, title }) => {
  const link = `https://en.wikipedia.org/?curid=${pageid}`;
  const searchList = document.querySelector(".listData");
  searchList &&
    searchList.insertAdjacentHTML(
      "afterbegin",
      ` <div class='border rounded bg-light p-2 my-3'>       
        <a href=${link} target="_blank" rel="noopener noreferrer">
          <h4 class='mb-3'>${title}</h4>
        </a>
        ${snippet}
       </div>
       `
    );
  return <div className="listData "></div>;
};

export default Result;
