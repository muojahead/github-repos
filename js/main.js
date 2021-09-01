const username = document.getElementById("username");
const fetcher = document.getElementById("fetch");
const repoLink = document.querySelector(".repo-link");
const popUp = document.getElementById("popup");
const msg = document.querySelector(".popup .box p");
const msgCloser = document.querySelector(".popup .box button");
const dtatArea = document.getElementById("data");

fetcher.onclick = () => {
    let newUsername = username.value.trim();
    let reposApi = `https://api.github.com/users/${newUsername}/repos`;
    fetch(reposApi)
        .then((result) => {
            let data = result.json();
            return data;
        })
        .then((data) => {
            if (data.message || data.length == 0) {
                popUp.classList.add("active");
                msg.innerHTML = "Username is not correct please try again";
                repoLink.classList.remove("hasData");
            } else {
                repoLink.classList.add("hasData");
                dtatArea.innerHTML = "";

                for (let i = 0; i < data.length; i++) {
                    let lastUpdate = data[i].updated_at.slice(0, 10);
                    let reposCount = document.querySelector(".repos-count .count");
                    let reposAuthor = document.querySelector(".repos-count .author");
                    let userImage = document.getElementById("userImage");
                    let classNameBox = "box";
                    if (data[i].name == "github-repos") {
                        classNameBox = "box this";
                    }
                    reposAuthor.innerHTML = data[i].owner.login;
                    reposCount.innerHTML = data.length + " Repositories";
                    userImage.src = data[i].owner.avatar_url;
                    dtatArea.innerHTML += `
                    <div class="${classNameBox}">
                    <p class="repo-info">Repo. Name: <span>${
                      data[i].name
                    }</span></p>
                    <p class="repo-info">Repo. Link: <a href="${
                      data[i].html_url
                    }" target="_blank">open repo Code</a></p>
                    <p class="repo-info">
                        Stars:
                        <span>${data[i].stargazers_count}</span>
                    </p>
                    <p class="repo-info">highlighted language: <span>${
                      data[i].language == null
                        ? "not-available"
                        : data[i].language
                    }</span></p>
                    <p class="repo-info">Last Update: <span>${lastUpdate}</span></p>
                </div>
                    `;
                }
            }
        });
};
msgCloser.onclick = () => popUp.classList.remove("active");