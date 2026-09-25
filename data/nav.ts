/** Nav structure; labels come from the dictionary (t.nav[key]). */
export type NavKey = "home" | "range" | "ourStory" | "recipes" | "careers" | "contact";

/** Top nav links (desktop). */
export const navLinks: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "range", href: "/range" },
  { key: "ourStory", href: "/our-story" },
  { key: "contact", href: "/contact" },
];

/** Side panel "Pages", mobile numbered menu and footer "Explore". */
export const menuLinks = (
  [
    { key: "home", href: "/" },
    { key: "range", href: "/range" },
    { key: "ourStory", href: "/our-story" },
    { key: "recipes", href: "/recipes" },
    { key: "careers", href: "/careers" },
    { key: "contact", href: "/contact" },
  ] as { key: NavKey; href: string }[]
).map((l, i) => ({ ...l, num: "0" + (i + 1) }));
