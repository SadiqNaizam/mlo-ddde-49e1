import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import DestinationSearchBar from '@/components/DestinationSearchBar';
import OfferBanner from '@/components/OfferBanner';
import PackageCard, { PackageCardProps } from '@/components/PackageCard';

// Sample data for the package cards, as described in page_type_info
const samplePackages: PackageCardProps[] = [
  {
    id: 'pkg1',
    destination: 'Royal Rajasthan',
    price: 45000,
    duration: '7 Days / 6 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing', 'Meals'],
    imageUrl: 'https://images.unsplash.com/photo-1544998007-1b0799c91de8?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 'pkg2',
    destination: 'Kerala Backwaters',
    price: 38000,
    duration: '5 Days / 4 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing', 'Flights'],
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1935&auto=format&fit=crop',
  },
  {
    id: 'pkg3',
    destination: 'Himalayan Escapade',
    price: 52000,
    duration: '8 Days / 7 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing', 'Meals', 'Flights'],
    imageUrl: 'https://images.unsplash.com/photo-1610622743921-95d13414b39b?q=80&w=1935&auto=format&fit=crop',
  },
];

const Homepage: React.FC = () => {
  console.log('Homepage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative flex items-center justify-center h-[70vh] min-h-[500px] text-white">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop"
              alt="Beautiful landscape of the Taj Mahal in India"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center text-center p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 text-shadow-lg">
              Incredible India Awaits
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mb-8 text-shadow">
              Discover breathtaking destinations and create unforgettable memories. Your journey starts here.
            </p>
            <DestinationSearchBar />
          </div>
        </section>

        {/* Popular Packages Section */}
        <section className="py-16 md:py-24 bg-muted/40">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Popular Packages
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
              {samplePackages.map((pkg) => (
                <div key={pkg.id} className="flex justify-center">
                  <PackageCard {...pkg} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Offer Banner Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <OfferBanner />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Homepage;