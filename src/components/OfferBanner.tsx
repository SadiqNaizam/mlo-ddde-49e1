import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const OfferBanner: React.FC = () => {
  console.log('OfferBanner loaded');

  return (
    <section className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 to-black p-8 shadow-md transition-all duration-500 ease-in-out hover:shadow-lg hover:shadow-amber-400/20 md:p-12">
      <div className="flex flex-col items-start gap-4 text-white md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-bold tracking-tight text-amber-400 sm:text-3xl md:text-4xl">
            Unforgettable Journeys Await
          </h2>
          <p className="mt-2 text-base text-slate-300 sm:text-lg">
            Discover exclusive travel packages and save up to 25% on your next adventure. Limited time offer!
          </p>
        </div>
        <div className="mt-4 flex-shrink-0 md:mt-0">
          <Button asChild size="lg" className="bg-amber-500 text-slate-900 hover:bg-amber-400">
            <Link to="/packages">
              Explore Deals
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;