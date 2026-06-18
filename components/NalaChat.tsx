export default function NalaChat() {
  return (
    <div className="flex h-full min-h-[360px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0a0c10] px-6 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#c49a3c] text-[0.62rem] font-bold text-neutral-950">
        NALA
      </div>
      <p className="mt-4 text-sm font-semibold text-white">Use the live NALA avatar</p>
      <p className="mt-2 max-w-xs text-xs leading-6 text-white/50">
        Chat and voice are handled by the Trulience avatar for this demo.
      </p>
    </div>
  );
}
