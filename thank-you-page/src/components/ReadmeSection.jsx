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
          Хүндэт багш нар аа,
        </h2>

        <div className="space-y-5 text-github-text leading-relaxed text-sm sm:text-base">
          <p>
            Мэдээллийн Технологийн хөтөлбөрийн эхний жилээ дуусгах энэ үед бид
            таны удирдлага, заавар зөвлөгөөний ач холбогдлыг илэрхийлэх үгс
            хайж байна. Энэ захидал — энэ хуудас — бидний даруухан оролдлого юм.
          </p>

          <p>
            Та нар бидний амьдралд багш хэмээн ирсэн ч, энэ жилийг зөвлөгч,
            үлгэр дууриал, олон талаараа хоёр дахь гэр бүл болон өнгөрүүллээ.
            Та бидэнд зөвхөн синтакс, алгоритм, өгөгдлийн бүтцийг заагаагүй.
            Та бидэнд хэрхэн сэтгэх, шөнө 11 цагт алдаа гаргахад тэвчээртэй
            байх, ямар нэг зүйл амжилттай болох тэр <em>ага!</em> мөчид
            баяр баясгаланг мэдрэхийг заасан.
          </p>

          <p>
            Бид хичээлийн дараа ойлгохгүй байсан сэдвүүдээ тайлбарлаж өнгөрүүлсэн
            нэмэлт цагуудыг санаж байна. Импостер синдром хамгийн хүчтэй үед
            хэлсэн урам өгөх үгс. Гурав дахь удаагаа асуултаа давтан асуухад
            үзүүлсэн тэвчээр. Та бидний хүч чадлыг бид өөрсдөө харахаас өмнө
            харсан.
          </p>

          <p>
            Та биднийг сорилтод оруулж, түлхэж, ердийн байдалд үлдэхийг
            зөвшөөрөөгүй. Бидний жижиг ялалтуудыг өөрийн ялалт мэт тэмдэглэсэн.
            Таны ачаар бид хоёрдугаар курсдээ зөвхөн илүү мэдлэгтэй төдийгүй,
            илүү итгэлтэй, илүү сониуч зантай, энэ салбарыг илүү гүнзгий
            хайрлах сэтгэлтэй алхаж байна.
          </p>

          <p>
            Бидний бичсэн код мөр бүр таны заасан зүйлсийн нэг хэсгийг агуулдаг.
            Бидний гүйцэтгэсэн төсөл бүр таны чин сэтгэлийн илэрхийлэл юм.
            Та бидний зорилгодоо хүрч чадна гэдэгт итгэх шалтгаан болсон.
          </p>

          <p className="text-base sm:text-lg font-medium text-github-green">
            Бидэнд итгэсэн таньд баярлалаа. Тэвчээр, мэргэн ухаан, чин
            сэтгэлийн таньд баярлалаа.
          </p>

          <p>
            Та бидний хамгийн дуртай илгээлт байх болно — учир нь та бүхнийг
            өөрчилсөн.
          </p>

          <div className="pt-4 border-t border-github-border">
            <p className="font-semibold text-base">Гүн талархалтайгаар,</p>
            <p className="text-github-green font-semibold text-lg">
              IO2026 Ангийн оюутнууд
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
