import { data } from "../assets/data/data.js";
import { renderElement } from "../utils/helper.js";

export const bride = () => {
  const brideCouple = document.querySelector(".bride_couple ul");

  // Periksa apakah element ditemukan
  if (!brideCouple) {
    console.error("Element .bride_couple ul tidak ditemukan!");
    return;
  }

  const brideListItem = (data) =>
    `<li data-aos="zoom-in" data-aos-duration="1000">
              <h3 class="bride-name">${data.name}</h3>
              <p>${data.child} <br>dari <br> Bapak ${data.father} & Ibu ${
      data.mother
    }</p>
              <span style="display: ${
                data.id === 2 ? "none" : "block"
              }; margin: 1rem 0; font-size: 2rem; font-family: var(--sacramento);">&</span>
        </li>`;

  // Periksa apakah data pengantin tersedia
  if (!data.bride || !data.bride.L || !data.bride.P) {
    console.error("Data pengantin tidak lengkap!");
    return;
  }

  const brideData = [data.bride.L, data.bride.P];

  // Tambahkan debugging
  console.log("Rendering data pengantin:", brideData);

  renderElement(brideData, brideCouple, brideListItem);
};
