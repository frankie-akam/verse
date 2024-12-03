// Temporary verification authentication
const checkbox = document.getElementById('human-check'); // selecting the checkbox element

    // an event listener for when the checkbox is clicked
checkbox.addEventListener('change', function () {
    if (this.checked) {
        window.location.href = 'about.html'; // redirecting to about.html when the checkbox is ticked
    }
});



// User photo preview
document.getElementById('user-photo').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photo-preview');
            preview.style.display = 'block';
            preview.style.backgroundImage = `url(${e.target.result})`;
        };
        reader.readAsDataURL(file);
    }
});



// Share your verse
document.addEventListener("DOMContentLoaded", () => {
    const userPhotoInput = document.getElementById("user-photo");
    const usernameInput = document.getElementById("username-input");
    const verseInput = document.getElementById("verse-input");
    const postButton = document.getElementById("post-verse-btn");
    const charCounter = document.getElementById("char-counter");
    const versesContainer = document.getElementById("verses-container");

    let userPhoto = null;   // store the uploaded user photo

    // to handle the user photo upload
    userPhotoInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                userPhoto = e.target.result;    // convert the photo into a format the browser can display called base64, and then save the converted photo into userPhoto
            };
            reader.readAsDataURL(file);
        }
        validateInputs();
    });

    // check character count and validate inputs
    verseInput.addEventListener("input", () => {
        const charCount = verseInput.value.length;
        charCounter.textContent = `${charCount}/300`;
        validateInputs();
    });

    // validate name input
    usernameInput.addEventListener("input", validateInputs);

    // Post the verse
    postButton.addEventListener("click", () => {
        const verse = verseInput.value.trim();
        const username = usernameInput.value.trim();

        if (verse && username && userPhoto) {
            // Create verse post
            const versePost = document.createElement("div");
            versePost.classList.add("verse-box");

            versePost.innerHTML = `
                <div style="display: flex; align-items: center;">
                    <img src="${userPhoto}" alt="User Photo" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;">
                    <div style="text-align: justify; flex: 1;">
                        <p style="margin: 0;">${verse}</p>
                        <footer style="text-align: right; margin-top: 10px; font-style: italic; color: #333; font-weight: 900;">- ${username}</footer>
                    </div>
                </div>
            `;

            versesContainer.appendChild(versePost);

            // Reset inputs
            resetInputs();
        }
    });

    // validate all inputs to enable the "post verse" button
    function validateInputs() {
        const isValid = usernameInput.value.trim() && verseInput.value.trim().length > 0 && userPhoto;
        postButton.disabled = !isValid;
    }

    // reset inputs and char counter: this clears the photo, name and verse fields, resets the character counter to "0/300", and disables the "Post Verse" button so that the user can post a new verse
    function resetInputs() {
        userPhotoInput.value = "";
        usernameInput.value = "";
        verseInput.value = "";
        charCounter.textContent = "0/300";
        userPhoto = null;
        postButton.disabled = true;
    }
});








