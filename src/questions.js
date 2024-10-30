class QuestionList {
  constructor(url) {
    this.url = url;
    this.categories = new Map(); // Store categories and subcategories
    this.subcategoriesHeading = document.getElementById('subcategories-heading');
    this.questionsHeading = document.getElementById('questions-heading');
  }

  // Fetch JSON data from the given URL
  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Parse questions and store them in a structured way
  parseQuestions(questions) {
    questions.forEach((questionSet) => {
      const { category, subcategory, questions: questionList } = questionSet;

      if (!this.categories.has(category)) {
        this.categories.set(category, new Map());
      }

      const subCategories = this.categories.get(category);
      if (!subCategories.has(subcategory)) {
        subCategories.set(subcategory, questionList);
      }
    });
  }

  // Create clickable category links
  createCategoryLinks() {
    const catLinksDiv = document.getElementById('category-links');
    catLinksDiv.innerHTML = ''; // Clear existing content

    this.categories.forEach((subCategories, category) => {
      const categoryLink = this.createLink(category, 'category');

      categoryLink.addEventListener('click', () => {
        // Show the subcategories heading when a category is clicked
        this.subcategoriesHeading.style.display = 'block';
        this.createSubCategoryLinks(category);
        
        // Hide questions heading and content until a subcategory is clicked
        this.questionsHeading.style.display = 'none';
        document.getElementById('questions').innerHTML = '';
      });

      catLinksDiv.appendChild(categoryLink);
      catLinksDiv.appendChild(document.createElement('br'));
    });
  }

  // Create subcategory links when a category is clicked
  createSubCategoryLinks(category) {
    const subCatLinksDiv = document.getElementById('subcategory-links');
    subCatLinksDiv.innerHTML = ''; // Clear previous subcategory links

    const subCategories = this.categories.get(category);
    subCategories.forEach((questionList, subcategory) => {
      const subCategoryLink = this.createLink(subcategory, 'subcategory');

      subCategoryLink.addEventListener('click', () => {
        // Show the questions heading when a subcategory is clicked
        this.questionsHeading.style.display = 'block';
        this.displayQuestions(questionList);
      });

      subCatLinksDiv.appendChild(subCategoryLink);
      subCatLinksDiv.appendChild(document.createElement('br'));
    });
  }

  // Display questions when a subcategory is clicked
  displayQuestions(questions) {
    const questionListDiv = document.getElementById('questions');
    questionListDiv.innerHTML = ''; // Clear previous questions

    const ul = document.createElement('ul');
    questions.forEach((questionText) => {
      const li = document.createElement('li');
      
      li.textContent = questionText;
      ul.appendChild(li);
      ul.appendChild(document.createElement('br'));
    });

    questionListDiv.appendChild(ul);
  }

  // Helper method to create links
  createLink(text, className) {
    const link = document.createElement('a');
    link.href = '#';
    link.className = className;
    link.textContent = text;
    return link;
  }

  // Main render function to fetch data and set up the UI
  async render() {
    const data = await this.fetchData();

    if (data && Array.isArray(data.questions)) {
      this.parseQuestions(data.questions);
      this.createCategoryLinks(); // Render the categories
    } else {
      console.error('Invalid data format');
    }
  }
}

// Initialize and render the questions list
const questionsURL = 'https://raw.githubusercontent.com/alankelsey/alankelsey.github.io/refs/heads/main/data/questions.JSON';
const questionList = new QuestionList(questionsURL);
questionList.render();
