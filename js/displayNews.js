const displayNews = (data, categoryName, footerPositioningAndCountItems) => {
  // Display News Container
  const displayNewsContainer = document.getElementById(
    "display-news-container"
  );
  displayNewsContainer.textContent = "";

  // Footer Positioning & Count The News Items
  footerPositioningAndCountItems(data.data.length, categoryName);

  // Loading News by More to Less View Order
  const moreView = data.data.sort((a, b) => b.total_view - a.total_view);
  // Looping and Creating news card
  moreView.forEach((news) => {
    const {
      thumbnail_url,
      category_id,
      title,
      details,
      author,
      total_view,
      _id: news_id,
    } = news;
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card mb-4 w-100 rounded-4 p-3 border-0 shadow">
        <div class="row flex-column flex-lg-row g-0">
          <div class="col-lg-4 text-center text-lg-start">
            <img src=${thumbnail_url} class="img-fluid h-100 rounded" alt=${category_id}>
          </div>
          <div class="col-lg-8">
            <div class="card-body">
              <h5 class="card-title fw-bold mb-3 text-center text-lg-start">${title}</h5>
              <p class="card-text text-secondary text-center text-lg-start">${
                details.length > 500 ? details.slice(0, 499) + "..." : details
              }</p>
              <div class="row g-0 align-items-center mt-5">
                <div class="col">
                  <div class="d-flex flex-column flex-lg-row align-items-center justify-content-between gap-2">
                    <div class="w-75">
                      <img src=${
                        author.img
                      } class="w-100 rounded-circle" alt=${category_id}>
                    </div>
                    <div class="text-center text-lg-start">
                      <p class="mb-1">${
                        author.name ? author.name : "Not Found"
                      }</p>
                      <p class="m-0 text-secondary">${
                        author.published_date
                          ? author.published_date
                          : "Not Found"
                      }</p>
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="d-flex align-items-center justify-content-center gap-2 fs-5">
                    <p class="m-0 text-secondary"><i class="fa-regular fa-eye"></i></p>
                    <h6 class="m-0 fw-semibold text-secondary">${
                      total_view ? total_view : "Not Found"
                    }</h6>
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
  });
};
