import './globals.css';

export const metadata = {
  title: '21! – Birthday Drink App',
  description: 'Get drinks sent to you on your birthday 🎉',
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