import Image from 'next/image';

import classses from './hero.module.css';

function Hero() {
  return (
    <section className={classses.hero}>
      <div className={classses.image}>
        <Image
          src={'/images/site/worm.png'}
          alt="Worm Image"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi I&apos;m Andros</h1>
      <p>I blog about web development.</p>
    </section>
  );
}

export default Hero;
