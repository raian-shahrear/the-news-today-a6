const getItemsByFetchURL = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayCatagories(data))
  .catch(err => alert(err))
}
getItemsByFetchURL();


const displayCatagories = (categories) => {
  const displayCategoryList = document.getElementById('display-category-list');
  categories.data.news_category.forEach(category => {
    const {category_id, category_name} = category

    const li = document.createElement('li');
    li.innerHTML = `
    <div href="" class="text-secondary fw-semibold fs-5 cursor-on-category" onclick = "newsDisplayByCategory('${category_id}')">${category_name}</div>
    `
    displayCategoryList.appendChild(li);
  });
}


const newsDisplayByCategory = (id) => {
  console.log(id)
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    const displayNewsContainer = document.getElementById('display-news-container');
    displayNewsContainer.textContent = '';
    data.data.forEach(news => {
      const {thumbnail_url, category_id, title, details, author, total_view, rating} = news;

      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card mb-3 w-100">
          <div class="row g-0">
            <div class="col-md-4">
              <img src=${thumbnail_url} class="img-fluid rounded-start" alt=${category_id}>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title fw-bold">${title}</h5>
                <p class="card-text">${details.length > 500 ? details.slice(0, 499) + '...' : details}</p>
                <div>
                  <div class="d-flex align-items-center justify-content-between">
                    <div>
                      <img src=${author.img} class="img-fluid rounded-circle" alt=${category_id}>
                    </div>
                    <div>
                      <p>${author.name ? author.name : 'Not Found'}</p>
                      <p>${author.published_date ? author.published_date : 'Not Found'}</p>
                    </div>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <p><i class="fa-regular fa-eye"></i></p>
                    <h6>${total_view ? total_view : 'Not Found'}</h6>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <p><i class="fa-solid fa-star text-warning"></i></p>
                    <p><i class="fa-solid fa-star text-warning"></i></p>
                    <p><i class="fa-solid fa-star text-warning"></i></p>
                    <p><i class="fa-solid fa-star text-warning"></i></p>
                    <p><i class="fa-solid fa-star-half-stroke text-warning"></i></p>
                  </div>
                  <div>
                    <p><i class="fa-solid fa-arrow-right text-primary"></i></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `
      displayNewsContainer.appendChild(div)
    })

  })
  .catch(err => alert(err))
}

