import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Bed, Plane, Car, User, Mail, CreditCard, Calendar } from 'lucide-react';

// Form Schema
const bookingFormSchema = z.object({
  // Common fields
  fullName: z.string().min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  // Hotel specific
  destination: z.string().optional(),
  guests: z.string().optional(),
  // Flight specific
  departure: z.string().optional(),
  arrival: z.string().optional(),
  // Cab specific
  pickup: z.string().optional(),
  // Payment
  cardName: z.string().min(2, { message: 'Name on card is required.' }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: 'Card number must be 16 digits.' }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: 'Expiry date must be in MM/YY format.' }),
  cvc: z.string().regex(/^\d{3}$/, { message: 'CVC must be 3 digits.' }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

const BookingPage = () => {
  console.log('BookingPage loaded');

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      terms: false,
    },
  });

  function onSubmit(data: BookingFormValues) {
    console.log('Booking submitted:', data);
    // Here you would typically handle the payment processing
    alert('Booking successful! (Check console for data)');
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-1 py-12 px-4 flex items-center justify-center">
        <Card className="w-full max-w-3xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Finalize Your Booking</CardTitle>
            <CardDescription>
              Complete your details below to confirm your trip.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Tabs defaultValue="hotel" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="hotel"><Bed className="mr-2 h-4 w-4" />Hotel</TabsTrigger>
                    <TabsTrigger value="flights"><Plane className="mr-2 h-4 w-4" />Flights</TabsTrigger>
                    <TabsTrigger value="cabs"><Car className="mr-2 h-4 w-4" />Cabs</TabsTrigger>
                  </TabsList>
                  <TabsContent value="hotel" className="pt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="destination" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Destination</FormLabel>
                                <FormControl><Input placeholder="e.g., Goa" {...field} /></FormControl>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="guests" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Number of Guests</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select guests" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="1">1 Guest</SelectItem>
                                        <SelectItem value="2">2 Guests</SelectItem>
                                        <SelectItem value="3">3 Guests</SelectItem>
                                        <SelectItem value="4">4 Guests</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}/>
                     </div>
                  </TabsContent>
                  <TabsContent value="flights" className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="departure" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Departure City</FormLabel>
                                <FormControl><Input placeholder="e.g., Mumbai" {...field} /></FormControl>
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="arrival" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Arrival City</FormLabel>
                                <FormControl><Input placeholder="e.g., Delhi" {...field} /></FormControl>
                            </FormItem>
                        )}/>
                    </div>
                  </TabsContent>
                  <TabsContent value="cabs" className="pt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="pickup" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pickup Location</FormLabel>
                                <FormControl><Input placeholder="e.g., Delhi Airport" {...field} /></FormControl>
                            </FormItem>
                        )}/>
                     </div>
                  </TabsContent>
                </Tabs>

                {/* Personal Details */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center"><User className="mr-2 h-4 w-4"/>Full Name</FormLabel>
                                <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center"><Mail className="mr-2 h-4 w-4"/>Email Address</FormLabel>
                                <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                </div>

                {/* Payment Details */}
                <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-semibold">Payment Details</h3>
                     <FormField control={form.control} name="cardName" render={({ field }) => (
                        <FormItem>
                            <FormLabel className="flex items-center"><CreditCard className="mr-2 h-4 w-4"/>Name on Card</FormLabel>
                            <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl>
                            <FormMessage />
                        </FormItem>
                    )}/>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                            <FormItem>
                                <FormLabel className="flex items-center"><Calendar className="mr-2 h-4 w-4"/>Expiry (MM/YY)</FormLabel>
                                <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                        <FormField control={form.control} name="cvc" render={({ field }) => (
                            <FormItem>
                                <FormLabel>CVC</FormLabel>
                                <FormControl><Input placeholder="123" {...field} /></FormControl>
                                <FormMessage />
                            </FormItem>
                        )}/>
                    </div>
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the <Link to="#" className="text-primary hover:underline">terms and conditions</Link>.
                        </FormLabel>
                         <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <CardFooter className="p-0 pt-6">
                    <Button type="submit" size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold">
                        Confirm & Pay
                    </Button>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default BookingPage;