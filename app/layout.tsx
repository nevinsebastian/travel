import {Nunito} from "next/font/google";


import './globals.css'

import Navbar from './components/navbar/Navbar';
import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/Modal/RegisterModal';
import LoginModal from './components/Modal/LoginModal';
import RentModal from './components/Modal/RentModal';



import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

export const metadata = {
  title: 'Travel',
  description: 'Perfefct travel partner',
}

const font = Nunito ({
  subsets: ["latin"],
})

export default async  function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <ToasterProvider/>
        <RentModal/>
        <LoginModal/>
        <RegisterModal/>
        <Navbar currentUser={currentUser}/>
        </ClientOnly>
        
        {children}
        </body>
    </html>
  )
}
