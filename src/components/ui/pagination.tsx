import { MouseEventHandler } from "react";

type PaginationProps = {
  currentPage: number
  onPaginate: (page: number) => void
}

export default function Pagination(props: PaginationProps) {
  const { currentPage, onPaginate } = props;

  const handlePrevClick: MouseEventHandler<HTMLButtonElement> = () => {
    onPaginate(currentPage - 1);
  }

  const handleNextClick: MouseEventHandler<HTMLButtonElement> = () => {
    onPaginate(currentPage + 1);
  }

  const buttonStyles = "border py-1 px-3 text-sm rounded-md shadow-sm text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-900 dark:text-gray-400 disabled";

  return (
    <div className="flex items-center gap-4">
      <button onClick={handlePrevClick} disabled={currentPage <= 0} className={buttonStyles}>Previous</button>
      <button onClick={handleNextClick} className={buttonStyles}>Next</button>
    </div>
  )
}