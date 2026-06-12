export default function ReadmeSection() {
  return (
    <section className="github-card overflow-hidden mb-8">
      {/* README header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-github-border">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 16 16"
            width="16"
            height="16"
            fill="currentColor"
            className="text-github-muted"
          >
            <path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2-1a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V4a1 1 0 00-1-1H4z" />
            <path d="M4 6h8v1H4V6zm0 2h8v1H4V8zm0 2h5v1H4v-1z" />
          </svg>
          <span className="text-sm font-semibold text-github-text">README.md</span>
        </div>
        <span className="text-xs text-github-muted">3 хоногийн өмнө засварлагдсан</span>
      </div>

      {/* README content */}
      <div className="px-6 sm:px-8 py-6 sm:py-8 prose prose-invert max-w-none">
        <h2 className="text-2xl sm:text-3xl font-bold text-github-text mb-6">
          Талархлын үг
        </h2>

        <div className="space-y-5 text-github-text leading-relaxed text-sm sm:text-base">
          <p>
            Сайн байцгаана уу, хүндэт багш нар аа!
          </p>

          <p>
            Бид, та бүхний сурагчид, та бүхэндээ чин сэтгэлээсээ гүн талархлаа
            илэрхийлж байна. Хэдийгээр бид хамтдаа ердөө л 1 жил хичээллэж
            байгаа ч энэ богино хугацаанд та нар бидэнд маш их зүйлийг өгсөн.
          </p>

          <p>
            Шинэ ангид ирэхэд л биднийг эцэг эх шигээ хүлээн авч, мэдлэг
            түгээж, шаардлагатай үед зөвлөж, урам өгч, тэвчээртэйгээр хичээл
            зааж ирсэнд баярлалаа.
          </p>

          <p>
            Та нар биднийг зөвхөн номын мэдлэгээр төдийгүй, хариуцлага,
            тэвчээр, хүн чанар, хамтын ажиллагаа гэх мэт амьдралын чухал
            хичээлүүдийг зааж өгсөн. Бид заримдаа алдаа гаргаж, залхуурч
            байсан ч та нар хэзээ ч биднийг орхиж, итгэл найдвараа алдаагүй.
          </p>

          <p>
            Бүх сурагчдынхаа өмнөөс хэлэхэд: Та бүхэндээ маш их баярлалаа! Та
            нар бол бидний жинхэнэ удирдагч, дэмжигч, баатрууд юм.
          </p>

          <p>
            Та бүхэндээ эрүүл энх, аз жаргалтай, урт удаан насалж, олон олон
            шавь нарынхаа амжилтаар бахархаж яваарай гэж хүсье.
          </p>

          <div className="pt-4 border-t border-github-border">
            <p className="font-semibold text-base">Талархалтайгаар,</p>
            <p className="text-github-green font-semibold text-lg">
              Танай ангийн бүх сурагчид
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
