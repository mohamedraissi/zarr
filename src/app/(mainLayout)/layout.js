import MainLayout from "@/layout"

export default async function RootLayout({ children }) {
  const themeOption = await fetch(`${process.env.URL}/themeOptions`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));

  return (
    <>
      <MainLayout themeOptions={themeOption?.options}>
        {children}
      </MainLayout>
    </>
  )
}
