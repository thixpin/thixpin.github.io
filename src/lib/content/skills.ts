import { SkillsSectionType } from '@/lib/types/sections'
import { getId } from '@/lib/utils/helper'

export const skillsSection: SkillsSectionType = {
    title: 'what i do',
    skills: [
    {
        id: getId(),
        title: 'Site Reliability Engineering',
        // animation lottie file: https://lottiefiles.com/
        lottie: {
        light: '/lotties/cloudinfra.json',
        dark: '/lotties/cloudinfra.json',
        },
        points: [
        'Experience in designing and implementing scalable cloud solutions',
        'Experience in automating infrastructure and CI/CD pipelines',
        'Experience in monitoring and troubleshooting production issues',
        'Experience in ensuring availability, performance, and scalability of systems and services',
        ],
        softwareSkills: [
          // iconify icons: https://icon-sets.iconify.design/
        { name: 'aws', icon: 'logos:aws' },
        { name: 'docker', icon: 'logos:docker-icon' },
        { name: 'ansible', icon: 'logos:ansible' },
        { name: 'linux', icon: 'logos:linux-tux' },
        { name: 'bash', icon: 'logos:bash' },
        { name: 'terraform', icon: 'logos:terraform-icon' },
        { name: 'circleci', icon: 'logos:circleci' },
        { name: 'git', icon: 'logos:git-icon' },
        { name: 'kubernetes', icon: 'logos:kubernetes' },
        { name: 'prometheus', icon: 'logos:prometheus' },
        { name: 'grafana', icon: 'logos:grafana' },
        { name: 'datadog', icon: 'logos:datadog' },
        ],
    },
    {
        id: getId(),
        title: 'Software Development',
        lottie: {
        light: '/lotties/coding.json',
        dark: '/lotties/coding.json',
        },
        points: [
        'Experience in developing and maintaining backend services and serverless applications',
        'Experience in software architecture and design patterns',
        'Experience in leading development teams to deliver high-quality software',
        ],
        softwareSkills: [
        { name: 'php', icon: 'logos:php' },
        { name: 'laravel', icon: 'logos:laravel' },
        { name: 'nodejs', icon: 'logos:nodejs-icon' },
        { name: 'nextjs', icon: 'logos:nextjs' },
        { name: 'typescript', icon: 'logos:typescript-icon' },
        { name: 'serverless', icon: 'logos:serverless' },
        { name: 'mysql', icon: 'logos:mysql' },
        ],
    },
    {
      id: getId(),
      title: 'Training Provider',
      // animation lottie file: https://lottiefiles.com/
      lottie: {
      light: '/lotties/training.json',
      dark: '/lotties/training.json',
      },
      points: [
      'Experience in providing training for DevOps and SRE practices',
      'Experience in providing training for AWS certifications',
      'Experience in providing training for Software Development practices',
      ],
      softwareSkills: [
          // iconify icons: https://icon-sets.iconify.design/
        { name: 'aws', icon: 'logos:aws' },
        { name: 'docker', icon: 'logos:docker-icon' },
        { name: 'ansible', icon: 'logos:ansible' },
        { name: 'linux', icon: 'logos:linux-tux' },
        { name: 'bash', icon: 'logos:bash' },
        { name: 'terraform', icon: 'logos:terraform-icon' },
        { name: 'circleci', icon: 'logos:circleci' },
        { name: 'git', icon: 'logos:git-icon' },
        ],
    },
    ],
};
