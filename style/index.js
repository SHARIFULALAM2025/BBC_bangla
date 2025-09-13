
const myData = document.getElementById("categoryItem");
const AllNews = document.getElementById("newsContainer");
const bookMarkContainer = document.getElementById("bookMarkContainer")
const bookCount = document.getElementById("bookMarkCount")

const catFunction = async () => {
    try {
        const res = await fetch("https://news-api-fs.vercel.app/api/categories")
        const data = await res.json()
        console.log(data.categories);
        const categories = data.categories;
        categories.forEach(cat => {
            myData.innerHTML += `
             <li id="${cat.id}" class="hover:border-b-2 border-red-700 cursor-pointer">${cat.title}</li>

            `

        })
        myData.addEventListener('click', function (e) {
            const result = document.querySelectorAll("li")
            result.forEach(li => {
                li.classList.remove("border-b-2")
            })



            if (e.target.localName === "li") {

                e.target.classList.add("border-b-2")


            }
            NewsCategories(e.target.id)


        })



    } catch (error) {
        console.log(error);
    }
}
catFunction();

const NewsCategories = async (CatId) => {
    try {
        showLoading()
        const url = `https://news-api-fs.vercel.app/api/categories/${CatId}`

        const url_1 = await fetch(url)
        const data = await url_1.json()
        showNews(data.articles);

    } catch (error) {
        console.log(error);


    }



}

NewsCategories("main")
const showNews = (news) => {

    AllNews.innerHTML = ""

    news.forEach(news => {

        AllNews.innerHTML += `
        <div>

        <div><img src="${news.image.srcset[0].url}" alt="" /></div>

        <div id="${news.id}"><h1 class="">${news.title}</h1>
        <time >${news.time}</time>
        <button class="btn">BookMark</button>
        </div>

        </div>

        `

    })

}
//
let bookMarks = [];

AllNews.addEventListener("click", (e) => {

    if (e.target.innerText === "BookMark") {
        handelBookMark(e)






    }


})
const handelBookMark = (e) => {
    const title = e.target.parentNode.children[0].innerText;
    const data = e.target.parentNode.id
    console.log(data);
    bookMarks.push({
        title: title,
        id: data
    })
    showBook(bookMarks);


}
const showBook = (bookMarks) => {
    bookMarkContainer.innerHTML=""
    bookMarks.forEach(book => {


        bookMarkContainer.innerHTML += `
        <div class="border-2 my-2 border-gray-300 rounded-xl p-1">
        <h1>${book.title}</h1>
        <button onclick="deleteBookMark('${book.id}')" class="btn btn-xs">Delete</button>
        </div>
        `

    })
    bookCount.innerText=bookMarks.length

}
const deleteBookMark = (books) => {


    const filterBook = bookMarks.filter(book => book.id !== books)
    bookMarks = filterBook;
    showBook(bookMarks)


}
const showLoading = () => {
    AllNews.innerHTML = `
    <div class="mt-7">
        <h1 class=" bg-red-700 p-2">Loading .....</h1>
    </div>

    `
}