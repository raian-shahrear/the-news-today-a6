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
  newsByDefault(categories.data.news_category[7].category_id, categories.data.news_category[7].category_name);
  const displayCategoryList = document.getElementById('display-category-list');
  categories.data.news_category.slice(0, 7).forEach(category => {
    const {category_id, category_name} = category;
    // newsByDefault(category_name);
    const li = document.createElement('li');
    li.classList.add('col-6')
    li.innerHTML = `
      <div class="text-secondary fw-semibold fs-5 cursor-on-category" onclick = "newsDisplayByCategory('${category_id}', '${category_name}')">${category_name}</div>
    `;
    displayCategoryList.appendChild(li);
  });
}

// news display home by default
const newsByDefault = (catId, categoryName) => {
  // Loading Spinner Control
  loadingSpinnerControl(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {   
    console.log(data) 
    // display news
    displayNews(data, categoryName, footerPositioningAndCountItems)
    // Loading Spinner Control
    loadingSpinnerControl(false);
  })
  .catch(err => alert(err))
}

// News Display By Category
const newsDisplayByCategory = (catId, categoryName) => {
  // Loading Spinner Control
  loadingSpinnerControl(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${catId}`;
  fetch(url)
  .then(res => res.json())
  .then(data => {   
    console.log(data) 
    // display news
    displayNews(data, categoryName, footerPositioningAndCountItems)
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

