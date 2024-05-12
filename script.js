//getDom elements function
const getDom = (domId) => document.getElementById(domId);

//select dom elements
const cardsContainer = getDom("cardsContainer");
const showAllButton = getDom("showAllButton");
const Integrations = getDom("Integrations");
const features = getDom("features");
const plans = getDom("plans");
const modalImage = getDom("modalImage");
const modalRightTitle = getDom("modalRightTitle");
const modalRightp = getDom("modalRightp");

//load api data
const loadData = async (isShowAll) => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  setData(data.data.tools, isShowAll);
};
loadData();

//handleMissingImage function
const handleMissingImage = (target) =>
  (target.src =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg");

//setData in cardsContainer
const setData = (datas, isShowAll) => {
  cardsContainer.textContent = "";

  if (datas.length > 7 && !isShowAll) {
    showAllButton.classList.remove("hidden");
  } else {
    showAllButton.classList.add("hidden");
  }

  if (!isShowAll) {
    datas = datas.slice(0, 6);
  }

  datas.map((data) => {
    const card = document.createElement("div");
    card.innerHTML = `<div class="card card-compact bg-base-100 shadow-xl">
                        <figure><img src="${data.image}" onerror="handleMissingImage(this)" alt="AIs"  class="h-[200px]"/>
                        </figure>
                        <div class="card-body">
                            <h2 class="card-title">Features</h2>
                            <div class="mb-3">
                                <p>1. ${data.features[0]}</p>
                                <p>2. ${data.features[1]}</p>
                                <p>3. ${data.features[2]}</p>
                            </div>
                            <hr>
                            <div class="flex justify-between mt-3">
                                <div>
                                    <h3 class="text-xl font-bold">${data.name}</h3>
                                    <p>Data : ${data.published_in}</p>
                                </div>
                                <button onclick="my_modal_4.showModal(), loadDataForModal('${data.id}')" class="btn btn-primary">${data.name}</button>
                            </div>
                        </div>
                    </div>`;
    cardsContainer.appendChild(card);
  });
};

//showAllHandler function
const showAllHandler = () => {
  loadData(true);
};

const loadDataForModal = async (cardId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${cardId}`
  );
  const data = await res.json();
  plans.textContent = "";
  integrations.textContent = "";
  features.textContent = "";
  loadModalData(data);
};

//modal data loader function
const loadModalData = (data) => {
  getDom("modalTitle").innerText = data.data?.description;

  for (let i = 1; i < 3; i++) {
    const feature = data.data?.features[i].feature_name;
    const li = document.createElement("li");
    li.innerText = feature;
    features.appendChild(li);
  }

  modalImage.src = data.data?.image_link[0];
  modalRightTitle.innerText = data.data?.input_output_examples[0]?.input;
  modalRightp.innerText = data.data?.input_output_examples[0].output;

  for (let i = 0; i < 3; i++) {
    const p = document.createElement("p");
    p.classList.add("p-3");
    p.classList.add("bg-gray-200");
    p.classList.add("rounded-md");
    p.classList.add("text-center");
    p.innerHTML = `${data.data?.pricing[i]?.plan} <br> ${data.data?.pricing[i]?.price}`;
    plans.appendChild(p);
  }

  data.data?.integrations.map((name) => {
    const li = document.createElement("li");
    li.innerText = name;
    integrations.appendChild(li);
  });
};
