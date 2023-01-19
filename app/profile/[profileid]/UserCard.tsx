export default function UserCard({ name, npub, about, picture }: any) {
  return (
    <div className="border border-zinc-700 rounded-md p-4 flex flex-row justify-between items-center gap-4">
      <div>
        <p className="text-4xl font-bold pt-4 text-zinc-200">
          <span className="text-red-500">@</span>
          {name}
        </p>
        <p className="text-lg text-zinc-400">{npub}</p>
        <p className="text-sm text-zinc-400">{about}</p>
      </div>
      <img className="rounded-full w-28" src={picture} />
    </div>
  );
}
