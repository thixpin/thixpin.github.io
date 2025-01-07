'use client';
import { getId } from '@/lib/utils/helper';

import { AuthorImage, ListItem, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

import { useEffect, useState } from 'react';

const AboutWife = () => {
  const img = '/images/thiri.jpeg';
  const list = {
    title: 'Here are a few things she enjoys:',
    items: [
      'Buying clothes',
      'Caring her skin',
      'Watching k-dramas',
      'Eating hotpot & BBQ',
      'Eating ice-cream',
      'Instructing me to cook',
      'Shopping',
      'Online shopping',
      'Going to the spa',
      'Talking with her friends',
      'Traveling',
      'Taking her photos',
    ],
  };
  // To avoid hydration error
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <Wrapper id="aboutwife" {...getSectionAnimation}>
      <h2 className="heading-secondary">About My Wife</h2>
      <main className="flex flex-col items-center gap-16 lg:items-start lg:flex-row">
        <div className="space-y-4 lg:w-3/5">
          <p>
            The love of my life, my wife, Thiri Zay Ya, is a very kind-hearted
            and caring person. She is also a very talented and hard-working
            individual who is always willing to help others.
          </p>
          <p>
            Her hobbies are buying clothes, caring her skin, and watching
            k-dramas and eating hotpot & BBQ. She always said that I am very
            good at cooking for her, and I have a good talent in housekeeping.
          </p>
          <p>
            She really likes to eat ice cream, and her favorite flavor is
            chocolate. She also enjoys eating delicious foods cooked by both me
            and her mom.
          </p>

          {list && (
            <>
              <p>{list.title}</p>
              <ul className="grid w-3/3 grid-cols-3 gap-1 text-sm">
                {list.items.map((item) => (
                  <ListItem key={getId()}>{item}</ListItem>
                ))}
              </ul>
            </>
          )}
        </div>
        <AuthorImage src={img} alt="thiri" />
      </main>
    </Wrapper>
  ) : (
    <></>
  );
};

export default AboutWife;
