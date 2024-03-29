import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import one from "../../img/1.jpg";
import two from "../../img/2.jpg";
import three from "../../img/3.jpg";
import four from "../../img/4.jpg";
import { Link } from "react-router-dom";
import { Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [menuBar, setMenuBar] = useState(false);
  return (
    <>
      {/* comienza la seccion del header */}

      <section className="header">
        <Link to={"/"} className="logo">
          LinkedTeam
        </Link>

        <nav className={`navbar ${menuBar ? "active" : ""}`}>
          <a href="#quePuedesHacer" className="smooth">
            ¿Qué podrás hacer?
          </a>

          <Link to="/signup" className="">
            Regístrate
          </Link>

          <Link to="/login" className="">
            Ingresa
          </Link>
        </nav>

        <div
          id="menu-btn"
          onClick={() => {
            if (menuBar != true) {
              setMenuBar(true);
            } else {
              setMenuBar(false);
            }
          }}
          className={menuBar ? "fas fa-xmark" : "fas fa-bars"}
        >
          {" "}
        </div>
      </section>

      {/* termina la sección del header */}

      {/* comienza la sección del home */}

      <section className="new-home">
        {/* <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${one})` }}>
              <div className="content">
                <span>Sácale el máximo potencial a tú equipo de trabajo</span>
                <h3>Mantente conectado con tu equipo de trabajo</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${two})` }}>
              <div className="content">
                <span>Entrenamiento constante</span>
                <h3>Forma a tú equipo de trabajo</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${three})` }}>
              <div className="content">
                <span>
                  Haz seguimiento efectivo de prospectos propios y de tu equipo
                </span>
                <h3>La App para la prospección efectiva</h3>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slide" style={{ backgroundImage: `url(${four})` }}>
              <div className="content">
                <span>Registra y haz seguimiento de todas tus tareas</span>
                <h3>Nunca olvides una tarea</h3>
              </div>
            </div>
          </SwiperSlide>
        </Swiper> */}
      </section>

      {/* termina la sección del home */}
      <div id="quePuedesHacer"></div>
      {/* empieza la sección de servicios */}

      <section className="services">
        <h1 className="heading-tittle">
          {" "}
          ¿Qué podrás hacer en <span>LinkedTeam</span>?
        </h1>
        <div className="box-container">
          <div className="box">
            <i className="bx bxl-youtube icon"></i>
            <h4>Plataforma de formación</h4>
            <h6>
              Podrás cargar contenido de alto valor para a tu equipo de trabajo
            </h6>
          </div>
          <div className="box">
            <i className="bx bxs-layout icon"></i>
            <h4>CRM</h4>
            <h6>
              Podrás guardar cada uno de tus prospectos, y usar el embudo de
              ventas para hacer un seguimiento efectivo
            </h6>
          </div>
          <div className="box">
            <i className="bx bx-list-ol icon"></i>
            <h4>App de tareas pendientes</h4>
            <h6>
              Podrás anotar esas tareas claves, para hacerles con el método
              Kanban
            </h6>
          </div>
        </div>
      </section>
      {/* termina la sección de servicios */}

      {/* comienza el footer */}

      <section className="footer">
        <h3>Información de Contacto</h3>
        <div className="box">
          <a href="#">
            {" "}
            <i className="fa-brands fa-whatsapp"></i> +(58)0412-XXXXXX
          </a>
          <a href="mailto:linkedteam2023@gmail.com">
            {" "}
            <i className="fas fa-envelope"></i> linkedteam2023@gmail.com
          </a>
          <a href="#">
            {" "}
            <i className="fas fa-map"></i> Caracas, Venezuela
          </a>
        </div>

        <div className="credit">
          {" "}
          Creado por <a href="https://devix-eight.vercel.app/">Devix</a> todos
          los derechos reservados!
        </div>
      </section>

      {/* termina el footer */}
    </>
  );
};
