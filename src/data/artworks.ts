export interface SeedArtwork {
  _id: string;
  title: string;
  medium: string;
  year: string;
  category: string;
  featured: boolean;
  heroFeature: boolean;
  imageUrl: string;
  colorGradient: string;
}

export const SEED_ARTWORKS: SeedArtwork[] = [
  {
    _id: 'seed-1',
    title: 'MJ · North Carolina',
    medium: 'Acrylic on Canvas',
    year: '2023',
    category: 'Sports & Motion',
    featured: true,
    heroFeature: true,
    imageUrl: '',
    colorGradient: 'linear-gradient(135deg,#000,#001133,#003399,#cc2200)',
  },
  {
    _id: 'seed-2',
    title: 'Empress',
    medium: 'Acrylic on Canvas',
    year: '2023',
    category: 'Portraits & Identity',
    featured: true,
    heroFeature: false,
    imageUrl: '',
    colorGradient: 'linear-gradient(135deg,#111,#1a1400,#c9a84c,#444)',
  },
  {
    _id: 'seed-3',
    title: 'Angel Wings',
    medium: 'Mixed Media',
    year: '2024',
    category: 'Faith & Spirit',
    featured: true,
    heroFeature: true,
    imageUrl: '',
    colorGradient: 'linear-gradient(135deg,#0a0010,#1a0030,#ff2200,#ffaa00,#7700cc)',
  },
  {
    _id: 'seed-4',
    title: 'Roots of the Heart',
    medium: 'Mixed Media',
    year: '2024',
    category: 'Faith & Spirit',
    featured: true,
    heroFeature: true,
    imageUrl: '',
    colorGradient: 'linear-gradient(135deg,#101820,#0d1525,#cc3322,#4488cc)',
  },
  {
    _id: 'seed-5',
    title: "The Creator's Hand",
    medium: 'Acrylic on Canvas',
    year: '2024',
    category: 'Abstract & Mixed Media',
    featured: true,
    heroFeature: true,
    imageUrl: '',
    colorGradient: 'linear-gradient(135deg,#000,#001122,#ff6600,#00aacc)',
  },
];
