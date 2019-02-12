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
const pageDiv = document.getElementsByClassName('page')[0];
const allStudents = document.getElementsByClassName('student-item');

const clear = () => {

  for (let i = 0; i < allStudents.length; i++) {
    allStudents[i].style.display = 'none';
  }
}

const showPage = (list, page) => {

  let listArray = Array.from(list);

  let pageOne = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 0 && listArray.indexOf(li) <= 9) {
      li.style.display = 'block';
    }
  });

  let pageTwo = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 10 && listArray.indexOf(li) <= 19) {
      li.style.display = 'none';
    }
  });

  let pageThree = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 20 && listArray.indexOf(li) <= 29) {
      li.style.display = 'none';
    }
  });

  let pageFour = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 30 && listArray.indexOf(li) <= 39) {
      li.style.display = 'none';
    }
  });

  let pageFive = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 40 && listArray.indexOf(li) <= 49) {
      li.style.display = 'none';
    }
  });

  let pageSix = listArray.filter((li) => {
    if (listArray.indexOf(li) >= 50 && listArray.indexOf(li) <= 59) {
      li.style.display = 'none';
    }
  });

}

/***
   Create the `appendPageLinks function` to generate, append, and add
   functionality to the pagination buttons.
***/

const appendPageLinks = (list) => {

  let pageNo = 1;
  let totalPages = Math.ceil(list.length / 10);
  let div = document.createElement('div');
  let ul = document.createElement('ul');
  div.classList.add('pagination');
  pageDiv.appendChild(div);
  div.appendChild(ul);

  for (let i = 0; i < totalPages; i++) {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.style.cursor = 'pointer';
    ul.appendChild(li);
    li.appendChild(a);
    a.textContent = pageNo;
    pageNo++;

    a.addEventListener('click', (event) => {
      const target = event.target;
      if (target) {
        target.classList.add('active');
      }
      showPage(list, page);
    });
  }

};

appendPageLinks(allStudents);
// Remember to delete the comments that came with this file, and replace them with your own code comments