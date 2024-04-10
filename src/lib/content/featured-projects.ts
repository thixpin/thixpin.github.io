import { FeaturedProjectsSectionType } from '@/lib/types/sections';
import { getId } from '@/lib/utils/helper';

const featuredProjectsSection: FeaturedProjectsSectionType = {
  title: "projects i've worked on",
  projects: [
    {
      id: getId(),
      name: 'Pocket',
      description: 'The Loyalty Program for the Digital Age.',
      tasks:
        'I strategically designed the cloud architecture, implemented the CI/CD pipeline and deployed the application on AWS with reliability and scalability in mind. I also participated in the performance optimization of the application.',
      url: 'https://pocket.com.mm/',
      img: '/images/pocket.png',
      tags: ['VueJs', 'Laravel', 'AWS', 'CodeDeploy', 'AutoScaling'],
    },
    {
      id: getId(),
      name: 'Heal by Pun Hlaing',
      description: 'First Telemedicine Platform in Myanmar.',
      tasks:
        'Implemented the CI/CD pipeline and deployed the backend application on AWS. I also designed the cloud architecture and participated in the performance optimization of the application.',
      url: 'https://play.google.com/store/apps/details?id=com.punhlaing.healapp&pcampaignid=web_share',
      img: '/images/heal.png',
      tags: ['AWS', 'API Gateway', 'Lambda', 'Serverless'],
    },
  ],
};

export default featuredProjectsSection;
