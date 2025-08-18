// Handler khusus untuk select dropdown pada mobile
export function initializeMobileSelect() {
  const selectElement = document.querySelector("#status");

  if (!selectElement) return;

  // Detect mobile device
  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  if (isMobile) {
    // Tambahkan class mobile untuk styling khusus
    selectElement.classList.add("mobile-select");

    // Handler untuk touch events
    selectElement.addEventListener("touchstart", function (e) {
      this.style.fontSize = window.innerWidth <= 480 ? "16px" : "0.9rem";
    });

    selectElement.addEventListener("change", function (e) {
      // Hapus focus setelah selection untuk menghindari zoom
      this.blur();
    });

    // Prevent zoom on iOS
    selectElement.addEventListener("focusin", function (e) {
      if (window.innerWidth <= 480) {
        e.target.style.fontSize = "16px";
      }
    });

    selectElement.addEventListener("focusout", function (e) {
      if (window.innerWidth <= 480) {
        e.target.style.fontSize = "0.9rem";
      }
    });
  }
}
