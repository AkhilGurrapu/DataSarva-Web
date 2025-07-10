import { FaMicrosoft, FaAmazon, FaGoogle, FaWindows, FaDatabase } from "react-icons/fa";

const ClientsSection = () => {
  const partners = [
    { icon: FaMicrosoft, name: "Microsoft" },
    { icon: FaAmazon, name: "Amazon Web Services" },
    { icon: FaGoogle, name: "Google Cloud" },
    { icon: FaWindows, name: "Enterprise Solutions" },
    { icon: FaDatabase, name: "Database Partners" }
  ];

  return (
    <section className="py-12 bg-neutral-100">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-xl text-neutral-700 font-medium">Covering Technologies From Industry Leaders</h2>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="h-12 w-32 bg-white rounded-md shadow-sm flex items-center justify-center p-6"
            >
              <partner.icon 
                className="h-8 w-auto text-neutral-700" 
                aria-label={partner.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
