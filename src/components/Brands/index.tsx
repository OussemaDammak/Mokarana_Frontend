import { Brand } from "@/types/brand";
import Image from "next/image";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section >
      <div className="container">
      <div className="border-y border-[#2D2C4A] pt-10 dark:border-[#2D2C4A]">
        <h2 className="mb-10 text-center text-lg font-bold text-black dark:text-white sm:text-2xl">
          Laptop Brands featured in this Website
        </h2>
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          {brandsData.map((brand) => (
            <div key={brand.name} className="px-4">
              <div className="mb-5 text-center">
                <a
                  href={brand.href}
                  target="_blank"
                  rel="nofollow noopener"
                className="mb-4 flex max-w-[170px] flex-col items-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0"
                >
                  <div>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width="170"
                      height="40"
                      className="mx-auto h-10 filter dark:filter-none invert dark:invert-0"
                    />

                  </div>
                  
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>




      
    </section>
    

  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, image, name } = brand;

  return (
    <div className="flex w-1/2 items-center justify-center px-3 py-[15px] sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6">
      <a
        href={href}
        target="_blank"
        rel="nofollow noreferrer"
        className="relative h-10 w-full opacity-70 transition hover:opacity-100 dark:opacity-60 dark:hover:opacity-100"
      >
        <Image src={image} alt={name} fill className="block dark:hidden" />
      </a>
    </div>
  );
};
