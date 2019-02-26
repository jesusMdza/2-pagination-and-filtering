/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

//****     This project is attempting to receive an "Exceeds Expectations" grade    ****//
//
//
//
//
//
//
// Javascript code runs whenever document is completely loaded
document.addEventListener('DOMContentLoaded', () => {

  // Global variables of page. Student div and ul are appended to the page.
  const pageDiv = document.getElementsByClassName('page')[0];
  const pageHeader = document.getElementsByClassName('page-header')[0];
  let allStudents = document.getElementsByClassName('student-item');
  let a = document.getElementsByTagName('a');
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.classList.add('pagination');
  pageDiv.appendChild(div);
  div.appendChild(ul);

  // Global dynamic error message
  const error = document.createElement('p');
  ul.appendChild(error);
  error.textContent = 'No Matches Found';
  error.style.padding = '15px 0px';
  error.style.textAlign = 'center';
  error.style.color = '#888';
  error.style.fontSize = '35px';
  error.style.display = 'none';

  // sets display of all students to none
  const clear = () => {
    for (let i = 0; i < allStudents.length; i++) {
      allStudents[i].style.display = 'none';
    }
  };

  // sets class of all a tags to an empty string
  const clearClass = () => {
    for (let i = 0; i < a.length; i++) {
      a[i].classList = '';
    }
  };

  // sets all a tag's display to none
  const clearPages = () => {
    for (let i = 0; i < a.length; i++) {
      a[i].style.display = 'none';
    }
  };

  /* Function passes "list" (all students) and "page" (page text content) arguments and
   displays a specific student list */
  const showPage = (list, page) => {
    clear();
    let firstIndex = page * 10 - 10;
    let lastIndex = page * 10 - 1;
    let array = [];

    for (let i = 0; i < list.length; i++) {
      array.push(list[i]);
      if (array.indexOf(array[i]) >= firstIndex && array.indexOf(array[i]) <= lastIndex) {
        array[i].style.display = 'block';
      }
    }
  };

  /* Function dynamically creates and appends li and a tags to the global ul
  depending on the amount of students passed in the "list" argument. */
  const appendPageLinks = (list) => {
    let pageNo = 1;
    let totalPages = Math.ceil(list.length / 10);
    const paginationDiv = document.getElementsByClassName('pagination')[0];
    const paginationUl = paginationDiv.firstElementChild;

    for (let i = 0; i < totalPages; i++) {
      let li = document.createElement('li');
      let a = document.createElement('a');
      a.style.cursor = 'pointer';
      paginationUl.appendChild(li);
      li.appendChild(a);
      a.textContent = pageNo;
      pageNo++;

      // Styles user clicked page
      a.addEventListener('click', (event) => {
        clear();
        clearClass();
        const target = event.target;
        const page = parseInt(target.textContent);
        if (target) {
          target.classList = 'active';
        }

        showPage(list, page);
      });
    }

  };

  // Function dynamically creates the search input field and button and appends to the page header
  const appendSearch = (list) => {
    const searchDiv = document.createElement('div');
    const searchButton = document.createElement('button');
    const input = document.createElement('input');
    const studentInfo = [];
    let newSearch;
    let studentDetails;
    let a = document.getElementsByTagName('a');
    searchDiv.classList.add('student-search');
    searchButton.textContent = 'Search';
    searchButton.style.cursor = 'pointer';
    input.placeholder = 'Search for students...';
    pageHeader.appendChild(searchDiv);
    searchDiv.appendChild(input);
    searchDiv.appendChild(searchButton);

    for (let i = 0; i < list.length; i++) {
      studentDetails = list[i].firstElementChild;
      studentInfo.push(studentDetails);
    }

    // student's name and email searched for by user's input
    input.addEventListener('keyup', () => {
      clear();
      clearPages();
      newSearch = [];

      const search = input.value.toLowerCase();

      for (let i = 0; i < studentInfo.length; i++) {
        const searchList = studentInfo[i].parentNode;
        if (studentInfo[i].textContent.includes(search)) {
          searchList.style.display = 'block';
          newSearch.push(searchList);
        }

      }

      // If no students are returned, display error message
      if (newSearch.length === 0) {
        error.style.display = 'block';
      } else {
        error.style.display = 'none';
      }

      appendPageLinks(newSearch);
      selectFirstPage(newSearch);
    });
  };

  // Function styles and clicks first dynamic page
  const selectFirstPage = (list) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i].textContent == 1) {
        a[i].classList = 'active';
      }

      if (a[i].style.display !== 'none') {
        a[i].click();
        return;
      }
    }
  };

  appendSearch(allStudents);
  appendPageLinks(allStudents);
  selectFirstPage(allStudents);
});
