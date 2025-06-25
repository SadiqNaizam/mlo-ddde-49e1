import React from 'react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import PackageCard, { PackageCardProps } from '@/components/PackageCard';
import OfferBanner from '@/components/OfferBanner';

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ListFilter } from 'lucide-react';

// Mock data for travel packages
const mockPackages: PackageCardProps[] = [
  {
    id: '1',
    imageUrl: 'https://images.unsplash.com/photo-1599661046223-e06b95e624df?q=80&w=800',
    destination: 'Royal Rajasthan Tour',
    price: 45000,
    duration: '7 Days / 6 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing', 'Meals'],
  },
  {
    id: '2',
    imageUrl: 'https://images.unsplash.com/photo-1605325193910-1e5233139150?q=80&w=800',
    destination: 'Jaisalmer Desert Safari',
    price: 25000,
    duration: '3 Days / 2 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing'],
  },
  {
    id: '3',
    imageUrl: 'https://images.unsplash.com/photo-1593693397640-052a185b3b49?q=80&w=800',
    destination: 'Kerala Backwater Bliss',
    price: 38000,
    duration: '6 Days / 5 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing', 'Flights'],
  },
  {
    id: '4',
    imageUrl: 'https://images.unsplash.com/photo-1590374504364-0341e44ed866?q=80&w=800',
    destination: 'Scenic Himachal Trails',
    price: 32000,
    duration: '5 Days / 4 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing'],
  },
  {
    id: '5',
    imageUrl: 'https://images.unsplash.com/photo-1584295383577-a725cb739209?q=80&w=800',
    destination: 'Mystical Kashmir Valley',
    price: 52000,
    duration: '8 Days / 7 Nights',
    inclusions: ['Hotel Stay', 'Flights', 'Meals'],
  },
  {
    id: '6',
    imageUrl: 'https://images.unsplash.com/photo-1570222197115-5fac12068469?q=80&w=800',
    destination: 'Goa Beach Paradise',
    price: 22000,
    duration: '4 Days / 3 Nights',
    inclusions: ['Hotel Stay', 'Meals'],
  },
    {
    id: '7',
    imageUrl: 'https://images.unsplash.com/photo-1623193235388-a2c3b0362f14?q=80&w=800',
    destination: 'Spiritual Varanasi Ghats',
    price: 18000,
    duration: '3 Days / 2 Nights',
    inclusions: ['Hotel Stay', 'Sightseeing'],
  },
  {
    id: '8',
    imageUrl: 'https://images.unsplash.com/photo-1581726514214-c081223e7f3c?q=80&w=800',
    destination: 'Udaipur Lake City Charm',
    price: 35000,
    duration: '5 Days / 4 Nights',
    inclusions: ['Hotel Stay', 'Meals', 'Sightseeing'],
  },
];

const PackagesPage = () => {
  console.log('PackagesPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Explore Our Packages
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Based on your search for "Rajasthan" and more popular destinations.
            </p>
          </div>
          
          {/* Filtering and Sorting Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-4 bg-background rounded-lg shadow-sm border">
            <div className="flex items-center gap-2 font-semibold">
              <ListFilter className="h-5 w-5"/>
              <span>Filter & Sort</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
               <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="secondary">Price Range</Button>
              <Button variant="secondary">Trip Type</Button>
            </div>
          </div>
          
          {/* Offer Banner */}
          <div className="mb-12">
            <OfferBanner />
          </div>

          {/* Packages Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {mockPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </section>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackagesPage;