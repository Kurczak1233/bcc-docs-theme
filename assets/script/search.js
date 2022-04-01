const doubleFunction = () => {
    const showSearchResults = document.getElementById("search");

    if (showSearchResults.classList.contains("active")) {
        document.getElementById("search_results").innerHTML = "";
    } else {
        showSearchResults.classList.add("active");
    }

    searchInFiles();
}

function closeModal() {
    const showSearchResults = document.getElementById("search");
    showSearchResults.classList.remove("active");

}

async function searchInFiles() {

    const searchInput = document.getElementById("search_input");
    const searchInputValue = searchInput.value;

    const searchUrl = `https://api.github.com/search/code?q=${searchInputValue}+in:file+language:markdown+org:bcc-code&per_page=50`;

    const getMarkdownData = await fetch(searchUrl).then(response => response.json()).catch(error => console.log(error));
    console.log(getMarkdownData);
    let data;
    for (data of getMarkdownData.items) {

        const markdownRepositoryData = data.repository;
        const markdownRepositoryName = markdownRepositoryData.name;
        const markdownFileName = data.name;
        const markdownFilePath = data.path;
        const markdownHtmlUrl = data.html_url;
        const markdownRepo = data.repository;
        const markdownRepoUrl = markdownRepo.html_url;

        const sliceFilePath = markdownFilePath.slice(0, -3);


        let markdownPageUrl = String(sliceFilePath);
        const findDocs = 'docs';
        const foundDocs = markdownPageUrl.match(findDocs);
        const findRepo = 'docs';
        const foundRepo = markdownPageUrl.match(findRepo);

        if (foundDocs !== null && foundDocs[0] === findDocs) {

            markdownPageUrl = String(sliceFilePath).replace(/^docs/, markdownRepositoryName);

        } else if (foundRepo !== null && foundRepo[0] === findRepo) {

            markdownPageUrl = String(sliceFilePath).replace(/^bcc-code.github.io/, "");

        } else {

            markdownPageUrl = markdownHtmlUrl

        }


        const createLocation = document.getElementById("search_results")
        let createListItem = document.createElement("li");
        let searchSuggestion = document.createElement("a");
        let repoSpan = document.createElement("a")

        createListItem.className = "search_suggestion";

        searchSuggestion.setAttribute("href", `${markdownPageUrl}`);
        searchSuggestion.innerText = `${sliceFilePath}`;

        repoSpan.className = "result_repository"
        repoSpan.setAttribute("href", `${markdownRepoUrl}`);
        repoSpan.setAttribute("target", '_blank');
        repoSpan.innerText = `${markdownRepositoryName}`;

        createLocation.appendChild(createListItem).appendChild(searchSuggestion);
        createLocation.appendChild(createListItem).appendChild(repoSpan);


    }

}