import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { MapPin, Calendar as CalendarIcon, Users, Minus, Plus, Search, Check, ChevronsUpDown } from 'lucide-react';

const destinations = [
  { value: 'rajasthan', label: 'Rajasthan' },
  { value: 'kerala', label: 'Kerala' },
  { value: 'goa', label: 'Goa' },
  { value: 'himachal', label: 'Himachal Pradesh' },
  { value: 'uttarakhand', label: 'Uttarakhand' },
  { value: 'kashmir', label: 'Kashmir' },
];

const DestinationSearchBar: React.FC = () => {
  const [destinationOpen, setDestinationOpen] = useState(false);
  const [destinationValue, setDestinationValue] = useState('');

  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [travelers, setTravelers] = useState(2);
  
  const navigate = useNavigate();

  console.log('DestinationSearchBar loaded');

  const handleSearch = () => {
    // In a real app, you'd pass these values as query params
    console.log('Searching for:', {
      destination: destinationValue,
      dates: date,
      travelers: travelers,
    });
    navigate('/packages');
  };

  const handleTravelerChange = (amount: number) => {
    setTravelers((prev) => Math.max(1, prev + amount)); // Ensure at least 1 traveler
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-background/80 backdrop-blur-sm rounded-xl shadow-lg border">
      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 items-center">
        {/* Destination Input */}
        <div className="md:col-span-3">
          <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={destinationOpen}
                className="w-full justify-between h-14 text-left font-normal text-muted-foreground"
              >
                <div className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-neutral-500" />
                  <span className={cn("truncate", destinationValue && "text-foreground")}>
                    {destinationValue
                      ? destinations.find((d) => d.value === destinationValue)?.label
                      : 'Where to?'}
                  </span>
                </div>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Search destination..." />
                <CommandList>
                  <CommandEmpty>No destination found.</CommandEmpty>
                  <CommandGroup>
                    {destinations.map((d) => (
                      <CommandItem
                        key={d.value}
                        value={d.value}
                        onSelect={(currentValue) => {
                          setDestinationValue(currentValue === destinationValue ? '' : currentValue);
                          setDestinationOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            destinationValue === d.value ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {d.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Picker */}
        <div className="md:col-span-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal h-14',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5 text-neutral-500" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Travelers Input */}
        <div className="md:col-span-2">
           <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal h-14">
                <Users className="mr-2 h-5 w-5 text-neutral-500" />
                <div>
                  <span className="text-muted-foreground text-sm">Travelers</span>
                  <div className="text-foreground">{travelers} adult{travelers > 1 ? 's' : ''}</div>
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Travelers</h4>
                  <p className="text-sm text-muted-foreground">
                    Select the number of adults
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Adults</span>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTravelerChange(-1)} disabled={travelers <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-bold">{travelers}</span>
                     <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTravelerChange(1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="md:col-span-2">
          <Button size="lg" className="w-full h-14 text-lg" onClick={handleSearch}>
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DestinationSearchBar;