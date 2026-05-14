(function () {
  // Replace with your GA4 Measurement ID, e.g. G-ABC123XYZ9
  const MEASUREMENT_ID = "G-PBPV8DZ14R";

  // Keep disabled until a valid Measurement ID is configured.
  if (!MEASUREMENT_ID || MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", MEASUREMENT_ID, {
    send_page_view: true
  });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(MEASUREMENT_ID)}`;
  document.head.appendChild(script);
})();
