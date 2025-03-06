import React from 'react';
import { getAllConversions } from '@/app/fileutility/conversion-types';
import { ArrowDownWideNarrow, CheckCircle, Globe, Zap } from 'lucide-react';
import ConversionCard from './components/ConversionCard';
import Header from '../common/components/Header';
import Footer from '../common/components/Footer';

const Landing = () => {
  const conversions = getAllConversions();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-6 lg:px-8 py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-gray-200/50 bg-[size:32px_32px] opacity-20" />
          <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white/5 shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50/5" />
          
          <div className="container mx-auto">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl animate-slide-in">
                Convert Your Files With Ease
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-slide-in-delayed">
                Transform your files from one format to another with our simple, fast, and secure online converter. 
                No installations required, and your files stay private.
              </p>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">Fast Conversion</h3>
                <p className="text-muted-foreground">Convert your files quickly with our optimized algorithms.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">100% Web-Based</h3>
                <p className="text-muted-foreground">No downloads or installations required. Convert directly in your browser.</p>
              </div>
              
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="p-2 bg-primary/10 rounded-full w-fit mb-4">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2">High Quality</h3>
                <p className="text-muted-foreground">Our conversions maintain the highest possible quality of your original files.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Conversion Options */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Choose Your Conversion</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Select the type of conversion you need from our wide range of options. 
                We support all common file formats for your convenience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {conversions.map((conversion) => (
                <ConversionCard key={conversion.id} conversion={conversion} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Landing;