import type { Category, NavigationTab, Restaurant } from '@/types';

/**
 * App-wide constants and static data
 * Centralized location for all app configuration
 */

export const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Burger',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0GJP2-hjYvwY-EiOJG9CE9OSDJ_Vm8tD10GiPCLgiNOwj-nyhZNHqZR418ZrYb8Vi7V5TKN0huub5IeZwgNdWtIO7XDlmcypYJensCEzrFJAQWIGCEuvoZ4yRsjmlEn7Q3r1rUVMYiVZ_ups0901BKVKef7l0Efur2gz7HzDdbygYb2i2Sv19GP8_bSQTQM3Tj5aPnQXBHBBRdkMIzzxiD6K2daB6HdYN-T8CzRE0bg-ctivKmqy28Rfmn_hxHYHVVs63VBgGAsg',
  },
  {
    id: '2',
    name: 'Pizza',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNJKnvaQhBIsJkwOrGlT1x7e0CfWKzvE_qfa5jtTgxP1nSzhRXjCQK22y8y9RjOP0E1Fb-0iw7SC_m-TtqFmRW1vjDPzY10QydrP5mzCAqitnuO7Ss1BzbbQU4xDE-D76HxFKMm7i75HqdMvrj_O28wQNCB8iYYNjCCAIk2ArZd5jIn8i-IVS_kA2wjTjQZ6P19HOtgw-goZ7RoWkYVvkq8g8oHPSny2dBJ_gOZhXbHALKwNjHKi-GgyJrh423hVemakCxdCozqoo',
  },
  {
    id: '3',
    name: 'Sushi',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByW_yl5TY339mGqEnfEj3Lh-XSz_eU4_8h1WRuMFpkbYZXteJbIAebHVvNf8hik30GMrkLsRhSlWRew0nzKzcBjLEOfjxxD3-uBuq_pgoXE8BqevAbEAKXJKaR1d6g0yEiIqeHZ-JA4aDEAI7pWcXh7JPZkEyzwCJ-blmbZtkLP-qsMxdRHRHsX8nco3hxESypEho09hpLxlzmf-sRevHyw3LJAcHxGjm_-Ljn0KHCqR6Jco2vu8sqk1Z0EDig5ILtOYeTO_Fu9lg',
  },
  {
    id: '4',
    name: 'Fast Food',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXtAHmvs8B19ZibjcFiAH3CJCOn4ZaowRGOO85N6XY-jEECeEJ-GLUjxHgyaSN_arkgXii83G0CkUv1_YBFFBZSCs3ZTwpkSGwYcyJ2xHANxhIJxHMa5nLs5ck3q1S_dCFPAAROsYVoZr_f7KQgHZeilGhfYL143h4ht_QbwV5wq151XJw-Cp4oxSn-WR6z1aRdREqUSD9kREoH9PTVeONK6EkK4YVLDnwNaXXbON0rmJSsnMaXsedLIlzoTgYnY38PDjYIasSZuE',
  },
  {
    id: '5',
    name: 'Japanese',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzm4kxw5-zuvPH7dHRoA2Ut-fqjqney4nLDZLeQdsx5SjjDbLUPVJbkwhvGO1UdNxyGgFO-_-8z8md_Kmmc5f0xsUIjGFjqGaW4YFtgcn0sHzPkCaGNEbBgtj1xr3dHU5Lr0dsl7P4l60Ce3g8cHbwW2isw4ysbgScG4zzafrSTdnGvugLRusGG-6G4pnSBJSK3mEDNYM-OUGjkN8b-2s6dAYtE2UOedKdULAXmFKLPX_9kcFtX5Y6V9lOJKUII0XDMXjb-_vW8CM',
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
