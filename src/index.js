// your code here

const cakeURL = "http://localhost:3000/cakes"

//fetch books and put them on the left side of page
fetch(cakeURL)
    .then(response => response.json())
    .then(allCakeData => {
        const cakes = allCakeData;
        const cakeList = document.getElementById("cake-list");


        // Clear the container
        cakeList.innerHTML = '';

        cakes.forEach(cake => {
            const cakeItem = document.createElement('li');
            cakeItem.textContent = cake.name;
            cakeList.appendChild(cakeItem);
            //event handler for nav items that displays cake info
            cakeItem.addEventListener('click', () => displayCakeInfo(cake.id));
        });

    });
//function to display cake info on right side of page
function displayCakeInfo(cakeId) {
    fetch(`${cakeURL}/${cakeId}`)
        .then(response => response.json())
        .then(cake => {
            // Update cake details with the selected cake's information
            document.getElementById("cake-name").textContent = cake.name;
            document.getElementById("cake-image").src = cake.image_url;
            document.getElementById("cake-image").alt = cake.name;
            document.getElementById("cake-description").textContent = cake.description;

            // Update reviews
            const reviewList = document.getElementById('review-list');
            reviewList.innerHTML = '';
            cake.reviews.forEach(reviewText => {
                const reviewItem = document.createElement('li');
                reviewItem.textContent = reviewText;
                reviewList.appendChild(reviewItem);
                //event handler for reviews that allows for delete    
                reviewItem.addEventListener('click', () => {
                    reviewList.removeChild(reviewItem);
                });
            });
        })
}

displayCakeInfo(1);

// Event listener for the review form submission
const reviewForm = document.getElementById('review-form');
reviewForm.addEventListener('submit', event => {
    // Prevent the form from submitting
    event.preventDefault(); 
    const reviewInput = document.getElementById('review');
    const review = reviewInput.value.trim();
    const reviewList = document.getElementById('review-list');

    if (review) {
        const reviewItem = document.createElement('li');
        reviewItem.textContent = review;
        document.getElementById('review-list').appendChild(reviewItem);
        reviewInput.value = '';

        reviewItem.addEventListener('click', () => {
            reviewList.removeChild(reviewItem);
        });   
    }
});

