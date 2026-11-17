// Сайт жинағы: pages/*.njk + _data/*.json + news/{kz,ru}/*.md → _site
const sizeOf = require("image-size");

const KZ = "қаңтар ақпан наурыз сәуір мамыр маусым шілде тамыз қыркүйек қазан қараша желтоқсан".split(" ");
const RU = "января февраля марта апреля мая июня июля августа сентября октября ноября декабря".split(" ");
const fmt = (d, m) => `${String(d.getUTCDate()).padStart(2, "0")} ${m[d.getUTCMonth()]} ${d.getUTCFullYear()}`;

module.exports = function (cfg) {
  cfg.addPassthroughCopy("assets");
  cfg.addPassthroughCopy("style.css");
  cfg.addPassthroughCopy("_headers"); // Cloudflare Pages қорғаныс тақырыптары
  cfg.ignores.add("README.md");
  cfg.ignores.add(".github/**");

  for (const l of ["kz", "ru"]) {
    cfg.addCollection("news_" + l, (api) => api.getFilteredByGlob(`news/${l}/*.md`).sort((a, b) => b.date - a.date));
  }
  cfg.addFilter("kzdate", (d) => fmt(d, KZ));
  cfg.addFilter("rudate", (d) => fmt(d, RU));
  cfg.addFilter("head", (a, n) => a.slice(0, n));
  cfg.addFilter("digits", (s) => String(s).replace(/\D/g, ""));
  // Сурет өлшемі: бет жүктелгенде секірмеуі үшін width/height
  cfg.addFilter("imgsize", (src) => {
    try {
      const { width, height } = sizeOf(src.replace(/^\//, ""));
      return ` width="${width}" height="${height}"`;
    } catch { return ""; }
  });

  return { dir: { input: ".", output: "_site" }, htmlTemplateEngine: "njk", markdownTemplateEngine: false };
};
