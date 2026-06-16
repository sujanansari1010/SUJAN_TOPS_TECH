const form = document.getElementById("linkForm");
const titleInput = document.getElementById("title");
const urlInput = document.getElementById("url");
const linksContainer = document.getElementById("linksContainer");
const error = document.getElementById("error");
const themeBtn = document.getElementById("themeBtn");

let links = JSON.parse(localStorage.getItem("links")) || [];

// Render Links
function renderLinks() {
    linksContainer.innerHTML = "";

    links.forEach((link, index) => {
        linksContainer.innerHTML += `
            <a href="${link.url}" target="_blank" class="link-btn">
                ${link.title}
            </a>

            <button class="remove-btn" onclick="removeLink(${index})">
                Remove
            </button>
        `;
    });

    localStorage.setItem("links", JSON.stringify(links));
}

// Add Link
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (!url.startsWith("https://")) {
        error.textContent = "URL must start with https://";
        return;
    }

    error.textContent = "";

    links.push({
        title,
        url
    });

    renderLinks();

    form.reset();
});

// Delete Link
function removeLink(index) {
    links.splice(index, 1);
    renderLinks();
}

// Theme Toggle
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");

    localStorage.setItem("theme", darkMode);
});

// Load Theme
if (localStorage.getItem("theme") === "true") {
    document.body.classList.add("dark");
}

// Initial Render
renderLinks();