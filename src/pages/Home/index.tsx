import Header from "../../components/Header";
import Carousel from "../../components/Carousel";

function Home() {
  return (
    <>
      <Header />
      <main className="w-full">
        <section className="h-auto">
          <div className="py-8 px-4 mx-auto mt-7 max-w-screen-xl text-center lg:py-16 lg:px-12">
            <Carousel />
          </div>
        </section>
      </main>
    </>
  )
}

export default Home