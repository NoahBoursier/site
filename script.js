window.onload = function() {
    loadContent('portfolio.html'); // Load portfolio content by default
};

document.querySelectorAll('.top-banner nav a').forEach(tab => {
    tab.addEventListener('click', function(event) {
        event.preventDefault();
        let contentFile = '';
        if (this.getAttribute('href') === '#about') {
            contentFile = 'about.html';
        } else if (this.getAttribute('href') === '#portfolio') {
            contentFile = 'portfolio.html';
        } else if (this.getAttribute('href') === '#links') {
            contentFile = 'links.html';
        }
        // Add more conditions here for other tabs
        loadContent(contentFile);
    });
});

function loadContent(filename) {
    fetch(filename)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            if (filename === 'portfolio.html') {
                attachTagEventListeners(); // Only re-attach for portfolio
                attachPortfolioItemEventListeners();
            }
        })
        .catch(error => console.error('Error loading content:', error));
        window.scrollTo(0, 0);
}




document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('click', function() {
        this.classList.toggle('selected');
        filterPortfolio();
    });
});

function attachTagEventListeners() {
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('selected');
            filterPortfolio();
        });
    });
}

function filterPortfolio() {
    const selectedTags = new Set();
    document.querySelectorAll('.tag.selected').forEach(tag => {
        selectedTags.add(tag.getAttribute('data-tag'));
    });
    
    const selectedTagsA = Array.from(selectedTags)

    document.querySelectorAll('.portfolio-item').forEach(item => {
        const itemTags = item.getAttribute('data-tags').split(' ');
        
        /* 
        // INCLUSIVE
        if (itemTags.some(tag => selectedTags.has(tag)) || selectedTags.size === 0) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }*/
        
        // EXCLUSIVE
        if (selectedTagsA.every(tag => itemTags.includes(tag)) || selectedTagsA.size === 0) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const shapeChanger = document.getElementById('portfolio-item');

    shapeChanger.addEventListener('click', function() {
        this.classList.toggle('viewing');
    });
});

function attachPortfolioItemEventListeners() {
    document.querySelectorAll('.portfolio-item').forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('viewing');
            filterPortfolio();
        });
    });
}