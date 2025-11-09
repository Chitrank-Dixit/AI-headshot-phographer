
import type { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    name: 'Corporate',
    prompt: 'Generate a professional corporate headshot. The person is wearing a sharp, modern business suit and has a confident, friendly expression. The background is a clean, solid light grey backdrop. Use soft, even studio lighting that highlights their features professionally.',
    imageUrl: 'https://picsum.photos/seed/corporate/200',
  },
  {
    name: 'Tech Office',
    prompt: 'Generate a professional headshot with the person in a modern, brightly lit tech office. The background should be slightly blurred, showing hints of glass walls and collaborative spaces. They are wearing business casual attire. The lighting is natural and bright, as if from a large window.',
    imageUrl: 'https://picsum.photos/seed/tech/200',
  },
  {
    name: 'Outdoor',
    prompt: 'Generate a warm and approachable professional headshot. The person is outdoors in a park-like setting with lush, green foliage in a softly blurred background. They are wearing casual but neat clothing. The lighting is soft, natural, golden-hour sunlight.',
    imageUrl: 'https://picsum.photos/seed/outdoor/200',
  },
  {
    name: 'Creative',
    prompt: 'Generate a creative and artistic headshot. The person is set against a textured, dark, moody background (like dark concrete or canvas). Use dramatic side lighting (Rembrandt lighting) to create depth and character. Their expression is thoughtful and intense.',
    imageUrl: 'https://picsum.photos/seed/creative/200',
  },
  {
    name: 'Academic',
    prompt: 'Generate an academic-style headshot. The person is in a classic, warm library or study with bookshelves in the blurred background. They are wearing smart, slightly academic attire like a tweed jacket or a stylish sweater. The lighting is warm and inviting.',
    imageUrl: 'https://picsum.photos/seed/academic/200',
  },
  {
    name: 'Minimalist',
    prompt: 'Generate a minimalist, modern headshot. The person is wearing a simple, solid-colored shirt. The background is a perfectly clean, off-white wall. The lighting is bright, direct, and shadowless, creating a fresh and contemporary look.',
    imageUrl: 'https://picsum.photos/seed/minimalist/200',
  },
];
