class QuestionList {
  constructor(url) {
    this.url = url;
    this.test = '123';
  }

  // Fetch JSON data from the given URL
  async fetchData() {
    try {
      // const response = await fetch("../data/questionsCopy.JSON");
      const response = await fetch(this.url);
      console.log("asunc fetch here");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // get unique categories from questions data
  parseCategories(questions) {
    const uniqueCategories = new Set();
    questions.forEach((questions, i) => {
      uniqueCategories.add(questions.category);

    });
    return uniqueCategories;
  }

  parseSubCats(questions) {
    const uniqueSubCats = new Set();
  
    questions.forEach((subcat) => {
      uniqueSubCats.add(subcat.subcategory);
    });
    return uniqueSubCats;
  }

  parseQuestionList(questions, subCatKey) {
    const questionList = [];
  
    questions.forEach((question, i) => {
      if (questions[i].subcategory == subCatKey) {
        questionList.push(question.questions);
      }
    });
    return questionList[0];
  }

  // Generate clickable links from the fetched data keys
  createLinks(questions) {
    const categories = this.parseCategories(questions);
    const subCategories = this.parseSubCats(questions);
    const catLinksDiv = document.getElementById('category-links');
    const subCatLinksDiv = document.getElementById('subcategory-links');
    const toggler = document.getElementsByClassName('caret');

    // caret toggle behavior
    for (var i = 0; i < toggler.length; i++) {
      toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle('active');
        this.classList.toggle('caret-down');
      })
    };
    
    // create links for categories 
    categories.forEach((category) => {
      const link = document.createElement('a');

      link.href = '#'; // Set the href to '#'
      link.textContent = `${category}`; // Display "Question 1", "Question 2", etc.
     
      // listener for caret toggle
      link.addEventListener('click', (event) => {

        // create links for subcategories 
        catLinksDiv.innerHTML = ''
        subCategories.forEach((subCat) => {
          const link = document.createElement('a');
      
          link.href = '#'; // Set the href to '#'
          link.textContent = `${subCat}`; // Display "Question 1", "Question 2", etc.

          link.addEventListener('click', (event) => {
            const br = document.createElement('br');
            catLinksDiv.innerHTML = ''
            const questionList = this.parseQuestionList(questions, subCat);

            questionList.forEach((questionText) => {
              const p = document.createElement('p')
              const ul = document.createElement('ul')
              const li = document.createElement('li');
              const br = document.createElement('br');
              
              li.textContent = `${questionText}`; // Display "Question 1", "Question 2", etc.
              
              catLinksDiv.append(ul);
              ul.appendChild(li);
              ul.appendChild(br); // Add a line break after each link
            })            
          });
          const br = document.createElement('br');
        const span = document.createElement('span') //<span class="caret">Knowledge Area</span>
        span.setAttribute('class', 'caret')
        catLinksDiv.appendChild(span);
        catLinksDiv.appendChild(link);
        catLinksDiv.appendChild(br); // Add a line break after each link
        });
      });
      
      const br = document.createElement('br');
      const span = document.createElement('span') //<span class="caret">Knowledge Area</span>
      span.setAttribute('class', 'caret')
      catLinksDiv.appendChild(span);
      catLinksDiv.appendChild(link);
      catLinksDiv.appendChild(br); // Add a line break after each link
    });  
  }

  // Display the details of the category
  showCategoryDetail(category) {
    const detailDiv = document.getElementById('subcategory-links');

    detailDiv.textContent = category; // Display the category
  }

  // showQuestionDetail(questionList) {
  //   const eachQuestion = this.parseQuestionList(questionList);
  //   const detailDiv = document.getElementById('questions');

  //   detailDiv.textContent = eachQuestion; // Display the question

  //   return true
  // }

  // Display the details of the clicked question
  showSubCats(question) {
    const subCats = this.parseSubCats(questions);
    const detailDiv = document.getElementById('question-subCat');

    detailDiv.textContent = parseSubCats; // Display the subcategory
  }

  // Render the list of links and setup the question detail functionality
  async render() {
    const data = await this.fetchData();

    if (data && Array.isArray(data.questions)) { 
      this.createLinks(data.questions);
      // this.createLinks(data.questions);
    } else {
      console.error('Invalid data format');
    }
  }
}

// Initialize and render the questions list
const questionsURL = 'https://raw.githubusercontent.com/alankelsey/alankelsey.github.io/refs/heads/main/data/questions.JSON';
const questionList = new QuestionList(questionsURL);
questionList.render();
