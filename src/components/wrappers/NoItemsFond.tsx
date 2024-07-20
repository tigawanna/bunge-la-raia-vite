interface NoItemsFoundProps {}

export function NoItemsFound({}: NoItemsFoundProps) {
  // console.log("error ", error);
  return (
    <div className="w-[90%] h-full min-h-[50vh] flex items-center justify-center m-1 p-2 ">
      <div className="w-full h-full flex flex-col items-center justify-center m-1 p-[5%] bg-bg-emphasized  rounded-lg">
        <h1 className="text-xl">No Items Found</h1>
      </div>
    </div>
  );
}
