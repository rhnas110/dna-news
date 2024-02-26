import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export const SearchModal = ({
  valueInput,
  setValueInput,
  action,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogTrigger asChild>
        <Button className="bg-rose-600 hover:bg-rose-700 flex gap-x-2 w-full md:w-auto">
          <svg
            width="25"
            height="25"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Search ...</span>
          <kbd className="bg-transparent pointer-events-none ml-auto flex h-5 flex-none select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-semibold opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-stone-800">
        <DialogHeader>
          <DialogTitle className="text-center">
            Lagi nyari berita apa nih?
          </DialogTitle>
        </DialogHeader>
        <div className="flex w-full max-w-sm items-center space-x-2 my-4">
          <Input
            type="text"
            placeholder="Harga bensin mobil tesla ..."
            className="text-primary"
            onChange={(e) => setValueInput(e.target.value)}
            defaultValue={valueInput}
            onKeyUp={action?.onKeyUp}
            required
          />
          <Button onClick={action?.onClick}>Cari</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
