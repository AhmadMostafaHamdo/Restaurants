import burger from "../assets/burger.jpeg";
import home from "../assets/home.jpeg";
import noodls from "../assets/noodls.jpeg";
import pizza from "../assets/pizza.jpeg";
import salad from "../assets/salad.jpeg";
import sandwich from "../assets/sandwich.jpeg";
import steack from "../assets/steack.jpeg";
import sushi from "../assets/sushi.jpeg";
import tacos from "../assets/tacos.jpeg";

export const listOfMenu = [
  {
    name: "Pizza",
    src: pizza,
    resturants: ["Lafah", "Alyasar"],
  },
  {
    name: "Pasta",
    src: home,
    resturants: ["Dajajati", "Alyasar"],
  },
  {
    name: "Burger",
    src: burger,
    resturants: ["Lafah", "Alyasar"],
  },
  {
    name: "Sushi",
    src: sushi,
    resturants: ["Alyasar"],
  },
  {
    name: "Tacos",
    src: tacos,
    resturants: ["Dajajati"],
  },
  {
    name: "Salad",
    src: salad,
    resturants: ["Alyasar", "Dajajati"],
  },
  {
    name: "Steack",
    src: steack,
    resturants: ["Lafah", "Alyasar", "Dajajati"],
  },
  {
    name: "Sandwich",
    src: sandwich,
    resturants: ["Dajajati", "Alyasar"],
  },
  {
    name: "Noodles",
    src: noodls,
    resturants: ["Lafah", "Dajajati"],
  },
];
export const listOfFood = [
  {
    id: "1",
    name: "Pizza",
    category: "Pizza",
    restaurant: "Lafah",
    price: 23,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: pizza,
    alt: "Pizza",
  },
  {
    id: "2",
    name: "Pasta",
    restaurant: "Lafah",
    category: "Pasta",
    price: 30,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: noodls,
    alt: "Pasta",
  },
  {
    id: "3",
    name: "Burger",
    restaurant: "Dajajati",
    category: "Burger",
    price: 53,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: burger,
    alt: "Pizza",
  },
  {
    id: "4",
    name: "Sushi",
    category: "Sushi",
    restaurant: "Dajajati",
    price: 53,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: sushi,
    alt: "Sushi",
  },
  {
    id: "5",
    name: "Tacos",
    category: "Tacos",
    restaurant: "Lafah",
    price: 42,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: tacos,
    alt: "Tacos",
  },
  {
    id: "6",
    name: "Salad",
    category: "Salad",
    restaurant: "Alyasar",
    price: 53,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: salad,
    alt: "Salad",
  },
  {
    id: "7",
    name: "Steack",
    category: "Steack",
    restaurant: "Alyasar",
    price: 53,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: steack,
    alt: "Steack",
  },
  {
    id: "8",
    name: "Sandwich",
    category: "Sandwich",
    restaurant: "Lafah",
    price: 27,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: sandwich,
    alt: "Sandwich",
  },
  {
    id: "9",
    name: "Noodles",
    category: "Noodles",
    restaurant: "Dajajati",
    price: 19,
    description:
      "Food provides essential nutrients for overall health and well-being",
    image: sandwich,
    alt: "Noodles",
  },
];
