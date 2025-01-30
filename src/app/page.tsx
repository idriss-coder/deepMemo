import InstallButton from "@/app/install-btn";

export default function Home() {
  return (
      <div
          className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 font-[family-name:var(--font-geist-sans)] flex flex-col items-center justify-center">
          <div className={"flex items-center justify-center flex-col gap-2 mb-16"}>
              <h1 className={"text-slate-900 font-black text-8xl text-center"}>DeepMemo</h1>
              <p className={"text-gray-500"}>V1.0.1</p>
          </div>
          <InstallButton/>
      </div>
  );
}