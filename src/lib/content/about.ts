import { AboutSectionType } from '@/lib/types/sections';

export const aboutSection: AboutSectionType = {
  title: 'about me',
  // Paragraphs need to be changed from containers/About.tsx
  // Because it wasn't possible to insert anchor tags like this
  list: {
    title: 'Here are a few technologies I’ve been working with recently:',
    items: [
      'AWS',
      'Linux',
      'Ansible',
      'Docker',
      'Kubernetes',
      'Terraform',
      'Serverless',
      'Python',
      'PHP',
      'Node.js',
      'TypeScript',
      'Git',
      'SQL',
      'Datadog',
      'Prometheus',
      'Grafana',
      'New Relic',
      'CircleCI',
    ],
  },
  img: '/thixpin.jpg',
};
