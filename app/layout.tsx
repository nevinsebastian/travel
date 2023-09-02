

import ClientOnly from './components/ClientOnly';
import Modal from './components/Modal/Modal';
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
        <Modal actionLabel='submit' title='hello' isOpen />

        </ClientOnly>
        
        {children}
        </body>
    </html>
  )
}
