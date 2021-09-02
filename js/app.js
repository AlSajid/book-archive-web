const search = () => {
    //loading text reveal
    document.getElementById('loading').style.display = "block";

    //getting search key
    searchText = document.getElementById('search').value;

    //clearing fields
    document.getElementById('search').value = '';
    document.getElementById('resultCount').innerText = ``;

    //API URL
    url = `https://openlibrary.org/search.json?q=${searchText}`;

    //fetching data using API
    fetch(url)
        .then(response => response.json())
        .then(result => showingSearchResult(result));
}

const showingSearchResult = result => {
    //clearing previous results
    document.getElementById('results').innerHTML = "";

    //hidding loading text
    document.getElementById('loading').style.display = "none";

    // counting search result
    if (result.numFound == 0) {
        document.getElementById('resultCount').innerText = "No Result Found";
        return
    } else if (result.numFound > 10)
        books = result.docs.slice(0, 10);

    //printing search count
    document.getElementById('resultCount').innerText = `${result.numFound} books found`;


    books.forEach(results => {

        //cover page of book
        if (results.cover_i == undefined) {
            cover = "img/not-found.png";
        } else {
            cover = `https://covers.openlibrary.org/b/id/${results.cover_i}-M.jpg`;
        }

        //checking if data is missing
        title = isEmpty(results.title);
        author = isEmpty(results.author_name);
        year = isEmpty(results.first_publish_year);
        publisher = isEmpty(results.publisher[0]);

        //adding book info
        book = document.createElement('div');
        book.classList.add('border-2', 'shadow', 'grid', 'grid-cols-2');

        book.innerHTML = `
    <div class="">
        <img src="${cover}" >
    </div>
    <div>
        <h2 class="font-bold text-xl">${title}</h2>
        <h3><b>Author: </b>${author}</h3>
        <h4><b>Year: </b>${year}</h4>
        <h5><b>Publisher </b>${publisher}</h5>
    </div>
`;
        result = document.getElementById('results')
        result.appendChild(book);
    });
}

const isEmpty = data => {
    if (data === undefined) {
        return "Unknown";
    } else {
        return data;
    }
}

