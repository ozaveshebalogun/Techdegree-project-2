/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
/*
Create the `showPage` function
This function will create and insert/append the elements needed to
 display a "page" of nine students
*/
let studentList = document.querySelector(".student-list");
function showPage(list, page){
   if (list.length<1){   // if no data. useful if search results not available in the array
      studentList.innerHTML="<h3>No data available !</h3>"
   }else{
      let perpage = 9;
      let startIndex = (page * perpage)-perpage
      let endIndex = page * perpage;
      studentList.innerHTML = "";  //clears all data in the list
      let studentItem=""; 
      for(let i=0; i<list.length; i++){
         if (i>=startIndex && i<endIndex){ 
            let eachList = list[i];
            studentItem = `
            <li class="student-item cf">
               <div class="student-details">
                  <img class="avatar" src=${eachList.picture.medium} alt="Profile Picture">
                  <h3>${eachList.name.first} ${eachList.name.last}</h3>
                  <span class="email">${eachList.email}</span>
                  </div>
                  <div class="joined-details">
                  <span class="date">${eachList.registered.date}</span>
               </div>
            </li>
            `;
            studentList.insertAdjacentHTML("beforeend", studentItem); 
         } 
      }
   }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
   let linkList = document.querySelector(".link-list");
   let perPage = 9;
   let numOfPages = Math.ceil(list.length / perPage);
   linkList.innerHTML = "";
   for(i=1; i<=numOfPages; i++){
      let button =`
         <li>
            <button type="button">${i}</button>
         </li>`
         linkList.insertAdjacentHTML("beforeend", button) 
   }
   getSetElemClass =(elemOrClass, classN)=>document.querySelector(elemOrClass).className=classN; // get class or tag name and set class
   let firstBtn = getSetElemClass("button", "active"); //active by default

   linkList.addEventListener("click",(e)=>{
      let btn = e.target; // button currently pressed
      /* 
      "if (btn.tagName="BUTTON")"" shows blank page when studentList region outside each buttons is clicked
      */
      if(btn.tagName="BUTTON" && btn.type==="button"){
         getSetElemClass(".active", "")
         btn.className = "active";
         showPage(list, btn.textContent)
      }
   })
}

/*
Create the `search function` function
This function will create and insert/append the elements needed for the pagination buttons
*/
let header = document.querySelector(".header");
function createElem(parent, elem, property, value, property2, value2, property3, value3, property4, value4){
   let element = document.createElement(elem);
   element[property] = value;
   if ((property2 && value2) || (property3 && value3) || (property4 && value4)){
      element[property2] = value2;
      element[property3] = value3;
      element[property4] = value4;
   }
   parent.appendChild(element);
   return element;
}
let label = createElem(header, "label", "for", "search", "className", "student-search");
let span =createElem(label, "span", "textContent", "Search by name");
let search =createElem(label, "input", "id", "search", "type", "text", "placeholder", "Search by name");
let searchBtn =createElem(label, "button", "type", "button");
let img =createElem(searchBtn, "img", "src", "img/icn-search.svg", "alt", "Search icon");

search.addEventListener("keyup", ()=>{
   let inputValue = search.value.toLowerCase();
   //filter to get the input typped
   let newData = data.filter(inputedValue=>{
      // full name without space inbetween
      fullName = (inputedValue.name.first + inputedValue.name.last).toLowerCase().indexOf(inputValue)!== -1 ; 
      // full name with space inbetween
      fullName_withSpace = (inputedValue.name.first + " " + inputedValue.name.last).toLowerCase().indexOf(inputValue)!== -1 ;
      return fullName || fullName_withSpace;
   });
   showPage(newData, 1)
   addPagination(newData);
   h2_fun(newData, h2)
})
// display total number of data
let h2 = document.querySelector("h2");
// end of search code
// total data function used in default and determining total number of search results
h2_fun=(data, elem)=>elem.innerHTML=data.length<2 ? `<h2>Student <span>( ${data.length} )</span></h2>`:`<h2>Students <span>( ${data.length} )</span></h2>`;
// Call functions
showPage(data, 1)
addPagination(data);
h2_fun(data, h2)