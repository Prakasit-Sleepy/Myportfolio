import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import ParticleBackground from "./ParticleBackground";
import PlayStationButton from "./components/PlayStationButton";
import PlayStationExplosion from "./components/PlayStationExplosion";
import AOS from "aos";
import "aos/dist/aos.css";

const tools = [
  {
    src: "https://cdn-1.webcatalog.io/catalog/figma/figma-icon-filled-256.webp?v=1742777017248",
    alt: "Figma",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/af/Adobe_Photoshop_CC_icon.svg",
    alt: "Photoshop",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fb/Adobe_Illustrator_CC_icon.svg",
    alt: "Illustrator",
  },
  {
    src: "https://cdn-1.webcatalog.io/catalog/uicolors/uicolors-icon-filled-256.webp?v=1714781146665",
    alt: "uicolors.app",
  },
  {
    src: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHHFT949fUipzkiFOBH3fAiZZUCdYojwUyX2aTonS1aIwMrx6NUIsHfUHSLzjGJFxxo4K81Ei7WzcnqEk8W.MgwadpHjl76SlQnWKc4OkaILTy7aDmpraBC2vB.Q_eb6EavJPyLEBEEqc.BSkZzu5Vng-&format=source&h=380",
    alt: "Canva",
  },
];

const services = [
  {
    title: "User Research",
    desc: "User-first thinking ",
    color: "text-pink-400",
  },
  {
    title: "Design thinking",
    desc: "Creative problem solving",
    color: "text-blue-400",
  },
  {
    title: "Design Wireframe",
    desc: "Structure before style",
    color: "text-green-400",
  },
  {
    title: "UI Design",
    desc: "Look, feel, and usability",
    color: "text-purple-400",
  },
];

const projects = [
  {
    title: "ProGas(POS)",
    subtitle: "UX/UI, POS Design",
    images: [
      "https://i.imgur.com/AOMoH9u.jpeg",
      "https://i.imgur.com/Idi6fKJ.jpeg",
      "https://i.imgur.com/Gs1n1ku.jpeg",
    ],
  },
  {
    title: "Phayao University",
    subtitle: "UX/UI, Manager",
    images: [
      "https://i.imgur.com/QqRTzW3.png",
      "https://i.imgur.com/Bxn9Uv6.png",
      "https://i.imgur.com/YZNBDMM.png",
    ],
  },
  {
    title: "RE Design",
    subtitle: "UI RE Design",
    images: [
      "https://i.imgur.com/suP3aV7.jpeg",
      "https://i.imgur.com/1JeUljV.jpeg",
      "https://i.imgur.com/KblQeO2.jpeg",
    ],
  },
];

