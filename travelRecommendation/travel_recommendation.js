document.addEventListener("DOMContentLoaded", function () {
    // Check if we are on the "About Us" page
    const aboutSection = document.querySelector(".about-content");

    // Highlight the active link in the navigation bar
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.style.fontWeight = "bold";
            link.style.borderBottom = "2px solid white";
        }
    });

    // Animate home section on page load
    const homeSection = document.querySelector(".home-content");
    if (homeSection) {
        homeSection.style.opacity = "0";
        homeSection.style.transform = "translateY(50px)";
        setTimeout(() => {
            homeSection.style.transition = "opacity 1s ease, transform 1s ease";
            homeSection.style.opacity = "1";
            homeSection.style.transform = "translateY(0)";
        }, 300);
    }

    // Animate about section on page load
    if (aboutSection) {
        aboutSection.style.opacity = "0";
        aboutSection.style.transform = "translateY(50px)";
        setTimeout(() => {
            aboutSection.style.transition = "opacity 1s ease, transform 1s ease";
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
        }, 300);
    }

    // Animate contact section on page load
    const contactSection = document.querySelector(".contact-content");
    if (contactSection) {
        contactSection.style.opacity = "0";
        contactSection.style.transform = "translateY(50px)";
        setTimeout(() => {
            contactSection.style.transition = "opacity 1s ease, transform 1s ease";
            contactSection.style.opacity = "1";
            contactSection.style.transform = "translateY(0)";
        }, 300);
    }

    // Create a container for the search results
    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-container button');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    document.querySelector('.search-container').appendChild(resultsContainer);
    
    let travelData = {};

    // Load the JSON file with travel data
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log('Loaded data:', travelData); // Verification
        })
        .catch(error => console.error('Error loading data:', error));

    // Search event listener
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim().toLowerCase();
        resultsContainer.innerHTML = ''; // Clear previous results
        
        let recommendations = [];
        
        // If the keyword is empty, do nothing
        if (keyword === '') {
            resultsContainer.style.display = 'none'; // Do not show results if no keyword
            return;
        }

        // Search for matches in countries (Australia, Japan, Brazil, etc.)
        const countryMatch = travelData.countries.filter(country =>
            country.name.toLowerCase().includes(keyword)
        );

        // If there are country matches, search the cities within those countries
        if (countryMatch.length > 0) {
            countryMatch.forEach(country => {
                recommendations = recommendations.concat(country.cities);
            });
        }

        // Search for matches in temples
        if (keyword === 'temples' || keyword === 'templo') {
            recommendations = recommendations.concat(travelData.temples);
        }

        // Search for matches in beaches
        if (keyword === 'beaches' || keyword === 'playa') {
            recommendations = recommendations.concat(travelData.beaches);
        }

        // If no matches are found, show a message
        if (recommendations.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            resultsContainer.style.display = 'block';
            return;
        }

        // Display the results
        recommendations.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            resultItem.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <br>
                <div class="result-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <br>
                <button class="visit-btn">Visit</button>
            `;
            
            resultsContainer.appendChild(resultItem);
        });

        resultsContainer.style.display = 'block';
    });

    // Close the search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });

    // Clear search input and results when reset button is clicked
    document.getElementById('reset-btn').addEventListener('click', function() {
        document.getElementById('search-input').value = ''; // Clear input field
        document.querySelector('.search-results').innerHTML = ''; // Clear results
    });
});
