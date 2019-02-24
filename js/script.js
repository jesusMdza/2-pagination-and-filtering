/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/***
   Add your global variables that store the DOM elements you will
   need to reference and/or manipulate.

   But be mindful of which variables should be global and which
   should be locally scoped to one of the two main functions you're
   going to create. A good general rule of thumb is if the variable
   will only be used inside of a function, then it can be locally
   scoped to that function.
***/
document.addEventListener('DOMContentLoaded', () => {

  const pageDiv = document.getElementsByClassName('page')[0];
  const pageHeader = document.getElementsByClassName('page-header')[0];
  let allStudents = document.getElementsByClassName('student-item');
  let a = document.getElementsByTagName('a');
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.classList.add('pagination');
  pageDiv.appendChild(div);
  div.appendChild(ul);

  const error = document.createElement('p');
  ul.appendChild(error);
  error.textContent = 'No Matches Found';
  error.style.padding = '15px 0px';
  error.style.textAlign = 'center';
  error.style.color = '#888';
  error.style.fontSize = '35px';
  error.style.display = 'none';

  const clear = () => {
    for (let i = 0; i < allStudents.length; i++) {
      allStudents[i].style.display = 'none';
    }
  };

  const clearClass = () => {
    for (let i = 0; i < a.length; i++) {
      a[i].classList = '';
    }
  };

  const clearPages = () => {
    for (let i = 0; i < a.length; i++) {
      a[i].style.display = 'none';
    }
  };

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

  /***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

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

  const appendSearch = (list) => {
    const searchDiv = document.createElement('div');
    const searchButton = document.createElement('button');
    const input = document.createElement('input');
    const studentInfo = [];
    let newSearch;
    let studentDetails;
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

        if (newSearch.length === 0) {
          error.style.display = 'block';
        } else {
          error.style.display = 'none';
        }
      }

      appendPageLinks(newSearch);
    });
  };

  const selectFirstPage = (list) => {
    for (let i = 0; i < a.length; i++) {
      a[0].classList = 'active';
    }

    showPage(list, 1);
  };

  appendSearch(allStudents);
  appendPageLinks(allStudents);
  selectFirstPage(allStudents);
});

// Remember to delete the comments that came with this file, and replace them with your own code comments