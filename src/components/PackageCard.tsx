import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BedDouble, Plane, MountainSnow, Utensils } from 'lucide-react';

// A mapping from inclusion text to an icon component
const inclusionIconMap: { [key: string]: React.ElementType } = {
  'Hotel Stay': BedDouble,
  'Flights': Plane,
  'Sightseeing': MountainSnow,
  'Meals': Utensils,
};

export interface PackageCardProps {
  id: string;
  imageUrl: string;
  destination: string;
  price: number;
  duration: string; // e.g., "5 Days / 4 Nights"
  inclusions: string[]; // e.g., ['Hotel Stay', 'Flights']
}

const PackageCard: React.FC<PackageCardProps> = ({
  id,
  imageUrl,
  destination,
  price,
  duration,
  inclusions,
}) => {
  console.log(`PackageCard loaded for: ${destination}`);

  return (
    <Card className="w-full max-w-sm overflow-hidden rounded-xl shadow-lg border-none group transition-all duration-300 ease-in-out hover:shadow-2xl bg-white/50 backdrop-blur-sm">
      <div className="relative overflow-hidden">
        <motion.img
          src={imageUrl}
          alt={`A trip to ${destination}`}
          className="object-cover w-full h-56 transition-transform duration-500 ease-in-out group-hover:scale-110"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Hover overlay for inclusions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex flex-col justify-end p-4">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white"
          >
            <h4 className="text-md font-semibold mb-2 border-b border-white/30 pb-1">Key Inclusions</h4>
            <ul className="space-y-1.5 text-sm">
              {inclusions.slice(0, 3).map((item, index) => {
                const Icon = inclusionIconMap[item] || MountainSnow;
                return (
                  <li key={index} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-amber-300" />
                    <span>{item}</span>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <h3 className="text-xl font-bold text-gray-800 truncate">{destination}</h3>
        <p className="text-sm text-gray-500">{duration}</p>
        <div className="flex items-baseline justify-between pt-2">
          <div>
            <span className="text-xs text-gray-600">Starts from</span>
            <p className="text-2xl font-extrabold text-slate-900">
              ₹{price.toLocaleString('en-IN')}
            </p>
          </div>
          <Button asChild className="bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold shadow-md hover:shadow-lg transition-shadow">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;