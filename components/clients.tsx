import Image from "next/image";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { companies, testimonials } from "@/data";

export const Clients = () => {
  return (
    <section id="testimonials" className="py-20">
      <h1 className="heading">
        What our <span className="text-purple">brand partners</span> say
      </h1>

      <div className="flex flex-col items-center max-lg:mt-10">
        <div className="relative flex h-[50vh] flex-col items-center justify-center  overflow-hidden rounded-md antialiased md:h-[30rem]">
          <InfiniteMovingCards
            items={testimonials}
            direction="right"
            speed="slow"
          />
        </div>

        <p className="mb-6 text-center text-sm text-white-200 md:text-base">
          Platforms where we drive results
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 max-lg:mt-4 md:gap-16">
          {companies.map(({ id, img, name, nameImg }) => (
            <div key={id} className="flex max-w-32 items-center gap-2 md:max-w-60">
              <Image
                height={28}
                width={28}
                src={img}
                alt={`${name} logo`}
                className="w-6 md:w-7"
              />

              <Image
                height={28}
                width={120}
                src={nameImg}
                alt={name}
                className="w-16 md:w-24"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
