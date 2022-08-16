document.addEventListener("DOMContentLoaded", () => {
    getBooks()
});
//global variables
let bookList = document.getElementById("list")
let showPanel = document.getElementById("show-panel")
//
function getBooks(){
    fetch('http://localhost:3000/books')
    .then((response) => response.json())
    .then((bookData) => bookData.forEach((book) => displayBookList(book)))
}

function displayBookList(book){
    let li = document.createElement('li')
    li.innerText = `${book.title}`
    bookList.appendChild(li)
    li.addEventListener("click", ()=> showDetails(book))
}

function showDetails(book){
    while (showPanel.lastElementChild){
        showPanel.removeChild(showPanel.firstChild)
    }
    let section = document.createElement('section')
    let img = document.createElement('img')
    let title = document.createElement('h1')
    let subtitle = document.createElement('h2')
    let author = document.createElement('h3')
    let description = document.createElement('p')
    let ul = document.createElement('ul')
    img.src = `${book.img_url}`
    title.innerText = `${book.title}`
    subtitle.innerText = `${book.subtitle}`
    author.innerText = `${book.author}`
    description.innerText = `${book.description}`
    showPanel.appendChild(section)
    for (let i = 0; i < book.users.length; i++){
        let li = document.createElement('li')
        li.innerText = `${book.users[i].username}`
        ul.appendChild(li)
    }
    let likeButton = document.createElement('button')
    likeButton.innerText = `LIKE`
    likeButton.setAttribute('id', 'likeButton')
    section.append(img, title, subtitle, author, description, ul, likeButton)
    likeBook(book)
}

function likeBook(book){
    let likeButton = document.getElementById('likeButton')
    let userObj = {
        id: 11,
        username: `pkparham`
    }
    likeButton.addEventListener('click', () => sendLike(book, userObj))
}
function sendLike(book, userObj){
    book.users.push(userObj)
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
        },
        body: JSON.stringify(book)
    })
    .then((res) => res.json())
    while (showPanel.lastElementChild){
        showPanel.removeChild(showPanel.firstChild)
    }
    showDetails(book)
}