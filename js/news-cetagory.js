/* 
set category Name
*/
const cetagoryApi = async () => {
    const url = (`https://openapi.programming-hero.com/api/news/categories`);
    const res = await fetch(url);
    const data = await res.json();
    getCetagoryNames(data.data.news_category)
}
cetagoryApi();
const getCetagoryNames = (names) => {
    //  console.log(names)
    const getCetagoryDiv = document.getElementById('cetagori-list')
    names.forEach(name => {
        // console.log(name.category_id)
        const createDiv = document.createElement('div');
        // createDiv.setAttribute('onclick',``)
        createDiv.innerHTML = ` 
        <li onclick="getNewsApi(${name.category_id})" id="hoverEffect" >
            <span>${name.category_name}</span>
        </li>                        
        `
        getCetagoryDiv.appendChild(createDiv)
    });
}
/* 
Add news by category_Id
*/
const getNewsApi = async (id) => {
    console.log(id)
    const url = (`https://openapi.programming-hero.com/api/news/category/0${id}`);
    const res = await fetch(url);
    const data = await res.json();
    const formattedData = await data.data.map(article => {
        return {
            id:article.id,
            title: article.title,
            author: article.author,
            thumbnail_url: article.thumbnail_url,
            details: {
                p1: article.details.slice(0, 180) + "...",
                p2: article.details.slice(180, 350) + "..."
            },
            rating: article.rating,
            category_id: article.category_id,
            total_view:article.total_view
        }
    })
    getNews(formattedData)
}
getNewsApi('1')
const getNews = (allNews) => {
    const getNewsDiv = document.getElementById('category-news')
    getNewsDiv.innerHTML=``
    allNews.forEach(news => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card mb-3">
        <div class="row g-0">
            <div class="col-md-3 p-4">
             <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-9 pt-4">
                <div class="card-body">
                  <h5 class="card-title fw-semibold">Title:${news.title}</h5>
                   <p class="card-text overflow-handle">${news.details.p1}</p>
                   <p class="card-text overflow-handle">${news.details.p2}</p>
                </div>
                <div class="d-flex justify-content-between mt-5">
                   <div class="d-flex">
                        <div><img src="${news.author.img}"class="rounded-img"></div>
                        <div>
                          <h5 class="ps-3">Name:${news.author.name}</h5>
                          <p  class="ps-3">Date:${news.author.published_date}</p>
                        </div>
                   </div>
                   <div>
                       <h5> <i class="fa-solid fa-eye"></i> ${news.total_view}K</h5>
                   </div>
                   <div>
                     <i class="fa-solid fa-star-half-stroke"></i>
                     <i class="fa-solid fa-star-half-stroke"></i>
                     <i class="fa-solid fa-star-half-stroke"></i>
                    <i class="fa-regular fa-star"></i>
                    <i class="fa-regular fa-star"></i>
                   </div>
                   <div class="pe-3">
                      <button class="btn btn-primary">Show Details</button>
                   </div>
                </div>
            </div>
         </div>
        </div> 
        `
        getNewsDiv.appendChild(createDiv)
    });
}
/* 
news details
*/
const newsDetailsApi=async()=>{
    const url=`https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a`;
    const res=await fetch(url);
    const data=await res.json();
    getDetails(data.data)
}
newsDetailsApi()
const getDetails=(newsDetails)=>{
      console.log(newsDetails)
}