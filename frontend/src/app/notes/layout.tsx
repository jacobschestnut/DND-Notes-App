export const metadata = {
  title: 'Notes Page',
  description: 'Display User Notes',
}

export default function NotesLayout({
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
