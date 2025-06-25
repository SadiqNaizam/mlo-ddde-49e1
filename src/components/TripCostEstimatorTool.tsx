import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plane, Hotel, Car, Users, Calendar, Mountain, Utensils } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter'; // Assuming this component exists

const TripCostEstimatorTool: React.FC = () => {
  console.log('TripCostEstimatorTool loaded');

  // State for user inputs
  const [days, setDays] = useState([5]);
  const [travelers, setTravelers] = useState([2]);
  const [includeFlights, setIncludeFlights] = useState(true);
  const [hotelStars, setHotelStars] = useState([3]);
  const [includeCabs, setIncludeCabs] = useState(true);
  const [includeActivities, setIncludeActivities] = useState(false);

  // State for calculated costs
  const [totalCost, setTotalCost] = useState(0);
  const [flightCost, setFlightCost] = useState(0);
  const [hotelCost, setHotelCost] = useState(0);
  const [cabCost, setCabCost] = useState(0);
  const [activityCost, setActivityCost] = useState(0);

  // Base costs for calculation
  const BASE_COSTS = {
    FLIGHT_PER_PERSON: 12000,
    HOTEL_PER_NIGHT_PER_STAR: 1000,
    CAB_PER_DAY: 2500,
    ACTIVITY_PER_PERSON_PER_DAY: 1500,
  };

  const calculateCosts = useCallback(() => {
    const currentDays = days[0];
    const currentTravelers = travelers[0];
    const currentHotelStars = hotelStars[0];

    const fCost = includeFlights ? currentTravelers * BASE_COSTS.FLIGHT_PER_PERSON : 0;
    const hCost = currentTravelers * currentDays * currentHotelStars * BASE_COSTS.HOTEL_PER_NIGHT_PER_STAR;
    const cCost = includeCabs ? currentDays * BASE_COSTS.CAB_PER_DAY : 0;
    const aCost = includeActivities ? currentTravelers * currentDays * BASE_COSTS.ACTIVITY_PER_PERSON_PER_DAY : 0;
    
    setFlightCost(fCost);
    setHotelCost(hCost);
    setCabCost(cCost);
    setActivityCost(aCost);

    setTotalCost(fCost + hCost + cCost + aCost);
  }, [days, travelers, includeFlights, hotelStars, includeCabs, includeActivities, BASE_COSTS]);

  useEffect(() => {
    calculateCosts();
  }, [calculateCosts]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto p-4">
      {/* Controls Panel */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Customize Your Trip</CardTitle>
          <CardDescription>Adjust the sliders and toggles to get a real-time cost estimate.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Days Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="days-slider" className="flex items-center gap-2 text-lg"><Calendar className="h-5 w-5" /> Trip Duration</Label>
              <span className="font-bold text-lg">{days[0]} Days</span>
            </div>
            <Slider id="days-slider" min={1} max={30} step={1} value={days} onValueChange={setDays} />
          </div>

          {/* Travelers Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="travelers-slider" className="flex items-center gap-2 text-lg"><Users className="h-5 w-5" /> Number of Travelers</Label>
              <span className="font-bold text-lg">{travelers[0]} {travelers[0] > 1 ? 'People' : 'Person'}</span>
            </div>
            <Slider id="travelers-slider" min={1} max={10} step={1} value={travelers} onValueChange={setTravelers} />
          </div>

          <Separator />

          {/* Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <Label htmlFor="flights-switch" className="flex items-center gap-3 text-base font-medium">
                <Plane className="h-6 w-6 text-blue-500" />
                Include Flights
              </Label>
              <Switch id="flights-switch" checked={includeFlights} onCheckedChange={setIncludeFlights} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <Label htmlFor="cabs-switch" className="flex items-center gap-3 text-base font-medium">
                <Car className="h-6 w-6 text-yellow-500" />
                Include Local Cabs
              </Label>
              <Switch id="cabs-switch" checked={includeCabs} onCheckedChange={setIncludeCabs} />
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <Label htmlFor="activities-switch" className="flex items-center gap-3 text-base font-medium">
                <Mountain className="h-6 w-6 text-green-500" />
                Include Activities
              </Label>
              <Switch id="activities-switch" checked={includeActivities} onCheckedChange={setIncludeActivities} />
            </div>
          </div>
          
          <Separator />

          {/* Hotel Stars Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="hotel-slider" className="flex items-center gap-2 text-lg"><Hotel className="h-5 w-5" /> Hotel Quality</Label>
              <span className="font-bold text-lg">{hotelStars[0]} Stars</span>
            </div>
            <Slider id="hotel-slider" min={1} max={5} step={1} value={hotelStars} onValueChange={setHotelStars} />
          </div>
        </CardContent>
      </Card>

      {/* Summary Panel */}
      <div className="lg:col-span-1">
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle className="text-2xl">Trip Cost Summary</CardTitle>
            <CardDescription>Your estimated trip cost.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between"><span className="flex items-center gap-2"><Hotel size={16}/> Hotel ({hotelStars[0]} star)</span> <span>{formatCurrency(hotelCost)}</span></div>
                {includeFlights && <div className="flex justify-between"><span className="flex items-center gap-2"><Plane size={16}/> Flights</span> <span>{formatCurrency(flightCost)}</span></div>}
                {includeCabs && <div className="flex justify-between"><span className="flex items-center gap-2"><Car size={16}/> Cabs</span> <span>{formatCurrency(cabCost)}</span></div>}
                {includeActivities && <div className="flex justify-between"><span className="flex items-center gap-2"><Mountain size={16}/> Activities</span> <span>{formatCurrency(activityCost)}</span></div>}
            </div>
            <Separator />
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Total Estimated Cost</p>
              <div className="text-4xl font-bold text-gray-900">
                <span className="text-3xl">₹</span>
                <AnimatedCounter value={totalCost} />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" asChild>
              <Link to="/booking">Proceed to Book</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TripCostEstimatorTool;