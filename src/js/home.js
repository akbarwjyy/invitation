import { data } from "../assets/data/data.js";
import { monthNameToNumber } from "../utils/helper.js";

export const home = () => {
  const homeContainer = document.querySelector(".home");

  // Seleksi elemen-elemen yang dibutuhkan dengan cara yang lebih robust
  const figureElement = homeContainer.querySelector("figure");
  const timeElement = homeContainer.querySelector("h3");
  const homeTime = homeContainer.querySelector(".home-time");
  const calendarAnchor = homeContainer.querySelector("a[role='link']");

  console.log("Elements selected:", {
    figure: figureElement,
    timeElement: timeElement,
    homeTime: homeTime,
    calendarAnchor: calendarAnchor,
  });

  const generateFigureContent = ({ bride }) => {
    const {
      L: { name: brideLName },
      P: { name: bridePName },
      couple: coupleImage,
    } = bride;
    return `
            <img src="${coupleImage}" alt="couple animation">
            <figcaption>
                ${brideLName.split(" ")[0]} & ${bridePName.split(" ")[0]}
            </figcaption>`;
  };

  const generateTimeContent = ({ time }) => {
    const { year, month, date, day } = time.marriage;
    return `
        <time datetime="${year}-${String(monthNameToNumber(month)).padStart(
      2,
      "0"
    )}-${String(date).padStart(2, "0")}">
            ${day}, ${date} ${month} ${year}
        </time>`;
  };

  const generateCountdownMarkup = (days, hours, minutes, seconds) => {
    return `<div>
                    <p>${days}<br><span>Hari</span></p>
                </div>
                <div>
                    <p>${hours}<br><span>Jam</span></p>
                </div>
                <div>
                    <p>${minutes}<br><span>Menit</span></p>
                </div>
                <div>
                    <p>${seconds}<br><span>Detik</span></p>
                </div>`;
  };

  let intervalId = null;

  const updateCountdown = () => {
    console.log("Updating countdown, homeTime element:", homeTime);
    const { year, month, date } = data.time.marriage;
    const endTimeString = `${String(year)}-${String(
      monthNameToNumber(month)
    ).padStart(2, "0")}-${String(date).padStart(2, "0")}T00:00:00`;
    console.log("End time string:", endTimeString);
    const endTime = new Date(endTimeString);
    console.log("End time:", endTime);

    const now = new Date().getTime();
    const distance = endTime - now;
    console.log("Distance:", distance, "ms");

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    console.log("Countdown values:", { days, hours, minutes, seconds });

    if (distance < 0) {
      clearInterval(intervalId);
      homeTime.innerHTML = generateCountdownMarkup(0, 0, 0, 0);
      console.log("Countdown finished");
    } else {
      homeTime.innerHTML = generateCountdownMarkup(
        days,
        hours,
        minutes,
        seconds
      );
      console.log("Updated countdown HTML");
    }
  };

  const initializeHome = () => {
    const { bride, time, link } = data;
    figureElement.innerHTML = generateFigureContent({ bride });
    timeElement.innerHTML = generateTimeContent({ time });
    calendarAnchor.href = link.calendar;

    // Update countdown immediately
    updateCountdown();

    // Clear any existing interval
    if (intervalId) {
      clearInterval(intervalId);
    }
    // Start a new interval and save the ID
    intervalId = setInterval(updateCountdown, 1000);
  };

  initializeHome();
};
