

import ClientOnly from './components/ClientOnly';
import RegisterModel from './components/Modal/RegisterModel';
import Navbar from './components/navbar/Navbar';
import './globals.css'
import {Nunito} from "next/font/google";

export const metadata = {
  title: 'Travel',
  description: 'Perfefct travel partner',
}

const font = Nunito ({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
        <Navbar/>
        <RegisterModel/>
        </ClientOnly>
        
        {children}
        </body>
    </html>
  )
}
