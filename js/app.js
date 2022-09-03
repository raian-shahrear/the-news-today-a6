// Get Category Items by Fetch URL
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
  if(isSearching){
    loadingSpinner.classList.remove('d-none');
  }
  else{
    loadingSpinner.classList.add('d-none');
  }
}

// Footer Positioning & Count The News Items
const footerPositioningAndCountItems = (dataLength, categoryName) => {
  // Footer Positioning
  const footerPosition = document.getElementById('footer-position');
  // Count the news item
  const foundItemCount = document.getElementById('found-item-count');
  foundItemCount.classList.remove('d-none');
  if(dataLength === 0){
    foundItemCount.innerText = 'No News Found';
    footerPosition.classList.add('position-absolute');
  }
  else{
    foundItemCount.innerText = `${dataLength} news found for category ${categoryName}`;
    footerPosition.classList.remove('position-absolute');
    footerPosition.classList.add('position-relative');
  }
}



// Display Categories
const displayCatagories = (categories) => {
  const displayCategoryList = document.getElementById('display-category-list');
  categories.data.news_category.forEach(category => {
    const {category_id, category_name} = category

    const li = document.createElement('li');
    li.classList.add('col-6')
    li.innerHTML = `
      <div class="text-secondary fw-semibold fs-5 cursor-on-category" onclick = "newsDisplayByCategory('${category_id}', '${category_name}')">${category_name}</div>
    `;
    displayCategoryList.appendChild(li);
  });
}



// News Display By Category
const newsDisplayByCategory = (catId, categoryName) => {
  // Loading Spinner Control
  loadingSpinnerControl(true);
  
  const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {    
    // Display News Container
    const displayNewsContainer = document.getElementById('display-news-container');
    displayNewsContainer.textContent = '';

    // Footer Positioning & Count The News Items
    footerPositioningAndCountItems(data.data.length, categoryName);

    // Loading News by More to Less View Order 
    const moreView = data.data.sort((a, b) => b.total_view - a.total_view)
    // Looping and Creating news card
    moreView.forEach(news => {
      const {thumbnail_url, category_id, title, details, author, total_view, _id:news_id} = news;
      const div = document.createElement('div');
      div.innerHTML = `
        <div class="card mb-4 w-100 rounded-4 p-3 border-0 shadow">
          <div class="row flex-column flex-lg-row g-0">
            <div class="col-lg-4 text-center text-lg-start">
              <img src=${thumbnail_url} class="img-fluid h-100 rounded" alt=${category_id}>
            </div>
            <div class="col-lg-8">
              <div class="card-body">
                <h5 class="card-title fw-bold mb-3 text-center text-lg-start">${title}</h5>
                <p class="card-text text-secondary text-center text-lg-start">${details.length > 500 ? details.slice(0, 499) + '...' : details}</p>
                <div class="row g-0 align-items-center mt-5">
                  <div class="col">
                    <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-2">
                      <div class="w-75">
                        <img src=${author.img} class="w-100 rounded-circle" alt=${category_id}>
                      </div>
                      <div class="text-center text-lg-start">
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
                    <button onclick="displayModalByFetchURL('${news_id}', '${categoryName}')" class="btn fs-5 m-0 text-primary cursor-on-category" data-bs-toggle="modal" data-bs-target="#display-modal"><i class="fa-solid fa-arrow-right-long"></i></button>
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



// Display Modal By Fetch URL
const displayModalByFetchURL = (newsId, categoryName) => {
  console.log(newsId)
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`
  fetch(url)
  .then(res => res.json())
  .then(data => displayDetailsModal(data.data[0], categoryName))
  
}

// Modal to Show Details
const displayDetailsModal = (modalDetails, categoryName) => {
  const {image_url, title, details} = modalDetails;
  const displayModalField = document.getElementById('display-modal-container');
  displayModalField.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold fs-4" id="exampleModalLabel">${categoryName}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="card">
          <img src=${image_url} class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title fw-bold mb-3">${title}</h5>
            <p class="card-text">${details}</p>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  `;
}

