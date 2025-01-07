'use client';
import { certificationsSection } from '@/lib/content/certificates';

import { Certificate, ShowLottie, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';

const Certifications = () => {
  const { title, certificates } = certificationsSection;
  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper id="certifications" {...getSectionAnimation}>
      <h2 className="heading-secondary">{title}</h2>
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="relative w-64 h-64 group lg:w-1/3 sm:w-auto sm:h-auto">
          <ShowLottie
            path="/lotties/education.json"
            className="md:min-h-[448px] md:min-w-[448px]"
          />
        </div>

        <div className="space-y-4 lg:w-3/5">
          <ol className="relative border-s border-gray-200 dark:border-gray-700">
            {certificates.map((certificate) => (
              <Certificate
                key={certificate.title}
                title={certificate.title}
                issuer={certificate.issuer}
                description={certificate.description}
                issue_date={certificate.issue_date}
                expiry_date={certificate.expiry_date}
                logo_path={certificate.logo_path}
                certificate_link={certificate.certificate_link}
              />
            ))}
          </ol>
        </div>
      </main>
    </Wrapper>
  ) : (
    <></>
  );
};

export default Certifications;
