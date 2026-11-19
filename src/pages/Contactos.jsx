import React, { useState } from 'react';
import PlantillaBase from '../components/template/PlantillaBase';
import '../styles/pages/contactos.css';

export function Contactos({ totalItemsCount = 0 }) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contenido: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const enviarMensaje = (e) => {
    e.preventDefault();
    const nuevosErrores = {};

    const nombre = formData.nombre.trim();
    const correo = formData.correo.trim();
    const contenido = formData.contenido.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nombre) {
      nuevosErrores.nombre = 'El nombre es obligatorio.';
    } else if (nombre.length < 3) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 3 letras.';
    }

    if (!correo) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio.';
    } else if (!emailRegex.test(correo)) {
      nuevosErrores.correo = 'Ingrese un correo electrónico válido.';
    }

    if (!contenido) {
      nuevosErrores.contenido = 'El contenido es obligatorio.';
    } else if (contenido.length < 10) {
      nuevosErrores.contenido = 'El mensaje debe tener al menos 10 caracteres.';
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrors(nuevosErrores);
      return;
    }

    console.log('Mensaje enviado:', formData);
    alert('Mensaje enviado con éxito');
    setFormData({ nombre: '', correo: '', contenido: '' });
    setErrors({});
  };

  return (
    <PlantillaBase totalItemsCount={totalItemsCount}>
      <div className="contactos-page-wrapper">
        <section className="form-wrapper">
          <div className="form-header">
            <h2>FORMULARIO DE CONTACTOS</h2>
          </div>

          <form id="miFormulario" className="contact-form" onSubmit={enviarMensaje} noValidate>
            <div className="form-group">
              <label htmlFor="nombre">NOMBRE COMPLETO</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'input-error' : ''}
              />
              {errors.nombre && <span className="error-text">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="correo">CORREO</label>
              <input
                type="email"
                id="correo"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className={errors.correo ? 'input-error' : ''}
              />
              {errors.correo && <span className="error-text">{errors.correo}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="contenido">CONTENIDO</label>
              <textarea
                id="contenido"
                name="contenido"
                rows="5"
                value={formData.contenido}
                onChange={handleChange}
                className={errors.contenido ? 'input-error' : ''}
              ></textarea>
              {errors.contenido && <span className="error-text">{errors.contenido}</span>}
            </div>

            <div className="button-container">
              <button type="submit" className="submit-btn">
                ENVIAR MENSAJE
              </button>
            </div>
          </form>
        </section>
      </div>
    </PlantillaBase>
  );
}

export default Contactos;
