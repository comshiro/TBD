export interface OnboardingItem {
  id: number;
  title: string;
  description: string;
  image: any;
}

export const onboardingData: OnboardingItem[] = [
  {
    id: 1,
    title: "Personalized Accessibility Routes",
    description: "Customized navigation based on your specific accessibility needs, preferences, and mobility requirements.",
    image: { uri: 'https://via.placeholder.com/400x300?text=Route+Planning' },
  },
  {
    id: 2,
    title: "Detailed Accessibility Reviews",
    description: "Read and share detailed reviews about facilities, ramps, parking, and staff attitude towards people with disabilities.",
    image: { uri: 'https://via.placeholder.com/400x300?text=Reviews' },
  },
  {
    id: 3,
    title: "Real-time Alerts & Notifications",
    description: "Stay informed about obstacles, construction, or broken facilities that may affect your journey.",
    image: { uri: 'https://via.placeholder.com/400x300?text=Alerts' },
  },
  {
    id: 4,
    title: "Assisted Navigation",
    description: "Audio guidance and haptic feedback for visually impaired users along with public transport accessibility information.",
    image: { uri: 'https://via.placeholder.com/400x300?text=Navigation' },
  },
  {
    id: 5,
    title: "Join Our Community",
    description: "Create your account to start navigating with accessibility in mind and contribute to our inclusive community.",
    image: { uri: 'https://via.placeholder.com/400x300?text=Community' },
  }
];
