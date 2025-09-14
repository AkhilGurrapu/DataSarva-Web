import { FaMicrosoft, FaAmazon, FaGoogle, FaWindows, FaDatabase } from "react-icons/fa";

const ClientsSection = () => {
  const partners = [
    { icon: FaMicrosoft, name: "Microsoft Ecosystem" },
    { icon: FaAmazon, name: "AWS Cloud Platform" },
    { icon: FaGoogle, name: "Google Cloud AI" },
    { icon: FaWindows, name: "Enterprise Solutions" },
    { icon: FaDatabase, name: "Data Platforms" }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-slate-50 to-blue-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23e2e8f0%22%20fill-opacity%3D%220.4%22%3E%3Ccircle%20cx%3D%2220%22%20cy%3D%2220%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-slate-800 to-blue-600 bg-clip-text text-transparent">
            Powered by Industry Leaders
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Integrated solutions leveraging best-in-class technologies from trusted partners
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group relative h-16 w-40 bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center p-6 border border-slate-200 hover:border-blue-300 transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <partner.icon 
                className="h-8 w-auto text-slate-600 group-hover:text-blue-600 transition-colors duration-300 relative z-10" 
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
