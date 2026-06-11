export default function Footer() {
  return (
    <footer className="border-t border-github-border mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-xs sm:text-sm text-github-muted text-center">
          Хайраар хийгдсэн{' '}
          <span role="img" aria-label="love" className="text-red-500">
            ❤️
          </span>{' '}
          by{' '}
          <span className="text-github-text font-medium">
            IO2026 Анги
          </span>
          {' | '}
          <span>2026</span>
        </p>
      </div>
    </footer>
  );
}
