// Single source of truth for the Merch page. Edit prices and copy here.
// Empty strings are never rendered: an empty store field hides its trust item,
// an empty FAQ answer hides that question, and an empty policy link hides that link.

export type Category = 'Apparel' | 'Drinkware' | 'Desk' | 'Accessories';

export type Product = {
  id: string;
  name: string;
  category: Category;
  price: number;
  image: string;
  imageBack?: string;
  alt: string;
  description: string;
  sizes?: string[];
};

export const products: Product[] = [
  {
    id: 'tee',
    name: 'Hive Oversized Tee',
    category: 'Apparel',
    price: 29.99,
    image: '/img/merch/tee.webp',
    imageBack: '/img/merch/tee-back.webp',
    alt: 'Black oversized t-shirt with the hex logo on the chest',
    description: 'Black oversized fit. Hex logo on the chest, recode hive wordmark across the back.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'hoodie',
    name: 'Manifesto Hoodie',
    category: 'Apparel',
    price: 49.99,
    image: '/img/merch/hoodie.webp',
    alt: 'Black pullover hoodie printed with the five-word manifesto, with Grow. in green',
    description: 'Black pullover hoodie with the five-word manifesto, Grow. in hive green.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'cap',
    name: 'Hex Logo Cap',
    category: 'Apparel',
    price: 24.99,
    image: '/img/merch/cap.webp',
    alt: 'Black six-panel cap with the hex mark on the front',
    description: 'Black six-panel cap with the hex mark on the front. Adjustable strap.',
  },
  {
    id: 'mug',
    name: 'Manifesto Mug',
    category: 'Drinkware',
    price: 14.99,
    image: '/img/merch/mug.webp',
    alt: 'White ceramic mug printed with the manifesto, with the hex mark beside the handle',
    description: 'White ceramic mug with the manifesto on one side and the hex mark by the handle.',
  },
  {
    id: 'bottle',
    name: 'Wordmark Bottle',
    category: 'Drinkware',
    price: 24.99,
    image: '/img/merch/bottle.webp',
    alt: 'Matte black bottle with a white cap and the recode hive wordmark',
    description: 'Matte black bottle with a white cap and the recode hive wordmark.',
  },
  {
    id: 'notebook',
    name: 'Hive Notebook',
    category: 'Desk',
    price: 17.99,
    image: '/img/merch/notebook.webp',
    alt: 'Black hardcover notebook with the recode hive wordmark on the cover',
    description: 'Black hardcover notebook with the wordmark on the cover. For sketches and system diagrams.',
  },
  {
    id: 'tote',
    name: 'Manifesto Tote',
    category: 'Accessories',
    price: 19.99,
    image: '/img/merch/tote.webp',
    alt: 'Natural canvas tote bag with the manifesto print',
    description: 'Natural canvas tote with the manifesto print. Fits a laptop and a notebook.',
  },
];

// Extra images used by the hero and the manifesto band
export const heroImage = {
  src: '/img/merch/hero-hoodie.webp',
  alt: 'Person wearing the black Manifesto Hoodie',
};
export const wideImage = {
  src: '/img/merch/tee-wide.webp',
  alt: 'Two people wearing the Hive Oversized Tee, front and back',
};

// The separate total and the percentage saved are computed, never hardcoded
export const bundle = {
  id: 'desk-kit',
  name: 'The desk kit',
  items: ['notebook', 'mug', 'bottle'],
  price: 49.99,
};

export const store = {
  shipsTo: '', // TODO(sanjay): for example "the US, UK and India"
  shippingDays: '', // TODO(sanjay): for example "5 to 9 business days"
  returnDays: '', // TODO(sanjay): number of days, for example "30"
  printPartner: '', // TODO(sanjay): who prints and ships the merch
  checkoutProvider: '', // TODO(sanjay): fill in once checkout is live, for example "Shopify"
  policyLinks: {
    shipping: '', // TODO(sanjay): shipping policy URL
    returns: '', // TODO(sanjay): returns policy URL
    terms: '', // TODO(sanjay): terms URL
  },
  manifestoNote: '', // TODO(sanjay): one or two sentences about the manifesto collection
  // Checkout is not live yet, so every product has a "Notify me" button that opens this sign-up
  notifyUrl: 'https://recodehive.substack.com/subscribe',
};

export const faqs: { q: string; a: string }[] = [
  { q: 'How long does shipping take?', a: '' }, // TODO(sanjay)
  { q: 'How do the tees and hoodies fit?', a: '' }, // TODO(sanjay)
  { q: 'Can I return or exchange an item?', a: '' }, // TODO(sanjay)
  { q: 'Who prints and ships the merch?', a: '' }, // TODO(sanjay)
];
