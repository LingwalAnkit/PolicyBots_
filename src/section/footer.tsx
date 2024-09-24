import React from 'react';
import { Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import Image from 'next/image';

const paymentMethods = [
  { name: 'American Express', imgSrc: '/images/Rupay-Logo.png', width: 50, height: 30 },
  { name: 'Visa', imgSrc: '/images/visa-icon.avif', width: 50, height: 30 },
  { name: 'Paytm', imgSrc: '/images/paytm-icon.avif', width: 50, height: 30 },
  { name: 'RuPay', imgSrc: '/images/netbanking-icon.avif', width: 50, height: 30 },
  { name: 'Freecharge', imgSrc: '/images/master-card-icon.avif', width: 50, height: 30 },
  { name: 'Mastercard', imgSrc: '/images/amex-icon.avif', width: 50, height: 30 }
];

const Footer = () => {
  return (
    <footer className="p-8 bg-gray-300 text-black dark:bg-gray-900 dark:text-gray-300">
      <div className="container mx-auto">
        <div className="grid grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold mb-4 ">Insurance</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>General Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Life Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Term Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Investment</li>
              <li className='hover:text-blue-600 cursor-pointer'>Health Insurance</li>
              <li className='hover:text-blue-600 cursor-pointer'>Other Insurance</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Calculators</h3>
            <ul className="space-y-2 ">
              <li className='hover:text-blue-600 cursor-pointer'>SIP Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Income Tax Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>NPS Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Term Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>HLV Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Life Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Health Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Travel Insurance Calculator</li>
              <li className='hover:text-blue-600 cursor-pointer'>Car Insurance Calculator</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>Articles</li>
              <li className='hover:text-blue-600 cursor-pointer'>Customer reviews</li>
              <li className='hover:text-blue-600 cursor-pointer'>Insurance companies</li>
              <li className='hover:text-blue-600 cursor-pointer'>Newsroom</li>
              <li className='hover:text-blue-600 cursor-pointer'>Awards</li>
              <li className='hover:text-blue-600 cursor-pointer'>PB Life</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li className='hover:text-blue-600 cursor-pointer'>About Us</li>
              <li className='hover:text-blue-600 cursor-pointer'>Sitemap</li>
              <li className='hover:text-blue-600 cursor-pointer'>Careers</li>
              <li className='hover:text-blue-600 cursor-pointer'>Legal & Admin policies</li>
              <li className='hover:text-blue-600 cursor-pointer'>ISNP</li>
              <li className='hover:text-blue-600 cursor-pointer'>Contact us</li>
              <li className='hover:text-blue-600 cursor-pointer'>Verify your advisor</li>
              <li className='hover:text-blue-600 cursor-pointer'>Investor Relations</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-navy-800 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="font-bold mb-2">Payment Methods</h4>
              <div className="flex space-x-4">
                {paymentMethods.map(({ name, imgSrc, width, height }) => (
                  <div key={name} className="bg-white p-1 rounded-lg">
                    <Image src={imgSrc} alt={name} width={width} height={height} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Secured With</h4>
              <div className="bg-white p-2 rounded">
                {/* Update with a valid image src */}
                <Image src="/images/pci-icon.avif" alt="Secured With" width={80} height={30} />
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-2">Follow us on</h4>
              <div className="flex space-x-4 ">
                <Facebook size={24} className='hover:text-blue-700 cursor-pointer' />
                <Twitter size={24} className='hover:text-blue-500 cursor-pointer' />
                <Linkedin size={24} className='hover:text-blue-400 cursor-pointer' />
                <Youtube size={24} className='hover:text-red-600 cursor-pointer' />
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-sm">
          <p>Policy Bots Insurance Brokers Private Limited Registered Office - Boys Hostel G-114, USAR , Shahdara 110032, Delhi , Email ID: enquiry@policybots.com</p>
          <p className="mt-2">Policy Bots is registered as a Composite Broker | Registration No. 121, Registration Code No. IRDA/ DB 797/ 19, Valid till 09/06/2027, License category- Composite Broker</p>
          <p className="mt-2">Visitors are hereby informed that their information submitted on the website may be shared with insurers.Product information is authentic and solely based on the information received from the insurers.</p>
          <p className="mt-4">© Copyright 2024- Till Eternity policybots.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
