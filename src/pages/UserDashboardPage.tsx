import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Placeholder data for the dashboard
const upcomingBookings = [
  {
    id: 'BK12345',
    destination: 'Rajasthan Royalty Tour',
    date: '25 Dec, 2024',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
    price: '₹75,000',
  },
  {
    id: 'BK67890',
    destination: 'Kerala Backwaters Escape',
    date: '15 Feb, 2025',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
    price: '₹55,000',
  },
];

const pastBookings = [
  {
    id: 'BK54321',
    destination: 'Goa Beach Holiday',
    date: '10 Jun, 2023',
    status: 'Completed' as 'Upcoming' | 'Completed' | 'Cancelled',
    price: '₹40,000',
  },
  {
    id: 'BK09876',
    destination: 'Himalayan Trek',
    date: '01 Apr, 2023',
    status: 'Cancelled' as 'Upcoming' | 'Completed' | 'Cancelled',
    price: '₹30,000',
  },
];

const savedTrips = [
  {
    id: 'TRIP001',
    destination: 'Kashmir Valley',
    estimatedCost: '₹95,000',
    dateSaved: '15 Jul, 2024',
  },
   {
    id: 'TRIP002',
    destination: 'Spiti Valley Adventure',
    estimatedCost: '₹1,20,000',
    dateSaved: '02 Jul, 2024',
  },
];

const getStatusBadgeVariant = (status: 'Upcoming' | 'Completed' | 'Cancelled') => {
  switch (status) {
    case 'Upcoming':
      return 'default'; // Blue/Primary
    case 'Completed':
      return 'secondary'; // Gray
    case 'Cancelled':
      return 'destructive'; // Red
    default:
      return 'outline';
  }
};

const UserDashboardPage = () => {
  console.log('UserDashboardPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Dashboard</h1>
            <p className="text-muted-foreground mt-2">Welcome back! Manage your trips and account details here.</p>
        </div>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-10">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="saved-trips">Saved Trips</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="bookings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Booking History</CardTitle>
                <CardDescription>View your upcoming and past trips.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Upcoming Trips</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {upcomingBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.destination}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">Manage</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                 <div>
                  <h3 className="text-lg font-semibold mb-4">Past Trips</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Destination</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.destination}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                             <Badge variant={getStatusBadgeVariant(booking.status)}>{booking.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="profile" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Keep your personal details up to date.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Aarav Sharma" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="aarav.sharma@example.com" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" defaultValue="+91 98765 43210" />
                </div>
                <Button className="mt-4">Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="saved-trips" className="mt-6">
             <Card>
              <CardHeader>
                <CardTitle>Saved Trip Estimates</CardTitle>
                <CardDescription>Your planned trips from the Trip Estimator.</CardDescription>
              </CardHeader>
              <CardContent>
                 <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Destination</TableHead>
                        <TableHead>Estimated Cost</TableHead>
                        <TableHead>Date Saved</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedTrips.map((trip) => (
                        <TableRow key={trip.id}>
                          <TableCell className="font-medium">{trip.destination}</TableCell>
                          <TableCell>{trip.estimatedCost}</TableCell>
                          <TableCell>{trip.dateSaved}</TableCell>
                          <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm" asChild>
                                <Link to="/trip-estimator">View/Edit</Link>
                            </Button>
                            <Button size="sm" asChild>
                                <Link to="/booking">Book Now</Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
             <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-semibold">Security</h3>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                      <p className="text-sm">Change your password to keep your account secure.</p>
                      <Button variant="secondary">Change Password</Button>
                  </div>
                </div>
                 <div className="space-y-4">
                  <h3 className="font-semibold">Logout</h3>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                      <p className="text-sm">You are currently logged in as Aarav Sharma.</p>
                      <Button variant="destructive">Logout</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboardPage;