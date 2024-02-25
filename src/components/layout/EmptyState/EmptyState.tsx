export default function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center py-8">
      <img height={150} width={340} src="empty-screen.svg" alt="empty-state" />
      <div>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">Not Found</h5>
        <p className="text-gray-500 text-sm">We can&apos;t find what you are looking for</p>
      </div>
    </div>
  )
}