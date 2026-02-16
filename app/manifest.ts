import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Valentine Link",
    short_name: "Valentine",
    description: "Create and share a playful Valentine page with a custom link.",
    start_url: "/",
    display: "standalone",
    background_color: "#fce7f3",
    theme_color: "#f9a8d4"
  };
}
