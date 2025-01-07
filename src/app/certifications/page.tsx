import { Certifications, Contact, Layout } from '@/containers';

import type { NextPage } from 'next';

const Page: NextPage = () => {
  return (
    <>
      <Layout>
        <Certifications />
        <Contact />
      </Layout>
    </>
  );
};

export default Page;
