/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list')


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
    const startIndex = ( page * 9 )- 9;
    const endIndex = page * 9;
    studentList.innerHTML = "";

    for (let i = 0; i < list.length; i++){
        if( i >= startIndex && i < endIndex ){
            //create student detail div elements and contents
            const li = document.createElement("li");
            li.className = "student-item cf";
            const studentDiv = document.createElement("div");
            studentDiv.className = "student-details";
            const image = document.createElement("img");
            image.className = "avatar";
            image.src = list[i].picture.large;
            const h3 = document.createElement("h3");
            const firstName = list[i].name.first;
            const lastName = list[i].name.last;
            h3.textContent = `${firstName} ${lastName}`
            const studentSpan = document.createElement("span");
            studentSpan.className = "email";
            studentSpan.textContent = list[i].email;
            //create joined details div element and content
            const joinedDiv = document.createElement("div");
            joinedDiv.className = "joined-details";
            const joinedSpan = document.createElement("span");
            joinedSpan.className = "date";
            joinedSpan.textContent = `Joined ${list[i].registered.date}`;
            //append elements
            studentDiv.appendChild(image);
            studentDiv.appendChild(h3);
            studentDiv.appendChild(studentSpan);
            joinedDiv.appendChild(joinedSpan);
            li.appendChild(studentDiv);
            li.appendChild(joinedDiv);
            studentList.appendChild(li);

        };
    }; //end of for loop
}; //end of showPage function


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){
    const buttonNumber = Math.ceil(list.length / 9);
    linkList.innerHTML = "";

    for(let i = 1; i <= buttonNumber; i++){
        const li = document.createElement("li");
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = i;
        li.appendChild(button);
        linkList.appendChild(li);
    };//end of for loop

    const activeButton = document.querySelector('.link-list button');
    activeButton.className = "active";

    linkList.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON"){
            const allActiveButton = document.querySelector('.active');
            allActiveButton.className = "";
            e.target.className = "active";
            showPage(list, e.target.textContent);
        };
    })
};//end of addPagination function

/*
Add a Search Component: create and add a search bar to the webpage
*/
const header = document.querySelector('header')
const searchLabel = document.createElement("label");
searchLabel.className = "student-search";
header.appendChild(searchLabel);
const searchSpan = document.createElement("span");
searchSpan.textContent = "Search by name";
searchLabel.appendChild(searchSpan);
const input = document.createElement("input");
input.id = "search";
input.placeholder = "Search by name...";
searchLabel.appendChild(input);
const searchButton = document.createElement("button");
searchButton.type = "button";
const searchImg = document.createElement("img");
searchImg.src = "img/icn-search.svg";
searchImg.alt = "Search icon";
searchButton.appendChild(searchImg);
searchLabel.appendChild(searchButton);

/*
Add Functionality to Search Component:
when entering the letter to search bar, only students
whose name includes these letter will be filtered out
*/

function filter(list){
    //here I used input.addEventListener('keyup',()=>{}),
    //which will fire the event after entering the letter to the search bar
    //instead of searchButton.addEventListener('click',()=>{})
    input.addEventListener("keyup", (e) => {
        studentList.innerHTML = "";
        linkList.innerHTML = "";
        const searchResult = input.value.toLowerCase();
        let matchList =[];
        for(let i = 0; i < list.length; i++){
            let firstName = list[i].name.first.toLowerCase();
            let lastName = list[i].name.last.toLowerCase();
            let fullName = `${firstName} ${lastName}`;
            if(fullName.includes(searchResult)){
                matchList.push(list[i]);
            }
        };//end of for loop
        if (matchList.length !== 0){
            showPage(matchList,1);
            //Change the pagination buttons
            //based on the number of matches to the search.
            addPagination(matchList);
        } else{
            //display no result found if the there is no matched result
            const messageDiv = document.createElement("div");
            const messageSpan = document.createElement("span");
            messageSpan.textContent = "No results found";
            messageDiv.appendChild(messageSpan);
            studentList.appendChild(messageDiv);
                };
    });//end of click event
};//end of filter function


// Call functions
showPage(data,1);
addPagination(data);
filter(data);
