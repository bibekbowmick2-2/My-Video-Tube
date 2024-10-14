const loadData = async () => {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/videos/categories"
    );
    const data = await res.json();
    const categories = data.data;
    createCategories(categories);
  };
  loadData();
  
  const createCategories = (categories) => {
    const categoriesSection = document.getElementById("category-section");
    let count = 0;
    categories.forEach((category) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <button onclick="getCategoryDetails('${category.category_id}'); activeBtn(event)" id="first" class="btn btn-xs sm:btn-sm md:btn-md normal-case bg-[#25252533]">
      ${category.category}
      </button>
      `;
  
      categoriesSection.appendChild(div);
    });
    defaultActiveBtn();
  };
  
  const defaultActiveBtn = () => {
    const defaultActiveBtn = document.querySelector("#first");
    defaultActiveBtn.classList.add("active-btn");
  };
  
  const activeBtn = (event) => {
    const categoryBtn = document.querySelectorAll(".btn");
    categoryBtn.forEach((eachBtn) => {
      eachBtn.classList.remove("active-btn");
    });
    event.target.classList.add("active-btn");
  };
  
  let categoryDetailsArray;
  const getCategoryDetails = async (id) => {
    toggleLoadingSpinner(true);
    const res = await fetch(
      `https://openapi.programming-hero.com/api/videos/category/${id}`
    );
    const categoryData = await res.json();
    // console.log(categoryData);
    categoryDetailsArray = categoryData.data;
    showCategoryDetails(categoryDetailsArray);
  };
  
  const sortByView = (event) => {
    event.classList.add("active-btn");
    categoryDetailsArray.sort((item1, item2) => {
      let view1 = item1.others.views.split("");
      view1.pop();
      let view2 = item2.others.views.split("");
      view2.pop();
      return parseFloat(view2.join("")) - parseFloat(view1.join(""));
    });
    showCategoryDetails(categoryDetailsArray);
  };
  
  const showCategoryDetails = (details) => {
    const showCategoryField = document.getElementById("show-category-section");
    showCategoryField.textContent = "";
    if (details.length === 0) {
      const noData = document.createElement("div");
      noData.classList = `col-span-4 flex flex-col justify-center items-center`;
      noData.innerHTML = `
      <figure class="px-10 pt-16 flex justify-center items-center">
        <img src="/Icon.png" class="w-full"/>
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title text-3xl font-bold">
          Oops!! Sorry, There is no <br />
          content here
        </h2>
      </div>
      `;
      showCategoryField.appendChild(noData);
    } else {
      details.forEach((detail) => {
        const card = document.createElement("div");
        let timeArr = calculatePostedTime(detail.others.posted_date);
        let [hrs, min] = timeArr;
        card.classList = `card card-compact rounded-lg`;
        card.innerHTML = `
          <figure class="h-40 relative">
            <img class="rounded-lg w-full h-full" src=${
              detail.thumbnail
            } alt="video" />
            <div id="posted-date" class="rounded-md absolute bg-[#09090b] bottom-3 right-3 text-white text-sm px-2 py-1">${
              timeArr.length ? hrs + " hrs" + " " + min + " min" : "just now"
            }</div>
          </figure>
          <div class="flex gap-2 py-5">
            <div class="h-9 w-9 ">
              <img class="h-full w-full rounded-full" src=${
                detail.authors[0].profile_picture
              } alt="" />
            </div>
            <div class="flex-grow">
             <h2 class="text-md font-semibold">${detail.title}</h2>
             <div class="flex items-center gap-2">
              <p class="text-sm">${detail.authors[0].profile_name}</p>
              <div id="verify" class="w-4">
                  <img class="w-full" src="verify.png" alt="" />
              </div>
              </div>
              <p class="text-sm">${detail.others.views}</p>
            </div>
          </div>
        `;
        showCategoryField.appendChild(card);
      });
    }
  
    toggleLoadingSpinner(false);
  };
  
  const calculatePostedTime = (second) => {
    let timeArr = [];
    let nowSecond = parseInt(second);
    if (nowSecond) {
      // yr = parseInt(nowSecond / (365 * 24 * 60 * 60));
      // timeArr.push(yr);
      // nowSecond = parseInt(nowSecond % (365 * 24 * 60 * 60));
      // months = parseInt(nowSecond / (30 * 24 * 60 * 60));
      // timeArr.push(months);
      // nowSecond = parseInt(nowSecond % (30 * 24 * 60 * 60));
      // days = parseInt(nowSecond / (24 * 60 * 60));
      // timeArr.push(days);
      // nowSecond = parseInt(nowSecond % (24 * 60 * 60));
      hr = parseInt(nowSecond / (60 * 60));
      timeArr.push(hr);
      nowSecond = parseInt(nowSecond % (60 * 60));
      min = parseInt(nowSecond / 60);
      timeArr.push(min);
    }
    return timeArr;
    // console.log(flag, yr, months, days, hr, min);
  };
  
  const toggleLoadingSpinner = (isLoading) => {
    const spinnerField = document.getElementById("loading-spinner");
    if (isLoading) {
      spinnerField.classList.remove("hidden");
    } else {
      spinnerField.classList.add("hidden");
    }
  };
  
  getCategoryDetails("1000");
  
  const blog = () => {
    window.open("http://127.0.0.1:5500/blog.html", "_blank");
  };