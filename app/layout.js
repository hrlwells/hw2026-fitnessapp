import "./globals.css";

export const metadata = {
  title: "Wedding Fitness Tracker",
  description: "The build to 21 Nov — 16-week wedding-prep program.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
