// Recipes. PLACEHOLDER copy pending client review. `product` is what "Add to cart" adds (500g × 1).
export type Recipe = { id: string; num: string; product: string; time: string; serves: string; title: string; ingredients: string[]; method: string[] };

export const featured: Recipe & { img: string; alt: string } = {
  id: "r0",
  num: "01",
  product: "Smoked Beef Sausages",
  time: "15 min",
  serves: "Serves 2",
  title: "Smoked sausage breakfast plate",
  img: "/images/hero-smokehouse.jpg",
  alt: "Sausages hanging in the LAMI smokehouse", // TODO: swap for a plated breakfast photo
  ingredients: ["4 LAMI smoked beef sausages", "4 eggs", "2 tomatoes, halved", "1 small onion, sliced", "Bread or chapati to serve", "Salt, pepper and a little oil"],
  method: [
    "Warm a pan over medium heat with a little oil.",
    "Add the sausages and turn them for 8–10 minutes until hot through and browned.",
    "Push them to one side and fry the onion and tomatoes for 3–4 minutes.",
    "Fry the eggs in the same pan, season, and serve with bread or chapati.",
  ],
};

export const recipes: Recipe[] = [
  {
    id: "r1", num: "02", product: "Beef Hot Dogs", time: "20 min", serves: "Serves 4", title: "Grilled hot dogs with kachumbari",
    ingredients: ["8 LAMI beef hot dogs", "8 soft rolls", "3 tomatoes, diced", "1 red onion, finely diced", "1 green chilli (optional)", "Coriander, juice of 1 lime, salt"],
    method: ["Mix the tomato, onion, chilli, coriander, lime and salt. Leave for 10 minutes.", "Grill or pan-fry the hot dogs for about 5 minutes, turning.", "Toast the rolls lightly.", "Fill each roll and spoon the kachumbari over the top."],
  },
  {
    id: "r2", num: "03", product: "Minced Beef", time: "60 min", serves: "Makes 20", title: "Beef samosas",
    ingredients: ["500g LAMI minced beef", "1 onion, finely chopped", "2 cloves garlic, crushed", "1 tsp cumin, 1 tsp garam masala", "Handful of coriander", "20 samosa pastry sheets, oil for frying"],
    method: ["Brown the mince with the onion and garlic for 10 minutes, breaking it up.", "Add the spices, season and cook 5 minutes more. Stir in the coriander and cool.", "Fold the pastry into cones, fill, and seal with a little flour-and-water paste.", "Fry in hot oil for 3–4 minutes until golden. Drain and serve."],
  },
  {
    id: "r3", num: "04", product: "Lean Minced Beef", time: "25 min", serves: "Makes 4", title: "Lean beef burgers",
    ingredients: ["500g LAMI lean minced beef", "1 egg", "½ onion, grated", "Salt and pepper", "4 burger buns", "Lettuce, tomato and cheese to serve"],
    method: ["Mix the mince, egg, onion and seasoning — lightly, don’t overwork it.", "Shape four patties and press a small dimple into the centre of each.", "Cook on a hot pan or grill for 4–5 minutes a side until cooked through.", "Rest for 2 minutes, then build the burgers."],
  },
  {
    id: "r4", num: "05", product: "Minced Beef", time: "40 min", serves: "Serves 4", title: "Beef & tomato pasta sauce",
    ingredients: ["500g LAMI minced beef", "1 onion and 2 cloves garlic, chopped", "1 carrot, grated", "400g chopped tomatoes", "2 tbsp tomato paste", "400g pasta"],
    method: ["Brown the mince in a hot pan and set aside.", "Soften the onion, garlic and carrot for 5 minutes.", "Return the mince, add the tomatoes and paste, and simmer for 25 minutes.", "Season and serve over the pasta."],
  },
  {
    id: "r5", num: "06", product: "Smoked Beef Sausages", time: "35 min", serves: "Serves 4", title: "Sausage & bean stew",
    ingredients: ["6 LAMI smoked beef sausages, sliced", "500g cooked beans", "1 onion, 1 green pepper", "2 tomatoes, chopped", "1 tsp curry powder", "Rice to serve"],
    method: ["Brown the sliced sausages and set aside.", "Soften the onion and pepper, then add the tomatoes and curry powder for 5 minutes.", "Add the beans and a splash of water and simmer for 15 minutes.", "Return the sausages for 5 minutes and serve with rice."],
  },
];
