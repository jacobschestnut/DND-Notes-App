export const metadata = {
  title: 'Register Page',
  description: 'Register New User',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}
