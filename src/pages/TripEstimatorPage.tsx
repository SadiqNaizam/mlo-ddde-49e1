import React from 'react';
import { motion } from 'framer-motion';

// Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Component
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';

const TripEstimatorPage: React.FC = () => {
  console.log('TripEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-neutral-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        {/* Page Title and Description */}
        <motion.section 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Real-Time Trip Estimator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A dedicated, interactive tool where you can select various travel components and see a total estimated cost update instantly.
          </p>
        </motion.section>

        {/* The main interactive tool */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <TripCostEstimatorTool />
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default TripEstimatorPage;