export async function generateSearchUrl(searchCode: string) {

    const searchUrl: string = `https://github.com/search?q=org%3Abcc-code+${searchCode.toString()}`
    console.log(searchUrl);

    // window.location.href = searchUrl

}