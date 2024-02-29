import Button from "@/Components/Button";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <div className="md:h-[374px] h-full w-full bg-TopSection">
        <div className="flex flex-col gap-3 px-5 pt-32 mx-auto sm:container xl:max-w-screen-xl">
          <div>
            <h6 className="h6 text-primary">Careers</h6>
            <h1 className="text-5xl font-semibold leading-[140%] text-black">
              Jobs
            </h1>
            <p className="para !text-[#656565]">
              lorem ipsum dolar sit dummy text dolar sit lerom.
            </p>
          </div>
          <div className="searchJob rounded-[10px] bg-white w-full lg:h-[74px] p-3">
            <div>
              
            </div>
            <Button>Search</Button>
          </div>
        </div>
      </div>
      <div></div>
    </main>
  );
}
