import QueryProvider from '../providers/QueryProvider'
import "../styles/globals.css";

export const metadata = {
  title: 'Quiz Maker',
  description: 'Create and play coding quizzes easily',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}

