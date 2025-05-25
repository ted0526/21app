import './globals.css';

export const metadata = {
  title: '21! – Birthday Drink App',
  description: 'Get drinks sent to you on your birthday 🎉',
    icons: {
    icon: '/party-popper.svg',
    shortcut: '/party-popper.svg',
    apple: '/party-popper.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className = "font-sans">
        {children}
      </body>
    </html>
  );
}