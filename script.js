/* =====================================================
   ⚙️ سهولة التعديل: غيّر القيم في هذا القسم فقط
   ===================================================== */
const CONFIG = {
  // 🟢 رقم الواتساب بصيغة دولية بدون + أو 00 أو مسافات
  whatsappNumber: "201234567890",

  // 🦷 خدمات العيادة - أضف/احذف/عدّل بحرية
  services: [
    { icon: "🦷", title: "كشف وفحص شامل", desc: "تشخيص دقيق لحالة أسنانك ولثتك مع خطة علاج متكاملة." },
    { icon: "✨", title: "ابتسامة هوليود", desc: "احصل على ابتسامة مثالية بأحدث تقنيات الفينير والـ Lumineers." },
    { icon: "🪥", title: "تنظيف وتلميع", desc: "إزالة الجير والتصبغات لاستعادة بياض ولمعان أسنانك الطبيعي." },
    { icon: "🔧", title: "زراعة الأسنان", desc: "زراعات سويسرية وألمانية معتمدة بضمان طويل المدى." },
    { icon: "📐", title: "تقويم الأسنان", desc: "تقويم تقليدي أو شفاف (Invisalign) لابتسامة منظمة ومتناسقة." },
    { icon: "💎", title: "تبييض الأسنان", desc: "تبييض احترافي بتقنية الليزر يعطيك نتائج فورية ومذهلة." },
    { icon: "🌿", title: "علاج الجذور", desc: "علاج عصب بدون ألم باستخدام أحدث الأجهزة الميكروسكوبية." },
    { icon: "👶", title: "أسنان الأطفال", desc: "بيئة مرحة وآمنة مخصصة لراحة الأطفال وعلاجهم بلطف." },
  ],
};

/* ===================================================== */

// 1. Render services
const grid = document.getElementById("servicesGrid");
grid.innerHTML = CONFIG.services.map(s => `
  <article class="service-card reveal">
    <div class="service-icon">${s.icon}</div>
    <h3>${s.title}</h3>
    <p>${s.desc}</p>
    <a href="#contact" class="service-link">احجز الآن →</a>
  </article>
`).join("");

// 2. WhatsApp links
const waBase = `https://wa.me/${CONFIG.whatsappNumber}`;
document.getElementById("waFloat").href = `${waBase}?text=${encodeURIComponent("مرحباً، أرغب في حجز موعد بالعيادة.")}`;

// 3. Booking form -> WhatsApp
document.getElementById("bookingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const text =
`مرحباً، أرغب في حجز موعد بالعيادة 🦷

👤 الاسم: ${name}
📞 الجوال: ${phone}
🧾 الخدمة: ${service}${message ? `\n📝 ملاحظات: ${message}` : ""}`;

  window.open(`${waBase}?text=${encodeURIComponent(text)}`, "_blank");
});

// 4. Mobile menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

// 5. Header scroll effect
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
});

// 6. Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.classList.add("visible");
      io.unobserve(en.target);
    }
  });
}, { threshold: .15 });
document.querySelectorAll(".reveal, .service-card, .feature").forEach(el => {
  el.classList.add("reveal");
  io.observe(el);
});
