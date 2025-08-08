export const metadata = {
  title: 'New Note Page',
  description: 'Create Note',
}

export default function NewNoteLayout({
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
