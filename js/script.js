// console.log("connected");
const loadData = async (status, searchText) => {
  document.getElementById("spinner").style.display = "none";
  document.getElementById("phones-container").classList.remove("hidden");

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      searchText ? searchText : "iphone"
    }`
  );
  const data = await res.json();

  if (data.data.length === 0) {
    document.getElementById("show-no-data").innerText = "no phone found";
  }
  displayData(data.data, status);
};

const displayData = (phones, status) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  let phoneDisplay;
  if (status) {
    phoneDisplay = phones;
  } else {
    phoneDisplay = phones.slice(0, 6);
  }
  phoneDisplay.forEach((phone) => {
    const { image, phone_name, slug } = phone;
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "justify-center", "items-center");

    div.innerHTML = `
     <figure><img src="${image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title text-center mx-auto">${phone_name}</h2>
            <p >${slug}</p>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetail('${slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    
    `;
    phonesContainer.appendChild(div);
  });
};
const handleShowDetail = async (snug) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${snug}`
  );
  const data = await res.json();
  const { brand, image, releaseDate, name } = data.data;

  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box flex justify-center items-center flex-col">
        <img class="w-1/2" src=${image} />
          <h3 class="text-lg font-bold">${brand}</h3>
          <p class="py-4">${name}</p>
          <p class="py-4">release-date: ${
            releaseDate ? releaseDate : "not yet decided"
          }</p>
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    `;

  my_modal_5.showModal();
};

const handleSearch = () => {
  document.getElementById("spinner").style.display = "block";
  document.getElementById("phones-container").classList.add("hidden");

  const searchBoxValue = document.getElementById("search-box").value;
  setTimeout(() => {
    loadData(false, searchBoxValue);
  }, 3000);
};
const handleShowAll = () => {
  loadData(true);
  document.getElementById("phones-container").innerHTML = "";
};

loadData(false);
