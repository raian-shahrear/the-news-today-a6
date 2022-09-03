const getItemsByFetchURL = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayCatagories(data))
  .catch(err => alert(err))
}
getItemsByFetchURL();

// Loading Spinner Control
const loadingSpinnerControl = (isSearching) => {
  const loadingSpinner = document.getElementById('loading-spinner');
  if(isSearching === true){
    loadingSpinner.classList.remove('d-none');
  }
  else{
    loadingSpinner.classList.add('d-none');
  }
}


// Display Categories
const displayCatagories = (categories) => {
  const displayCategoryList = document.getElementById('display-category-list');
  categories.data.news_category.forEach(category => {
    const {category_id, category_name} = category

    const li = document.createElement('li');
    li.innerHTML = `
    <div class="text-secondary fw-semibold fs-5 cursor-on-category" onclick = "newsDisplayByCategory('${category_id}', '${category_name}')">${category_name}</div>
    `;
    displayCategoryList.appendChild(li);
  });
}


const newsDisplayByCategory = (id, categoryName) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    // Loading Spinner Control
    loadingSpinnerControl(true);
    // Display News Container
    const displayNewsContainer = document.getElementById('display-news-container');
    displayNewsContainer.innerHTML = '';
    // Footer Positioning
    const footerPosition = document.getElementById('footer-position');
    // Count the news item
    const foundItemCount = document.getElementById('found-item-count');
    foundItemCount.classList.remove('d-none');
    if(data.data.length === 0){
      foundItemCount.innerText = 'No News Found';
      footerPosition.classList.add('position-absolute');
    }
    else{
      foundItemCount.innerText = `${data.data.length} news found for category ${categoryName}`;
      footerPosition.classList.remove('position-absolute');
      footerPosition.classList.add('position-relative');
    }

    // looping and creating news card
    data.data.forEach(news => {
      const {thumbnail_url, category_id, title, details, author, total_view} = news;
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card mb-4 w-100 rounded-4 p-3 border-0 shadow">
          <div class="row g-0">
            <div class="col-4 w-25">
              <img src=${thumbnail_url} class="img-fluid h-100 rounded" alt=${category_id}>
            </div>
            <div class="col-8 w-75">
              <div class="card-body">
                <h5 class="card-title fw-bold mb-3">${title}</h5>
                <p class="card-text text-secondary">${details.length > 500 ? details.slice(0, 499) + '...' : details}</p>
                <div class="row g-0 align-items-center">
                  <div class="col">
                    <div class="d-flex align-items-center justify-content-between gap-2">
                      <div class="w-50">
                        <img src=${author.img} class="w-100 rounded-circle" alt=${category_id}>
                      </div>
                      <div>
                        <p class="mb-1">${author.name ? author.name : 'Not Found'}</p>
                        <p class="m-0 text-secondary">${author.published_date ? author.published_date : 'Not Found'}</p>
                      </div>
                    </div>
                  </div>

                  <div class="col">
                    <div class="d-flex align-items-center justify-content-center gap-2 fs-5">
                      <p class="m-0 text-secondary"><i class="fa-regular fa-eye"></i></p>
                      <h6 class="m-0 fw-semibold text-secondary">${total_view ? total_view : 'Not Found'}</h6>
                    </div>
                  </div>

                  <div class="col">
                    <div class="d-flex align-items-center justify-content-end gap-2 fs-5">
                      <p class="m-0"><i class="fa-solid fa-star text-warning"></i></p>
                      <p class="m-0"><i class="fa-solid fa-star text-warning"></i></p>
                      <p class="m-0"><i class="fa-solid fa-star text-warning"></i></p>
                      <p class="m-0"><i class="fa-solid fa-star text-warning"></i></p>
                      <p class="m-0"><i class="fa-solid fa-star-half-stroke text-warning"></i></p>
                    </div>
                  </div>

                  <div class="col text-end">
                    <p class="fs-5 m-0 text-primary cursor-on-category" data-bs-toggle="modal" data-bs-target="#detailsModal" onclick="displayModal()"><i class="fa-solid fa-arrow-right-long"></i></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      displayNewsContainer.appendChild(div);
      
    })
    // Loading Spinner Control
    loadingSpinnerControl(false);
  })
  
  .catch(err => alert(err))
}


// Modal to Show Details
const displayModal = () => {
  const showDetailsModal = document.getElementById('show-details-modal');
}

