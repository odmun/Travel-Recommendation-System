document.addEventListener("DOMContentLoaded", function () {
    // Verificar si estamos en la página "About Us"
    const aboutSection = document.querySelector(".about-content");

    // Resaltar el enlace activo en la barra de navegación
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        if (window.location.href.includes(link.getAttribute("href"))) {
            link.style.fontWeight = "bold";
            link.style.borderBottom = "2px solid white";
        }
    });



    const homeSection = document.querySelector(".home-content");
    if (homeSection) {
        // Aplicar estilos iniciales para la animación
        homeSection.style.opacity = "0";
        homeSection.style.transform = "translateY(50px)";

        // Agregar un pequeño retardo antes de iniciar la animación
        setTimeout(() => {
            homeSection.style.transition = "opacity 1s ease, transform 1s ease";
            homeSection.style.opacity = "1";
            homeSection.style.transform = "translateY(0)";
        }, 300);
    }

    if (aboutSection) {
        // Aplicar estilos iniciales para la animación
        aboutSection.style.opacity = "0";
        aboutSection.style.transform = "translateY(50px)";

        // Agregar un pequeño retardo antes de iniciar la animación
        setTimeout(() => {
            aboutSection.style.transition = "opacity 1s ease, transform 1s ease";
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
        }, 300);
    }



    const contactSection = document.querySelector(".contact-content");
    if (contactSection) {
        // Aplicar estilos iniciales para la animación
        contactSection.style.opacity = "0";
        contactSection.style.transform = "translateY(50px)";

        // Agregar un pequeño retardo antes de iniciar la animación
        setTimeout(() => {
            contactSection.style.transition = "opacity 1s ease, transform 1s ease";
            contactSection.style.opacity = "1";
            contactSection.style.transform = "translateY(0)";
        }, 300);
    }

    if (contactSection) {
        // Aplicar estilos iniciales para la animación
        contactSection.style.opacity = "0";
        contactSection.style.transform = "translateY(50px)";

        // Agregar un pequeño retardo antes de iniciar la animación
        setTimeout(() => {
            contactSection.style.transition = "opacity 1s ease, transform 1s ease";
            contactSection.style.opacity = "1";
            contactSection.style.transform = "translateY(0)";
        }, 300);
    }





    const searchInput = document.querySelector('.search-container input');
    const searchBtn = document.querySelector('.search-container button');
    const resultsContainer = document.createElement('div');
    resultsContainer.className = 'search-results';
    document.querySelector('.search-container').appendChild(resultsContainer);
    
    let travelData = {};
    
    // Cargar el archivo JSON
    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            travelData = data;
            console.log('Datos cargados:', travelData); // Verificación
        })
        .catch(error => console.error('Error loading data:', error));
    
    // Evento de búsqueda
    searchBtn.addEventListener('click', function() {
        const keyword = searchInput.value.trim().toLowerCase();
        resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
        
        let recommendations = [];
    
        // Si la palabra clave es vacía, no hacer nada
        if (keyword === '') {
            resultsContainer.style.display = 'none'; // No mostrar si no hay palabra clave
            return;
        }
    
        // Buscar coincidencias para países (Australia, Japan, Brazil, etc.)
        const countryMatch = travelData.countries.filter(country =>
            country.name.toLowerCase().includes(keyword)
        );
    
        // Si hay coincidencias de países, buscar las ciudades de esos países
        if (countryMatch.length > 0) {
            countryMatch.forEach(country => {
                recommendations = recommendations.concat(country.cities);
            });
        }
    
        // Buscar coincidencias en templos
        if (keyword === 'temples' || keyword === 'templo') {
            recommendations = recommendations.concat(travelData.temples);
        }
    
        // Buscar coincidencias en playas
        if (keyword === 'beaches' || keyword === 'playa') {
            recommendations = recommendations.concat(travelData.beaches);
        }
    
        // Si no se encuentra ninguna coincidencia, mostrar mensaje
        if (recommendations.length === 0) {
            resultsContainer.innerHTML = '<p>No se encontraron resultados.</p>';
            resultsContainer.style.display = 'block';
            return;
        }
    
        // Mostrar los resultados
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
    
    // Cerrar resultados al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            resultsContainer.style.display = 'none';
        }
    });
    
    
    document.getElementById('reset-btn').addEventListener('click', function() {
    document.getElementById('search-input').value = ''; // Borra el texto del input
    document.querySelector('.search-results').innerHTML = ''; // Borra los resultados
});

});



