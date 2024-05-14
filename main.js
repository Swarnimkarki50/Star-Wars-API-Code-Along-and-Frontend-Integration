document.addEventListener('DOMContentLoaded', () => {
    const peopleBtn = document.getElementById('peopleBtn');
    const filmsBtn = document.getElementById('filmsBtn');
    const starshipsBtn = document.getElementById('starshipsBtn');
    const planetsBtn = document.getElementById('planetsBtn');
    const dataContainer = document.getElementById('dataContainer');

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            displayError('Failed to fetch data. Please try again later.');
        }
    }

    function displayData(data) {
        dataContainer.innerHTML = '';
        if (data.length === 0) {
            displayError('No data available.');
            return;
        }
        data.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <div class="card-title">${item.name || item.title}</div>
                ${item.height ? `<p>Height: ${item.height}</p>` : ''}
                ${item.birth_year ? `<p>Birth Year: ${item.birth_year}</p>` : ''}
            `;
            dataContainer.appendChild(card);
        });
    }

    function displayError(message) {
        const errorCard = document.createElement('div');
        errorCard.classList.add('card');
        errorCard.innerHTML = `
            <div class="card-title">Error</div>
            <p>${message}</p>
        `;
        dataContainer.appendChild(errorCard);
    }

    peopleBtn.addEventListener('click', async () => {
        const peopleData = await fetchData('https://swapi.dev/api/people/');
        displayData(peopleData.results);
    });

    filmsBtn.addEventListener('click', async () => {
        const filmsData = await fetchData('https://swapi.dev/api/films/');
        displayData(filmsData.results);
    });

    starshipsBtn.addEventListener('click', async () => {
        const starshipsData = await fetchData('https://swapi.dev/api/starships/');
        displayData(starshipsData.results);
    });

    planetsBtn.addEventListener('click', async () => {
        const planetsData = await fetchData('https://swapi.dev/api/planets/');
        displayData(planetsData.results);
    });
});
