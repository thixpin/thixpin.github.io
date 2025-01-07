import { Contact, Layout, Skills } from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <Layout>
        <Skills />
        <Contact />
      </Layout>
    </>
  );
};

export default Page;
