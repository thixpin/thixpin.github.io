import { Contact, FeaturedProjects, Layout } from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <Layout>
        <FeaturedProjects />
        <Contact />
      </Layout>
    </>
  );
};

export default Page;
