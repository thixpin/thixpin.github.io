import { Contact, Experience, Layout } from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <Layout>
        <Experience />
        <Contact />
      </Layout>
    </>
  );
};

export default Page;
