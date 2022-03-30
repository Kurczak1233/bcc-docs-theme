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

    const searchUrl = `https://api.github.com/search/code?q=${searchInputValue}+in:file+language:markdown+repo:bcc-code/bcc-code.github.io`;

    const getMarkdownData = await fetch(searchUrl).then(response => response.json()).catch(error => console.log(error));
    console.log(getMarkdownData);
    let data;
    for (data of getMarkdownData.items) {

        const markdownRepositoryData = data.repository;
        const markdownRepositoryName = markdownRepositoryData.name;
        const markdownFileName = data.name;
        const markdownFilePath = data.path;

        const sliceFilePath = markdownFilePath.slice(0, -3);
        // const markdownToHtml = `${sliceFilePath}`;

        const markdownToHtml = `/${markdownRepositoryName}/${sliceFilePath}`;
        let markdownPageUrl;
        markdownPageUrl = String(markdownToHtml).replace(/^bcc-code\.github\.io/, '');

        const createLocation = document.getElementById("search_results")
        let createListItem = document.createElement("li");
        let searchSuggestion = document.createElement("a");

        createListItem.className = "search_suggestion";

        searchSuggestion.setAttribute("href", `${markdownPageUrl}`);
        searchSuggestion.innerText = `${markdownFileName}`;

        createLocation.appendChild(createListItem).appendChild(searchSuggestion);


    }

}

// function autoComplete() {
//     let input, filter, ul, li, a, i;
//     input = document.getElementById("search_code_input");
//     filter = input.value.toUpperCase();
//     ul = document.getElementById("search_suggestions");
//     li = ul.getElementsByTagName("li");
//
//     for (i = 0; i < li.length; i++) {
//
//         a = li[i].getElementsByTagName("a")[0];
//         if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
//             li[i].style.display = "";
//         } else {
//             li[i].style.display = "none";
//         }
//     }
// }
//
// function searchOnClickFunction() {
//
//     const searchCode = document.getElementById("search_code_input").value;
//     window.location.href = "https://github.com/search?q=org%3Abcc-code+" + searchCode;
//
// }
//
// async function searchInFiles() {
//
//     const searchCode = document.getElementById("search_code_input").value;
//     const searchUrl = `https://api.github.com/search/code?q=${searchCode}+in:file+language:markdown+org:bcc-code&per_page=100&page=1`;
//
//     const getMarkdownData = await fetch(searchUrl).then(response => response.json()).catch(error => console.log(error));
//
//
//     console.log(getMarkdownData);
//
// }
//
//
// async function listMarkdownFiles() {
//
//     let newElementsLocation = document.getElementById("search_suggestions");
//
//     if (sessionStorage.length !== 0) {
//         console.log("There is data in the session!");
//
//         for (let searchNumber = 1; searchNumber <= sessionStorage.length; searchNumber++) {
//
//             let data = sessionStorage[searchNumber];
//
//             data = JSON.parse(data)
//
//             let firstKey = Object.keys(data)[0];
//             let secondKey = Object.keys(data)[1];
//             let thirdKey = Object.keys(data)[2];
//
//             let markdownRepositoryName = data[firstKey];
//             let markdownFileName = data[secondKey];
//             let markdownFilePath = data[thirdKey];
//
//             const sliceFilePath = markdownFilePath.slice(0, -3);
//
//             const markdownPageUrl = `/${markdownRepositoryName}/${sliceFilePath}.html`;
//
//             let createListItem = document.createElement("li");
//             let searchSuggestion = document.createElement("a");
//             let searchSuggestionRepository = document.createElement("span");
//
//             createListItem.className = "search_suggestion";
//
//             searchSuggestion.setAttribute("href", `${markdownPageUrl}`);
//             searchSuggestion.innerText = `${markdownFileName}`;
//
//             searchSuggestionRepository.className = "search_suggestion";
//             searchSuggestionRepository.innerText = `${markdownRepositoryName}`;
//
//             newElementsLocation.appendChild(createListItem).appendChild(searchSuggestion);
//             newElementsLocation.appendChild(createListItem).appendChild(searchSuggestion).appendChild(searchSuggestionRepository);
//
//
//         }
//
//     } else {
//         console.log("The session data is empty... adding data")
//
//         let getMarkdownFilesUrl;
//
//         getMarkdownFilesUrl = [
//             `https://api.github.com/search/code?q=language:markdown+org:bcc-code&per_page=100&page=1`,
//             `https://api.github.com/search/code?q=language:markdown+org:bcc-code&per_page=100&page=2`,
//             `https://api.github.com/search/code?q=language:markdown+org:bcc-code&per_page=100&page=3`,
//             `https://api.github.com/search/code?q=language:markdown+org:bcc-code&per_page=100&page=4`
//         ];
//
//         let data;
//         let urlNumber = 1;
//
//         for (const url of getMarkdownFilesUrl) {
//
//             const getMarkdownData = await fetch(url).then(response => response.json()).catch(error => console.log(error));
//             for (data of getMarkdownData.items) {
//
//                 const markdownRepositoryData = data.repository;
//                 const markdownRepositoryName = markdownRepositoryData.name;
//                 const markdownFileName = data.name;
//                 const markdownFilePath = data.path;
//
//                 const saveToSession = {
//                     markdownRepositoryName,
//                     markdownFileName,
//                     markdownFilePath
//                 }
//
//                 sessionStorage.setItem(urlNumber, JSON.stringify(saveToSession));
//                 const sliceFilePath = markdownFilePath.slice(0, -3);
//
//                 const markdownPageUrl = `/${markdownRepositoryName}/${sliceFilePath}.html`;
//
//                 let createListItem = document.createElement("li");
//                 let searchSuggestion = document.createElement("a");
//                 let searchSuggestionRepository = document.createElement("span");
//
//                 createListItem.className = "search_suggestion";
//
//                 searchSuggestion.setAttribute("href", `${markdownPageUrl}`);
//                 searchSuggestion.innerText = `${markdownFileName}`;
//
//                 searchSuggestionRepository.className = "search_suggestion";
//                 searchSuggestionRepository.innerText = `${markdownRepositoryName}`;
//
//                 newElementsLocation.appendChild(createListItem).appendChild(searchSuggestion);
//                 newElementsLocation.appendChild(createListItem).appendChild(searchSuggestion).appendChild(searchSuggestionRepository);
//
//                 urlNumber++
//             }
//
//         }
//
//         console.log("Data added")
//
//     }
//
//
// }
//
// listMarkdownFiles();