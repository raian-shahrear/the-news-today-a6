const getItemsByFetchURL = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
  .then(res => res.json())
  .then(data => displayCatagories(data))
}
getItemsByFetchURL();


const displayCatagories = (categories) => {
  const displayCategoryList = document.getElementById('display-category-list');
  categories.data.news_category.forEach(category => {
    const li = document.createElement('li');
    li.innerHTML = `
    <a href="" class="text-secondary fw-semibold fs-5" onclick="newsDisplayByCategory('${category.category_id}')">${category.category_name}</a>
    `
    displayCategoryList.appendChild(li);
  });
}


