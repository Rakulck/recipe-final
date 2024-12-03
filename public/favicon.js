const favicon = document.querySelector('link[rel="icon"]');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  ${GiKnifeFork.path}
</svg>`;

const svgToDataURL = (svg) => `data:image/svg+xml,${encodeURIComponent(svg)}`;
favicon.href = svgToDataURL(svg);
