import type { Category, NavigationTab, Restaurant } from '@/types';

/**
 * App-wide constants and static data
 * Centralized location for all app configuration
 */

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Burger',
    icon: 'fast-food',
  },
  {
    id: '2',
    name: 'Pizza',
    icon: 'pizza',
  },
  {
    id: '3',
    name: 'Sushi',
    icon: 'fish',
  },
  {
    id: '4',
    name: 'Fast Food',
    icon: 'cafe',
  },
  {
    id: '5',
    name: 'Japanese',
    icon: 'restaurant',
  },
  {
    id: '6',
    name: 'Dessert',
    icon: 'ice-cream',
  },
  {
    id: '7',
    name: 'Drinks',
    icon: 'beer',
  },
  {
    id: '8',
    name: 'Healthy',
    icon: 'leaf',
  },
  {
    id: '9',
    name: 'Mexican',
    icon: 'flame',
  },
  {
    id: '10',
    name: 'Italian',
    icon: 'wine',
  },
];

export const RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Queen',
    rating: 4.8,
    reviews: '1k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrTgwImOgKj0ApP4DQu9-Yv8ZRK-YqpLtPwMHyXeiyouNRVG3PvMK2zmVjYZ1FdrXa-qm8V7vi2C3WxljBoG0rC4u9MHSn9grLyoIzmN42AjC6X1fgS0XGoiWH1VpCslAwTkekJ_OfXB979_4fWM-tijuhOS8wdQXnp9wqCUAroayNsPMgxHORESB8iPjt59DovVsQxuhmnVX1ykHhOQSehZB9dWsLjOJvuxPhXKe09qhkmOVqPTQjw0DlJ9aH--SKv8X1tgIBcUc',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Pizza Plaza',
    rating: 4.5,
    reviews: '500+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxR9pCBDZ-q1wT4PBFm_x1V3xswebVgqtHb3wPq6K2_8VrgnNItAiFVl3sfF8Gg7NfiaDKbVMdCoqXlwvSjsadXkdKBdLkliRf7Rwr8EHWHNzRCSogG09oLDLgqkD6-gT3VbymRTuDpR_6oS-DvJP9cHLa4ZJq--R8XtGY7hftTnpsSYsld0aytgVaK0YR1XZ4JNiJU0GzMdPZaE3Ti4CpSTkpijKyilUfbOZ44JxJWTAEAlRCjC-w0rPz7db7n6_3eQDmesUefbA',
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Sushi Spot',
    rating: 4.9,
    reviews: '2k+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA3jOmeX8HQJ6mCdKDTqyjqd9TS_tcymJ5b6YQ6_l5gkStm8_B9yBGNTkPpAAA81ieaTVk1D9hJ1AINDApcgDQ0UoAxXCGTnff8osJR0Y0v0doebLwruAwWdcPWWJdrJJ49ea7vwjkvE-xmyrI_Au2WjfcbAzIezh5DezVf5qGbriw5uSQjdy5LyXY2qoVVCBR4E164bUk0McW3-mqC1G6--CYCnAcZt3aWFeH_X2G02QJWS5E21YOeDtKRXpXUA1eOFtnzaG3jpcs',
    isFavorite: false,
  },
  {
    id: '4',
    name: 'The Golden Spoon',
    rating: 4.7,
    reviews: '800+',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBz3frcdx8Sc4-UHojRokI0ixHwmFdp7zwlOPhRQMUpdOFA-PxMBVs9IHtLGIIe49LsvrY7K1oF8wCLNfm3Uv064nqWO7ECJ5bJRcX8o_VPsjzcw2Q5HP5s9yY2r82Lt-FC7cAV3b6UvnGRC3c8Idu1MJXd6E7za25v01w0ojV2dAAfQtn_LpVTzsbDiTDjw4imkBGw3wFieqDIonxX5uQYX4NT-ZZkiu5asDTUUiUXxf_5cf0pF0SgUVYonuobHnbHv5LTk6Slo8k',
    isFavorite: true,
  },
];

export const NAVIGATION_TABS: NavigationTab[] = [
  { name: 'Home', icon: 'home', iconOutline: 'home-outline' },
  { name: 'Order', icon: 'receipt', iconOutline: 'receipt-outline' },
  { name: 'Offer', icon: 'pricetag', iconOutline: 'pricetag-outline' },
  { name: 'Chart', icon: 'pie-chart', iconOutline: 'pie-chart-outline' },
  { name: 'Profile', icon: 'person', iconOutline: 'person-outline' },
];

export const PROMO_DATA = {
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHSCfj2FJHbBKyDh-zTeBtAjO7IElutHI56WyQB2kOGYuQZnr9bUPvPsPuIUGWQm0Z21kgGuaKrYw5PDO2MrqgsVd87b0HTOVxXJwqDqr-cixYl39PgSvIYe6hoI_cEVjHs03yq2dCaVbH1ZqaFQSH_CNnHcd80__D5Zrk8L2Bhta4lZ9Ewm5RnC40NdaLo1rGVC07qQTIyPzZQOVdN8yQQk-PXJ-SCYVSv4LLvHcj2VslkEZ5h0BDlPLPBlGjPP3GhS6QxnYkGVE',
  title: 'Free Delivery',
  description: 'Enjoy exclusive discounts today',
  buttonText: 'Order Now',
};

export const DEFAULT_LOCATION = {
  city: 'New York',
  country: 'USA',
};
