import { data } from "../assets/data/data.js";

export const time = () => {
  const timeContainer = document.querySelector(".time");
  const [marriageDiv, receptionDiv] = timeContainer.querySelectorAll("div div");
  const mapLink = timeContainer.querySelector("a");
  const addressParagraph = timeContainer.querySelector("a + p");

  const createTimeListItem = (title, details) =>
    `<h3>${title}</h3>
         <p>${details.day}, ${details.date} ${details.month} ${details.year} <br> 
         Pukul ${details.hours.start} WIB sd ${details.hours.finish}</p>`;

  marriageDiv.innerHTML = createTimeListItem("Akad", data.time.marriage);
  receptionDiv.innerHTML = createTimeListItem("Resepsi", data.time.reception);

  mapLink.href = data.link.map;
  addressParagraph.textContent = data.time.address;
};

// Memastikan konten time section diisi dengan benar
export function initializeTime() {
  const timeContainer = document.querySelector(".time");
  if (!timeContainer) return;

  // Memastikan link Google Maps memiliki href yang valid
  const mapsLink = timeContainer.querySelector(
    'a[aria-label="Lihat google maps"]'
  );
  if (mapsLink && (!mapsLink.href || mapsLink.href === window.location.href)) {
    mapsLink.href =
      "https://maps.google.com/?q=Bongsren+RT+07,+Gilangharjo,+Pandak,+Bantul";
  }

  // Memastikan alamat terlihat
  const addressElement = timeContainer.querySelector("p:last-of-type");
  if (addressElement && !addressElement.textContent.trim()) {
    addressElement.textContent = "Bongsren RT 07, Gilangharjo, Pandak, Bantul";
  }
}