function Home() {
  const [hideNavbar, setHideNavbar] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [resumeBursts, setResumeBursts] = useState([]);
  const [activeIndices, setActiveIndices] = useState(projects.map(() => 0));
  const resumeRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false, // 👈 เปลี่ยนเป็น false เพื่อให้ทำงานทุกครั้งที่เลื่อนผ่าน
      mirror: true, // 👈 เพิ่ม mirror เพื่อให้แอนิเมชันเล่นย้อนกลับเมื่อเลื่อนกลับขึ้น
    });

    setTimeout(() => setShowPopup(false), 1000);

    let lastScrollTop = 0;
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setHideNavbar(scrollTop > lastScrollTop && scrollTop > 100);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      AOS.refreshHard();
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const createBurst = () => {
    const symbols = ["○", "×", "□", "△"];
    const colors = {
      "○": "#FF3B3B",
      "×": "#3B82F6",
      "□": "#A855F7",
      "△": "#10B981",
    };
    const bursts = Array.from({ length: 10 }).map(() => {
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];
      const color = colors[symbol];
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 100 + 30;
      return {
        id: Math.random(),
        symbol,
        color,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
      };
    });
    setResumeBursts(bursts);
    setTimeout(() => setResumeBursts([]), 800);
  };

  const ProjectCard = ({
    images,
    activeIndex,
    setActiveIndex,
    title,
    subtitle,
  }) => (
    <div className="relative group transition-transform duration-300 hover:scale-105 overflow-visible px-2">
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
        <img
          src={images[activeIndex]}
          alt={`${title} - ${activeIndex + 1}`}
          className="w-full h-full object-cover rounded-xl shadow-md transition-opacity duration-500 ease-in-out"
        />
        {["left", "right"].map((dir) => (
          <button
            key={dir}
            onClick={() =>
              setActiveIndex(
                (prev) =>
                  (dir === "left" ? prev - 1 + images.length : prev + 1) %
                  images.length
              )
            }
            className={`absolute top-1/2 ${
              dir === "left" ? "left-2" : "right-2"
            } -translate-y-1/2 w-8 h-8 rounded-full bg-white/30 text-black text-lg font-bold shadow hover:bg-white/50 transition backdrop-blur-sm`}
          >
            {dir === "left" ? "‹" : "›"}
          </button>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {images.map((_, i) => (
          <span
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === activeIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <h3 className="mt-4 font-bold text-center">{title}</h3>
      <p className="text-sm text-gray-600 text-center">{subtitle}</p>
    </div>
  );

  return (
    <div className="relative min-h-screen w-screen font-sans text-gray-900">
      <nav
  className={`w-full px-6 py-4 flex justify-between items-center shadow-sm fixed top-0 z-50 transition-transform duration-500 ${
    hideNavbar ? "-translate-y-full" : "translate-y-0"
  }`}
>
  <div className="font-bold text-lg">Prakasit</div>
  <div className="flex gap-6 text-sm text-gray-700">
    <a href="#about" className="hover:text-black">
      About
    </a>
    <a href="#work" className="hover:text-black">
      Work
    </a>
    <a href="#contact" className="hover:text-black">
      Contact
    </a>
  </div>
</nav>


      <ParticleBackground />
      <div className="particle-background"></div>
      <PlayStationExplosion className="absolute inset-0 z-0 pointer-events-none" />

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white px-8 py-6 rounded-lg shadow-xl text-2xl font-bold text-gray-800 animate-pop-up">
            <span className="block animate-bounce text-4xl text-blue-500 mb-4">
              👋
            </span>
            สวัสดีครับ ยินดีต้อนรับ!
          </div>
        </div>
      )}

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-20">
        <div className="max-w-screen-xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-24">
          <div className="animate-slideInLeft pl-3 md:pl-4 lg:pl-14 text-left">
            <p className="text-sm text-gray-700 font-semibold mb-3">
              UX UI | Designer | Portfolio
            </p>
            <h1 className="text-5xl font-extrabold text-black transition-transform duration-200 hover:-translate-y-1 leading-snug mb-4">
              Prakasit <br /> Chuchawna
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Bringing Figma designs to life with functional code.
              <br />
              Scroll down to see more designs.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 relative">
              <PlayStationButton />
              <div className="relative" ref={resumeRef}>
                <button
                  onClick={() => {
                    window.open(
                      "https://drive.google.com/uc?export=download&id=1HLEQg9oJAFpitYZ-1kXjyQmuRmdb3fqK",
                      "_blank"
                    );
                    createBurst();
                  }}
                  className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 hover:scale-105 shadow-md transition-all duration-300 font-semibold relative"
                >
                  📄 Dowload Resume
                </button>
                {resumeBursts.map(({ id, color, x, y, symbol }) => (
                  <span
                    key={id}
                    className="absolute animate-burst text-xl pointer-events-none"
                    style={{
                      color,
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {symbol}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative flex justify-center animate-zoomIn delay-300">
            <div className="relative w-[280px] md:w-[320px] aspect-[3/4] rounded-[40px] overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src="https://i.imgur.com/BmH1fqP.jpeg"
                alt="Visual Designer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="relative z-10 px-6 py-16" data-aos="fade-up">
        <div className="max-w-screen-md mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {services.map((service, i) => (
            <div
              key={i}
              className="flex flex-col items-center group transition-transform duration-300 hover:scale-110"
              data-aos="fade-up"
              data-aos-delay={i * 150}
            >
              <div className="w-20 h-20 flex items-center justify-center mb-4 rounded-full border border-white/10 shadow backdrop-blur-md animate-pulse">
                <span
                  className={`text-5xl font-black ${service.color} drop-shadow animate-bounce`}
                >
                  {["○", "×", "□", "△"][i]}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2 group-hover:text-black transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="relative z-10 px-6 py-20">
  <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
    Latest work
  </h2>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12 px-2">
          {projects.map((p, i) => (
            <div key={p.title} data-aos="fade-up" data-aos-delay={i * 150}>
              <ProjectCard
                images={p.images}
                activeIndex={activeIndices[i]}
                setActiveIndex={(fn) =>
                  setActiveIndices((prev) =>
                    prev.map((v, j) => (j === i ? fn(v) : v))
                  )
                }
                title={p.title}
                subtitle={p.subtitle}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 py-16" data-aos="fade-up">
        <h2 className="text-2xl font-semibold text-center mb-8">My Tools</h2>
        <div className="flex justify-center items-center gap-10 flex-wrap px-6">
          {tools.map(({ src, alt }, i) => (
            <img
              key={alt}
              src={src}
              alt={alt}
              className="h-10"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            />
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 py-20" data-aos="fade-up">
        <h2 className="text-3xl font-bold text-center mb-12" data-aos="fade-up">
          Work Experience
        </h2>

        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Owl Day House */}
          <div
            className="bg-white p-6 rounded-xl shadow-md"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Owl Day House
            </h3>
            <p className="text-sm text-gray-600 mb-4">UX/UI Designer</p>
            <p className="text-gray-700 leading-relaxed">
              I’ve designed POS systems and led e-commerce platform redesigns
              with a strong focus on usability and business alignment. Using
              Figma as my primary tool, I create clean, scalable interfaces—from
              wireframes to high-fidelity prototypes—ensuring seamless
              collaboration across teams and clear design handoffs to
              developers.
            </p>
          </div>
          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <img
              src="https://scontent.fcnx4-1.fna.fbcdn.net/v/t39.30808-6/306197415_775989243379760_2989542025835248400_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFDo9KdFeYVnYdORd4JsTxvRy-9yp63DCBHL73KnrcMIJtB_rzfGloMvOZjV5IXVNociNw3OsEc_7SyOaNgBV3U&_nc_ohc=h7yPnG8OQ2oQ7kNvwFXo784&_nc_oc=Adkkgq_kIWhZShno5QZ27iV-5Rk0tobC_wnveaNtMI78fuoA43ik7IiJa49u0vFc2zQ&_nc_zt=23&_nc_ht=scontent.fcnx4-1.fna&_nc_gid=T85gUwqfHeMAAGHBXiHBfw&oh=00_AfEoq7R20gCafq-aPLdaOT5_xL2kQ2QozAdZJn4oSLvYSg&oe=67FFD40D"
              alt="Orange Workshop"
              className="w-28 h-28 object-contain"
            />
          </div>

          {/* Tossagun Digital */}
          <div
            className="bg-white p-6 rounded-xl shadow-md"
            data-aos="fade-right"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Tossaguns.com
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Project Manager&UX/UI Designer
            </p>
            <p className="text-gray-700 leading-relaxed">
              I specialize in restructuring workflows, project planning, task
              delegation, and quality assurance to ensure smooth execution and
              timely delivery.In parallel, I lead the UX/UI design process —
              from user flow ideation to interface design — aligning
              functionality with a seamless user experience. I collaborate
              closely with developers and oversee both system development and
              office operations.
            </p>
          </div>
          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <img
              src="https://tossaguns.com/logo.png"
              alt="Tossagun Digital"
              className="w-28 h-28 object-contain"
            />
          </div>
        </div>
      </section>
      <section
        className="relative z-10 px-6 py-20 bg-gradient-to-b from-white "
        data-aos="fade-up"
      >
        <h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          data-aos="fade-up"
        >
          Education
        </h2>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* ข้อมูลมหาวิทยาลัย */}
          <div
            className="bg-white p-8 rounded-3xl shadow-lg text-center md:text-left"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              University of Phayao
            </h3>
            <p className="text-md text-indigo-500 font-medium mb-4">
              Software Engineering(ปริญญาตรี:สาขาวิศวกรรมซอฟต์แวร)
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              I developed a solid foundation in software development, UI/UX
              principles, and project management. My academic journey cultivated
              a deep understanding of user-centered design, and I explored
              technologies like Figma, HTML/CSS, and JavaScript through
              practical projects and team collaborations.
            </p>
          </div>

          {/* โลโก้มหาวิทยาลัย */}
          <div
            className="flex items-center justify-center"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="bg-white p-6 rounded-full shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Logo_of_University_of_Phayao.svg/270px-Logo_of_University_of_Phayao.svg.png"
                alt="University of Phayao Logo"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="about"
        className="relative z-10 px-6 py-20 bg-white"
        data-aos="fade-up"
      >
        <h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          data-aos="fade-up"
        >
          About Me
        </h2>
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* รูปโปรไฟล์ */}
          <div
            className="flex items-center justify-center"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="w-52 h-52 rounded-full overflow-hidden shadow-lg border-4 border-indigo-500">
              <img
                src="https://i.imgur.com/ym4f2Sb.jpeg"
                alt="Prakasit Chuchawna"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* เนื้อหาแนะนำตัว */}
          <div
            className="text-center md:text-left"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Hi, I'm Prakasit 👋
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base mb-4">
              I’m a passionate UX/UI designer and developer who loves blending
              creativity with functionality. My journey started from sketching
              ideas to bringing them alive through interactive digital
              experiences. I focus on user-centric design, system thinking, and
              smooth collaboration with developers and clients.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              Tools I enjoy working with: Figma, Adobe Suite, HTML/CSS, Vue.js,
              and React. When I’m not designing, I enjoy exploring creative
              projects, tech innovation, and gaming 🎮.
            </p>
            <p className="text-gray-700 leading-relaxed text-sm md:text-base">
              สวัสดีครับ ผม ชื่อประกาศิตผมมีความตั้งใจจริงในการพัฒนาในสายอาชีพ
              UX/UI designer และก้าวต่อไปให้ไกลยิ่งขึ้น
              ผมหลงใหลในการออกแบบที่เน้นผู้ใช้เป็นศูนย์กลาง
              และการสร้างประสบการณ์ดิจิทัลที่มีความหมาย
              พร้อมเปิดรับโอกาสในการเรียนรู้ ลงมือทำ
              และพัฒนาทักษะจากการร่วมงานจริงกับมืออาชีพในสายงานนี้
              ผมเชื่อว่าในทุกโปรเจกต์มีพื้นที่ให้เติบโต และผมพร้อมเรียนรู้
              ปรับตัว และร่วมมือกับทีมเพื่อสร้างผลงานที่มีคุณค่า
            </p>
          </div>
        </div>
      </section>
      <section
        id="contact"
        className="relative z-10 px-6 py-24"
        data-aos="fade-up"
      >
        <h2
          className="text-4xl font-bold text-center mb-14 text-gray-800"
          data-aos="fade-up"
        >
          Contact Me
        </h2>

        <div className="max-w-3xl mx-auto bg-white p-10 rounded-3xl shadow-xl space-y-10">
          <form
            action="https://formsubmit.co/prakasitchuchawna@gmail.com"
            method="POST"
            className="grid grid-cols-1 gap-6"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-800"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-800"
            />
            <textarea
              name="message"
              rows="5"
              placeholder="Your Message"
              required
              className="border border-gray-300 rounded-lg px-5 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-gray-800 resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 text-lg"
            >
              ✉️ Send Message
            </button>
          </form>

          <div
            className="text-center text-gray-600 text-sm leading-relaxed space-y-2"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p>
              Or email me directly at{" "}
              <a
                href="mailto:prakasitchuchawna@gmail.com"
                className="text-indigo-600 font-medium underline"
              >
                prakasitchuchawna@gmail.com
              </a>
            </p>
            <p>
              📞 Call me at{" "}
              <a
                href="tel:+66968573991"
                className="text-indigo-600 font-medium underline"
              >
                +66 96 857 3991
              </a>
            </p>
          </div>
        </div>
      </section>

      <div className="h-32"></div>
    </div>
  );
}

export default Home;
