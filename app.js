import React from "https://esm.sh/react@18.2.0";

const initialZones = [
  { id: "tokyo", name: "Tokyo, Japan", tz: "Asia/Tokyo", accent: "#f472b6" },
  { id: "nyc", name: "New York, USA", tz: "America/New_York", accent: "#fb7185" },
  { id: "bali", name: "Bali, Indonesia", tz: "Asia/Makassar", accent: "#f9a8d4" },
  { id: "dubai", name: "Dubai, UAE", tz: "Asia/Dubai", accent: "#fda4af" },
  { id: "bahrain", name: "Manama, Bahrain", tz: "Asia/Bahrain", accent: "#f43f5e" },
];

export default function App() {
  const h = React.createElement;
  const [now, setNow] = React.useState(new Date());
  const zones = initialZones;

  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const formatTime = (zone, hour12) =>
    new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12,
      timeZone: zone,
    }).format(now);

  return h(
    "main",
    { className: "page" },
    h(
      "header",
      { className: "hero" },
            h("p", { className: "eyebrow" }, "API of live clocks"),
            h("h1", null, "Live clocks for cities"),
            h("p", { className: "lede" }, "React/JavaScript build — pink neon analog + digital clocks on a dark backdrop."),
      h(
        "div",
        { className: "actions" },
        h("a", { className: "btn", href: "#clocks" }, "See clocks"),
      ),
    ),
    h(
      "section",
      { id: "clocks" },
      h("h2", null, "Live timezones"),
      h(
        "div",
        { className: "grid" },
        zones.map((z) => {
          const zoned = new Date(new Date().toLocaleString("en-US", { timeZone: z.tz }));
          const hrs = zoned.getHours();
          const mins = zoned.getMinutes();
          const secs = zoned.getSeconds();
          const hourAngle = (hrs % 12) * 30 + mins * 0.5;
          const minuteAngle = mins * 6 + secs * 0.1;
          const secondAngle = secs * 6;
          const t24 = formatTime(z.tz, false);
          const t12 = formatTime(z.tz, true);
          return h(
            "article",
            { key: z.id || z.name, className: "card" },
            h("div", { className: "ring" }),
            h(
              "div",
              { className: "clock-wrap" },
              h(
                "div",
                { className: "clock-face" },
                [...Array(12).keys()].map((i) =>
                  h("span", {
                    key: i,
                    className: "tick",
                    style: { transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-70px)` },
                  }),
                ),
                h("span", { className: "hand hour", style: { transform: `translate(-50%, -90%) rotate(${hourAngle}deg)` } }),
                h("span", { className: "hand minute", style: { transform: `translate(-50%, -90%) rotate(${minuteAngle}deg)` } }),
                h("span", { className: "hand second", style: { transform: `translate(-50%, -90%) rotate(${secondAngle}deg)` } }),
                h("span", { className: "pin" }),
              ),
            ),
            h(
              "div",
              { className: "beam" },
              h("span", { className: "beam-dot", style: { background: z.accent } }),
              h("span", { className: "beam-line", style: { background: z.accent } }),
            ),
            h("p", { className: "eyebrow mini" }, z.name),
            h(
              "div",
              { className: "lcd" },
              h("div", { className: "digital", style: { color: z.accent } }, t24),
              h("p", { className: "sub" }, "24-hour"),
              h("div", { className: "digital small" }, t12),
              h("p", { className: "sub" }, "12-hour"),
            ),
            h("p", { className: "zone" }, z.tz),
          );
        }),
      ),
    ),
    h(
      "footer",
      { className: "credit" },
      "Design & build by Yousif Sarhan",
    ),
  );
}
