class QuestionList {
    constructor(url) {
        this.url = url;
        this.currentQuestionIndex = 0;
        this.questions = [];
    }

    async fetchData() {
        try {
            const response = await fetch(this.url);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    parseCategories(questions) {
        return [...new Set(questions.map(q => q.category))];
    }

    parseSubCategories(questions, category) {
        return [...new Set(questions.filter(q => q.category === category).map(q => q.subcategory))];
    }

    parseQuestionList(questions, subCatKey) {
        return questions.filter(question => question.subcategory === subCatKey).map(q => q.questions).flat();
    }

    displayCategories(categories) {
        const catLinksDiv = document.getElementById('category-links');
        catLinksDiv.innerHTML = '';
        categories.forEach(category => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = category;
            link.addEventListener('click', () => 
                this.showSubCategories(category)

        );
            catLinksDiv.appendChild(link);
            catLinksDiv.appendChild(document.createElement('br'));
        });
    }

    showSubCategories(category) {
        const data = this.questions;
        const subcategories = this.parseSubCategories(data, category);
        const subCatLinksDiv = document.getElementById('subcategory-links');
        subCatLinksDiv.innerHTML = '';

        if (subcategories.length > 0) {
            document.getElementById('subcategories-heading').style.display = 'block';
        }

        subcategories.forEach(subcategory => {
            const link = document.createElement('a');
            link.href = '#';
            link.textContent = subcategory;
            link.addEventListener('click', () => {
                this.showQuestions(data, subcategory)
                document.getElementById('categories-heading').style.display = 'none';
         });
            subCatLinksDiv.appendChild(link);
            subCatLinksDiv.appendChild(document.createElement('br'));
        });
    }

    showQuestions(questions, subCatKey) {
        const parsedQuestions = this.parseQuestionList(questions, subCatKey);
        if (parsedQuestions.length > 0) {
            this.questions = parsedQuestions;
            this.currentQuestionIndex = 0;
    
            document.getElementById('questions').style.display = 'block';
            document.getElementById('questions-heading').style.display = 'block';
            this.displayQuestion();
    
            document.getElementById('nextBtn').style.display = 'inline';
            document.getElementById('backBtn').style.display = 'inline';
        } else {
            document.getElementById('questionText').innerText = "No questions available.";
        }
    }

    displayQuestion() {
        const questionText = this.questions[this.currentQuestionIndex] || "No questions available";
        document.getElementById('questionText').innerText = questionText;

        document.getElementById('backBtn').disabled = this.currentQuestionIndex <= 0;
        document.getElementById('nextBtn').disabled = this.currentQuestionIndex >= this.questions.length - 1;
    }

    setupNavigation() {
        document.getElementById('nextBtn').addEventListener('click', () => {
            if (this.currentQuestionIndex < this.questions.length - 1) {
                this.currentQuestionIndex++;
                this.displayQuestion();
            }
        });

        document.getElementById('backBtn').addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.displayQuestion();
            }
        });
    }

    async render() {
        const data = await this.fetchData();
        if (data && Array.isArray(data.questions)) {
            this.questions = data.questions;
            this.displayCategories(this.parseCategories(data.questions));
            this.setupNavigation();

            document.getElementById('questions').style.display = 'none';
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('backBtn').style.display = 'none';
        } else {
            console.error('Invalid data format');
        }
    }
}

const questionsURL = 'https://raw.githubusercontent.com/alankelsey/alankelsey.github.io/refs/heads/main/data/questions.JSON';
const questionList = new QuestionList(questionsURL);
questionList.render();
