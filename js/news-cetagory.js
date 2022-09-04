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
       
        createDiv.innerHTML = ` 
        <li onclick="getNewsApi(${name.category_id})," id="hoverEffect" >
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
    // console.log(id)
   
    const url = (`https://openapi.programming-hero.com/api/news/category/0${id}`);
    const res = await fetch(url);
    const data = await res.json();
    const formattedData = await data.data.map(article => {
        return {
            id: article._id,
            title: article.title,
            author: article.author,
            thumbnail_url: article.thumbnail_url,
            details: {
                p1: article.details.slice(0, 180) + "...",
                p2: article.details.slice(180, 350) + "..."
            },
            rating: article.rating,
            category_id: article.category_id,
            total_view: article.total_view
        }
    })
    
    getNews(formattedData)
}
getNewsApi()
const getNews = (allNews) => {
    
    const getNewsDiv = document.getElementById('category-news')
    getNewsDiv.innerHTML = ``
    allNews.forEach(news => {
        const createDiv = document.createElement('div');
        createDiv.innerHTML = `
        <div class="card mb-3"  id="detailsBtn">
            <div class="row g-0">
                <div class="col-md-3 p-4">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9 pt-4">
                    <div class="card-body">
                        <h5 class="card-title fw-semibold">${news.title}</h5>
                        <p class="card-text overflow-handle">${news.details.p1}</p>
                        <p class="card-text overflow-handle">${news.details.p2}</p>
                    </div>
                    <div class="d-flex w-sm-25 justify-content-between mt-5">
                        <div class="d-flex">
                                <div><img src="${news.author.img}"class="rounded-img"></div>
                                <div>
                                <h5 class="ps-3">${news.author.name}</h5>
                                <p  class="ps-3">${news.author.published_date}</p>
                                </div>
                        </div>
                        <div>
                            <h5> <i class="fa-solid fa-eye"></i> ${news.total_view}K</h5>
                        </div>
                        <div class=" d-none d-lg-block">
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                            <i class="fa-regular fa-star"></i>
                            <i class="fa-regular fa-star"></i>
                        </div>
                        <div class="pe-3">
                            <button onclick="newsDetailsApi('${news.id}')" class="btn   btn-primary"data-bs-toggle="modal"data-bs-target="#exampleModal">Show Details</button>
                        <div>
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
const newsDetailsApi = async (detailsId) => {
    // console.log(detailsId)
    const url = `https://openapi.programming-hero.com/api/news/${detailsId}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data)
    getDetails(await data.data)
}
// newsDetailsApi()
const getDetails = (newsDetails) => {
 
    console.log(newsDetails[0].author.name)
    const getModalDiv = document.getElementById('details-modal');
    getModalDiv.innerHTML=``;
    const createDetailsDiv = document.createElement('div');
    
    createDetailsDiv.innerHTML = newsDetails[0].author.name && newsDetails[0].total_view>=0? `
    <div class="modal-content">
        <div class="modal-header">
            <div class="d-flex">  
                <div><img src="${newsDetails[0].author.img}" width="100px"></div>
                <div>
                    <h4 class="ps-2">${newsDetails[0].author.name}</h4>
                    <div class="d-flex justify-content-between">
                       <h6>${newsDetails[0].author.published_date}
                    </div>
                </div>
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body ">
            <h2>${newsDetails[0].title}</h2>
            <p>${newsDetails[0].details}</p> 
            <h5<i class="fa-solid fa-eye"></i>  ${newsDetails[0].total_view} k</h5>
         </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
    </div>
      `
      : `<div>
            <h3 class="display-6 fs-1 fw-bold text-center text-warning">No data found</h3>
        </div>
      `
    getModalDiv.appendChild(createDetailsDiv)
   
   
}