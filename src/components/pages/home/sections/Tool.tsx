import Image from "next/image";

const Tool = () => {
  return (
    <section className="container">
      <div className="container pb-20 pt-16">
        <div className="mx-auto w-4/5">
          <h2 className="text-center text-lg">
            Narzędzie stworzone dla organizacji, które chcą działać szybko i
            wspólnie podejmować decyzje
          </h2>
        </div>

        <div className="mt-16 gap-10 sm:flex sm:flex-wrap sm:justify-center">
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-[2rem] bg-error">
              <Image
                src="/images/form.svg"
                alt=""
                width={0}
                height={0}
                className="h-auto w-[30px]"
              />
            </div>
            <p className="text-center text-sm">
              Twórz formularze w kilka minut
            </p>
          </div>

          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-[2rem] bg-error">
              <Image
                src="/images/table.svg"
                width={0}
                height={0}
                alt=""
                className="h-auto w-[40px]"
              />
            </div>
            <p className="text-center text-sm">
              Wyniki aktualizują się automatycznie
            </p>
          </div>

          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-[2rem] bg-error">
              <Image
                src="/images/graph.svg"
                alt=""
                width={0}
                height={0}
                className="h-auto w-[40px]"
              />
            </div>
            <p className="text-center text-sm">
              Wyniki zapisuj w Exel, PDF, wykresy
            </p>
          </div>
          <div className="sm:w-[180px]">
            <div className="mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-[2rem] bg-error">
              <Image
                src="/images/gear.svg"
                width={0}
                height={0}
                alt=""
                className="h-auto w-[40px]"
              />
            </div>
            <p className="text-center text-sm">Dla organizacji związkowych</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tool;
