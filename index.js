const loadAllCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await response.json();
  const tabContainer = document.getElementById("tab-container");

  // const tab = data
  console.log(data.data.news_category.slice(0, 3));
  const sliceData = data.data.news_category.slice(0, 3);

  sliceData.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `<h5 onclick="loadNewsByCategoryId(${
      category.category_id
    })" class="tab text-blue-600">${category.category_name.split(" ")[0]}</h5>`;
    tabContainer.appendChild(div);
  });
};

const loadNewsByCategoryId = async (id) => {
  handleLoader("block");
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/category/0${id}`
  );
  const data = await response.json();

  handleLoader("none");

  if (data.data.length > 0) {
    data.data.forEach((news) => {
      const div = document.createElement("div");
      div.innerHTML = `
                <div class="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img
                    src=${news.image_url}
                  />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">
                    ${news.title.slice(0, 20)}
                    <div class="badge badge-secondary p-5">${
                      news.rating.badge
                    }</div>
                  </h2>
                  <p>
                    ${news?.details?.slice(0, 50)}
                  </p>
                  <div class="card-footer flex justify-between mt-8">
                    <div class="flex">
                      <div>
                        <div class="avatar online">
                          <div class="w-14 rounded-full">
                            <img
                              src=${news.author.img}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6>${news.author.name}</h6>
                        <small>${news.author.published_date}</small>
                      </div>
                    </div>
                    <div class="card-detaild-btn">
                      <button
                      onclick="handleModal('${news?._id}')"
                        class="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
                `;
      cardContainer.appendChild(div);
    });
  } else {
    document.getElementById("not-foun-container").style.display = "block";
  }
};

const handleModal = async (newsId) => {
  console.log(newsId);

  const response = await fetch(
    `https://openapi.programming-hero.com/api/news/${newsId}`
  );
  const data = await response.json();
  console.log(data);

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    
<dialog id="my_modal_1" class="modal">
  <form method="dialog" class="modal-box">
    <h3 class="font-bold text-lg">Hello!</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
    `;

  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

const handleLoader = (status) => {
  document.getElementById("loader").style.display = status;
};

loadAllCategory();
loadNewsByCategoryId(1);
