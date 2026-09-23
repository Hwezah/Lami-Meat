/** Top nav links (desktop). */
export const navLinks = [
  { label: "Home", href: "/" },
  { label: "The Range", href: "/range" },
  { label: "Our Story", href: "/our-story" },
  { label: "Contact", href: "/contact" },
] as const;

/** Side panel "Pages", mobile numbered menu and footer "Explore". */
export const menuLinks = [
  { label: "Home", href: "/" },
  { label: "The Range", href: "/range" },
  { label: "Our Story", href: "/our-story" },
  { label: "Recipes", href: "/recipes" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
].map((l, i) => ({ ...l, num: "0" + (i + 1) }));
