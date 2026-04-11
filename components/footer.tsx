import Image from "next/image";
import Link from "next/link";
import { FaLocationArrow } from "react-icons/fa6";

import { MagicButton } from "@/components/ui/magic-button";
import { links } from "@/config";
import { socialMedia } from "@/data";

export const Footer = () => {
  return (
    <footer id="contact" className="mb-[100px] w-full pb-10 md:mb-auto">
      <div className="absolute -bottom-72 left-0 min-h-96 w-full">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          className="h-full w-full opacity-50"
          width={1260}
          height={863}
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Ready to amplify <span className="text-purple">your brand&apos;s</span> reach
          with influencer marketing?
        </h1>

        <p className="my-5 text-center text-white-200 md:mt-10">
          Let&apos;s talk about your goals and build a campaign that drives real results.
        </p>

        <Link
          href={`mailto:${links.ownerEmail}`}
          target="_blank"
          rel="noreferrer noopener"
          className="md:mt-10"
        >
          <MagicButton
            title="Start a campaign"
            icon={<FaLocationArrow />}
            position="right"
            asChild
          />
        </Link>

        {/* Creator CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.03] px-8 py-6 text-center">
          <p className="text-sm font-semibold text-white">Are you a content creator?</p>
          <p className="max-w-xs text-xs text-white-200">
            Join our network and get matched with brand campaigns that fit your niche and rates.
          </p>
          <Link
            href="/apply"
            className="mt-1 inline-flex items-center gap-2 rounded-full border border-purple/40 bg-purple/10 px-5 py-2 text-sm font-semibold text-purple transition hover:bg-purple/20"
          >
            Apply as an Influencer <FaLocationArrow className="text-xs" />
          </Link>
        </div>
      </div>

      <div className="relative z-[999] mt-16 flex flex-col items-center justify-between md:flex-row">
        <p className="text-sm font-light md:text-base md:font-normal">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="text-purple">InfluenceHub Agency</span>{" "}
          | All rights reserved
        </p>

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map((profile) => (
            <Link
              key={profile.name}
              href={profile.link}
              target="_blank"
              rel="noreferrer noopener"
              className="saturate-180 flex size-10 items-center justify-center rounded-lg border border-black-300 bg-black-200 bg-opacity-75 backdrop-blur-lg backdrop-filter"
              title={profile.name}
            >
              <Image
                src={profile.img}
                alt={`profile-${profile.name}`}
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};
